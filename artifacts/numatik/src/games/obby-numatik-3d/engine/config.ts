export const OBBY_CONFIG = {
  fixedStep: 1 / 60,
  maxFrameDelta: 0.1,
  gravity: 24,
  moveSpeed: 7.2,
  airControl: 0.55,
  jumpVelocity: 9.2,
  jumpHoldGravity: 0.52,
  coyoteTime: 0.12,
  jumpBufferTime: 0.14,
  playerRadius: 0.34,
  playerHeight: 1.65,
  fallY: -12,
  camera: { height: 4.1, distance: 7, smoothing: 7, minPitch: -0.22, maxPitch: 0.52 },
  rendering: { maxPixelRatio: 3, lowPixelRatio: 0.65, fogNear: 45, fogFar: 180 },
  paths: {
    character: "/assets/models/obby/character.glb",
    animations: "/assets/animations/obby/",
    draco: "/assets/draco/",
    basis: "/assets/basis/",
    environment: "/assets/env/obby/studio.hdr",
  },
} as const;

export const QUALITY_PRESETS = {
  auto: { pixelRatio: 1.1, shadows: false, antialias: false, shadowMapSize: 512, postprocessing: false },
  low: { pixelRatio: 1, shadows: false, antialias: false, shadowMapSize: 512, postprocessing: false },
  medium: { pixelRatio: 1.25, shadows: true, antialias: true, shadowMapSize: 1024, postprocessing: false },
  high: { pixelRatio: 1.8, shadows: true, antialias: false, shadowMapSize: 2048, postprocessing: true },
  ultra: { pixelRatio: 3, shadows: true, antialias: false, shadowMapSize: 4096, postprocessing: true },
} as const;
