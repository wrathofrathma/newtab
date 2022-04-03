import { ref } from "vue";
import { useTerminalStore } from "../store/terminal";
import google from "./google";
import duckduckgo from "./duckduckgo";
import youtube from "./youtube";
import amazon from "./amazon";
import category from "./category";
import link from "./link";

export const commands = {
  google,
  duckduckgo,
  youtube,
  amazon,
  category,
  link,
  // link: {
  //   action: (query: string) => {},
  //   description: "",
  // },
  // import: {
  //   action: (query: string) => {},
  //   description: "",
  // },
  // export: {
  //   action: (query: string) => {},
  //   description: "",
  // },
  // image: {
  //   action: (query: string) => {},
  //   description: "",
  // },
  // help: {
  //   action: (query: string) => {},
  //   description: "",
  // },
  // ps1: {
  //   action: (query: string) => {},
  //   description: "",
  // },
  // theme: {
  //   action: (query: string) => {},
  //   description: "",
  // },
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
