import React, { createContext, useContext, useEffect, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';

type Theme = 'dark' | 'light';

const readSavedTheme = (): Theme | null => {
  try {
    const saved = localStorage.getItem('sc-theme');
    return saved === 'dark' || saved === 'light' ? saved : null;
  } catch {
    return null;
  }
};

// Prerendered pages were rendered in dark; hydration must start from the same theme.
const isPrerendered = () =>
  typeof document !== 'undefined' && document.getElementById('root')?.dataset.prerendered === 'true';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined' || isPrerendered()) return 'dark';
    return readSavedTheme() ?? 'dark';
  });

  // After hydration, apply the saved theme before the first paint.
  useIsomorphicLayoutEffect(() => {
    const saved = readSavedTheme();
    if (saved && saved !== theme) setThemeState(saved);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sc-theme', newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'dark',
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  return context;
};
