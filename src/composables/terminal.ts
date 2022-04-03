import { ref } from "vue";
import { useTerminalStore } from "../store/terminal";

export const commands = {
  google: {
    action: (query: string) => {
      const location =
        "https://www.google.com/search?q=" + query.replace(" ", "+");
      window.location = location;
    },
    description: "Google search engine",
  },
  duckduckgo: {
    action: (query: string) => {
      const location =
        "https://www.duckduckgo.com/?q=" + query.replace(" ", "+");
      window.location = location;
    },
    description: "DuckDuckGo search engine",
  },
  youtube: {
    action: (query: string) => {
      const location =
        "https://www.youtube.com/results?search_query=" +
        query.replace(" ", "+");
      window.location = location;
    },
    description: "Search Youtube",
  },
  amazon: {
    action: (query: string) => {
      const location = "https://www.amazon.com/s?k=" + query.replace(" ", "+");
      window.location = location;
    },
    description: "Search Amazon",
  },
  category: {
    action: (query: string) => {},
    description: "",
  },
  link: {
    action: (query: string) => {},
    description: "",
  },
  import: {
    action: (query: string) => {},
    description: "",
  },
  export: {
    action: (query: string) => {},
    description: "",
  },
  image: {
    action: (query: string) => {},
    description: "",
  },
  help: {
    action: (query: string) => {},
    description: "",
  },
  ps1: {
    action: (query: string) => {},
    description: "",
  },
  theme: {
    action: (query: string) => {},
    description: "",
  },
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
