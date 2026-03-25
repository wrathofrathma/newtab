import { pinia } from "../../store";
import { useSettingsStore } from "../../store/settings";
import { isThemeId, themes, type ThemeId } from "../../theme/themes";

const subcommands = Object.fromEntries(
  Object.entries(themes).map(([themeId, theme]) => {
    return [
      themeId,
      {
        action: () => {
          const settingsStore = useSettingsStore(pinia);
          settingsStore.setTheme(themeId as ThemeId);
        },
        description: `Switch to ${theme.label}`,
      },
    ];
  }),
);

export default {
  action: (query: string, subcommand: string = "") => {
    const settingsStore = useSettingsStore(pinia);

    if (subcommand && subcommand in subcommands) {
      subcommands[subcommand].action();
      return;
    }

    const candidate = query.trim();

    if (isThemeId(candidate)) {
      settingsStore.setTheme(candidate);
    }
  },
  description: "Set the active theme",
  subcommands,
};
