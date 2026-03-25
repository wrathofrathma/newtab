import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("stackoverflow", query);
  },
  description: "Search Stack Overflow",
  subcommands: {},
};
