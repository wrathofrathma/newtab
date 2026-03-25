import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("urbandictionary", query);
  },
  description: "Search Urban Dictionary",
  subcommands: {},
};
