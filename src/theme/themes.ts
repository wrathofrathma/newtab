type ThemeId =
  | "gruvbox-dark"
  | "gruvbox-light"
  | "ayu-dark"
  | "ayu-light"
  | "dracula"
  | "horizon"
  | "zenburn"
  | "molokai"
  | "catppuccin-latte"
  | "catppuccin-frappe"
  | "catppuccin-macchiato"
  | "catppuccin-mocha";

const themes: Record<ThemeId, ThemeDefinition> = {
  "gruvbox-dark": {
    id: "gruvbox-dark",
    label: "Gruvbox Dark",
    tokens: {
      surface: {
        canvas: "#282828",
        canvasStrong: "#1d2021",
        panel: "#3c3836",
        panelMuted: "#32302f",
        panelStrong: "#504945",
        panelSubtle: "#665c54",
        border: "#504945",
        borderStrong: "#7c6f64",
      },
      text: {
        primary: "#ebdbb2",
        secondary: "#d5c4a1",
        muted: "#bdae93",
        subtle: "#a89984",
        inverse: "#fbf1c7",
      },
      accent: {
        red: "#cc241d",
        redBright: "#fb4934",
        green: "#98971a",
        greenBright: "#b8bb26",
        yellow: "#d79921",
        yellowBright: "#fabd2f",
        blue: "#458588",
        blueBright: "#83a598",
        blueMuted: "#8f9191",
        purple: "#b16286",
        purpleBright: "#d3869b",
        aqua: "#689d6a",
        aquaBright: "#8ec07c",
        orange: "#d65d0e",
        orangeBright: "#fe8019",
        gray: "#928374",
        grayBright: "#a89984",
      },
    },
  },
  "gruvbox-light": {
    id: "gruvbox-light",
    label: "Gruvbox Light",
    tokens: {
      surface: {
        canvas: "#fbf1c7",
        canvasStrong: "#f2e5bc",
        panel: "#ebdbb2",
        panelMuted: "#f2e5bc",
        panelStrong: "#d5c4a1",
        panelSubtle: "#bdae93",
        border: "#d5c4a1",
        borderStrong: "#a89984",
      },
      text: {
        primary: "#3c3836",
        secondary: "#504945",
        muted: "#665c54",
        subtle: "#7c6f64",
        inverse: "#282828",
      },
      accent: {
        red: "#9d0006",
        redBright: "#cc241d",
        green: "#79740e",
        greenBright: "#98971a",
        yellow: "#b57614",
        yellowBright: "#d79921",
        blue: "#076678",
        blueBright: "#458588",
        blueMuted: "#7c6f64",
        purple: "#8f3f71",
        purpleBright: "#b16286",
        aqua: "#427b58",
        aquaBright: "#689d6a",
        orange: "#af3a03",
        orangeBright: "#d65d0e",
        gray: "#928374",
        grayBright: "#a89984",
      },
    },
  },
  "ayu-dark": {
    id: "ayu-dark",
    label: "Ayu Dark",
    tokens: {
      surface: {
        canvas: "#0f1419",
        canvasStrong: "#0b0e14",
        panel: "#1b232c",
        panelMuted: "#131721",
        panelStrong: "#253340",
        panelSubtle: "#384657",
        border: "#253340",
        borderStrong: "#3e4b59",
      },
      text: {
        primary: "#bfbdb6",
        secondary: "#a6accd",
        muted: "#7f8798",
        subtle: "#6c7380",
        inverse: "#f3f4f5",
      },
      accent: {
        red: "#f07178",
        redBright: "#ff8f9a",
        green: "#b8cc52",
        greenBright: "#d2e67a",
        yellow: "#e6b450",
        yellowBright: "#ffcc66",
        blue: "#59c2ff",
        blueBright: "#73d0ff",
        blueMuted: "#95e6cb",
        purple: "#d2a6ff",
        purpleBright: "#e6c3ff",
        aqua: "#95e6cb",
        aquaBright: "#b8f7df",
        orange: "#ff8f40",
        orangeBright: "#ffad66",
        gray: "#6c7380",
        grayBright: "#8a9199",
      },
    },
  },
  "ayu-light": {
    id: "ayu-light",
    label: "Ayu Light",
    tokens: {
      surface: {
        canvas: "#fafafa",
        canvasStrong: "#f3f4f5",
        panel: "#e6e6e6",
        panelMuted: "#f0f0f0",
        panelStrong: "#d9d8d7",
        panelSubtle: "#cccccc",
        border: "#d9d8d7",
        borderStrong: "#b8b7b6",
      },
      text: {
        primary: "#5c6166",
        secondary: "#4f5559",
        muted: "#6c7680",
        subtle: "#8a9199",
        inverse: "#1f2430",
      },
      accent: {
        red: "#f51818",
        redBright: "#ff3333",
        green: "#86b300",
        greenBright: "#9fcc1a",
        yellow: "#f2ae49",
        yellowBright: "#ffbf5c",
        blue: "#399ee6",
        blueBright: "#4ab0f5",
        blueMuted: "#4cbf99",
        purple: "#a37acc",
        purpleBright: "#ba8ee6",
        aqua: "#4cbf99",
        aquaBright: "#62d9b1",
        orange: "#fa8d3e",
        orangeBright: "#ffa357",
        gray: "#8a9199",
        grayBright: "#a0a6ac",
      },
    },
  },
  dracula: {
    id: "dracula",
    label: "Dracula",
    tokens: {
      surface: {
        canvas: "#282a36",
        canvasStrong: "#21222c",
        panel: "#343746",
        panelMuted: "#2b2d3a",
        panelStrong: "#44475a",
        panelSubtle: "#585b70",
        border: "#44475a",
        borderStrong: "#6272a4",
      },
      text: {
        primary: "#f8f8f2",
        secondary: "#e2e2dc",
        muted: "#bfbfc8",
        subtle: "#9ca0b8",
        inverse: "#ffffff",
      },
      accent: {
        red: "#ff5555",
        redBright: "#ff6e6e",
        green: "#50fa7b",
        greenBright: "#7af79a",
        yellow: "#f1fa8c",
        yellowBright: "#fcffb5",
        blue: "#8be9fd",
        blueBright: "#b4f0ff",
        blueMuted: "#80dfff",
        purple: "#bd93f9",
        purpleBright: "#d2b2ff",
        aqua: "#8be9fd",
        aquaBright: "#b4f0ff",
        orange: "#ffb86c",
        orangeBright: "#ffc88d",
        gray: "#6272a4",
        grayBright: "#7b89b8",
      },
    },
  },
  horizon: {
    id: "horizon",
    label: "Horizon",
    tokens: {
      surface: {
        canvas: "#1c1e26",
        canvasStrong: "#16161c",
        panel: "#232530",
        panelMuted: "#1f212b",
        panelStrong: "#2e303e",
        panelSubtle: "#3f4151",
        border: "#2e303e",
        borderStrong: "#6f6f8c",
      },
      text: {
        primary: "#d5c1ac",
        secondary: "#c4b0a0",
        muted: "#9da0b8",
        subtle: "#7f8198",
        inverse: "#f0e9dd",
      },
      accent: {
        red: "#e95678",
        redBright: "#ff6f91",
        green: "#29d398",
        greenBright: "#45e0ab",
        yellow: "#fab795",
        yellowBright: "#ffd0b5",
        blue: "#26bbd9",
        blueBright: "#5ccfe6",
        blueMuted: "#59e1e3",
        purple: "#ee64ac",
        purpleBright: "#ff82c3",
        aqua: "#59e1e3",
        aquaBright: "#87f4f5",
        orange: "#f09383",
        orangeBright: "#ffad9f",
        gray: "#6f6f8c",
        grayBright: "#9da0b8",
      },
    },
  },
  zenburn: {
    id: "zenburn",
    label: "Zenburn",
    tokens: {
      surface: {
        canvas: "#3f3f3f",
        canvasStrong: "#383838",
        panel: "#4f4f4f",
        panelMuted: "#444444",
        panelStrong: "#5f5f5f",
        panelSubtle: "#6f6f6f",
        border: "#5f5f5f",
        borderStrong: "#7f7f7f",
      },
      text: {
        primary: "#dcdccc",
        secondary: "#c0c0a0",
        muted: "#a0a08b",
        subtle: "#8f8f8f",
        inverse: "#ffffef",
      },
      accent: {
        red: "#cc9393",
        redBright: "#dca3a3",
        green: "#7f9f7f",
        greenBright: "#8fb28f",
        yellow: "#f0dfaf",
        yellowBright: "#f5e7bf",
        blue: "#6ca0a3",
        blueBright: "#8cd0d3",
        blueMuted: "#93b3a3",
        purple: "#dc8cc3",
        purpleBright: "#ec9cd3",
        aqua: "#93e0e3",
        aquaBright: "#a3f0f3",
        orange: "#dfaf8f",
        orangeBright: "#efbf9f",
        gray: "#7f8f8f",
        grayBright: "#9fafaf",
      },
    },
  },
  molokai: {
    id: "molokai",
    label: "Molokai",
    tokens: {
      surface: {
        canvas: "#272822",
        canvasStrong: "#1e1f1c",
        panel: "#3a3b36",
        panelMuted: "#2d2e29",
        panelStrong: "#49483e",
        panelSubtle: "#5b5a4f",
        border: "#49483e",
        borderStrong: "#75715e",
      },
      text: {
        primary: "#f8f8f2",
        secondary: "#e6e6dc",
        muted: "#cfcfbf",
        subtle: "#a8a899",
        inverse: "#ffffff",
      },
      accent: {
        red: "#f92672",
        redBright: "#ff4d8d",
        green: "#a6e22e",
        greenBright: "#b8f05a",
        yellow: "#e6db74",
        yellowBright: "#fff08a",
        blue: "#66d9ef",
        blueBright: "#8be9fd",
        blueMuted: "#78dce8",
        purple: "#ae81ff",
        purpleBright: "#c4a1ff",
        aqua: "#78dce8",
        aquaBright: "#a7f3ff",
        orange: "#fd971f",
        orangeBright: "#ffb86c",
        gray: "#75715e",
        grayBright: "#a59f85",
      },
    },
  },
  "catppuccin-latte": {
    id: "catppuccin-latte",
    label: "Catppuccin Latte",
    tokens: {
      surface: {
        canvas: "#eff1f5",
        canvasStrong: "#e6e9ef",
        panel: "#ccd0da",
        panelMuted: "#dce0e8",
        panelStrong: "#bcc0cc",
        panelSubtle: "#acb0be",
        border: "#bcc0cc",
        borderStrong: "#9ca0b0",
      },
      text: {
        primary: "#4c4f69",
        secondary: "#5c5f77",
        muted: "#6c6f85",
        subtle: "#7c7f93",
        inverse: "#1e1e2e",
      },
      accent: {
        red: "#d20f39",
        redBright: "#e64553",
        green: "#40a02b",
        greenBright: "#179299",
        yellow: "#df8e1d",
        yellowBright: "#fe640b",
        blue: "#1e66f5",
        blueBright: "#7287fd",
        blueMuted: "#209fb5",
        purple: "#8839ef",
        purpleBright: "#ea76cb",
        aqua: "#179299",
        aquaBright: "#04a5e5",
        orange: "#fe640b",
        orangeBright: "#dc8a78",
        gray: "#7c7f93",
        grayBright: "#8c8fa1",
      },
    },
  },
  "catppuccin-frappe": {
    id: "catppuccin-frappe",
    label: "Catppuccin Frappe",
    tokens: {
      surface: {
        canvas: "#303446",
        canvasStrong: "#292c3c",
        panel: "#414559",
        panelMuted: "#353a4f",
        panelStrong: "#51576d",
        panelSubtle: "#626880",
        border: "#51576d",
        borderStrong: "#737994",
      },
      text: {
        primary: "#c6d0f5",
        secondary: "#b5bfe2",
        muted: "#a5adce",
        subtle: "#949cbb",
        inverse: "#f2d5cf",
      },
      accent: {
        red: "#e78284",
        redBright: "#ea999c",
        green: "#a6d189",
        greenBright: "#85c1dc",
        yellow: "#e5c890",
        yellowBright: "#ef9f76",
        blue: "#8caaee",
        blueBright: "#babbf1",
        blueMuted: "#81c8be",
        purple: "#ca9ee6",
        purpleBright: "#f4b8e4",
        aqua: "#81c8be",
        aquaBright: "#99d1db",
        orange: "#ef9f76",
        orangeBright: "#f2d5cf",
        gray: "#838ba7",
        grayBright: "#949cbb",
      },
    },
  },
  "catppuccin-macchiato": {
    id: "catppuccin-macchiato",
    label: "Catppuccin Macchiato",
    tokens: {
      surface: {
        canvas: "#24273a",
        canvasStrong: "#1e2030",
        panel: "#363a4f",
        panelMuted: "#2b3042",
        panelStrong: "#494d64",
        panelSubtle: "#5b6078",
        border: "#494d64",
        borderStrong: "#6e738d",
      },
      text: {
        primary: "#cad3f5",
        secondary: "#b8c0e0",
        muted: "#a5adcb",
        subtle: "#939ab7",
        inverse: "#f4dbd6",
      },
      accent: {
        red: "#ed8796",
        redBright: "#ee99a0",
        green: "#a6da95",
        greenBright: "#7dc4e4",
        yellow: "#eed49f",
        yellowBright: "#f5a97f",
        blue: "#8aadf4",
        blueBright: "#b7bdf8",
        blueMuted: "#8bd5ca",
        purple: "#c6a0f6",
        purpleBright: "#f5bde6",
        aqua: "#8bd5ca",
        aquaBright: "#91d7e3",
        orange: "#f5a97f",
        orangeBright: "#f4dbd6",
        gray: "#8087a2",
        grayBright: "#939ab7",
      },
    },
  },
  "catppuccin-mocha": {
    id: "catppuccin-mocha",
    label: "Catppuccin Mocha",
    tokens: {
      surface: {
        canvas: "#1e1e2e",
        canvasStrong: "#11111b",
        panel: "#313244",
        panelMuted: "#1f2130",
        panelStrong: "#45475a",
        panelSubtle: "#585b70",
        border: "#45475a",
        borderStrong: "#6c7086",
      },
      text: {
        primary: "#cdd6f4",
        secondary: "#bac2de",
        muted: "#a6adc8",
        subtle: "#9399b2",
        inverse: "#f5e0dc",
      },
      accent: {
        red: "#f38ba8",
        redBright: "#eba0ac",
        green: "#a6e3a1",
        greenBright: "#74c7ec",
        yellow: "#f9e2af",
        yellowBright: "#fab387",
        blue: "#89b4fa",
        blueBright: "#b4befe",
        blueMuted: "#94e2d5",
        purple: "#cba6f7",
        purpleBright: "#f5c2e7",
        aqua: "#94e2d5",
        aquaBright: "#89dceb",
        orange: "#fab387",
        orangeBright: "#f2cdcd",
        gray: "#7f849c",
        grayBright: "#9399b2",
      },
    },
  },
};

