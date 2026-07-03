import {
  defineConfig,
  presetWind3,
  presetAttributify,
  presetIcons,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

const DEFAULT_FONTS =
  "system-ui, -apple-system, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif";

export default defineConfig({
  shortcuts: [
    {
      "flex-center": "flex items-center justify-center",
      hstack: "flex items-center",
      vstack: "hstack flex-col",
      "inline-hstack": "inline-flex items-center",
      "prose-lg": "lg:text-lg max-w-content",
      "nav-item": "underline-offset-4 text-fg hover:text-fg-dark transition-colors duration-200",
      "nav-active": "underline decoration-wavy text-sky-500 font-semibold",
      btn: "hstack gap-x-1 rounded px-3 py-1 transition-colors decoration-none text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 !text-fg",
      "add-ring": "ring-offset-bg outline-none ring-2 ring-primary ring-offset-2",
      "theme-icon": "absolute transition-transform duration-500",
      "theme-icon-cur": "scale-100 rotate-0",
      "theme-icon-prev": "scale-0 -rotate-90",
      "theme-icon-next": "scale-0 rotate-90"
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
          --primary: 215 90% 45%;
        }

        .dark {
          --fg: 0 0% 82%;
          --fg-light: 0 0% 70%;
          --fg-dark: 0 0% 98%;
          --bg: 0 0% 12%;
          --bg-dark: 0 0% 20%;
          --border: 0 0% 28%;
          --primary: 215 85% 65%;
        }

        body {
          background-color: hsl(var(--bg));
          color: hsl(var(--fg));
          font-family: ${DEFAULT_FONTS};
        }

        * {
          border-color: hsl(var(--border));
        }

        .parallax-layer {
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }
      `
    }
  ],
  theme: {
    font: {
      sans: DEFAULT_FONTS,
      ui: DEFAULT_FONTS
    },
    colors: {
      content: "global",
      fg: {
        DEFAULT: "hsl(var(--fg))",
        light: "hsl(var(--fg-light))",
        dark: "hsl(var(--fg-dark))"
      },
      bg: {
        DEFAULT: "hsl(var(--bg))",
        dark: "hsl(var(--bg-dark))"
      },
      border: "hsl(var(--border))",
      primary: "hsl(var(--primary))"
    }
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "sub"
      }
    }),
    presetTypography()
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
