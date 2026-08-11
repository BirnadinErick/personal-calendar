import { ThemeMode } from './store/useStore';

export interface AccentColor {
  id: string;
  name: string;
  colorCode: string;
  light: {
    primary: string;
    hover: string;
    light: string;
    text: string;
  };
  dark: {
    primary: string;
    hover: string;
    light: string;
    text: string;
  };
}

export const ACCENT_COLORS: AccentColor[] = [
  {
    id: 'blue',
    name: 'Blue',
    colorCode: '#1a73e8',
    light: {
      primary: '#1a73e8',
      hover: '#1557b0',
      light: '#e8f0fe',
      text: '#1a73e8',
    },
    dark: {
      primary: '#8ab4f8',
      hover: '#aecbfa',
      light: 'rgba(138, 180, 248, 0.15)',
      text: '#8ab4f8',
    },
  },
  {
    id: 'grape',
    name: 'Grape',
    colorCode: '#8e24aa',
    light: {
      primary: '#8e24aa',
      hover: '#7b1fa2',
      light: '#f3e5f5',
      text: '#8e24aa',
    },
    dark: {
      primary: '#ce93d8',
      hover: '#e1bee7',
      light: 'rgba(206, 147, 216, 0.15)',
      text: '#ce93d8',
    },
  },
  {
    id: 'tomato',
    name: 'Tomato',
    colorCode: '#d50000',
    light: {
      primary: '#d50000',
      hover: '#b71c1c',
      light: '#ffebee',
      text: '#d50000',
    },
    dark: {
      primary: '#ef9a9a',
      hover: '#ffcdd2',
      light: 'rgba(239, 154, 150, 0.15)',
      text: '#ef9a9a',
    },
  },
  {
    id: 'tangerine',
    name: 'Tangerine',
    colorCode: '#f4511e',
    light: {
      primary: '#f4511e',
      hover: '#e64a19',
      light: '#fbe9e7',
      text: '#f4511e',
    },
    dark: {
      primary: '#ffb74d',
      hover: '#ffe0b2',
      light: 'rgba(255, 183, 77, 0.15)',
      text: '#ffb74d',
    },
  },
  {
    id: 'basil',
    name: 'Basil',
    colorCode: '#0b8043',
    light: {
      primary: '#0b8043',
      hover: '#096b37',
      light: '#e6f4ea',
      text: '#0b8043',
    },
    dark: {
      primary: '#a5d6a7',
      hover: '#c8e6c9',
      light: 'rgba(165, 214, 167, 0.15)',
      text: '#a5d6a7',
    },
  },
  {
    id: 'sage',
    name: 'Sage',
    colorCode: '#33b679',
    light: {
      primary: '#33b679',
      hover: '#2ba06a',
      light: '#e8f8f2',
      text: '#33b679',
    },
    dark: {
      primary: '#81c784',
      hover: '#a5d6a7',
      light: 'rgba(129, 199, 132, 0.15)',
      text: '#81c784',
    },
  },
  {
    id: 'peacock',
    name: 'Peacock',
    colorCode: '#039be5',
    light: {
      primary: '#039be5',
      hover: '#0288d1',
      light: '#e1f5fe',
      text: '#039be5',
    },
    dark: {
      primary: '#4fc3f7',
      hover: '#81d4fa',
      light: 'rgba(79, 195, 247, 0.15)',
      text: '#4fc3f7',
    },
  },
  {
    id: 'flamingo',
    name: 'Flamingo',
    colorCode: '#e67c73',
    light: {
      primary: '#e67c73',
      hover: '#d96c63',
      light: '#fce8e6',
      text: '#e67c73',
    },
    dark: {
      primary: '#ffab91',
      hover: '#ffccbc',
      light: 'rgba(255, 171, 145, 0.15)',
      text: '#ffab91',
    },
  }
];

export const applyTheme = (themeMode: ThemeMode, accentId: string): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const root = document.documentElement;
  
  // 1. Determine if dark mode should be applied
  let isDark = themeMode === 'dark';
  if (themeMode === 'system') {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // 2. Toggle the class
  root.classList.toggle('dark', isDark);

  // 3. Find and apply accent color variables
  const accent = ACCENT_COLORS.find(a => a.id === accentId) || ACCENT_COLORS[0];
  const targetTheme = isDark ? accent.dark : accent.light;

  root.style.setProperty('--brand-primary', targetTheme.primary);
  root.style.setProperty('--brand-hover', targetTheme.hover);
  root.style.setProperty('--brand-light', targetTheme.light);
  root.style.setProperty('--brand-text', targetTheme.text);
};
