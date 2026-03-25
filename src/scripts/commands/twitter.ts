import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("twitter", query);
  },
  description: "Search Twitter/X",
  subcommands: {},
};
