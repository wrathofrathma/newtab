import { ref } from "vue";
import { useTerminalStore } from "../store/terminal";
import google from "./google";
import duckduckgo from "./duckduckgo";
import youtube from "./youtube";
import amazon from "./amazon";
import category from "./category";
import link from "./link";
import importCommand from "./import";
import exportCommand from "./export";

export const commands = {
  google,
  duckduckgo,
  youtube,
  amazon,
  category,
  link,
  import: importCommand,
  export: exportCommand,
};

export const commandList = Object.keys(commands);

export function processCommand(command: string, input: string) {
  // If the command is in our command list, then we'll use that. Otherwise default search
  if (commandList.includes(command)) {
    // Execute command
    commands[command].action(input);
  } else {
  }
}
