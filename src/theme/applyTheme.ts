import {
  getThemeById,
  parseThemeId,
  toCssVariables,
  type ThemeId,
} from "./themes";

function applyTheme(themeId: ThemeId): void {
  const theme = getThemeById(themeId);
  const variables = toCssVariables(theme.tokens);

  document.documentElement.dataset.theme = theme.id;

  Object.entries(variables).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
}

function applyThemeFromUnknown(value: unknown): ThemeId {
  const themeId = parseThemeId(value);
  applyTheme(themeId);
  return themeId;
}

export { applyTheme, applyThemeFromUnknown };
