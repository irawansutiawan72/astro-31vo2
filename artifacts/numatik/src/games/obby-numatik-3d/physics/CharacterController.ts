import * as THREE from "three";
import { OBBY_CONFIG } from "../engine/config";

export interface PhysicsPlatform {
  mesh: THREE.Object3D;
  width: number;
  depth: number;
  top: number;
  movingDelta?: THREE.Vector3;
  active?: boolean;
  kind?: "normal" | "conveyor" | "trampoline" | "collapse";
  conveyorSpeed?: number;
  collapse?: () => void;
}

export interface PhysicsState {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  grounded: boolean;
  ground?: PhysicsPlatform;
}

export class CharacterController {
  readonly position = new THREE.Vector3();
  readonly previousPosition = new THREE.Vector3();
  readonly velocity = new THREE.Vector3();
  grounded = false;
  private ground?: PhysicsPlatform;
  private coyoteTimer = 0;
  private jumpBuffer = 0;
  private jumpHeld = false;
  wasGrounded = false;

  constructor(start: THREE.Vector3) {
    this.position.copy(start);
    this.previousPosition.copy(start);
  }

  requestJump(held = true) {
    this.jumpBuffer = OBBY_CONFIG.jumpBufferTime;
    this.jumpHeld = held;
  }

  releaseJump() {
    this.jumpHeld = false;
    if (this.velocity.y > 0) this.velocity.y *= 0.52;
  }

  cancelJump() {
    this.jumpHeld = false;
    this.jumpBuffer = 0;
  }

  step(delta: number, input: THREE.Vector2, platforms: PhysicsPlatform[]) {
    this.previousPosition.copy(this.position);
    this.jumpBuffer = Math.max(0, this.jumpBuffer - delta);
    this.coyoteTimer = this.grounded ? OBBY_CONFIG.coyoteTime : Math.max(0, this.coyoteTimer - delta);
    this.wasGrounded = this.grounded;

    const moveScale = this.grounded ? 1 : OBBY_CONFIG.airControl;
    this.velocity.x = THREE.MathUtils.damp(this.velocity.x, input.x * OBBY_CONFIG.moveSpeed, 11 * moveScale, delta);
    this.velocity.z = THREE.MathUtils.damp(this.velocity.z, input.y * OBBY_CONFIG.moveSpeed, 11 * moveScale, delta);

    if (this.jumpBuffer > 0 && (this.grounded || this.coyoteTimer > 0)) {
      this.velocity.y = OBBY_CONFIG.jumpVelocity;
      this.grounded = false;
      this.ground = undefined;
      this.coyoteTimer = 0;
      this.jumpBuffer = 0;
    }

    const gravityScale = this.jumpHeld && this.velocity.y > 0 ? OBBY_CONFIG.jumpHoldGravity : 1;
    this.velocity.y -= OBBY_CONFIG.gravity * gravityScale * delta;
    this.position.addScaledVector(this.velocity, delta);

    this.grounded = false;
    this.ground = undefined;
    if (this.velocity.y <= 0) {
      for (const platform of platforms) {
        if (platform.active === false) continue;
        const inside = Math.abs(this.position.x - platform.mesh.position.x) <= platform.width / 2 + OBBY_CONFIG.playerRadius
          && Math.abs(this.position.z - platform.mesh.position.z) <= platform.depth / 2 + OBBY_CONFIG.playerRadius;
        const feet = this.position.y;
        if (inside && feet <= platform.top + 0.12 && feet >= platform.top - 0.65) {
          this.position.y = platform.top;
          this.velocity.y = 0;
          this.grounded = true;
          this.ground = platform;
          if (platform.movingDelta) this.position.add(platform.movingDelta);
          if (platform.kind === "conveyor") this.position.z -= (platform.conveyorSpeed ?? 0) * delta;
          if (platform.kind === "trampoline" && !this.wasGrounded) this.velocity.y = OBBY_CONFIG.jumpVelocity * 1.55;
          if (platform.kind === "collapse") platform.collapse?.();
          break;
        }
      }
    }
    if (!this.grounded && this.wasGrounded) this.coyoteTimer = OBBY_CONFIG.coyoteTime;
  }

  interpolate(alpha: number, target: THREE.Vector3) {
    return target.lerpVectors(this.previousPosition, this.position, alpha);
  }

  getState(): PhysicsState {
    return { position: this.position, velocity: this.velocity, grounded: this.grounded, ground: this.ground };
  }

  teleport(position: THREE.Vector3) {
    this.position.copy(position);
    this.previousPosition.copy(position);
    this.velocity.set(0, 0, 0);
    this.grounded = false;
    this.ground = undefined;
    this.coyoteTimer = 0;
    this.jumpBuffer = 0;
  }
}
