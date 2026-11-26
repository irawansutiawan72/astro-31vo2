import type { Vector2 } from "three";
import type { RunnerQuestion } from "../../shared/questions/bank";

export type ObbyQuestion = RunnerQuestion;
export type ObbyQuality = "low" | "medium" | "high" | "ultra" | "auto";

export interface ObbyHud {
  elapsed: number;
  zone: string;
  falls: number;
  correct: number;
  wrong: number;
  question: ObbyQuestion | null;
}

export interface ObbyQuestionResult {
  question: ObbyQuestion;
  selectedAnswer: string;
  selectedIndex: number;
  correctAnswer: string;
  correct: boolean;
  explanation: string;
}

export interface ObbyCallbacks {
  onLoading?: (progress: number) => void;
  onHud?: (hud: ObbyHud) => void;
  onJunctionQuestion?: (question: ObbyQuestion) => void;
  onQuestionResult?: (result: ObbyQuestionResult) => void;
  onHit?: () => void;
  onRespawn?: (falls: number) => void;
  onWin?: (summary: { elapsed: number; falls: number; correct: number; wrong: number; results: ObbyQuestionResult[] }) => void;
  onPause?: (paused: boolean) => void;
}

export interface ObbySettings {
  quality?: ObbyQuality;
  sensitivity?: number;
  muted?: boolean;
}

export interface ObbyGameOptions extends ObbyCallbacks {
  settings?: ObbySettings;
  startZoneId?: string;
}

export interface ObbyGame {
  start(): void;
  pause(): void;
  resume(): void;
  setPaused(paused: boolean): void;
  reset(): void;
  setJoystick(vector: { x: number; y: number } | Vector2): void;
  jumpPress(): void;
  jumpRelease(): void;
  cameraDrag(deltaX: number, deltaY: number): void;
  setSensitivity(value: number): void;
  setMuted(muted: boolean): void;
  setQuality(quality: ObbyQuality): void;
  setStartZone(zoneId: string): void;
  dispose(): void;
}
