import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'translucent' | 'light';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'translucent',
  setTheme: () => {},
  toggleTheme: () => {},
  isLight: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>('translucent');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'translucent' ? 'light' : 'translucent'));
  };

  const isLight = theme === 'light';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.body.classList.remove('bg-slate-950', 'bg-slate-900');
        document.body.classList.add('bg-slate-100', 'text-slate-900');
      } else {
        document.documentElement.classList.remove('light-theme');
        document.body.classList.remove('bg-slate-100', 'text-slate-900');
        document.body.classList.add('bg-slate-950', 'text-slate-100');
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isLight }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
