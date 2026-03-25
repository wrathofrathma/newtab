import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("ebay", query);
  },
  description: "Search eBay",
  subcommands: {},
};
