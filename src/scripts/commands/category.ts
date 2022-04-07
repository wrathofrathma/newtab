import { useCategoryStore } from "../../store/category";
import pinia from "../../store";

const store = useCategoryStore(pinia);

const subcommands = {
  add: {
    action: (query: string) => {
      const split = query.split(" ");
      const category = split[0];
      const link = split.length > 1 ? split[1] : "";

      store.addCategory(category, link);
    },
    description: "Adds a category of links",
  },
  rm: {
    action: (category: string) => {
      store.removeCategory(category);
    },
    description: "Removes a category of links",
  },
};

export default {
  action: (query: string, subcommand: string = "") => {
    const split = query.split(" ");

    if (!subcommand) {
      return;
    }

    if (subcommand in subcommands) {
      subcommands[subcommand].action(query);
    }
  },
  description: "Modifies the categories of links",
  subcommands,
};
