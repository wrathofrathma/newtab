import { ref } from "vue";
import { pinia } from "../store";
import { useTerminalStore } from "../store/terminal";
import google from "./google";
import duckduckgo from "./duckduckgo";
import youtube from "./youtube";
import amazon from "./amazon";
import category from "./category";
import link from "./link";
import importCommand from "./import";
import exportCommand from "./export";
import reddit from "./reddit";
import ps1 from "./ps1";
import history from "./history";
import jump from "./jump";

export const commands = {
  google,
  duckduckgo,
  youtube,
  amazon,
  category,
  link,
  import: importCommand,
  export: exportCommand,
  "r/": reddit,
  ps1,
  history,
  jump,
};

export const commandList = Object.keys(commands);

export function processCommand(command: string, input: string) {
  // If the command is in our command list, then we'll use that. Otherwise default search
  if (commandList.includes(command)) {
    // Add command to history
    const store = useTerminalStore(pinia);
    store.addCommand(command, input);

    // Execute command
    commands[command].action(input);
  } else {
  }
}
