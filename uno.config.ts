import {
  defineConfig,
  presetWind3,
  presetIcons,
  presetTypography
} from "unocss";

const DEFAULT_FONTS = "Roboto";

export default defineConfig({
  shortcuts: [
    {
      "flex-center": "flex items-center justify-center",
      hstack: "flex items-center",
      "inline-hstack": "inline-flex items-center",
      "nav-item": "underline-offset-4 text-fg hover:text-fg-dark transition-colors duration-200",
      "nav-active": "!underline decoration-wavy underline-offset-4 font-bold",
      btn: "hstack gap-x-1 rounded px-3 py-1 transition-colors decoration-none text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 !text-fg"
    }
  ],
  preflights: [
    {
      getCSS: () => `
        :root {
          --fg: 0 0% 15%;
          --fg-light: 0 0% 38%;
          --fg-dark: 0 0% 5%;
          --bg: 0 0% 100%;
          --bg-dark: 0 0% 95%;
          --border: 0 0% 88%;
        }

        .dark {
          --fg: 0 0% 82%;
          --fg-light: 0 0% 70%;
          --fg-dark: 0 0% 98%;
          --bg: 0 0% 12%;
          --bg-dark: 0 0% 20%;
          --border: 0 0% 28%;
        }

        body {
          background-color: hsl(var(--bg));
          color: hsl(var(--fg));
          font-family: ${DEFAULT_FONTS};
        }

        code, pre, kbd, samp {
          font-family: ${DEFAULT_FONTS};
        }

        * {
          border-color: hsl(var(--border));
        }
      `
    }
  ],
  theme: {
    fontFamily: {
      sans: DEFAULT_FONTS,
      mono: DEFAULT_FONTS
    },
    colors: {
      fg: {
        DEFAULT: "hsl(var(--fg))",
        light: "hsl(var(--fg-light))",
        dark: "hsl(var(--fg-dark))"
      },
      bg: {
        DEFAULT: "hsl(var(--bg))",
        dark: "hsl(var(--bg-dark))"
      },
      border: "hsl(var(--border))"
    }
  },
  presets: [presetWind3(), presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "sub"
      }
    }), presetTypography()]
});
