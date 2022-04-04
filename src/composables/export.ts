import { useCategoryStore } from "../store/category";
import pinia from "../store";

const store = useCategoryStore(pinia);

export default {
  action: (query: string) => {
    const content = JSON.stringify(pinia.state.value);
    const file = new File([content], "settings.json", {
      type: "application/json",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.setAttribute("download", "settings.json");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
  description: "Exports your settings to a JSON file",
  subcommands: {},
};
