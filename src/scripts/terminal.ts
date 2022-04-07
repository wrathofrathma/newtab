import { ref } from "vue";
import { pinia } from "../store";
import { useTerminalStore } from "../store/terminal";
import google from "./commands/google";
import duckduckgo from "./commands/duckduckgo";
import youtube from "./commands/youtube";
import amazon from "./commands/amazon";
import category from "./commands/category";
import link from "./commands/link";
import importCommand from "./commands/import";
import exportCommand from "./commands/export";
import reddit from "./commands/reddit";
import ps1 from "./commands/ps1";
import history from "./commands/history";
import jump from "./commands/jump";

// TODO Should we just make a command class? How can we enforce this structure.
export type Command = {
  action: (query: string, subcomand: string) => void;
  description: string;
  subcommands: {
    [key: string]: {
      action: (query: string) => void;
      description: string;
    };
  };
};

export const commands: { [key: string]: Command } = {
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
  go: jump,
  // TODO make a default command setting
  // TODO make a play command to handle youtube / lofi beats
  // TODO Consider alias command. It'd require another rewrite of how commands are handled...
};

export const commandList = Object.keys(commands);

export function parseCommand() {
  const store = useTerminalStore(pinia);
  // Detection rules
  // Everything before the first space is the command (or argument to default command)
  // Attempt to match the command against
  // - Everything before space
  // - command value(if matched) + everything before space in the query if no space was entered.

  // This should split the string into ['google', 'hello', 'world'] style arrays. The filter removes empty strings from consecutive or leading spaces.
  const split = store.query.split(" ").filter((item) => item);

  // If store.command has a value & the next value is not a space, we need to check if it's part of a longer command name.
  if (store.command && store.query.length > 0 && store.query[0] !== " ") {
    // Are we extending a subcommand?
    if (store.subcommand) {
      store.query = " " + store.subcommand + store.query;
      store.subcommand = "";
    } else {
      store.query = store.command + store.query;
      store.command = "";
    }
  }
  // If store.command does not have a value, we should trim the whitespace at the beginning and check everything before the first space
  else if (!store.command && commandList.includes(split[0])) {
    // Let's set the query to everything after the command. We can ignore duplicate whitespaces by using our split from earlier, slicing & joining the array.
    var q = split.slice(1); // Everything after the command

    // If there is a follow up word, we know there was a space, so we should add it back in.
    store.query = q.length > 0 ? " " + q.join(" ") : q.join(" ");

    store.command = split[0];
  }

  // We should attempt to parse subcommands if we have value in command
  if (store.command) {
    parseSubcommand();
  }
}

function parseSubcommand() {
  const store = useTerminalStore(pinia);
  // Fetch subcommand list from the given command.
  const subcommandList = Object.keys(commands[store.command].subcommands);

  // This should split the string into ['google', 'hello', 'world'] style arrays. The filter removes empty strings from consecutive or leading spaces.
  const split = store.query.split(" ").filter((item) => item);

  // If store.subcommand has a value & the next value is not a space, we need to check if it's part of a longer subcommand name.
  if (store.subcommand && store.query.length > 0 && store.query[0] !== " ") {
    // If the first thing isn't a space, then we should continue attemping to match.
    store.query = store.subcommand + store.query;
    store.subcommand = "";
  }
  // If store.subcommand does not have a value, we should trim the whitespace at the beginning and check everything before the first space
  else if (subcommandList.includes(split[0])) {
    // Let's set the query to everything after the command. We can ignore duplicate whitespaces by using our split from earlier, slicing & joining the array.
    var q = split.slice(1); // Everything after the command

    // If there is a follow up word, we know there was a space, so we should add it back in.
    store.query = q.length > 0 ? " " + q.join(" ") : q.join(" ");

    store.subcommand = split[0];
  }
}

export function processCommand(
  command: string,
  subcommand: string,
  input: string
) {
  // If the command is in our command list, then we'll use that. Otherwise default search
  if (commandList.includes(command)) {
    // Add command to history
    const store = useTerminalStore(pinia);
    store.addCommand(command, subcommand, input);

    // Execute command
    commands[command].action(input, subcommand);
  }
}
