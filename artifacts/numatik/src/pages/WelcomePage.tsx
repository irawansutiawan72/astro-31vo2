import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ExitDialog from "@/components/ExitDialog";
import ThemePickerModal from "@/components/ThemePickerModal";
import LanguagePickerModal from "@/components/LanguagePickerModal";
import { playPopSound } from "@/hooks/useAudio";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import NumatikWelcome from "./NumatikWelcome";

const WelcomePage = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [instantLanguageTransition, setInstantLanguageTransition] = useState(false);

  const handleThemeContinue = useCallback(() => {
    setInstantLanguageTransition(true);
    setShowThemePicker(false);
    setShowLangPicker(true);
  }, []);

  const handleStart = useCallback(() => {
    playPopSound();
    setInstantLanguageTransition(false);
    setShowWelcome(false);
    setShowThemePicker(true);
  }, []);

  const handleThemeClose = useCallback(() => {
    setShowThemePicker(false);
    setShowWelcome(true);
  }, []);

  const handleLanguageClose = useCallback(() => {
    setShowLangPicker(false);
    setShowWelcome(true);
  }, []);

  const handleClose = useCallback(() => {
    document.querySelector<HTMLButtonElement>("#btn-exit")?.click();
  }, []);

  const handleLangChange = useCallback((nextLanguage: Language) => {
    setLanguage(nextLanguage);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [setLanguage]);

  const academicYear = t("schoolYear").match(/\d{4}\s*[–-]\s*\d{4}/)?.[0] ?? "";

  return (
    <>
      {showWelcome && (
        <NumatikWelcome
          onStart={handleStart}
          onClose={handleClose}
          lang={language}
          onLangChange={handleLangChange}
          academicYear={academicYear}
          langStorageKey="numatik_language"
        />
      )}
      <div className="hidden">
        <ExitDialog />
      </div>
      <ThemePickerModal
        open={showThemePicker}
        onClose={handleThemeClose}
        onContinue={handleThemeContinue}
      />
      <LanguagePickerModal
        open={showLangPicker}
        onClose={handleLanguageClose}
        instantEntrance={instantLanguageTransition}
      />
    </>
  );
};

export default WelcomePage;
