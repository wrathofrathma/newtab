import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("github", query);
  },
  description: "Search GitHub",
  subcommands: {},
};
