import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useStore } from '../src/store/useStore';
import { applyTheme, ACCENT_COLORS } from '../src/theme';

// Mock matchMedia for JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: query.includes('dark'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Theme and Accent Settings Store', () => {
  beforeEach(() => {
    // Reset store state
    const { setThemeMode, setAccentColorId } = useStore.getState();
    setThemeMode('light');
    setAccentColorId('blue');
    
    // Clear DOM root classes and custom properties
    document.documentElement.className = '';
    document.documentElement.style.cssText = '';
  });

  it('should initialize with default light theme and blue accent color', () => {
    const state = useStore.getState();
    expect(state.themeMode).toBe('light');
    expect(state.accentColorId).toBe('blue');
  });

  it('should update theme mode in the store', () => {
    const { setThemeMode } = useStore.getState();
    
    setThemeMode('dark');
    expect(useStore.getState().themeMode).toBe('dark');
    
    setThemeMode('system');
    expect(useStore.getState().themeMode).toBe('system');
  });

  it('should update accent color in the store', () => {
    const { setAccentColorId } = useStore.getState();
    
    setAccentColorId('grape');
    expect(useStore.getState().accentColorId).toBe('grape');
  });

  it('should apply light theme to document element', () => {
    applyTheme('light', 'blue');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should apply dark theme to document element', () => {
    applyTheme('dark', 'blue');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should inject correct accent color variables into document element', () => {
    const grapeAccent = ACCENT_COLORS.find(a => a.id === 'grape')!;
    
    // Test light theme grape accent
    applyTheme('light', 'grape');
    expect(document.documentElement.style.getPropertyValue('--brand-primary')).toBe(grapeAccent.light.primary);
    expect(document.documentElement.style.getPropertyValue('--brand-hover')).toBe(grapeAccent.light.hover);
    expect(document.documentElement.style.getPropertyValue('--brand-light')).toBe(grapeAccent.light.light);
    expect(document.documentElement.style.getPropertyValue('--brand-text')).toBe(grapeAccent.light.text);

    // Test dark theme grape accent
    applyTheme('dark', 'grape');
    expect(document.documentElement.style.getPropertyValue('--brand-primary')).toBe(grapeAccent.dark.primary);
    expect(document.documentElement.style.getPropertyValue('--brand-hover')).toBe(grapeAccent.dark.hover);
    expect(document.documentElement.style.getPropertyValue('--brand-light')).toBe(grapeAccent.dark.light);
    expect(document.documentElement.style.getPropertyValue('--brand-text')).toBe(grapeAccent.dark.text);
  });
});
