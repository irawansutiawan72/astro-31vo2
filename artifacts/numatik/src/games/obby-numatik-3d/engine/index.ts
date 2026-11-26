import * as THREE from "three";
import { clone as cloneSkeleton } from "three/addons/utils/SkeletonUtils.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";
import { getNextQuestion } from "../../shared/questions/bank";
import { OBBY_CONFIG, QUALITY_PRESETS } from "./config";
import { CharacterController, type PhysicsPlatform } from "../physics/CharacterController";
import { OBBY_ZONES, type ObbyPlatformData } from "../levels/zones";
import { createProceduralPlayer } from "../prefabs/player";
import type {
  ObbyCallbacks,
  ObbyGame,
  ObbyGameOptions,
  ObbyHud,
  ObbyQuestion,
  ObbyQuestionResult,
  ObbyQuality,
} from "./types";

const ANIMATION_NAMES = [
  "idle", "walking", "running", "jump-takeoff", "falling-idle",
  "landing", "hard-landing", "victory",
] as const;
type AnimationName = typeof ANIMATION_NAMES[number];

const gltfCache = new Map<string, Promise<GLTF>>();
let warnedMissingModelAssets = false;
let activeGameCount = 0;

const disposeCachedGltfs = () => {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const cachedModels = [...gltfCache.values()];
  gltfCache.clear();
  void Promise.allSettled(cachedModels).then((loadedModels) => {
    loadedModels.forEach((result) => {
      if (result.status !== "fulfilled") return;
      const gltf = result.value;
      gltf.scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        geometries.add(object.geometry);
        const meshMaterials = Array.isArray(object.material) ? object.material : [object.material];
        meshMaterials.forEach((material) => {
          materials.add(material);
          Object.values(material).forEach((value) => {
            if (value instanceof THREE.Texture) textures.add(value);
          });
        });
      });
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    textures.forEach((texture) => texture.dispose());
  });
};

const loadGltf = (url: string, loader: GLTFLoader, onProgress?: (progress: number) => void) => {
  let cached = gltfCache.get(url);
  if (!cached) {
    cached = new Promise((resolve, reject) => {
      loader.load(url, resolve, (event) => {
        if (event.total > 0) onProgress?.(event.loaded / event.total);
      }, reject);
    });
    gltfCache.set(url, cached);
    cached.catch(() => gltfCache.delete(url));
  }
  return cached;
};

const randomize = <T,>(values: T[]) => {
  const shuffled = [...values];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
};

const getNextObbyQuestion = (): ObbyQuestion => {
  const operations = ["addition", "subtraction", "multiplication"] as const;
  return getNextQuestion({ operation: operations[Math.floor(Math.random() * operations.length)]! });
};
const REVERSED_ZONES = [...OBBY_ZONES].reverse();

const clampInput = (value: number) => THREE.MathUtils.clamp(value, -1, 1);
const platformMaterial = (color: THREE.ColorRepresentation, roughness = 0.72) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.015 });

interface RuntimePlatform extends PhysicsPlatform {
  data: ObbyPlatformData;
  zoneId: string;
  moving?: THREE.Group;
  collapseTimer?: number;
  collapseDuration?: number;
  debris: Array<{ mesh: THREE.Mesh; velocity: THREE.Vector3; spin: THREE.Vector3 }>;
  basePosition: THREE.Vector3;
  active: boolean;
}

interface Junction {
  zoneId: string;
  junctionIndex: number;
  z: number;
  question: ObbyQuestion;
  answerLanes: string[];
  answerSigns: THREE.Mesh[];
  questionBoard: THREE.Mesh | null;
  lanePlatforms: RuntimePlatform[][];
  mergePlatform?: RuntimePlatform;
  retryPosition: THREE.Vector3;
  retryPending: boolean;
  resolved: boolean;
  notified: boolean;
  triggerZ: number;
}

