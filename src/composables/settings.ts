import { pinia } from "../store";
import { useCategoryStore } from "../store/category";
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
        // TODO - We should set some sort of error in the future terminal
        console.log(e);
      }
    },
    false
  );

  reader.readAsText(file);
}

type Settings = {};

/**
 * Configures settings based on an input settings object.
 *
 * @param {Settings} settings Settings object.
 */
function setSettings(settings) {
  const categoryStore = useCategoryStore(pinia);
  const terminalStore = useTerminalStore(pinia);
  const categorySettings = settings.category;
  const terminalSettings = settings.terminal;

  categoryStore.setCategory(categorySettings);
  terminalStore.setTerminal(terminalSettings);
}
