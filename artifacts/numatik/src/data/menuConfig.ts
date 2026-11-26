import {
  ArrowLeftRight,
  BookMarked,
  BookOpen,
  Bot,
  Brain,
  Calculator,
  ClipboardList,
  FileText,
  Gamepad2,
  GraduationCap,
  Heart,
  Info,
  Lightbulb,
  Medal,
  MessageSquare,
  PencilRuler,
  PlayCircle,
  Rocket,
  Settings,
  Sigma,
  Sparkles,
  Target,
  User,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MenuGroup = "featured" | "learn" | "practice" | "games" | "tools" | "more";

export type MenuKey =
  | "animatedBook"
  | "academic"
  | "gameArena"
  | "teacherRoom"
  | "kokurikuler"
  | "video"
  | "formula"
  | "practice"
  | "questionBank"
  | "ujiMandiri"
  | "olympiad"
  | "lkpd"
  | "ai"
  | "calculator"
  | "fastCalc"
  | "conversion"
  | "guide"
  | "settings"
  | "donate"
  | "biography"
  | "gratitude"
  | "reference"
  | "about"
  | "kritikSaran";

export type MenuItemConfig = {
  key: MenuKey;
  icon: LucideIcon;
  path: string;
  group: MenuGroup;
  featured: boolean;
};

export const MENU_ITEMS = [
  { key: "animatedBook", icon: BookOpen, path: "/buku-animasi-matematika", group: "learn", featured: true },
  { key: "academic", icon: Brain, path: "/tka", group: "learn", featured: true },
  { key: "teacherRoom", icon: GraduationCap, path: "/ruang-untuk-guru", group: "more", featured: false },
  { key: "kokurikuler", icon: Lightbulb, path: "/ruang-untuk-guru/kokulikuler", group: "learn", featured: false },
  { key: "video", icon: PlayCircle, path: "/video-pembelajaran", group: "learn", featured: false },
  { key: "formula", icon: Sigma, path: "/kumpulan-rumus", group: "tools", featured: false },
  { key: "practice", icon: ClipboardList, path: "/tugas-latihan-mandiri", group: "practice", featured: false },
  { key: "gameArena", icon: Gamepad2, path: "/numatik-gamez", group: "practice", featured: true },
  { key: "questionBank", icon: FileText, path: "/bank-soal", group: "practice", featured: false },
  { key: "ujiMandiri", icon: Target, path: "/uji-mandiri", group: "practice", featured: false },
  { key: "olympiad", icon: Medal, path: "/olimpiade", group: "practice", featured: false },
  { key: "lkpd", icon: PencilRuler, path: "/lkpd", group: "learn", featured: false },
  { key: "ai", icon: Bot, path: "/chat-ai", group: "tools", featured: false },
  { key: "calculator", icon: Calculator, path: "/kalkulator-scientific", group: "tools", featured: false },
  { key: "fastCalc", icon: Zap, path: "/menghitung-cepat", group: "tools", featured: false },
  { key: "conversion", icon: ArrowLeftRight, path: "/konversi-satuan", group: "tools", featured: false },
  { key: "guide", icon: Info, path: "/petunjuk", group: "more", featured: false },
  { key: "settings", icon: Settings, path: "/pengaturan", group: "more", featured: false },
  { key: "donate", icon: Heart, path: "/donasi", group: "more", featured: false },
  { key: "biography", icon: User, path: "/biografi", group: "more", featured: false },
  { key: "gratitude", icon: Sparkles, path: "/ucapan-terima-kasih", group: "more", featured: false },
  { key: "reference", icon: BookMarked, path: "/referensi", group: "more", featured: false },
  { key: "about", icon: Rocket, path: "/tentang-aplikasi", group: "more", featured: false },
  { key: "kritikSaran", icon: MessageSquare, path: "/kritik-saran", group: "more", featured: false },
] as const satisfies readonly MenuItemConfig[];

export const MENU_SECTIONS = [
  { group: "learn", labelKey: "menu.sections.learn" },
  { group: "practice", labelKey: "menu.sections.practice" },
  { group: "tools", labelKey: "menu.sections.tools" },
] as const;
