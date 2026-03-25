import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("chatgpt", query);
  },
  description: "Open ChatGPT with a prompt",
  subcommands: {},
};
