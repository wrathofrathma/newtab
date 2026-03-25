import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("imdb", query);
  },
  description: "Search IMDb",
  subcommands: {},
};
