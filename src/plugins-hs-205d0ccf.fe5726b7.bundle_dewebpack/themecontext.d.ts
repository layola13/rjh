/**
 * Theme context for managing application theme state.
 * Provides a React context for theme management with default "teaching-light" theme.
 * @module ThemeContext
 */

import { Context } from 'react';

/**
 * Available theme names in the application.
 */
export type ThemeName = 'teaching-light' | 'teaching-dark' | string;

/**
 * React context for managing the current theme.
 * Default theme is "teaching-light".
 */
export const ThemeContext: Context<ThemeName>;

/**
 * Custom React hook to access the current theme from ThemeContext.
 * 
 * @returns {ThemeName} The current active theme name
 * 
 * @example
 *