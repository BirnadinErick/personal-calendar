# Theme & Accent Customization System

This document outlines the design decisions and implementation details for the dual-mode theme system and Google Calendar inspired accent overlays.

## Core CSS Variable Styling

We leverage CSS Custom Properties to decouple design tokens from utility declarations. These variables are registered under the `@theme` directive in [index.css](../../src/index.css):

```css
@theme {
  --color-bg-app: var(--bg-app);
  --color-bg-sidebar: var(--bg-sidebar);
  --color-bg-card: var(--bg-card);
  --color-bg-hover: var(--bg-hover);
  --color-bg-active: var(--bg-active);
  --color-border-subtle: var(--border-subtle);
  
  --color-text-main: var(--text-main);
  --color-text-muted: var(--text-muted);
  --color-text-inverse: var(--text-inverse);
  
  --color-brand-primary: var(--brand-primary);
  --color-brand-hover: var(--brand-hover);
  --color-brand-light: var(--brand-light);
  --color-brand-text: var(--brand-text);
}
```

* By default, the root `:root` scope maps values for **Light Mode** styling (slate-50 background, white sidebar and cards, dark slate text).
* When the class `.dark` is added to the root document, CSS variables are overridden with **Dark Mode** counterparts (deep black-slate background, slate-900 sidebar, slate-50 text).

## Dynamic Accent Color Injection

Rather than statically hardcoding Tailwind classes for each separate color choice, we define configuration records for each color choice in [theme.ts](../../src/theme.ts). The structure contains different shade properties optimized for readability in both light and dark themes:

```typescript
export interface AccentColor {
  id: string;
  name: string;
  colorCode: string;
  light: {
    primary: string;
    hover: string;
    light: string; // tint background
    text: string;  // text on tint
  };
  dark: {
    primary: string;
    hover: string;
    light: string;
    text: string;
  };
}
```

When a theme mode or accent color selection changes, the function `applyTheme()` determines the final active state (handling dynamic system dark media queries if `'system'` mode is active) and updates the root document element:

1. Class `.dark` is toggled using `root.classList.toggle('dark', isDark)`.
2. Custom properties `--brand-primary`, `--brand-hover`, `--brand-light`, and `--brand-text` are set on `document.documentElement.style` dynamically matching the selected color's active theme palette.
