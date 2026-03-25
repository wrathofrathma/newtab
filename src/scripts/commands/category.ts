import { useCategoryStore } from "../../store/category";
import pinia from "../../store";
import { useUiStore } from "../../store/ui";

const store = useCategoryStore(pinia);
const uiStore = useUiStore(pinia);

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
  edit: {
    action: (query: string) => {
      const name = query.trim();

      if (!name || !(name in store.categories)) {
        return;
      }

      uiStore.openCategoryEdit({ name });
    },
    description: "Opens category rename modal",
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
