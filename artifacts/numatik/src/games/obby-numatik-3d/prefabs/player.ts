import * as THREE from "three";

export interface ProceduralPlayer {
  root: THREE.Group;
  setAnimation(name: string): void;
  dispose(): void;
}

export const createProceduralPlayer = (): ProceduralPlayer => {
  const root = new THREE.Group();
  const materials: THREE.Material[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const mat = (color: THREE.ColorRepresentation, roughness = 0.62) => {
    const material = new THREE.MeshStandardMaterial({ color, roughness });
    materials.push(material);
    return material;
  };
  const geo = <T extends THREE.BufferGeometry>(geometry: T) => {
    geometries.push(geometry);
    return geometry;
  };
  const bodyMat = mat("#19c7d4");
  const limbMat = mat("#26364f");
  const skinMat = mat("#ffd3aa");
  const shoeMat = mat("#ffcf57");
  const faceMat = mat("#10273b", 0.3);
  const torso = new THREE.Mesh(geo(new THREE.CapsuleGeometry(0.34, 0.5, 4, 8)), bodyMat);
  torso.position.y = 0.94;
  root.add(torso);
  const head = new THREE.Mesh(geo(new THREE.SphereGeometry(0.29, 12, 10)), skinMat);
  head.position.y = 1.55;
  root.add(head);
  const face = new THREE.Mesh(geo(new THREE.BoxGeometry(0.34, 0.12, 0.04)), faceMat);
  face.position.set(0, 1.56, -0.25);
  root.add(face);
  const limbs: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(side * 0.39, 1.13, 0);
    const armMesh = new THREE.Mesh(geo(new THREE.CapsuleGeometry(0.11, 0.38, 3, 6)), limbMat);
    armMesh.position.y = -0.2;
    arm.add(armMesh);
    root.add(arm);
    limbs.push(arm);
    const leg = new THREE.Group();
    leg.position.set(side * 0.18, 0.54, 0);
    const legMesh = new THREE.Mesh(geo(new THREE.CapsuleGeometry(0.14, 0.42, 3, 6)), limbMat);
    legMesh.position.y = -0.22;
    leg.add(legMesh);
    const shoe = new THREE.Mesh(geo(new THREE.BoxGeometry(0.3, 0.16, 0.42)), shoeMat);
    shoe.position.set(0, -0.43, -0.08);
    leg.add(shoe);
    root.add(leg);
    limbs.push(leg);
  }
  const setAnimation = (name: string) => {
    const moving = name === "walking" || name === "running";
    const amount = moving ? (name === "running" ? 0.65 : 0.4) : 0;
    limbs[0]!.rotation.x = amount;
    limbs[2]!.rotation.x = -amount;
    limbs[1]!.rotation.x = -amount;
    limbs[3]!.rotation.x = amount;
    torso.rotation.x = name === "jump-takeoff" ? -0.12 : name === "falling-idle" ? 0.15 : 0;
  };
  return {
    root,
    setAnimation,
    dispose: () => {
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
    },
  };
};
