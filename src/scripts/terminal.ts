import { pinia } from "../store";
import { useCategoryStore } from "../store/category";
import { useSettingsStore } from "../store/settings";
import { useTerminalStore } from "../store/terminal";
import { validateSearchTargets } from "./searchTargets";
import amazon from "./commands/amazon";
import chatgpt from "./commands/chatgpt";
import category from "./commands/category";
import clear from "./commands/clear";
import duckduckgo from "./commands/duckduckgo";
import ebay from "./commands/ebay";
import edit from "./commands/edit";
import exportCommand from "./commands/export";
import github from "./commands/github";
import help from "./commands/help";
import history from "./commands/history";
import imdb from "./commands/imdb";
import importCommand from "./commands/import";
import jump from "./commands/jump";
import link from "./commands/link";
import google from "./commands/google";
import ps1 from "./commands/ps1";
import reddit from "./commands/reddit";
import settings from "./commands/settings";
import stackoverflow from "./commands/stackoverflow";
import theme from "./commands/theme";
import twitter from "./commands/twitter";
import urbandictionary from "./commands/urbandictionary";
import wikipedia from "./commands/wikipedia";
import youtube from "./commands/youtube";

export type Command = {
  action: (query: string, subcommand: string) => void;
  description: string;
  subcommands: {
    [key: string]: {
      action: (query: string) => void;
      description: string;
    };
  };
};

export type ParsedInput = {
  raw: string;
  command: string;
  subcommand: string;
  query: string;
  isKnownCommand: boolean;
};

export type HistoryEntry = {
  command: string;
  subcommand: string;
  query: string;
};

export const commands: { [key: string]: Command } = {
  google,
  duckduckgo,
  ddg: duckduckgo,
  youtube,
  amazon,
  github,
  gh: github,
  stackoverflow,
  so: stackoverflow,
  wikipedia,
  wiki: wikipedia,
  twitter,
  x: twitter,
  imdb,
  ebay,
  urbandictionary,
  chatgpt,
  gpt: chatgpt,
  clear,
  category,
  link,
  import: importCommand,
  export: exportCommand,
  "r/": reddit,
  ps1,
  history,
  help,
  settings,
  theme,
  edit,
  jump,
  go: jump,
};

const searchTargetValidationErrors = validateSearchTargets();

if (searchTargetValidationErrors.length > 0) {
  throw new Error(
    `Invalid search target config:\n${searchTargetValidationErrors.join("\n")}`,
  );
}

export const commandList = Object.keys(commands);

function splitFirstToken(input: string): { token: string; rest: string } {
  const trimmed = input.trimStart();

  if (!trimmed) {
    return { token: "", rest: "" };
  }

  const firstSpace = trimmed.search(/\s/);

  if (firstSpace === -1) {
    return { token: trimmed, rest: "" };
  }

  return {
    token: trimmed.slice(0, firstSpace),
    rest: trimmed.slice(firstSpace + 1).trimStart(),
  };
}

export function parseInput(raw: string): ParsedInput {
  const normalized = raw.trim();

  if (!normalized) {
    return {
      raw: "",
      command: "",
      subcommand: "",
      query: "",
      isKnownCommand: false,
    };
  }

  const { token: command, rest: afterCommand } = splitFirstToken(normalized);
  const commandDef = commands[command];

  if (!commandDef) {
    return {
      raw: normalized,
      command: "",
      subcommand: "",
      query: normalized,
      isKnownCommand: false,
    };
  }

  const { token: possibleSubcommand, rest: afterSubcommand } =
    splitFirstToken(afterCommand);

  if (possibleSubcommand && possibleSubcommand in commandDef.subcommands) {
    return {
      raw: normalized,
      command,
      subcommand: possibleSubcommand,
      query: afterSubcommand,
      isKnownCommand: true,
    };
  }

  return {
    raw: normalized,
    command,
    subcommand: "",
    query: afterCommand,
    isKnownCommand: true,
  };
}

export function formatHistoryEntry(entry: HistoryEntry): string {
  return [entry.command, entry.subcommand, entry.query]
    .filter(Boolean)
    .join(" ");
}

