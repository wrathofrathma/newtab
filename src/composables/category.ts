import { useCategoryStore } from "../store/category";
import pinia from "../store";

const store = useCategoryStore(pinia);

const subcommands = {
  add: {
    action: (query: string) => {
      // store.addCategory(query);
    },
    description: "Adds a category of links",
  },
};

export default {
  action: (query: string) => {
    const split = query.split(" ");
    // If there are less than two, we don't have a subcommand + proper query
    if (split.length < 2) {
      return;
    }

    const subcommand = split[0];
    const q = query.substring(subcommand.length + 1);

    if (subcommand in subcommands) {
      subcommands[subcommand].action(q);
    }
  },
  description: "Modifies the categories of links",
  subcommands,
};
