import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("amazon", query);
  },
  description: "Search Amazon",
  subcommands: {},
};
