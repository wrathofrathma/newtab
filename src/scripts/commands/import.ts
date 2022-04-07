import { useCategoryStore } from "../../store/category";
import pinia from "../../store";

const store = useCategoryStore(pinia);

export default {
  action: (query: string) => {},
  description: "Imports your settings from a JSON file",
  subcommands: {},
};
