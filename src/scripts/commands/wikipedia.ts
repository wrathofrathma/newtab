import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("wikipedia", query);
  },
  description: "Search Wikipedia",
  subcommands: {},
};
