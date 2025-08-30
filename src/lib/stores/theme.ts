import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'dark' | 'light' | 'catppuccin-mocha' | 'catppuccin-frappe';

const STORAGE_KEY = 'livecoding-theme';
const DEFAULT_THEME: Theme = 'dark';

function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>(DEFAULT_THEME);

  return {
    subscribe,
    init: () => {
      if (browser) {
        const stored = localStorage.getItem(STORAGE_KEY) as Theme;
        if (stored && isValidTheme(stored)) {
          set(stored);
          document.documentElement.setAttribute('data-theme', stored);
        } else {
          document.documentElement.setAttribute('data-theme', DEFAULT_THEME);
        }
      }
    },
    setTheme: (theme: Theme) => {
      if (browser) {
        localStorage.setItem(STORAGE_KEY, theme);
        document.documentElement.setAttribute('data-theme', theme);
      }
      set(theme);
    },
    toggle: () => {
      update(current => {
        const themes: Theme[] = ['dark', 'light', 'catppuccin-mocha', 'catppuccin-frappe'];
        const currentIndex = themes.indexOf(current);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        
        if (browser) {
          localStorage.setItem(STORAGE_KEY, nextTheme);
          document.documentElement.setAttribute('data-theme', nextTheme);
        }
        
        return nextTheme;
      });
    }
  };
}

function isValidTheme(theme: string): theme is Theme {
  return ['dark', 'light', 'catppuccin-mocha', 'catppuccin-frappe'].includes(theme);
}

export const theme = createThemeStore();