import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("duckduckgo", query);
  },
  description: "DuckDuckGo search engine",
  subcommands: {},
};
