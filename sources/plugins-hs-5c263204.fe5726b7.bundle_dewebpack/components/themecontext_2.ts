import { createContext, useContext, Context } from 'react';

export type Theme = 'light' | 'dark';

export const ThemeContext: Context<Theme> = createContext<Theme>('light');

export function useTheme(): Theme {
  return useContext(ThemeContext);
}