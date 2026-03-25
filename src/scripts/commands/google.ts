import { openSearchTarget } from "./search";

export default {
  action: (query: string, subcommand: string = "") => {
    openSearchTarget("google", query);
  },
  description: "Google search engine",
  subcommands: {},
};
