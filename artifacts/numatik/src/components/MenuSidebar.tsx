import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, Home, Menu } from "lucide-react";
import { MENU_ITEMS, type MenuItemConfig } from "@/data/menuConfig";

type MenuSidebarProps = {
  activePath?: string;
  onBrandClick: () => void;
  onHomeClick: () => void;
  onOpenItem?: (item: MenuItemConfig) => void;
  onToggleVisibility?: () => void;
  isVisible?: boolean;
};

const DONATION_ITEM = MENU_ITEMS.find((item) => item.key === "donate");

const normalizeMenuLabel = (label: string, language: string) => {
  if (label !== label.toLocaleUpperCase(language)) return label;
  const [first, ...rest] = Array.from(label);
  return first ? first.toLocaleUpperCase(language) + rest.join("").toLocaleLowerCase(language) : label;
};

const MenuSidebar = ({
  activePath,
  onBrandClick,
  onHomeClick,
  onOpenItem,
  onToggleVisibility,
  isVisible = true,
}: MenuSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <aside className={`menu-sidebar${isVisible ? "" : " is-hidden"}`}>
      <div className="menu-sidebar-brand">
        <div className="menu-sidebar-brand-heading">
          <h1 className="menu-page-title menu-brand-title">
            <button
              type="button"
              onClick={onBrandClick}
              aria-label={t("nav.backToHome")}
              className="menu-brand-home-button menu-focusable"
            >
              NUMATIK
            </button>
          </h1>
          {onToggleVisibility && (
            <button
              type="button"
              onClick={onToggleVisibility}
              aria-label={t("menu.hideSidebar")}
              aria-expanded={isVisible}
              title={t("menu.hideSidebar")}
              className="menu-sidebar-toggle menu-focusable"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          )}
        </div>
        <p className="menu-muted">{t("menu.subtitle")}</p>
      </div>

      <nav className="menu-sidebar-primary" aria-label={t("menu.moreTab")}>
        <button
          type="button"
          onClick={onHomeClick}
          aria-current={location.pathname === "/menu" ? "page" : undefined}
          aria-label={t("menu.homeTab")}
          className="menu-sidebar-link menu-focusable"
        >
          <Home aria-hidden="true" className="h-5 w-5 shrink-0" />
          <span>{t("menu.homeTab")}</span>
        </button>
        {MENU_ITEMS.filter((item) => item.group === "more" && item.key !== "donate" && item.key !== "settings").map((item) => {
          const ItemIcon = item.icon;
          const isActive = activePath === item.path || location.pathname === item.path;
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onOpenItem ? onOpenItem(item) : navigate(item.path)}
              aria-current={isActive ? "page" : undefined}
              aria-label={normalizeMenuLabel(t(`menuItems.${item.key}.label`), i18n.language)}
              className={`menu-sidebar-link menu-focusable${isActive ? " is-active" : ""}`}
            >
              <ItemIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
              <span>{normalizeMenuLabel(t(`menu.${item.key}`), i18n.language)}</span>
            </button>
          );
        })}
      </nav>
      {DONATION_ITEM && (
        <button
          type="button"
          onClick={() => onOpenItem ? onOpenItem(DONATION_ITEM) : navigate(DONATION_ITEM.path)}
          aria-label={normalizeMenuLabel(t("menuItems.donate.label"), i18n.language)}
          className="menu-sidebar-link menu-sidebar-donate menu-focusable"
        >
          <Heart aria-hidden="true" className="h-5 w-5 shrink-0" />
          <span>{normalizeMenuLabel(t("menu.donate"), i18n.language)}</span>
        </button>
      )}
    </aside>
  );
};

export default MenuSidebar;