const createLabelTexture = (text: string, color: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 192;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = "#13233deb";
  context.roundRect(8, 8, 496, 176, 28);
  context.fill();
  context.strokeStyle = color;
  context.lineWidth = 12;
  context.stroke();
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#ffffff";
  context.font = "bold 48px system-ui, sans-serif";
  context.fillText(text, 256, 96, 450);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

export const mountObbyGame = (host: HTMLElement, options: ObbyGameOptions = {}): ObbyGame => {
  const callbacks: ObbyCallbacks = options;
  const defaultStartZone = OBBY_ZONES.find((zone) => !zone.finish) ?? OBBY_ZONES[0]!;
  let startZoneId = OBBY_ZONES.some((zone) => zone.id === options.startZoneId && !zone.finish)
    ? options.startZoneId!
    : defaultStartZone.id;
  let quality: ObbyQuality = options.settings?.quality ?? "auto";
  const isMobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
  const initialPreset = QUALITY_PRESETS[quality];
  callbacks.onLoading?.(0);
  const canvas = host.ownerDocument.createElement("canvas");
  canvas.setAttribute("aria-label", "Obby Numatik 3D platform game");
  canvas.tabIndex = 0;
  const webgl2 = canvas.getContext("webgl2", { antialias: initialPreset.antialias, alpha: false });
  if (!webgl2) {
    throw new Error("Peramban ini belum mendukung WebGL 2. Coba perbarui peramban atau gunakan perangkat lain.");
  }
  const renderer = new THREE.WebGLRenderer({ canvas, context: webgl2, antialias: initialPreset.antialias, powerPreference: "high-performance" });
  activeGameCount += 1;
  const dracoLoader = new DRACOLoader().setDecoderPath(OBBY_CONFIG.paths.draco);
  const ktx2Loader = new KTX2Loader().setTranscoderPath(OBBY_CONFIG.paths.basis);
  ktx2Loader.detectSupport(renderer);
  const gltfLoader = new GLTFLoader()
    .setDRACOLoader(dracoLoader)
    .setKTX2Loader(ktx2Loader)
    .setMeshoptDecoder(MeshoptDecoder);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#b5e7ff");
  scene.fog = new THREE.Fog("#b5e7ff", OBBY_CONFIG.rendering.fogNear, OBBY_CONFIG.rendering.fogFar);
  const camera = new THREE.PerspectiveCamera(66, 1, 0.1, 240);
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  let environmentTexture: THREE.Texture | null = null;
  new RGBELoader().load(
    OBBY_CONFIG.paths.environment,
    (hdr) => {
      if (disposed) {
        hdr.dispose();
        return;
      }
      hdr.mapping = THREE.EquirectangularReflectionMapping;
      environmentTexture = pmremGenerator.fromEquirectangular(hdr).texture;
      hdr.dispose();
      scene.environment = environmentTexture;
    },
    undefined,
    () => {
      // HDR is optional; the scene retains its procedural sky color when the file is absent.
    },
  );
  let composer: EffectComposer | null = null;
  let bloomPass: UnrealBloomPass | null = null;
  let smaaPass: SMAAPass | null = null;
  const hemisphere = new THREE.HemisphereLight("#edfbff", "#6a7660", 2.3);
  scene.add(hemisphere);
  const sun = new THREE.DirectionalLight("#fff4d6", 2.4);
  sun.position.set(-25, 34, 20);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -30;
  sun.shadow.camera.right = 30;
  sun.shadow.camera.top = 35;
  sun.shadow.camera.bottom = -35;
  scene.add(sun);

  const sharedGeometries = new Set<THREE.BufferGeometry>();
  const sharedMaterials = new Set<THREE.Material>();
  const sharedTextures = new Set<THREE.Texture>();
  let skyDome: THREE.Mesh | null = null;
  const skyCanvas = host.ownerDocument.createElement("canvas");
  skyCanvas.width = 8;
  skyCanvas.height = 256;
  const skyContext = skyCanvas.getContext("2d");
  if (skyContext) {
    const gradient = skyContext.createLinearGradient(0, 0, 0, skyCanvas.height);
    gradient.addColorStop(0, "#428bd2");
    gradient.addColorStop(0.58, "#a9e3ff");
    gradient.addColorStop(1, "#fff0d3");
    skyContext.fillStyle = gradient;
    skyContext.fillRect(0, 0, skyCanvas.width, skyCanvas.height);
    const skyTexture = new THREE.CanvasTexture(skyCanvas);
    skyTexture.colorSpace = THREE.SRGBColorSpace;
    sharedTextures.add(skyTexture);
    skyDome = new THREE.Mesh(
      new THREE.SphereGeometry(160, 24, 16),
      new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide, depthWrite: false }),
    );
    sharedGeometries.add(skyDome.geometry);
    sharedMaterials.add(skyDome.material as THREE.Material);
    scene.add(skyDome);
  }
  const decorationMaterials = new Map<string, THREE.Material>();
  const decorationGeometries = {
    trunk: new THREE.CylinderGeometry(0.16, 0.24, 1, 7),
    cone: new THREE.ConeGeometry(0.9, 1.8, 8),
    rock: new THREE.DodecahedronGeometry(0.8, 0),
    sphere: new THREE.SphereGeometry(0.55, 8, 7),
    block: new THREE.BoxGeometry(0.9, 1.8, 0.9),
    pipe: new THREE.CylinderGeometry(0.12, 0.12, 1.8, 8),
  };
  Object.values(decorationGeometries).forEach((geometry) => sharedGeometries.add(geometry));
  const rememberGeometry = <T extends THREE.BufferGeometry>(geometry: T) => (sharedGeometries.add(geometry), geometry);
  const rememberMaterial = <T extends THREE.Material>(material: T) => (sharedMaterials.add(material), material);
  const getDecorationMaterial = (color: string) => {
    let material = decorationMaterials.get(color);
    if (!material) {
      material = rememberMaterial(platformMaterial(color));
      decorationMaterials.set(color, material);
    }
    return material;
  };
  const platformGeometry = rememberGeometry(new THREE.BoxGeometry(1, 1, 1));
  const propGeo = rememberGeometry(new THREE.CylinderGeometry(0.1, 0.12, 1, 8));
  const fallback = createProceduralPlayer();
  scene.add(fallback.root);
  const initialZone = OBBY_ZONES.find((zone) => zone.id === startZoneId)!;
  const initialPlatform = initialZone.platforms.find((platform) => platform.checkpoint) ?? initialZone.platforms[0]!;
  const initialPosition = new THREE.Vector3(initialPlatform.x, initialPlatform.y, initialPlatform.z);
  const controller = new CharacterController(initialPosition);
  const playerVisual = new THREE.Group();
  fallback.root.position.y = 0;
  playerVisual.add(fallback.root);
  scene.add(playerVisual);
  const platforms: RuntimePlatform[] = [];
  const junctions: Junction[] = [];
  const obstacleMeshes: Array<{ mesh: THREE.Object3D; type: string; phase: number; origin: THREE.Vector3 }> = [];
  const decorativeMeshes: THREE.Object3D[] = [];
  let checkpoint = initialPosition.clone();
  let currentZone = initialZone.id;
  let pendingRetry: Junction | null = null;
  let elapsed = 0;
  let fallStartHeight = 0;
  let hardLandingUntil = 0;
  let barHitCooldown = 0;
  let falls = 0;
  let correct = 0;
  let wrong = 0;
  let results: ObbyQuestionResult[] = [];
  let joystick = new THREE.Vector2();
  let jumpHeld = false;
  let paused = false;
  let started = false;
  let hasWon = false;
  let disposed = false;
  let muted = options.settings?.muted ?? false;
  let sensitivity = THREE.MathUtils.clamp(options.settings?.sensitivity ?? 0.004, 0.001, 0.02);
  let yaw = 0;
  let playerYaw = 0;
  let pitch = 0.12;
  const keyboardKeys = new Set<string>();
  const movementInput = new THREE.Vector2();
  const rotatedInput = new THREE.Vector2();
  let frame = 0;
  let previousTime = 0;
  let accumulator = 0;
  let hudTimer = 0;
  let fpsTime = 0;
  let fpsFrames = 0;
  let averageFps = 60;
  let pixelRatio = window.devicePixelRatio || 1;
  let mixer: THREE.AnimationMixer | null = null;
  let activeAction: THREE.AnimationAction | null = null;
  const animationClips = new Map<AnimationName, THREE.AnimationClip>();
  let characterLoaded = false;
  let cameraTarget = new THREE.Vector3();
  const cameraOffset = new THREE.Vector3();
  const cameraPositionTarget = new THREE.Vector3();
  let playerDisplayPosition = new THREE.Vector3();
  let lastAnimation: AnimationName | null = null;
  let disposedAssetClone: THREE.Object3D | null = null;
  const assetGeometries = new Set<THREE.BufferGeometry>();
  const assetMaterials = new Set<THREE.Material>();
  const assetTextures = new Set<THREE.Texture>();
  const qualityPreset = (selected: ObbyQuality) => QUALITY_PRESETS[selected];

  const makePlatform = (data: ObbyPlatformData, zoneId: string) => {
    const thickness = 0.44;
    const color = data.obstacle === "swinging-bridge"
      ? "#99633d"
      : data.color ?? OBBY_ZONES.find((zone) => zone.id === zoneId)?.color ?? "#65d59c";
    const material = rememberMaterial(platformMaterial(color));
    const root = new THREE.Group();
    root.scale.set(data.width, thickness, data.depth);
    const slab = new THREE.Mesh(platformGeometry, material);
    slab.castShadow = true;
    slab.receiveShadow = true;
    root.add(slab);
    root.position.set(data.x, data.y - thickness / 2, data.z);
    scene.add(root);
    const platform: RuntimePlatform = {
      data,
      zoneId,
      mesh: root,
      width: data.width,
      depth: data.depth,
      top: data.y,
      debris: [],
      basePosition: root.position.clone(),
      active: true,
    };
    if (data.obstacle === "moving-platform") {
      platform.moving = root;
      obstacleMeshes.push({ mesh: root, type: data.obstacle, phase: Math.random() * 6.28, origin: root.position.clone() });
    }
    if (data.obstacle === "swinging-bridge") {
      const railMaterial = rememberMaterial(platformMaterial("#d3a16b"));
      for (const side of [-1, 1]) {
        const rail = new THREE.Mesh(
          rememberGeometry(new THREE.BoxGeometry(0.09, 0.62, data.depth)),
          railMaterial,
        );
        rail.position.set(side * (data.width / 2 - 0.08), 0.54, 0);
        root.add(rail);
        for (const z of [-data.depth * 0.36, data.depth * 0.36]) {
          const post = new THREE.Mesh(
            rememberGeometry(new THREE.BoxGeometry(0.12, 0.88, 0.12)),
            railMaterial,
          );
          post.position.set(side * (data.width / 2 - 0.08), 0.58, z);
          root.add(post);
        }
      }
      obstacleMeshes.push({ mesh: root, type: data.obstacle, phase: Math.random() * 6.28, origin: root.position.clone() });
    }
    if (data.obstacle === "conveyor") {
      platform.kind = "conveyor";
      platform.conveyorSpeed = 1.8;
      const arrowMaterial = rememberMaterial(new THREE.MeshBasicMaterial({ color: "#fff2b0" }));
      const arrow = new THREE.Mesh(rememberGeometry(new THREE.ConeGeometry(0.18, 0.42, 3)), arrowMaterial);
      arrow.rotation.x = Math.PI / 2;
      arrow.position.set(0, 0.26, 0);
      root.add(arrow);
    }
    if (data.obstacle === "trampoline") {
      platform.kind = "trampoline";
      const pad = new THREE.Mesh(rememberGeometry(new THREE.CylinderGeometry(data.width * 0.27, data.width * 0.31, 0.18, 16)), rememberMaterial(platformMaterial("#52edda", 0.34)));
      pad.position.y = 0.28;
      root.add(pad);
    }
    if (data.obstacle === "pillars") {
      const stone = rememberMaterial(platformMaterial("#9a734a"));
      for (const x of [-1.05, 1.05]) {
        const pillar = new THREE.Mesh(
          rememberGeometry(new THREE.CylinderGeometry(0.28, 0.36, 1.6, 8)),
          stone,
        );
        pillar.position.set(x, 1.02, 0);
        pillar.castShadow = true;
        pillar.receiveShadow = true;
        root.add(pillar);
      }
    }
    if (data.obstacle === "collapse") {
      platform.kind = "collapse";
      platform.collapse = () => { platform.collapseTimer = 0.7; };
    }
    platforms.push(platform);
    if (data.checkpoint) {
      const marker = new THREE.Mesh(propGeo, rememberMaterial(platformMaterial("#ffe36b", 0.42)));
      marker.scale.set(0.12, 1.6, 0.12);
      marker.position.set(data.x, data.y + 0.8, data.z);
      scene.add(marker);
      decorativeMeshes.push(marker);
    }
    if (data.obstacle === "rotating-bar") {
      const bar = new THREE.Mesh(rememberGeometry(new THREE.BoxGeometry(data.width + 0.5, 0.18, 0.35)), rememberMaterial(platformMaterial("#ff687d", 0.4)));
      bar.position.set(data.x, data.y + 0.8, data.z);
      bar.castShadow = true;
      scene.add(bar);
      obstacleMeshes.push({ mesh: bar, type: "rotating-bar", phase: Math.random() * 6.28, origin: bar.position.clone() });
    }
    return platform;
  };

  callbacks.onLoading?.(0.08);
  for (const zone of OBBY_ZONES) {
    for (const data of zone.platforms) makePlatform(data, zone.id);
    if (zone.finish) continue;
    zone.junctions.forEach((junctionZ, junctionIndex) => {
      const question = getNextObbyQuestion();
      const junction: Junction = {
        zoneId: zone.id,
        junctionIndex,
        z: junctionZ,
        question,
        answerLanes: randomize([...question.choices]),
        answerSigns: [],
        questionBoard: null,
        lanePlatforms: [[], [], []],
        retryPosition: new THREE.Vector3(0, 0.35, junctionZ + 2),
        retryPending: false,
        resolved: false,
        notified: false,
        triggerZ: junctionZ - 15.6,
      };
      junctions.push(junction);
      const zonePlatforms = platforms.filter((platform) => platform.zoneId === zone.id);
      junction.mergePlatform = zonePlatforms.find((platform) => Math.abs(platform.data.z - (junctionZ - 18)) < 0.1);
      for (let lane = 0; lane < 3; lane += 1) {
        const laneX = [-3.6, 0, 3.6][lane]!;
        junction.lanePlatforms[lane] = zonePlatforms.filter((platform) =>
          Math.abs(platform.data.x - laneX) < 0.1
          && (Math.abs(platform.data.z - (junctionZ - 6)) < 0.1 || Math.abs(platform.data.z - (junctionZ - 12)) < 0.1));
      }
      const boardTexture = createLabelTexture(question.prompt, "#ffe16d");
      if (boardTexture) {
        sharedTextures.add(boardTexture);
        junction.questionBoard = new THREE.Mesh(
          rememberGeometry(new THREE.PlaneGeometry(5.2, 1.55)),
          rememberMaterial(new THREE.MeshBasicMaterial({ map: boardTexture, transparent: true, side: THREE.DoubleSide })),
        );
        junction.questionBoard.position.set(0, 3, junctionZ + 1.6);
        scene.add(junction.questionBoard);
        decorativeMeshes.push(junction.questionBoard);
      }
      junction.answerLanes.forEach((answer, lane) => {
        const x = [-3.6, 0, 3.6][lane]!;
        const texture = createLabelTexture(answer, ["#50d4b0", "#ffc857", "#ff7676"][lane]!);
        if (!texture) return;
        sharedTextures.add(texture);
        const sign = new THREE.Mesh(
          rememberGeometry(new THREE.PlaneGeometry(2.4, 0.9)),
          rememberMaterial(new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })),
        );
        sign.position.set(x, 2.1, junctionZ - 5.2);
        scene.add(sign);
        decorativeMeshes.push(sign);
        junction.answerSigns[lane] = sign;
      });
    });
    for (let propIndex = 0; propIndex < 7; propIndex += 1) {
      const side = propIndex % 2 ? 1 : -1;
      const group = new THREE.Group();
      const addPart = (geometry: THREE.BufferGeometry, color: string, y: number, scale = 1, x = 0, z = 0) => {
        const part = new THREE.Mesh(geometry, getDecorationMaterial(color));
        part.position.set(x, y, z);
        part.scale.setScalar(scale);
        part.castShadow = true;
        group.add(part);
      };
      if (zone.theme === "garden") {
        addPart(decorationGeometries.rock, "#58a86b", 0.55, 1.2);
        addPart(decorationGeometries.sphere, "#ff77ad", 1.2, 0.34, 0.5);
        addPart(decorationGeometries.sphere, "#ffd75e", 1.35, 0.28, -0.5);
      } else if (zone.theme === "forest") {
        addPart(decorationGeometries.trunk, "#76523c", 1, 1);
        addPart(decorationGeometries.cone, "#28754d", 2.1, 1.15);
        addPart(decorationGeometries.cone, "#3b9a58", 2.8, 0.82);
      } else if (zone.theme === "rocky-desert") {
        addPart(decorationGeometries.rock, "#ad7141", 0.55, 1.6);
        addPart(decorationGeometries.rock, "#d5a367", 1.25, 0.85, 0.45);
      } else if (zone.theme === "factory") {
        addPart(decorationGeometries.block, "#526d79", 1.3, 1.1);
        addPart(decorationGeometries.pipe, "#ffd04e", 1.2, 0.72, 0.56);
        addPart(decorationGeometries.pipe, "#46c7ce", 1.2, 0.72, -0.56);
      } else if (zone.theme === "snow-mountain") {
        addPart(decorationGeometries.rock, "#dff7ff", 0.65, 1.35);
        addPart(decorationGeometries.cone, "#4e9bb8", 1.8, 1.15);
        addPart(decorationGeometries.cone, "#8bd5ed", 2.45, 0.8);
        addPart(decorationGeometries.sphere, "#f5fcff", 2.8, 0.45);
      } else {
        addPart(decorationGeometries.block, "#8c78d8", 1.1, 1.1);
        addPart(decorationGeometries.sphere, "#effaff", 2.1, 1, 0.48);
        addPart(decorationGeometries.sphere, "#effaff", 2.15, 0.82, -0.4);
        addPart(decorationGeometries.sphere, "#a9eaff", 2.42, 0.7);
      }
      const zoneStart = zone.platforms[0]!.z;
      group.position.set(side * (8 + Math.random() * 4), 0, zoneStart - 6 - propIndex * 14);
      group.rotation.y = Math.random() * Math.PI;
      scene.add(group);
      decorativeMeshes.push(group);
    }
  }
  callbacks.onLoading?.(0.22);

  const updateHud = () => {
    const active = junctions.find((junction) => junction.zoneId === currentZone
      && !junction.resolved
      && !junction.retryPending
      && controller.position.z <= junction.z + 8
      && controller.position.z > junction.triggerZ);
    const zoneName = OBBY_ZONES.find((zone) => zone.id === currentZone)?.name ?? "Padang Pelangi";
    const hud: ObbyHud = { elapsed, zone: zoneName, falls, correct, wrong, question: active?.question ?? null };
    callbacks.onHud?.(hud);
  };
  const setLabel = (mesh: THREE.Mesh, text: string, color: string) => {
    const material = mesh.material as THREE.MeshBasicMaterial;
    if (material.map) {
      sharedTextures.delete(material.map);
      material.map.dispose();
    }
    const texture = createLabelTexture(text, color);
    material.map = texture;
    if (texture) sharedTextures.add(texture);
    material.needsUpdate = true;
  };
  const updateJunctionLabels = (junction: Junction) => {
    if (junction.questionBoard) setLabel(junction.questionBoard, junction.question.prompt, "#ffe16d");
    junction.answerSigns.forEach((sign, lane) => {
      setLabel(sign, junction.answerLanes[lane]!, ["#50d4b0", "#ffc857", "#ff7676"][lane]!);
    });
  };
  const refreshJunction = (junction: Junction) => {
    junction.question = getNextObbyQuestion();
    junction.answerLanes = randomize([...junction.question.choices]);
    junction.notified = false;
    junction.retryPending = false;
    junction.resolved = false;
    updateJunctionLabels(junction);
  };
  const randomizeCurrentJunction = () => {
    const active = junctions.find((junction) => junction.zoneId === currentZone && !junction.resolved);
    if (active) refreshJunction(active);
  };
  const emitQuestion = (junction: Junction) => {
    if (junction.notified) return;
    junction.notified = true;
    callbacks.onJunctionQuestion?.(junction.question);
  };
  const respawn = () => {
    falls += 1;
    const retry = pendingRetry;
    if (retry) {
      retry.lanePlatforms.flat().concat(retry.mergePlatform ? [retry.mergePlatform] : []).forEach((platform) => {
        platform.active = true;
        platform.mesh.visible = true;
        platform.mesh.position.copy(platform.basePosition);
        platform.mesh.rotation.set(0, 0, 0);
        platform.collapseTimer = undefined;
      });
      checkpoint.copy(retry.retryPosition);
      controller.teleport(retry.retryPosition);
      refreshJunction(retry);
      pendingRetry = null;
      emitQuestion(retry);
      playerDisplayPosition.copy(retry.retryPosition);
    } else {
      controller.teleport(checkpoint);
      randomizeCurrentJunction();
      playerDisplayPosition.copy(checkpoint);
    }
    fallStartHeight = 0;
    hardLandingUntil = 0;
    callbacks.onRespawn?.(falls);
    updateHud();
  };
  const chooseAnimation = (name: AnimationName) => {
    if (name === lastAnimation) return;
    lastAnimation = name;
    if (animationClips.has(name) && mixer && characterLoaded) {
      const next = mixer.clipAction(animationClips.get(name)!);
      next.reset().fadeIn(0.18).play();
      activeAction?.fadeOut(0.18);
      activeAction = next;
    } else {
      fallback.setAnimation(name);
    }
  };
  const animateAssets = async () => {
    let completed = 0;
    const missingAssets: string[] = [];
    const total = 1 + ANIMATION_NAMES.length;
    const progress = (fraction = 1) => {
      callbacks.onLoading?.(0.22 + 0.73 * ((completed + fraction) / total));
    };
    const characterPromise = loadGltf(OBBY_CONFIG.paths.character, gltfLoader, (fraction) => progress(fraction))
      .then((gltf) => {
        if (disposed) return;
        const clone = cloneSkeleton(gltf.scene);
        clone.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry = object.geometry.clone();
          assetGeometries.add(object.geometry);
          const cloneMaterial = (material: THREE.Material) => {
            const copy = material.clone();
            assetMaterials.add(copy);
            for (const [key, value] of Object.entries(copy)) {
              if (value instanceof THREE.Texture) {
                const texture = value.clone();
                (copy as unknown as Record<string, unknown>)[key] = texture;
                assetTextures.add(texture);
              }
            }
            return copy;
          };
          object.material = Array.isArray(object.material)
            ? object.material.map(cloneMaterial)
            : cloneMaterial(object.material);
        });
        const box = new THREE.Box3().setFromObject(clone);
        const height = Math.max(box.max.y - box.min.y, 0.01);
        clone.scale.setScalar(1.65 / height);
        clone.position.y = -box.min.y * clone.scale.y;
        clone.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
        playerVisual.remove(fallback.root);
        const visual = new THREE.Group();
        visual.add(clone);
        playerVisual.add(visual);
        disposedAssetClone = visual;
        mixer = new THREE.AnimationMixer(clone);
        characterLoaded = true;
        if (animationClips.has("idle")) chooseAnimation("idle");
        completed += 1;
        progress();
      })
      .catch(() => {
        missingAssets.push(OBBY_CONFIG.paths.character);
        completed += 1;
        progress();
      });
    const animationPromises = ANIMATION_NAMES.map(async (name) => {
      try {
        const gltf = await loadGltf(`${OBBY_CONFIG.paths.animations}${name}.glb`, gltfLoader, (fraction) => progress(fraction));
        if (gltf.animations[0]) animationClips.set(name, gltf.animations[0]);
      } catch {
        missingAssets.push(`${OBBY_CONFIG.paths.animations}${name}.glb`);
      } finally {
        completed += 1;
        progress();
      }
    });
    await Promise.all([characterPromise, ...animationPromises]);
    if (missingAssets.length > 0 && !warnedMissingModelAssets && !disposed) {
      warnedMissingModelAssets = true;
      console.warn("Obby Numatik 3D: optional character/animation assets could not be loaded; using procedural visuals.", missingAssets);
    }
    if (!disposed) callbacks.onLoading?.(1);
  };
  let assetLoadFinished = false;
  const assetLoadPromise = animateAssets().finally(() => {
    assetLoadFinished = true;
    if (disposed) {
      ktx2Loader.dispose();
      dracoLoader.dispose();
      if (activeGameCount === 0) disposeCachedGltfs();
    }
  });
  void assetLoadPromise;

  const setQuality = (value: ObbyQuality) => {
    quality = value;
    const preset = qualityPreset(quality);
    const ratioLimit = quality === "auto" ? (isMobile ? 1 : 1.35) : preset.pixelRatio;
    pixelRatio = Math.min(window.devicePixelRatio || 1, ratioLimit);
    renderer.setPixelRatio(pixelRatio);
    sun.shadow.mapSize.set(preset.shadowMapSize, preset.shadowMapSize);
    renderer.shadowMap.enabled = preset.shadows;
    sun.castShadow = preset.shadows;
    if (preset.postprocessing && !composer) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), quality === "ultra" ? 0.42 : 0.28, 0.45, 0.82);
      smaaPass = new SMAAPass();
      composer.addPass(bloomPass);
      composer.addPass(smaaPass);
    } else if (!preset.postprocessing && composer) {
      bloomPass?.dispose();
      smaaPass?.dispose();
      composer.dispose();
      composer = null;
      bloomPass = null;
      smaaPass = null;
    }
    if (bloomPass) bloomPass.strength = quality === "ultra" ? 0.42 : 0.28;
    if (composer) composer.setPixelRatio(pixelRatio);
    resize();
  };
  function resize() {
    if (disposed) return;
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    composer?.setSize(width, height);
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  setQuality(quality);

  const cameraDrag = (deltaX: number, deltaY: number) => {
    yaw -= deltaX * sensitivity;
    pitch = THREE.MathUtils.clamp(pitch + deltaY * sensitivity, OBBY_CONFIG.camera.minPitch, OBBY_CONFIG.camera.maxPitch);
  };
  const setPaused = (value: boolean) => {
    if (paused === value) return;
    paused = value;
    previousTime = 0;
    if (paused) cancelAnimationFrame(frame);
    callbacks.onPause?.(paused);
    if (!paused && started && !disposed) frame = requestAnimationFrame(loop);
  };
  const setJoystick = (vector: { x: number; y: number } | THREE.Vector2) => {
    joystick.set(clampInput(vector.x), clampInput(vector.y));
  };
  const jumpPress = () => {
    if (elapsed < hardLandingUntil) return;
    jumpHeld = true;
    controller.requestJump(true);
  };
  const jumpRelease = () => {
    jumpHeld = false;
    controller.releaseJump();
  };
  const isEditableTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (disposed || paused || !started || !host.contains(host.ownerDocument.activeElement) || isEditableTarget(event.target)) return;
    const key = event.code;
    if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Space"].includes(key)) {
      event.preventDefault();
      keyboardKeys.add(key);
      if (key === "Space" && !event.repeat) jumpPress();
    }
  };
  const onKeyUp = (event: KeyboardEvent) => {
    keyboardKeys.delete(event.code);
    if (event.code === "Space") jumpRelease();
  };
  const onCanvasPointerDown = () => canvas.focus({ preventScroll: true });
  const onWindowBlur = () => {
    keyboardKeys.clear();
    jumpRelease();
  };
  canvas.addEventListener("pointerdown", onCanvasPointerDown);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", onWindowBlur);
  const resolveJunctions = () => {
    const active = junctions.find((junction) => junction.zoneId === currentZone && !junction.resolved && !junction.retryPending);
    if (!active) return;
    if (controller.position.z < active.z + 0.4 && controller.position.z > active.triggerZ) emitQuestion(active);
    if (controller.position.z <= active.triggerZ) {
      const laneIndex = Math.abs(controller.position.x + 3.6) < Math.abs(controller.position.x)
        ? (Math.abs(controller.position.x + 3.6) < Math.abs(controller.position.x - 3.6) ? 0 : 2)
        : (Math.abs(controller.position.x) < Math.abs(controller.position.x - 3.6) ? 1 : 2);
      const selectedAnswer = active.answerLanes[laneIndex]!;
      const correctAnswer = active.question.choices[active.question.correctIndex]!;
      const isCorrect = selectedAnswer === correctAnswer;
      const result: ObbyQuestionResult = {
        question: active.question,
        selectedAnswer,
        selectedIndex: active.question.choices.indexOf(selectedAnswer),
        correctAnswer,
        correct: isCorrect,
        explanation: isCorrect
          ? `Benar! ${active.question.prompt.replace("?", correctAnswer)}`
          : `${active.question.prompt.replace("?", correctAnswer)} Jawaban yang benar adalah ${correctAnswer}.`,
      };
      results.push(result);
      if (isCorrect) {
        correct += 1;
        active.resolved = true;
      } else {
        wrong += 1;
        active.retryPending = true;
        pendingRetry = active;
        checkpoint.copy(active.retryPosition);
        const failingPlatforms = [
          ...active.lanePlatforms[laneIndex]!,
          ...(active.mergePlatform ? [active.mergePlatform] : []),
        ];
        failingPlatforms.forEach((platform) => {
          platform.collapseDuration = 0.5;
          platform.collapseTimer = 0.5;
        });
      }
      callbacks.onQuestionResult?.(result);
      updateHud();
    }
  };
  const updateWorld = (delta: number) => {
    for (const obstacle of obstacleMeshes) {
      obstacle.phase += delta;
      if (obstacle.type === "moving-platform") {
        const platform = platforms.find((entry) => entry.mesh === obstacle.mesh);
        if (!platform) continue;
        const previousX = platform.mesh.position.x;
        platform.mesh.position.x = obstacle.origin.x + Math.sin(obstacle.phase * 0.9) * 1.15;
        platform.movingDelta ??= new THREE.Vector3();
        platform.movingDelta.set(platform.mesh.position.x - previousX, 0, 0);
        platform.top = platform.data.y;
      } else if (obstacle.type === "swinging-bridge") {
        obstacle.mesh.rotation.y = Math.sin(obstacle.phase * 0.8) * 0.18;
      } else {
        obstacle.mesh.rotation.y = Math.sin(obstacle.phase * 1.3) * 1.1;
      }
    }
    for (const platform of platforms) {
      if (platform.collapseTimer === undefined) continue;
      platform.collapseTimer -= delta;
      const collapseDuration = platform.collapseDuration ?? 0.7;
      const collapseProgress = 1 - THREE.MathUtils.clamp(platform.collapseTimer / collapseDuration, 0, 1);
      platform.mesh.position.y = platform.basePosition.y - collapseProgress * 0.8;
      platform.mesh.rotation.z = collapseProgress * 0.45;
      if (platform.collapseTimer <= 0) {
        platform.active = false;
        platform.mesh.visible = false;
        platform.collapseTimer = undefined;
        platform.collapseDuration = undefined;
        const material = (platform.mesh.children[0] as THREE.Mesh).material;
        for (const [index, [xSign, zSign]] of [[-1, -1], [-1, 1], [1, -1], [1, 1]].entries()) {
          const fragment = new THREE.Mesh(platformGeometry, material);
          fragment.scale.set(platform.width * 0.48, 0.18, platform.depth * 0.48);
          fragment.position.set(
            platform.basePosition.x + xSign * platform.width * 0.25,
            platform.top - 0.08,
            platform.basePosition.z + zSign * platform.depth * 0.25,
          );
          fragment.castShadow = true;
          scene.add(fragment);
          platform.debris.push({
            mesh: fragment,
            velocity: new THREE.Vector3(xSign * (1.4 + index * 0.2), 1.8 + index * 0.25, zSign * 1.3),
            spin: new THREE.Vector3(xSign * 2.4, index * 0.7, zSign * 2.1),
          });
        }
      }
    }
    for (const platform of platforms) {
      platform.debris = platform.debris.filter((fragment) => {
        fragment.velocity.y -= OBBY_CONFIG.gravity * delta;
        fragment.mesh.position.addScaledVector(fragment.velocity, delta);
        fragment.mesh.rotation.x += fragment.spin.x * delta;
        fragment.mesh.rotation.y += fragment.spin.y * delta;
        fragment.mesh.rotation.z += fragment.spin.z * delta;
        if (fragment.mesh.position.y < OBBY_CONFIG.fallY) {
          scene.remove(fragment.mesh);
          return false;
        }
        return true;
      });
    }
  };
  const collisionCheck = () => {
    if (barHitCooldown > 0) return;
    const p = controller.position;
    for (const obstacle of obstacleMeshes) {
      if (obstacle.type !== "rotating-bar") continue;
      const distance = Math.hypot(p.x - obstacle.mesh.position.x, p.z - obstacle.mesh.position.z);
      if (distance < 1.05 && Math.abs(p.y - obstacle.mesh.position.y) < 1.3) {
        const direction = new THREE.Vector2(p.x - obstacle.mesh.position.x, p.z - obstacle.mesh.position.z);
        if (direction.lengthSq() < 0.001) direction.set(0, 1);
        direction.normalize();
        controller.velocity.x = direction.x * 7;
        controller.velocity.z = Math.max(4, direction.y * 8);
        controller.velocity.y = 7;
        controller.grounded = false;
        controller.cancelJump();
        barHitCooldown = 0.8;
        callbacks.onHit?.();
        return;
      }
    }
  };
  const update = (delta: number) => {
    elapsed += delta;
    barHitCooldown = Math.max(0, barHitCooldown - delta);
    updateWorld(delta);
    movementInput.copy(joystick);
    if (keyboardKeys.has("KeyA") || keyboardKeys.has("ArrowLeft")) movementInput.x -= 1;
    if (keyboardKeys.has("KeyD") || keyboardKeys.has("ArrowRight")) movementInput.x += 1;
    if (keyboardKeys.has("KeyW") || keyboardKeys.has("ArrowUp")) movementInput.y -= 1;
    if (keyboardKeys.has("KeyS") || keyboardKeys.has("ArrowDown")) movementInput.y += 1;
    if (movementInput.lengthSq() > 1) movementInput.normalize();
    rotatedInput.set(
      movementInput.x * Math.cos(yaw) + movementInput.y * Math.sin(yaw),
      -movementInput.x * Math.sin(yaw) + movementInput.y * Math.cos(yaw),
    );
    if (elapsed < hardLandingUntil) rotatedInput.set(0, 0);
    controller.step(delta, rotatedInput, platforms);
    if (controller.wasGrounded && !controller.grounded) {
      fallStartHeight = controller.position.y;
    } else if (!controller.wasGrounded && controller.grounded
      && fallStartHeight - controller.position.y >= 3.2) {
      hardLandingUntil = elapsed + 0.38;
    }
    playerDisplayPosition.copy(controller.position);
    playerVisual.position.copy(playerDisplayPosition);
    if (rotatedInput.lengthSq() > 0.02) {
      const desiredYaw = Math.atan2(rotatedInput.x, -rotatedInput.y);
      const turnDelta = Math.atan2(Math.sin(desiredYaw - playerYaw), Math.cos(desiredYaw - playerYaw));
      playerYaw += turnDelta * (1 - Math.exp(-12 * delta));
    }
    playerVisual.rotation.y = playerYaw;
    if (mixer) mixer.update(delta);
    resolveJunctions();
    collisionCheck();

    const zone = REVERSED_ZONES.find((entry) => controller.position.z <= entry.platforms[0]!.z + 1);
    if (zone && currentZone !== zone.id) {
      currentZone = zone.id;
      updateHud();
    }
    const platform = platforms.find((entry) => entry.data.checkpoint
      && entry.zoneId === currentZone
      && Math.abs(controller.position.x - entry.data.x) < entry.width * 0.36
      && Math.abs(controller.position.z - entry.data.z) < entry.depth * 0.34
      && Math.abs(controller.position.y - entry.top) < 0.2);
    if (platform) checkpoint.set(platform.data.x, platform.top, platform.data.z);

    if (controller.position.y < OBBY_CONFIG.fallY) {
      respawn();
      return;
    }
    const activeZone = OBBY_ZONES.find((entry) => entry.id === currentZone);
    const finishLine = activeZone?.finish ? activeZone.platforms[1]?.z : undefined;
    if (activeZone?.finish && finishLine !== undefined && controller.position.z < finishLine + 2 && !paused) {
      paused = true;
      hasWon = true;
      chooseAnimation("victory");
      callbacks.onWin?.({ elapsed, falls, correct, wrong, results: [...results] });
      callbacks.onPause?.(true);
    }
    const moving = movementInput.lengthSq() > 0.0064;
    if (elapsed < hardLandingUntil) chooseAnimation("hard-landing");
    else if (!controller.grounded) chooseAnimation(controller.wasGrounded ? "jump-takeoff" : "falling-idle");
    else if (!controller.wasGrounded) chooseAnimation("landing");
    else chooseAnimation(moving ? movementInput.lengthSq() < 0.3 ? "walking" : "running" : "idle");
    hudTimer += delta;
    if (hudTimer > 0.15) {
      hudTimer = 0;
      updateHud();
    }
  };
  const render = (alpha: number, delta: number) => {
    controller.interpolate(alpha, playerDisplayPosition);
    playerVisual.position.copy(playerDisplayPosition);
    const target = controller.position;
    const cos = Math.cos(yaw);
    const sin = Math.sin(yaw);
    const distance = OBBY_CONFIG.camera.distance;
    cameraOffset.set(sin * distance, OBBY_CONFIG.camera.height + pitch * 4, cos * distance);
    cameraTarget.set(target.x, target.y + 1.1, target.z);
    cameraPositionTarget.copy(cameraTarget).add(cameraOffset);
    camera.position.lerp(cameraPositionTarget, 1 - Math.exp(-OBBY_CONFIG.camera.smoothing * delta));
    camera.lookAt(cameraTarget);
    sun.position.set(target.x - 25, target.y + 34, target.z + 20);
    sun.target.position.copy(target);
    sun.target.updateMatrixWorld();
    if (skyDome) skyDome.position.copy(camera.position);
    if (composer) composer.render();
    else renderer.render(scene, camera);
  };
  const loop = (now: number) => {
    if (disposed || paused || !started) return;
    frame = requestAnimationFrame(loop);
    if (!previousTime) previousTime = now;
    const delta = Math.min((now - previousTime) / 1000, OBBY_CONFIG.maxFrameDelta);
    previousTime = now;
    accumulator += delta;
    while (accumulator >= OBBY_CONFIG.fixedStep) {
      update(OBBY_CONFIG.fixedStep);
      accumulator -= OBBY_CONFIG.fixedStep;
    }
    fpsTime += delta;
    fpsFrames += 1;
    if (fpsTime >= 3) {
      averageFps = fpsFrames / fpsTime;
      if (quality === "auto") {
        const autoCap = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.35);
        if (averageFps < 47) pixelRatio = Math.max(OBBY_CONFIG.rendering.lowPixelRatio, pixelRatio - 0.15);
        else if (averageFps > 58) pixelRatio = Math.min(autoCap, pixelRatio + 0.05);
        renderer.setPixelRatio(pixelRatio);
        composer?.setPixelRatio(pixelRatio);
      }
      fpsTime = 0;
      fpsFrames = 0;
    }
    render(accumulator / OBBY_CONFIG.fixedStep, Math.max(delta, 0.001));
  };

  const reset = () => {
    falls = 0;
    correct = 0;
    wrong = 0;
    elapsed = 0;
    fallStartHeight = 0;
    hardLandingUntil = 0;
    barHitCooldown = 0;
    results = [];
    pendingRetry = null;
    hasWon = false;
    const zone = OBBY_ZONES.find((entry) => entry.id === startZoneId && !entry.finish) ?? defaultStartZone;
    const spawn = zone.platforms.find((platform) => platform.checkpoint) ?? zone.platforms[0]!;
    currentZone = zone.id;
    checkpoint.set(spawn.x, spawn.y, spawn.z);
    controller.teleport(checkpoint);
    junctions.forEach((junction) => {
      junction.resolved = false;
      junction.retryPending = false;
      refreshJunction(junction);
    });
    platforms.forEach((platform) => {
      platform.debris.forEach((fragment) => scene.remove(fragment.mesh));
      platform.debris = [];
      platform.active = true;
      platform.mesh.visible = true;
      platform.collapseTimer = undefined;
      platform.collapseDuration = undefined;
      platform.mesh.position.copy(platform.basePosition);
      platform.mesh.rotation.set(0, 0, 0);
    });
    obstacleMeshes.forEach((obstacle) => {
      obstacle.phase = 0;
      obstacle.mesh.rotation.set(0, 0, 0);
    });
    joystick.set(0, 0);
    keyboardKeys.clear();
    yaw = 0;
    playerYaw = 0;
    pitch = 0.12;
    playerDisplayPosition.copy(checkpoint);
    paused = false;
    mixer?.stopAllAction();
    activeAction = null;
    lastAnimation = null;
    chooseAnimation("idle");
    updateHud();
  };
  const start = () => {
    if (disposed) return;
    if (started && hasWon) reset();
    else if (started && !paused) return;
    started = true;
    paused = false;
    previousTime = 0;
    cancelAnimationFrame(frame);
    canvas.focus({ preventScroll: true });
    callbacks.onPause?.(false);
    frame = requestAnimationFrame(loop);
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    activeGameCount = Math.max(0, activeGameCount - 1);
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    canvas.removeEventListener("pointerdown", onCanvasPointerDown);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("blur", onWindowBlur);
    renderer.dispose();
    bloomPass?.dispose();
    smaaPass?.dispose();
    composer?.dispose();
    environmentTexture?.dispose();
    scene.environment = null;
    pmremGenerator.dispose();
    renderer.domElement.remove();
    sharedGeometries.forEach((geometry) => geometry.dispose());
    sharedMaterials.forEach((material) => material.dispose());
    sharedTextures.forEach((texture) => texture.dispose());
    fallback.dispose();
    mixer?.stopAllAction();
    assetGeometries.forEach((geometry) => geometry.dispose());
    assetMaterials.forEach((material) => material.dispose());
    assetTextures.forEach((texture) => texture.dispose());
    if (assetLoadFinished) {
      ktx2Loader.dispose();
      dracoLoader.dispose();
      if (activeGameCount === 0) disposeCachedGltfs();
    }
  };

  updateHud();
  return {
    start,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
    setPaused,
    reset,
    setJoystick,
    jumpPress,
    jumpRelease,
    cameraDrag,
    setSensitivity: (value) => { sensitivity = THREE.MathUtils.clamp(value, 0.001, 0.02); },
    setMuted: (value) => { muted = value; },
    setQuality,
    setStartZone: (zoneId) => {
      if (started && !paused) return;
      if (!OBBY_ZONES.some((zone) => zone.id === zoneId && !zone.finish)) return;
      startZoneId = zoneId;
      reset();
    },
    dispose,
  };
};

export type {
  ObbyCallbacks,
  ObbyGame,
  ObbyGameOptions,
  ObbyHud,
  ObbyQuestion,
  ObbyQuestionResult,
  ObbyQuality,
} from "./types";
