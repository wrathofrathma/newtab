module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: "Fira Code",
      colors: {
        "gruvbox-dark": {
          bg: {
            0: "#282828",
            1: "#3c3836",
            2: "#504945",
            3: "#665c54",
            4: "#7c6f64",
            h: "#1d2021",
            s: "#32302f",
          },
          fg: {
            0: "#fbf1c7",
            1: "#ebdbb2",
            2: "#d5c4a1",
            3: "#bdae93",
            4: "#a89984",
          },
          red: {
            0: "#cc241d",
            1: "#fb4934",
          },
          green: {
            0: "#98971a",
            1: "#b8bb26",
          },
          yellow: {
            0: "#d79921",
            1: "#fabd2f",
          },
          blue: {
            0: "#458588",
            1: "#83a598",
            2: "#8f9191",
          },
          purple: {
            0: "#b16286",
            1: "#d3869b",
          },
          aqua: {
            0: "#689d6a",
            1: "#8ec07c",
          },
          gray: {
            0: "#a89984",
            1: "#928374",
          },
          aqua: {
            0: "#689d6a",
            1: "#8ec07c",
          },
          orange: {
            0: "#d65d0e",
            1: "#fe8019",
          },
        },
      },
    },
  },
  plugins: [],
};