type ThemeTokens = {
  surface: {
    canvas: string;
    canvasStrong: string;
    panel: string;
    panelMuted: string;
    panelStrong: string;
    panelSubtle: string;
    border: string;
    borderStrong: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    subtle: string;
    inverse: string;
  };
  accent: {
    red: string;
    redBright: string;
    green: string;
    greenBright: string;
    yellow: string;
    yellowBright: string;
    blue: string;
    blueBright: string;
    blueMuted: string;
    purple: string;
    purpleBright: string;
    aqua: string;
    aquaBright: string;
    orange: string;
    orangeBright: string;
    gray: string;
    grayBright: string;
  };
};

type ThemeDefinition = {
  id: ThemeId;
  label: string;
  tokens: ThemeTokens;
};

function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && value in themes;
}

function parseThemeId(value: unknown): ThemeId {
  return isThemeId(value) ? value : "gruvbox-dark";
}

function getThemeById(themeId: ThemeId): ThemeDefinition {
  return themes[themeId];
}

function toCssVariables(tokens: ThemeTokens): Record<string, string> {
  return {
    "--nt-font-family": '"Fira Code", monospace',
    "--nt-surface-canvas": tokens.surface.canvas,
    "--nt-surface-canvas-strong": tokens.surface.canvasStrong,
    "--nt-surface-panel": tokens.surface.panel,
    "--nt-surface-panel-muted": tokens.surface.panelMuted,
    "--nt-surface-panel-strong": tokens.surface.panelStrong,
    "--nt-surface-panel-subtle": tokens.surface.panelSubtle,
    "--nt-surface-border": tokens.surface.border,
    "--nt-surface-border-strong": tokens.surface.borderStrong,
    "--nt-text-primary": tokens.text.primary,
    "--nt-text-secondary": tokens.text.secondary,
    "--nt-text-muted": tokens.text.muted,
    "--nt-text-subtle": tokens.text.subtle,
    "--nt-text-inverse": tokens.text.inverse,
    "--nt-accent-red": tokens.accent.red,
    "--nt-accent-red-bright": tokens.accent.redBright,
    "--nt-accent-green": tokens.accent.green,
    "--nt-accent-green-bright": tokens.accent.greenBright,
    "--nt-accent-yellow": tokens.accent.yellow,
    "--nt-accent-yellow-bright": tokens.accent.yellowBright,
    "--nt-accent-blue": tokens.accent.blue,
    "--nt-accent-blue-bright": tokens.accent.blueBright,
    "--nt-accent-blue-muted": tokens.accent.blueMuted,
    "--nt-accent-purple": tokens.accent.purple,
    "--nt-accent-purple-bright": tokens.accent.purpleBright,
    "--nt-accent-aqua": tokens.accent.aqua,
    "--nt-accent-aqua-bright": tokens.accent.aquaBright,
    "--nt-accent-orange": tokens.accent.orange,
    "--nt-accent-orange-bright": tokens.accent.orangeBright,
    "--nt-accent-gray": tokens.accent.gray,
    "--nt-accent-gray-bright": tokens.accent.grayBright,
    "--color-gruvbox-dark-bg-0": tokens.surface.canvas,
    "--color-gruvbox-dark-bg-1": tokens.surface.panel,
    "--color-gruvbox-dark-bg-2": tokens.surface.panelStrong,
    "--color-gruvbox-dark-bg-3": tokens.surface.panelSubtle,
    "--color-gruvbox-dark-bg-4": tokens.surface.borderStrong,
    "--color-gruvbox-dark-bg-h": tokens.surface.canvasStrong,
    "--color-gruvbox-dark-bg-s": tokens.surface.panelMuted,
    "--color-gruvbox-dark-fg-0": tokens.text.inverse,
    "--color-gruvbox-dark-fg-1": tokens.text.primary,
    "--color-gruvbox-dark-fg-2": tokens.text.secondary,
    "--color-gruvbox-dark-fg-3": tokens.text.muted,
    "--color-gruvbox-dark-fg-4": tokens.text.subtle,
    "--color-gruvbox-dark-red-0": tokens.accent.red,
    "--color-gruvbox-dark-red-1": tokens.accent.redBright,
    "--color-gruvbox-dark-green-0": tokens.accent.green,
    "--color-gruvbox-dark-green-1": tokens.accent.greenBright,
    "--color-gruvbox-dark-yellow-0": tokens.accent.yellow,
    "--color-gruvbox-dark-yellow-1": tokens.accent.yellowBright,
    "--color-gruvbox-dark-blue-0": tokens.accent.blue,
    "--color-gruvbox-dark-blue-1": tokens.accent.blueBright,
    "--color-gruvbox-dark-blue-2": tokens.accent.blueMuted,
    "--color-gruvbox-dark-purple-0": tokens.accent.purple,
    "--color-gruvbox-dark-purple-1": tokens.accent.purpleBright,
    "--color-gruvbox-dark-aqua-0": tokens.accent.aqua,
    "--color-gruvbox-dark-aqua-1": tokens.accent.aquaBright,
    "--color-gruvbox-dark-gray-0": tokens.accent.grayBright,
    "--color-gruvbox-dark-gray-1": tokens.accent.gray,
    "--color-gruvbox-dark-orange-0": tokens.accent.orange,
    "--color-gruvbox-dark-orange-1": tokens.accent.orangeBright,
  };
}

export { getThemeById, isThemeId, parseThemeId, toCssVariables, themes };
export type { ThemeDefinition, ThemeId, ThemeTokens };
