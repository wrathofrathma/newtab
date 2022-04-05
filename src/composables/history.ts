import { pinia } from "../store";
import { useTerminalStore } from "../store/terminal";

export default {
  action: (query: string) => {
    const store = useTerminalStore(pinia);
    console.log(store.history);
  },
  description: "View the command history",
};
