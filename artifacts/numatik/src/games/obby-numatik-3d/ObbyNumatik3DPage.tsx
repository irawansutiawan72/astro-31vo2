import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, LoaderCircle, Pause, Play, RotateCcw, Settings, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { mountObbyGame } from "./engine";
import type { ObbyGame, ObbyHud, ObbyQuestionResult, ObbyQuality } from "./engine/types";
import { getObbyTranslations } from "./translations";

type Screen = "menu" | "loading" | "playing" | "paused" | "win";
type Quality = "auto" | "low" | "medium" | "high" | "ultra";
type SavedSettings = { quality: Quality; sound: boolean; sensitivity: number };
type ObbyWinSummary = { elapsed: number; falls: number; correct: number; wrong: number; results: ObbyQuestionResult[]; stars: number };
type EngineWinSummary = Omit<ObbyWinSummary, "stars">;

const STORAGE_KEY = "numatik_obby_settings";
const emptyHud: ObbyHud = { elapsed: 0, zone: "", falls: 0, correct: 0, wrong: 0, question: null };
const readSettings = (): SavedSettings => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (parsed && typeof parsed === "object") {
      const value = parsed as Partial<SavedSettings>;
      return {
        quality: ["auto", "low", "medium", "high", "ultra"].includes(value.quality ?? "") ? value.quality as Quality : "auto",
        sound: typeof value.sound === "boolean" ? value.sound : true,
        sensitivity: typeof value.sensitivity === "number" ? Math.min(2, Math.max(0.3, value.sensitivity)) : 1,
      };
    }
  } catch {
    // Invalid or unavailable local storage falls back to safe defaults.
  }
  return { quality: "auto", sound: true, sensitivity: 1 };
};
const saveSettings = (settings: SavedSettings) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {
    // Storage is optional; the current settings still apply for this session.
  }
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
};

