/**
 * Theme context module
 * Provides theme management functionality for the application
 */

import { Context } from 'react';

/**
 * Theme type definition
 * Represents the available theme modes in the application
 */
export type Theme = 'light' | 'dark' | string;

/**
 * Theme context instance
 * React context for managing and sharing theme state across components
 * @default 'light'
 */
export const ThemeContext: Context<Theme>;

/**
 * Custom hook to access the current theme from ThemeContext
 * @returns The current theme value from the context
 * @example
 *