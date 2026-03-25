import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("youtube", query);
  },
  description: "Search Youtube",
  subcommands: {},
};
