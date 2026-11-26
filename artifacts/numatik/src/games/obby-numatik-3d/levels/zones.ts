export type ObstacleType = "moving-platform" | "conveyor" | "rotating-bar" | "trampoline" | "collapse" | "swinging-bridge" | "pillars";

export interface ObbyPlatformData {
  x: number;
  z: number;
  width: number;
  depth: number;
  y: number;
  color?: string;
  obstacle?: ObstacleType;
  checkpoint?: boolean;
}

export interface ObbyZoneData {
  id: string;
  name: string;
  theme: string;
  color: string;
  length: number;
  platforms: ObbyPlatformData[];
  junctions: number[];
  finish?: boolean;
}

const createZone = (
  id: string,
  name: string,
  theme: string,
  color: string,
  start: number,
  obstacles: ObstacleType[],
): ObbyZoneData => {
  const platforms: ObbyPlatformData[] = [];
  const add = (data: ObbyPlatformData) => platforms.push(data);
  add({ x: 0, z: start, width: 5.2, depth: 8, y: 0, checkpoint: true });
  add({ x: 0, z: start - 9, width: 3.2, depth: 5, y: 0.45 });
  const firstObstacle = obstacles[0];
  add({
    x: firstObstacle === "swinging-bridge" ? 0 : 1.5,
    z: start - 16,
    width: firstObstacle === "swinging-bridge" ? 1.15 : 3.2,
    depth: firstObstacle === "swinging-bridge" ? 6 : 5,
    y: 0.85,
    obstacle: firstObstacle,
  });
  add({ x: -0.8, z: start - 21, width: 3.2, depth: 5, y: 0.35 });
  const junctions = [start - 25, start - 65];
  const branchXs = [-3.6, 0, 3.6];
  junctions.forEach((junctionZ, junctionIndex) => {
    add({ x: 0, z: junctionZ, width: 6.2, depth: 8, y: 0.35 });
    for (let lane = 0; lane < branchXs.length; lane += 1) {
      add({
        x: branchXs[lane]!,
        z: junctionZ - 6,
        width: 2.8,
        depth: 7,
        y: 0.35,
        color: ["#50d4b0", "#ffc857", "#ff7676"][lane],
      });
      add({ x: branchXs[lane]!, z: junctionZ - 12, width: 2.8, depth: 5, y: 0.35 });
    }
    add({
      x: 0,
      z: junctionZ - 18,
      width: 7.5,
      depth: 7,
      y: 0.35,
      checkpoint: junctionIndex === 0,
    });
    if (junctionIndex === 0) {
      add({ x: -1.2, z: start - 50, width: 3.1, depth: 5, y: 0.8, obstacle: obstacles[1] });
      add({ x: 1.2, z: start - 57, width: 3.1, depth: 5, y: 0.45 });
    }
  });
  const specialObstacle = obstacles[2];
  if (specialObstacle) add({ x: 0, z: start - 90, width: 3.3, depth: 5, y: 0.35, obstacle: specialObstacle });
  return { id, name, theme, color, length: 100, platforms, junctions };
};

export const OBBY_ZONES: ObbyZoneData[] = [
  createZone("taman", "Taman", "garden", "#65d59c", 0, ["moving-platform", "rotating-bar"]),
  createZone("hutan", "Hutan", "forest", "#499b62", -100, ["swinging-bridge", "collapse"]),
  createZone("gurun-batu", "Gurun Batu", "rocky-desert", "#dda04b", -200, ["moving-platform", "pillars", "trampoline"]),
  createZone("pabrik", "Pabrik", "factory", "#7d9ca5", -300, ["conveyor", "rotating-bar"]),
  createZone("menara-langit", "Menara Langit", "sky-tower", "#a889ff", -400, ["collapse", "trampoline"]),
  createZone("gunung-salju", "Gunung Salju", "snow-mountain", "#76c9e8", -500, ["moving-platform", "swinging-bridge", "pillars"]),
  {
    id: "finish",
    name: "Garis Finish",
    theme: "finish",
    color: "#ffe066",
    length: 15,
    junctions: [],
    finish: true,
    platforms: [
      { x: 0, z: -600, width: 6, depth: 10, y: 0.25, checkpoint: true },
      { x: 0, z: -610, width: 8, depth: 16, y: 0.25 },
    ],
  },
];
