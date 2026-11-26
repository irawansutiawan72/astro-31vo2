import { createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Home, Search } from "lucide-react";
import ExitDialog from "./ExitDialog";
import MenuHeaderControls from "./MenuHeaderControls";
import { playPopSound } from "@/hooks/useAudio";

interface PageNavigationProps {
  prevPath?: string;
  nextPath?: string;
  hidden?: boolean;
}

export const PageNavigationVisibilityContext = createContext(true);

const PageNavigation = ({ prevPath, nextPath, hidden = false }: PageNavigationProps) => {
  const isVisible = useContext(PageNavigationVisibilityContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const resolvedPrevPath = pathname.startsWith("/tka/modul-pemantapan/")
    ? "/tka/modul-pemantapan"
    : prevPath;

  const deepGameRoute = (
    !pathname.includes("/numatik-gamez/pilih/")
    && /^\/numatik-gamez\/[^/]+\/[^/]+\/[^/]+/.test(pathname)
  ) || pathname === "/numatik-world"
    || pathname.startsWith("/numatik-strike/")
    || pathname.startsWith("/city-rider/");
  const deepContentRoute = /^\/(buku-animasi-matematika|tugas-latihan-mandiri|lkpd)\/[^/]+\/[^/]+/.test(pathname);
  const hideTopControls = deepGameRoute || deepContentRoute;

  if (!isVisible || hidden) return null;

  return (
    <>
      <div
        className="page-navigation-bottom fixed left-0 bottom-0 z-50 flex gap-2 p-4"
        style={{
          paddingLeft: "max(1rem, env(safe-area-inset-left, 0px))",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
        }}
      >
        <button
          onClick={() => { playPopSound(); resolvedPrevPath ? navigate(resolvedPrevPath) : navigate(-1); }}
          className="w-11 h-11 rounded-full bg-card/80 backdrop-blur border border-border 
            flex items-center justify-center text-primary hover:border-primary/60 
            hover:box-glow-cyan transition-all duration-300 cursor-pointer"
          title={t("nav.back")}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        {nextPath && (
          <button
            onClick={() => { playPopSound(); navigate(nextPath); }}
            className="w-11 h-11 rounded-full bg-card/80 backdrop-blur border border-border 
              flex items-center justify-center text-primary hover:border-primary/60 
              hover:box-glow-cyan transition-all duration-300 cursor-pointer"
            title={t("nav.next")}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {!hideTopControls && (
        <div
          className="fixed right-0 top-0 z-50 flex items-center gap-1.5 p-4"
          style={{
            paddingRight: "max(1rem, env(safe-area-inset-right, 0px))",
            paddingTop: "max(1rem, env(safe-area-inset-top, 0px))",
          }}
        >
          <MenuHeaderControls />
          <button
            type="button"
            onClick={() => { playPopSound(); navigate("/menu"); }}
            className="menu-control-button menu-focusable flex items-center justify-center"
            aria-label={t("menu.searchAriaLabel")}
            title={t("menu.searchAriaLabel")}
          >
            <Search className="h-5 w-5" />
          </button>
          <ExitDialog />
          <button
            onClick={() => { playPopSound(); navigate("/menu"); }}
            className="w-11 h-11 rounded-full bg-card/80 backdrop-blur border border-border 
              flex items-center justify-center text-primary hover:border-primary/60 
              hover:box-glow-cyan transition-all duration-300 cursor-pointer"
            aria-label={t("nav.home")}
            title={t("nav.home")}
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default PageNavigation;
