import { exportSettings } from "../../composables/settings";

export default {
  action: (query: string, subcommand: string = "") => {
    exportSettings();
  },
  description: "Exports your settings to a JSON file",
  subcommands: {},
};
