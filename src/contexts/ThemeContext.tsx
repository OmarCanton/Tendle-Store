import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ColorTheme = 'default' | 'blue' | 'green' | 'orange' | 'pink';

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }
    
    if (savedColorTheme) {
      setColorTheme(savedColorTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    root.classList.remove('theme-default', 'theme-blue', 'theme-green', 'theme-orange', 'theme-pink');
    
    // Add current theme classes
    root.classList.add(theme);
    root.classList.add(`theme-${colorTheme}`);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('colorTheme', colorTheme);
  }, [theme, colorTheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    colorTheme,
    setTheme,
    setColorTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};