const ObbyNumatik3DPage = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<ObbyGame | null>(null);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const t = getObbyTranslations(language);
  const [settings, setSettings] = useState<SavedSettings>(readSettings);
  const [selectedZoneId, setSelectedZoneId] = useState("taman");
  const selectedZoneRef = useRef("taman");
  const [screen, setScreen] = useState<Screen>("menu");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hud, setHud] = useState<ObbyHud>(emptyHud);
  const [questionResult, setQuestionResult] = useState<ObbyQuestionResult | null>(null);
  const [summary, setSummary] = useState<ObbyWinSummary | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [gameError, setGameError] = useState("");
  const [notice, setNotice] = useState("");
  const [leftPointer, setLeftPointer] = useState<number | null>(null);
  const [rightPointer, setRightPointer] = useState<number | null>(null);
  const [joystick, setJoystick] = useState({ x: 0, y: 0 });
  const startRequestedRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);
  const movementKeysRef = useRef(new Set<string>());
  const lastFootstepRef = useRef(0);
  const cameraPointerRef = useRef({ x: 0, y: 0 });
  const [best, setBest] = useState(() => {
    try { return Number(localStorage.getItem("numatik_obby_best") ?? 0) || 0; } catch { return 0; }
  });
  const settingsRef = useRef(settings);
  const translationRef = useRef(t);
  const hudRef = useRef(hud);
  settingsRef.current = settings;
  translationRef.current = t;
  hudRef.current = hud;
  const playSound = useCallback((kind: "jump" | "correct" | "wrong" | "hit" | "respawn" | "win" | "step", zone = "") => {
    if (!settingsRef.current.sound || typeof window.AudioContext === "undefined") return;
    const context = audioRef.current ?? new window.AudioContext();
    audioRef.current = context;
    if (context.state === "suspended") void context.resume().catch(() => undefined);
    const presets = {
      jump: [440, 720, 0.16, "sine"] as const,
      correct: [660, 990, 0.28, "triangle"] as const,
      wrong: [280, 130, 0.3, "sawtooth"] as const,
      hit: [210, 75, 0.22, "square"] as const,
      respawn: [190, 90, 0.38, "sine"] as const,
      win: [520, 1040, 0.55, "triangle"] as const,
      step: [zone.toLowerCase().includes("pabrik") ? 190 : zone.toLowerCase().includes("gurun") ? 125 : zone.toLowerCase().includes("hutan") ? 235 : 310, 75, 0.07, "sine"] as const,
    };
    const [startFrequency, endFrequency, duration, waveform] = presets[kind];
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(startFrequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(endFrequency, 1), now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind === "step" ? 0.035 : 0.11, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
  }, []);

  const applySettings = useCallback((next: SavedSettings) => {
    setSettings(next);
    saveSettings(next);
    gameRef.current?.setQuality(next.quality as ObbyQuality);
    gameRef.current?.setSensitivity(next.sensitivity * 0.004);
    gameRef.current?.setMuted(!next.sound);
  }, []);

  const handleWin = useCallback((result: EngineWinSummary) => {
    const rankedResult: ObbyWinSummary = {
      ...result,
      stars: result.falls === 0 && result.elapsed < 180 ? 3 : result.falls <= 3 ? 2 : 1,
    };
    setSummary(rankedResult);
    setScreen("win");
    try {
      const previous = Number(localStorage.getItem("numatik_obby_best") ?? 0) || 0;
      if (!previous || rankedResult.elapsed < previous) {
        localStorage.setItem("numatik_obby_best", String(rankedResult.elapsed));
        setBest(rankedResult.elapsed);
      }
    } catch {
      // Score persistence is optional.
    }
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    try {
      const game = mountObbyGame(host, {
        startZoneId: selectedZoneRef.current,
        onLoading: (progress) => {
          setLoadingProgress(Math.round(progress * 100));
          if (startRequestedRef.current && progress >= 1) setScreen("playing");
        },
        onHud: setHud,
        onQuestionResult: (result) => {
          playSound(result.correct ? "correct" : "wrong", hudRef.current.zone);
          setQuestionResult(result);
          setNotice(result.correct
            ? translationRef.current.correct
            : `${translationRef.current.wrong}: ${translationRef.current.correctAnswer}: ${result.correctAnswer}`);
          window.setTimeout(() => setNotice(""), 1600);
        },
        onRespawn: () => {
          playSound("respawn");
          setQuestionResult(null);
          setNotice(translationRef.current.checkpoint);
          window.setTimeout(() => setNotice(""), 1300);
        },
        onHit: () => playSound("hit"),
        onWin: (result) => { playSound("win"); handleWin(result); },
      });
      gameRef.current = game;
      game.setQuality(settingsRef.current.quality as ObbyQuality);
      game.setSensitivity(settingsRef.current.sensitivity * 0.004);
      game.setMuted(!settingsRef.current.sound);
      return () => {
        game.dispose();
        gameRef.current = null;
      };
    } catch (error) {
      setGameError(error instanceof Error ? error.message : String(error));
      return undefined;
    }
  }, [handleWin, playSound]);

  useEffect(() => {
    const pushGuard = () => history.pushState({ obbyNumatik3D: true }, "");
    pushGuard();
    const onPopState = () => {
      if (screen === "playing") {
        gameRef.current?.pause();
        setScreen("paused");
      }
      pushGuard();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [screen]);

  useEffect(() => {
    const pauseOnBackground = () => {
      if (screen === "playing") {
        gameRef.current?.pause();
        setScreen("paused");
      }
    };
    const visibilityChanged = () => { if (document.hidden) pauseOnBackground(); };
    document.addEventListener("visibilitychange", visibilityChanged);
    const capacitorWindow = window as unknown as {
      Capacitor?: {
        plugins?: {
          App?: {
            addListener?: (
              name: string,
              callback: (state: { isActive?: boolean; canGoBack?: boolean }) => void,
            ) => unknown;
          };
        };
      };
    };
    const app = capacitorWindow.Capacitor?.plugins?.App;
    const subscriptions = [
      app?.addListener?.(
      "appStateChange",
        (state) => { if (state.isActive === false) pauseOnBackground(); },
      ),
      app?.addListener?.("backButton", () => pauseOnBackground()),
    ].filter((subscription) => subscription !== undefined);
    return () => {
      document.removeEventListener("visibilitychange", visibilityChanged);
      subscriptions.forEach((subscription) => {
        void Promise.resolve(subscription).then((listener) => {
          (listener as { remove?: () => void } | undefined)?.remove?.();
        });
      });
    };
  }, [screen]);

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      movementKeysRef.current.add(event.code);
      if (screen !== "playing") return;
      if (event.key === "Escape" || event.key.toLowerCase() === "p") {
        gameRef.current?.pause();
        setScreen("paused");
      }
      if (event.code === "Space" && !event.repeat) {
        playSound("jump");
        gameRef.current?.jumpPress();
      }
    };
    const keyUp = (event: KeyboardEvent) => {
      movementKeysRef.current.delete(event.code);
      if (event.code === "Space") gameRef.current?.jumpRelease();
    };
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [playSound, screen]);

  useEffect(() => {
    if (screen !== "playing") {
      lastFootstepRef.current = 0;
      return;
    }
    const moving = Math.hypot(joystick.x, joystick.y) > 0.16
      || ["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"]
        .some((key) => movementKeysRef.current.has(key));
    if (!moving) {
      lastFootstepRef.current = hud.elapsed;
      return;
    }
    if (hud.elapsed - lastFootstepRef.current >= 0.38) {
      playSound("step", hud.zone);
      lastFootstepRef.current = hud.elapsed;
    }
  }, [hud.elapsed, hud.zone, joystick, playSound, screen]);

  useEffect(() => () => {
    if (audioRef.current) void audioRef.current.close();
    audioRef.current = null;
  }, []);

  const start = () => {
    startRequestedRef.current = true;
    setGameError("");
    setQuestionResult(null);
    setSummary(null);
    setLoadingProgress(0);
    setScreen("loading");
    gameRef.current?.start();
    if (loadingProgress >= 100) setScreen("playing");
  };
  const resume = () => {
    setScreen("playing");
    gameRef.current?.resume();
  };
  const toMenu = () => {
    gameRef.current?.pause();
    navigate("/ruang-untuk-guru/numatik-game");
  };
  const returnToPlaces = () => {
    gameRef.current?.pause();
    gameRef.current?.setStartZone(selectedZoneRef.current);
    gameRef.current?.pause();
    gameRef.current?.setJoystick({ x: 0, y: 0 });
    setJoystick({ x: 0, y: 0 });
    setLeftPointer(null);
    setRightPointer(null);
    setQuestionResult(null);
    setNotice("");
    setSummary(null);
    setScreen("menu");
  };

  const updateJoystick = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2);
    const dy = (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2);
    const magnitude = Math.hypot(dx, dy);
    const scale = magnitude > 1 ? 1 / magnitude : 1;
    const next = { x: dx * scale, y: dy * scale };
    setJoystick(next);
    gameRef.current?.setJoystick(next);
  };
  const stopJoystick = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== leftPointer) return;
    setLeftPointer(null);
    setJoystick({ x: 0, y: 0 });
    gameRef.current?.setJoystick({ x: 0, y: 0 });
  };
  const beginCamera = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    setRightPointer(event.pointerId);
    cameraPointerRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveCamera = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== rightPointer) return;
    const deltaX = event.clientX - cameraPointerRef.current.x;
    const deltaY = event.clientY - cameraPointerRef.current.y;
    cameraPointerRef.current = { x: event.clientX, y: event.clientY };
    gameRef.current?.cameraDrag(deltaX, deltaY);
  };
  const endCamera = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId === rightPointer) setRightPointer(null);
  };

  const optionLabels = [
    { key: "auto", label: t.auto },
    { key: "low", label: t.low },
    { key: "medium", label: t.medium },
    { key: "high", label: t.high },
    { key: "ultra", label: t.ultra },
  ] as const;
  const placeOptions = [
    { id: "taman", label: t.garden, description: t.gardenDescription, emoji: "🌿" },
    { id: "hutan", label: t.forest, description: t.forestDescription, emoji: "🌲" },
    { id: "gurun-batu", label: t.desert, description: t.desertDescription, emoji: "🏜️" },
    { id: "pabrik", label: t.factory, description: t.factoryDescription, emoji: "🏭" },
    { id: "menara-langit", label: t.tower, description: t.towerDescription, emoji: "🗼" },
    { id: "gunung-salju", label: t.snow, description: t.snowDescription, emoji: "🏔️" },
  ] as const;
  const surfaceClass = isDark
    ? "border-white/15 bg-slate-950/90 text-white"
    : "border-slate-300 bg-white/95 text-slate-900";
  const zoneNames: Record<string, string> = {
    Taman: t.garden,
    Hutan: t.forest,
    "Gurun Batu": t.desert,
    Pabrik: t.factory,
    "Menara Langit": t.tower,
    "Gunung Salju": t.snow,
    "Garis Finish": t.finishZone,
  };
  const zoneLabel = zoneNames[hud.zone] ?? (hud.zone || `${t.zone} 1 / 6`);

  return (
    <main className="fixed inset-0 overflow-hidden bg-sky-200 text-white" style={{ touchAction: "none", overscrollBehavior: "none" }}>
      <div ref={hostRef} className="absolute inset-0" />

      {gameError && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-slate-950/90 p-5 text-center">
          <div className="max-w-md rounded-2xl border border-cyan-300/30 bg-slate-900 p-6">
            <h1 className="font-display text-xl font-black">{t.title}</h1>
            <p className="mt-3 text-sm text-slate-300">{gameError || t.webgl}</p>
            <button type="button" onClick={toMenu} className="mt-5 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950">{t.menu}</button>
          </div>
        </div>
      )}

      {screen === "menu" && !gameError && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-slate-950/25 p-4 backdrop-blur-sm">
          <div className={`max-h-[min(92dvh,900px)] w-full max-w-lg overflow-y-auto rounded-3xl border p-5 shadow-2xl backdrop-blur-xl sm:p-6 ${surfaceClass}`}>
            <div className="text-center">
              <span className="text-5xl" role="img" aria-label="flag">🏁</span>
              <h1 className="mt-3 font-display text-3xl font-black text-cyan-500">{t.title}</h1>
              <p className="mt-2 text-sm opacity-75">{t.subtitle}</p>
            </div>
            <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm leading-relaxed">{t.instructions}</div>
            <section className="mt-4" aria-labelledby="obby-place-title">
              <h2 id="obby-place-title" className="mb-2 text-sm font-bold">{t.choosePlace}</h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {placeOptions.map((place) => {
                  const selected = selectedZoneId === place.id;
                  return (
                    <button
                      key={place.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        selectedZoneRef.current = place.id;
                        setSelectedZoneId(place.id);
                        gameRef.current?.setStartZone(place.id);
                        gameRef.current?.pause();
                      }}
                      className={`min-h-24 rounded-xl border p-2 text-left transition-colors ${
                        isDark
                          ? selected ? "border-cyan-300 bg-cyan-400/20 text-white" : "border-white/15 bg-white/5 text-slate-100 hover:bg-white/10"
                          : selected ? "border-cyan-500 bg-cyan-50 text-slate-900 ring-2 ring-cyan-200" : "border-slate-300 bg-white/80 text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-sm font-bold"><span aria-hidden="true">{place.emoji}</span>{place.label}</span>
                      <span className={`mt-1 block text-[10px] leading-snug ${isDark ? "text-slate-300" : "text-slate-600"}`}>{place.description}</span>
                    </button>
                  );
                })}
              </div>
            </section>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-black/5 px-4 py-3">
              <span className="text-sm">{t.time} · {formatTime(best)}</span>
              <button type="button" onClick={() => applySettings({ ...settings, sound: !settings.sound })} aria-label={t.sound} className="rounded-lg p-2 text-cyan-600">
                {settings.sound ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
            </div>
            <button type="button" onClick={() => setSettingsOpen(true)} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-400/30 bg-black/5 text-sm font-bold">
              <Settings className="h-4 w-4" /> {t.settings}
            </button>
            <button type="button" onClick={start} className="mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 font-display text-lg font-black text-slate-950 shadow-[0_5px_0_#0f766e] active:translate-y-1 active:shadow-none">
              <Play className="h-5 w-5 fill-current" /> {t.play}
            </button>
            <button type="button" onClick={toMenu} className={`mx-auto mt-4 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors ${isDark ? "text-slate-200 hover:bg-white/10" : "border border-slate-300 bg-white/90 text-slate-700 hover:bg-slate-100"}`}><ArrowLeft className="h-4 w-4" /> {t.menu}</button>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-black/65 p-4 backdrop-blur">
          <section className={`w-full max-w-md rounded-3xl border p-5 shadow-2xl ${surfaceClass}`}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-black">{t.qualitySetting}</h2>
              <button type="button" onClick={() => setSettingsOpen(false)} aria-label="Close settings" className="rounded-xl p-2"><ChevronDown className="h-5 w-5" /></button>
            </div>
            <label className="mt-5 block text-sm font-bold">{t.quality}</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {optionLabels.map(({ key, label }) => (
                <button key={key} type="button" onClick={() => applySettings({ ...settings, quality: key })} className={`min-h-11 rounded-xl border px-3 text-sm font-bold ${settings.quality === key ? "border-cyan-500 bg-cyan-500/20 text-cyan-700" : "border-slate-400/30 bg-black/5"}`}>{label}</button>
              ))}
            </div>
            {settings.quality === "ultra" && <p className="mt-2 text-xs text-amber-600">{t.ultraWarning}</p>}
            <label className="mt-5 flex items-center justify-between text-sm font-bold">
              {t.sound}
              <button type="button" onClick={() => applySettings({ ...settings, sound: !settings.sound })} className="rounded-lg border border-slate-400/30 px-4 py-2">{settings.sound ? t.on : t.off}</button>
            </label>
            <label className="mt-5 block text-sm font-bold">{t.sensitivity}: {settings.sensitivity.toFixed(1)}×</label>
            <input className="mt-2 w-full accent-cyan-500" type="range" min="0.3" max="2" step="0.1" value={settings.sensitivity} onChange={(event) => applySettings({ ...settings, sensitivity: Number(event.target.value) })} />
          </section>
        </div>
      )}

      {screen === "loading" && (
        <div className="absolute inset-0 z-40 grid place-items-center bg-slate-950/55">
          <div className="rounded-2xl border border-white/15 bg-slate-950/85 px-8 py-6 text-center">
            <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-cyan-300" />
            <p className="mt-3 text-sm font-bold">{t.loading}</p>
            <div className="mt-3 h-2 w-52 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-cyan-400 transition-all" style={{ width: `${loadingProgress}%` }} /></div>
          </div>
        </div>
      )}

      {(screen === "playing" || screen === "paused") && (
        <>
          <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-2 p-3">
            <div className="flex items-start gap-2">
              <button
                type="button"
                onClick={returnToPlaces}
                aria-label={t.choosePlace}
                title={t.choosePlace}
                className="pointer-events-auto flex min-h-10 items-center gap-1 rounded-xl border border-white/20 bg-slate-950/75 px-2 text-[10px] font-bold shadow-lg backdrop-blur"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t.choosePlace}</span>
              </button>
              <div className="rounded-xl border border-white/20 bg-slate-950/65 px-3 py-2 text-xs shadow-lg backdrop-blur">
                <p className="font-bold">{formatTime(hud.elapsed)}</p>
                <p className="text-cyan-200">{zoneLabel}</p>
              </div>
            </div>
            <div className="max-w-[52%] rounded-xl border border-amber-100/30 bg-slate-950/80 px-3 py-2 text-center text-xs shadow-lg backdrop-blur">
              {hud.question ? <><b>{hud.question.prompt}</b><div className="mt-1 flex justify-center gap-2">{hud.question.choices.map((option, index) => <span key={index}>{index + 1}. {option}</span>)}</div></> : <span className="text-slate-300">{t.subtitle}</span>}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/65 px-3 py-2 text-xs shadow-lg backdrop-blur">
              <span>⬇ {hud.falls}</span><span className="text-emerald-300">✓ {hud.correct}</span><span className="text-rose-300">✕ {hud.wrong}</span>
              <button type="button" className="pointer-events-auto ml-1 rounded-md p-1" onClick={() => { gameRef.current?.pause(); setScreen("paused"); }} aria-label={t.pause}><Pause className="h-4 w-4" /></button>
            </div>
          </header>

          {screen === "playing" && (
            <div className="absolute inset-0 z-10">
              <div
                className="absolute bottom-8 left-5 grid h-32 w-32 touch-none place-items-center rounded-full border border-white/45 bg-slate-900/25 shadow-lg backdrop-blur-sm"
                onPointerDown={(event) => {
                  event.preventDefault();
                  if (leftPointer !== null) return;
                  setLeftPointer(event.pointerId);
                  event.currentTarget.setPointerCapture(event.pointerId);
                  updateJoystick(event);
                }}
                onPointerMove={(event) => { if (event.pointerId === leftPointer) updateJoystick(event); }}
                onPointerUp={stopJoystick}
                onPointerCancel={stopJoystick}
              >
                <span className="pointer-events-none absolute h-2 w-2 rounded-full bg-white/40" />
                <span className="pointer-events-none grid h-12 w-12 place-items-center rounded-full border border-white/60 bg-cyan-400/55 shadow-lg" style={{ transform: `translate(${joystick.x * 26}px, ${joystick.y * 26}px)` }}>●</span>
              </div>
              <div
                className="absolute inset-y-20 right-20 w-1/3 touch-none"
                onPointerDown={beginCamera}
                onPointerMove={moveCamera}
                onPointerUp={endCamera}
                onPointerCancel={endCamera}
              />
              <button
                type="button"
                className="absolute bottom-9 right-6 grid h-20 w-20 touch-none place-items-center rounded-full border-2 border-white/70 bg-cyan-400/80 font-display text-xs font-black text-slate-950 shadow-[0_5px_0_rgba(8,145,178,.8)] active:translate-y-1 active:shadow-none"
                onPointerDown={(event) => { event.preventDefault(); event.stopPropagation(); event.currentTarget.setPointerCapture(event.pointerId); playSound("jump"); gameRef.current?.jumpPress(); }}
                onPointerUp={(event) => { event.stopPropagation(); gameRef.current?.jumpRelease(); }}
                onPointerCancel={() => gameRef.current?.jumpRelease()}
              >
                {t.jump}
              </button>
            </div>
          )}
        </>
      )}

      {notice && <div className="absolute left-1/2 top-24 z-40 -translate-x-1/2 rounded-full border border-white/20 bg-slate-950/85 px-4 py-2 text-sm font-bold shadow-xl">{notice}</div>}

      {screen === "paused" && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <section className={`w-full max-w-sm rounded-3xl border p-6 text-center ${surfaceClass}`}>
            <Pause className="mx-auto h-8 w-8 text-cyan-500" />
            <h2 className="mt-2 font-display text-2xl font-black">{t.pause}</h2>
            <button type="button" onClick={resume} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 font-bold text-slate-950"><Play className="h-5 w-5" /> {t.resume}</button>
            <button type="button" onClick={returnToPlaces} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-400/30 bg-black/5 font-bold"><ArrowLeft className="h-5 w-5" /> {t.choosePlace}</button>
            <button type="button" onClick={toMenu} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-400/30 bg-black/5 font-bold"><ArrowLeft className="h-5 w-5" /> {t.menu}</button>
          </section>
        </div>
      )}

      {screen === "win" && summary && (
        <div className="absolute inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur">
          <section className={`my-auto w-full max-w-lg rounded-3xl border p-6 ${surfaceClass}`}>
            <p className="text-center text-5xl">🏆</p>
            <h2 className="mt-2 text-center font-display text-3xl font-black text-emerald-500">{t.finish}</h2>
            <div className="mt-5 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
              <div className="rounded-xl bg-black/5 p-3"><small>{t.time}</small><b className="block">{formatTime(summary.elapsed)}</b></div>
              <div className="rounded-xl bg-black/5 p-3"><small>{t.falls}</small><b className="block">{summary.falls}</b></div>
              <div className="rounded-xl bg-black/5 p-3"><small>{t.correct}</small><b className="block">{summary.correct}</b></div>
              <div className="rounded-xl bg-black/5 p-3"><small>{t.stars}</small><b className="block text-amber-500">{"★".repeat(summary.stars)}</b></div>
            </div>
            {summary.results.some((item) => !item.correct) && (
              <div className="mt-5 max-h-52 space-y-2 overflow-auto">
                <h3 className="font-bold">{t.wrongAnswers}</h3>
                {summary.results.filter((item) => !item.correct).map((item, index) => (
                  <article key={`${item.question.id}-${index}`} className="rounded-xl border border-rose-400/20 bg-rose-400/5 p-3 text-sm">
                    <p className="font-bold">{item.question.prompt}</p>
                    <p className="mt-1 text-emerald-600">{t.correctAnswer}: {item.correctAnswer}</p>
                    {item.explanation && <p className="mt-1 text-xs opacity-75">{t.explanation}: {item.explanation}</p>}
                  </article>
                ))}
              </div>
            )}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button type="button" onClick={start} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 font-bold text-slate-950"><RotateCcw className="h-4 w-4" /> {t.playAgain}</button>
              <button type="button" onClick={toMenu} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-400/30 bg-black/5 font-bold"><ArrowLeft className="h-4 w-4" /> {t.menu}</button>
            </div>
          </section>
        </div>
      )}

      {questionResult && <div className="sr-only" aria-live="polite">{questionResult.correct ? t.correct : t.wrong}</div>}
    </main>
  );
};

export default ObbyNumatik3DPage;
