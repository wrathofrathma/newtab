import { defineStore } from "pinia";
import { persistedState } from "./index";
import { parseThemeId, type ThemeId } from "../theme/themes";

type TimeFormat = "12h" | "24h";
type SearchEngine = "google" | "duckduckgo" | "youtube" | "amazon";

type SettingsState = {
  theme: ThemeId;
  terminalPanelContrast: boolean;
  searchEngine: SearchEngine;
  showClock: boolean;
  showSeconds: boolean;
  autocompleteFromHistory: boolean;
  timeFormat: TimeFormat;
  heroImage: string;
};

function parseSearchEngine(value: unknown): SearchEngine {
  if (value === "duckduckgo") {
    return "duckduckgo";
  }

  if (value === "youtube") {
    return "youtube";
  }

  if (value === "amazon") {
    return "amazon";
  }

  return "google";
}

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsState => {
    const stored = persistedState.settings;

    return {
      theme: parseThemeId(stored?.theme),
      terminalPanelContrast: stored?.terminalPanelContrast ?? true,
      searchEngine: parseSearchEngine(stored?.searchEngine),
      showClock: stored?.showClock ?? true,
      showSeconds: stored?.showSeconds ?? true,
      autocompleteFromHistory: stored?.autocompleteFromHistory ?? true,
      timeFormat: stored?.timeFormat === "12h" ? "12h" : "24h",
      heroImage: typeof stored?.heroImage === "string" ? stored.heroImage : "",
    };
  },
  actions: {
    setSettings(settings: Partial<SettingsState>) {
      if (settings.theme) {
        this.theme = parseThemeId(settings.theme);
      }

      if (typeof settings.terminalPanelContrast === "boolean") {
        this.terminalPanelContrast = settings.terminalPanelContrast;
      }

      if (settings.searchEngine) {
        this.searchEngine = parseSearchEngine(settings.searchEngine);
      }

      if (typeof settings.showClock === "boolean") {
        this.showClock = settings.showClock;
      }

      if (typeof settings.showSeconds === "boolean") {
        this.showSeconds = settings.showSeconds;
      }

      if (typeof settings.autocompleteFromHistory === "boolean") {
        this.autocompleteFromHistory = settings.autocompleteFromHistory;
      }

      if (settings.timeFormat === "12h" || settings.timeFormat === "24h") {
        this.timeFormat = settings.timeFormat;
      }

      if (typeof settings.heroImage === "string") {
        this.heroImage = settings.heroImage;
      }
    },
    setSearchEngine(searchEngine: SearchEngine) {
      this.searchEngine = searchEngine;
    },
    setTheme(theme: ThemeId) {
      this.theme = theme;
    },
    setTerminalPanelContrast(terminalPanelContrast: boolean) {
      this.terminalPanelContrast = terminalPanelContrast;
    },
    setShowClock(showClock: boolean) {
      this.showClock = showClock;
    },
    setShowSeconds(showSeconds: boolean) {
      this.showSeconds = showSeconds;
    },
    setAutocompleteFromHistory(autocompleteFromHistory: boolean) {
      this.autocompleteFromHistory = autocompleteFromHistory;
    },
    setTimeFormat(timeFormat: TimeFormat) {
      this.timeFormat = timeFormat;
    },
    setHeroImage(heroImage: string) {
      this.heroImage = heroImage;
    },
    resetHeroImage() {
      this.heroImage = "";
    },
  },
});

export type { SearchEngine, TimeFormat, SettingsState };
