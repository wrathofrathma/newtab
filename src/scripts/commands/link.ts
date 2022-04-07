import { useCategoryStore } from "../../store/category";
import pinia from "../../store";

const store = useCategoryStore(pinia);

const subcommands = {
  add: {
    action: (query: string) => {
      const split = query.split(" ");
      // If we don't have at least 3, it won't work
      if (split.length < 3) {
        return;
      }

      // Category is the first part.
      const category = split[0];
      // Links can't have spaces, so it'll be the last word
      const link = split[split.length - 1];
      // The title is everything starting from after the category, to just before the link
      const title = query.substring(
        category.length + 1,
        query.length - link.length - 1
      );

      store.addLink(category, title, link);
    },
    description: "Adds a link to a category",
  },
  rm: {
    action: (query: string) => {
      // link remove category_name link_name
      const split = query.split(" ");

      if (split.length < 2) {
        return;
      }

      // Category is the first part.
      const category = split[0];

      // The rest is the title
      const title = query.substring(category.length + 1);

      store.removeLink(category, title);
    },
    description: "Removes a link from a category",
  },
};

export default {
  action: (query: string, subcommand: string) => {
    const split = query.split(" ");

    if (!subcommand) {
      return;
    }

    if (subcommand in subcommands) {
      subcommands[subcommand].action(query);
    }
  },
  description: "Modifies the links in a category.",
  subcommands,
};