export function getAutocompleteSuggestions(raw: string): string[] {
  const trimmedStart = raw.trimStart();

  if (!trimmedStart) {
    return commandList.slice().sort((a, b) => a.localeCompare(b));
  }

  const hasTrailingSpace = /\s$/.test(trimmedStart);
  const tokens = trimmedStart.split(/\s+/).filter((token) => token.length > 0);

  if (tokens.length === 1 && !hasTrailingSpace) {
    const query = tokens[0].toLowerCase();
    return commandList
      .filter((name) => name.toLowerCase().startsWith(query))
      .sort((a, b) => a.localeCompare(b));
  }

  const command = tokens[0];
  const commandDef = commands[command];

  if (!commandDef) {
    return [];
  }

  const subcommands = Object.keys(commandDef.subcommands);

  if (subcommands.length === 0) {
    return [];
  }

  const subcommandToken = hasTrailingSpace ? "" : (tokens[1] ?? "");

  const needle = subcommandToken.toLowerCase();

  if (tokens.length > 2 || (tokens.length === 2 && hasTrailingSpace)) {
    if (
      command === "category" &&
      (tokens[1] === "edit" || tokens[1] === "rm")
    ) {
      const categoryStore = useCategoryStore(pinia);
      const categoryNames = Object.keys(categoryStore.categories).sort((a, b) =>
        a.localeCompare(b),
      );

      if (tokens.length === 2 && hasTrailingSpace) {
        return categoryNames;
      }

      const partial = tokens[2] ?? "";
      return categoryNames.filter((name) =>
        name.toLowerCase().startsWith(partial.toLowerCase()),
      );
    }

    if (command === "link" && (tokens[1] === "edit" || tokens[1] === "rm")) {
      const categoryStore = useCategoryStore(pinia);
      const categoryNames = Object.keys(categoryStore.categories).sort((a, b) =>
        a.localeCompare(b),
      );

      if (tokens.length === 2 && hasTrailingSpace) {
        return categoryNames;
      }

      if (tokens.length === 3 && !hasTrailingSpace) {
        const partialCategory = tokens[2] ?? "";
        return categoryNames.filter((name) =>
          name.toLowerCase().startsWith(partialCategory.toLowerCase()),
        );
      }

      const category = tokens[2] ?? "";
      const links = categoryStore.categories[category]?.links;

      if (!links) {
        return [];
      }

      const titles = Object.keys(links).sort((a, b) => a.localeCompare(b));

      if (tokens.length === 3 && hasTrailingSpace) {
        return titles;
      }

      const partialTitle = hasTrailingSpace ? "" : tokens.slice(3).join(" ");

      return titles.filter((title) =>
        title.toLowerCase().startsWith(partialTitle.toLowerCase()),
      );
    }

    return [];
  }

  return subcommands
    .filter((name) => name.toLowerCase().startsWith(needle))
    .sort((a, b) => a.localeCompare(b));
}

export function applySuggestion(raw: string, suggestion: string): string {
  const trimmedStart = raw.trimStart();

  if (!trimmedStart) {
    return `${suggestion} `;
  }

  const hasTrailingSpace = /\s$/.test(trimmedStart);
  const tokens = trimmedStart.split(/\s+/).filter((token) => token.length > 0);

  if (tokens.length <= 1 && !hasTrailingSpace) {
    return `${suggestion} `;
  }

  if (tokens.length === 1 && hasTrailingSpace) {
    return `${tokens[0]} ${suggestion} `;
  }

  if (tokens.length === 2 && !hasTrailingSpace) {
    return `${tokens[0]} ${suggestion} `;
  }

  if (tokens[0] === "category" && tokens[1] === "edit") {
    if (tokens.length === 2 && hasTrailingSpace) {
      return `category edit ${suggestion}`;
    }

    if (tokens.length >= 3) {
      return `category edit ${suggestion}`;
    }
  }

  if (tokens[0] === "category" && tokens[1] === "rm") {
    if (tokens.length === 2 && hasTrailingSpace) {
      return `category rm ${suggestion}`;
    }

    if (tokens.length >= 3) {
      return `category rm ${suggestion}`;
    }
  }

  if (tokens[0] === "link" && tokens[1] === "edit") {
    if (tokens.length === 2 && hasTrailingSpace) {
      return `link edit ${suggestion} `;
    }

    if (tokens.length === 3 && !hasTrailingSpace) {
      return `link edit ${suggestion} `;
    }

    if (tokens.length >= 3) {
      const category = tokens[2] ?? "";

      if (!category) {
        return raw;
      }

      return `link edit ${category} ${suggestion}`;
    }
  }

  if (tokens[0] === "link" && tokens[1] === "rm") {
    if (tokens.length === 2 && hasTrailingSpace) {
      return `link rm ${suggestion} `;
    }

    if (tokens.length === 3 && !hasTrailingSpace) {
      return `link rm ${suggestion} `;
    }

    if (tokens.length >= 3) {
      const category = tokens[2] ?? "";

      if (!category) {
        return raw;
      }

      return `link rm ${category} ${suggestion}`;
    }
  }

  return raw;
}

export function processCommand(
  command: string,
  subcommand: string,
  input: string,
) {
  const store = useTerminalStore(pinia);

  if (commandList.includes(command)) {
    store.addCommand(command, subcommand, input);
    commands[command].action(input, subcommand);
  }
}

export function processRawInput(raw: string) {
  const parsed = parseInput(raw);

  if (!parsed.raw) {
    return;
  }

  if (parsed.isKnownCommand && parsed.command) {
    processCommand(parsed.command, parsed.subcommand, parsed.query);
    return;
  }

  const maybeHttp = parsed.query.trim();

  if (maybeHttp.startsWith("http://") || maybeHttp.startsWith("https://")) {
    const store = useTerminalStore(pinia);

    try {
      const directUrl = new URL(maybeHttp);

      if (directUrl.protocol === "http:" || directUrl.protocol === "https:") {
        store.addCommand("jump", "", directUrl.toString());
        window.location.href = directUrl.toString();
        return;
      }
    } catch {
      try {
        const encodedUrl = new URL(encodeURI(maybeHttp));

        if (
          encodedUrl.protocol === "http:" ||
          encodedUrl.protocol === "https:"
        ) {
          store.addCommand("jump", "", encodedUrl.toString());
          window.location.href = encodedUrl.toString();
          return;
        }
      } catch {
        // fall through to search fallback
      }
    }
  }

  const settingsStore = useSettingsStore(pinia);
  const store = useTerminalStore(pinia);
  const fallback =
    settingsStore.searchEngine in commands
      ? settingsStore.searchEngine
      : "google";

  store.addCommand(fallback, "", parsed.query);
  commands[fallback].action(parsed.query, "");
}
