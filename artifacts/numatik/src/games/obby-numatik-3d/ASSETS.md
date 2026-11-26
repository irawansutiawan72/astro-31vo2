# Obby Numatik 3D assets

The game runs without downloaded assets. The procedural humanoid, environment, and animations are always available as a fallback. To replace the player fallback with a Mixamo-rigged character, place the following files at these exact paths:

| File | Destination | Requirements |
| --- | --- | --- |
| Character | `artifacts/numatik/public/assets/models/obby/character.glb` | Humanoid, Mixamo skeleton (`mixamorig:*`), T-pose or relaxed A-pose, under 15 MB |
| Idle | `artifacts/numatik/public/assets/animations/obby/idle.glb` | Mixamo rig, In Place, under 5 MB |
| Walking | `artifacts/numatik/public/assets/animations/obby/walking.glb` | Mixamo rig, In Place, under 5 MB |
| Running | `artifacts/numatik/public/assets/animations/obby/running.glb` | Mixamo rig, In Place, under 5 MB |
| Jump takeoff | `artifacts/numatik/public/assets/animations/obby/jump-takeoff.glb` | Mixamo rig, In Place, under 5 MB |
| Falling idle | `artifacts/numatik/public/assets/animations/obby/falling-idle.glb` | Mixamo rig, In Place, looping, under 5 MB |
| Landing | `artifacts/numatik/public/assets/animations/obby/landing.glb` | Mixamo rig, In Place, under 5 MB |
| Hard landing | `artifacts/numatik/public/assets/animations/obby/hard-landing.glb` | Mixamo rig, In Place, under 5 MB |
| Victory | `artifacts/numatik/public/assets/animations/obby/victory.glb` | Mixamo rig, In Place, under 5 MB |
| Optional environment HDRI | `artifacts/numatik/public/assets/env/obby/studio.hdr` | Equirectangular HDR, under 2 MB |

Export animation clips with the same skeleton/bone names as the character. In Mixamo, use the same character for all clips and enable **In Place** so movement remains controlled by the game. Mixamo assets are not included in this repository; download them from an account authorized to use them and follow the applicable license terms.

The current engine loads the listed character/animation files and optionally uses `studio.hdr` for image-based lighting. If the HDRI is absent, the game keeps its procedural sky and lighting. Course props and geometry are generated in code.

Recommended compressed budgets: character model under 15 MB, total textures under 20 MB, and any HDRI under 2 MB. Optimize `.glb` files with `node scripts/optimize-assets.mjs` from the repository root. Optimized output is written to `artifacts/numatik/public/assets-optimized/`; review it and copy approved files back into `public/assets/` before use.
