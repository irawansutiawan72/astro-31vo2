import { useEffect, useState } from "react";

export const DESKTOP_SIDEBAR_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 1024px)";

export function useResponsiveSidebarVisibility() {
  const [isVisible, setIsVisible] = useState(() => window.matchMedia(DESKTOP_SIDEBAR_QUERY).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_SIDEBAR_QUERY);
    const updateVisibility = () => setIsVisible(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateVisibility);
    return () => mediaQuery.removeEventListener("change", updateVisibility);
  }, []);

  return [isVisible, setIsVisible] as const;
}
