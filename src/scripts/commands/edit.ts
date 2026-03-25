import { pinia } from "../../store";
import { useUiStore } from "../../store/ui";

export default {
  action: (query: string, subcommand: string = "") => {
    const uiStore = useUiStore(pinia);
    uiStore.openEditLayout();
  },
  description: "Open drag-and-drop layout editor",
  subcommands: {},
};
