import { pinia } from "../store";
import { useCategoryStore } from "../store/category";
import { useSettingsStore } from "../store/settings";
import { useTerminalStore } from "../store/terminal";

/**
 * Imports a JSON settings file from disk.
 *
 * @param e Event from input change.
 */
export function importSettings(e) {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      try {
        const json = JSON.parse(reader.result as string);
        setSettings(json);
      } catch (e) {
        console.log(e);
      }
    },
    false,
  );

  reader.readAsText(file);
}

export function exportSettings() {
  const content = JSON.stringify(pinia.state.value);
  const file = new File([content], "settings.json", {
    type: "application/json",
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(file);

  link.href = url;
  link.setAttribute("download", "settings.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

type Settings = {};

/**
 * Configures settings based on an input settings object.
 *
 * @param {Settings} settings Settings object.
 */
function setSettings(settings) {
  const categoryStore = useCategoryStore(pinia);
  const settingsStore = useSettingsStore(pinia);
  const terminalStore = useTerminalStore(pinia);
  const categorySettings = settings.category;
  const appSettings = settings.settings;
  const terminalSettings = settings.terminal;

  if (categorySettings) {
    categoryStore.setCategory(categorySettings);
  }

  if (appSettings) {
    settingsStore.setSettings(appSettings);
  }

  if (terminalSettings) {
    terminalStore.setTerminal(terminalSettings);
  }
}
