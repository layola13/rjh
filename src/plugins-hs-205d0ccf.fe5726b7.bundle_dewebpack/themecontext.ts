import { createContext, useContext, Context } from 'react';

export type Theme = 'teaching-light' | 'teaching-dark' | string;

export const ThemeContext: Context<Theme> = createContext<Theme>('teaching-light');

export function useTheme(): Theme {
  return useContext(ThemeContext);
}