/**
 * Themeable mixin for Vue components
 * Provides theme-aware styling capabilities with dark/light mode support
 * @module functionalThemeClasses
 */

import Vue, { VueConstructor } from 'vue';

/**
 * Theme provider interface injected into component tree
 */
interface ThemeProvider {
  /** Indicates if dark theme is currently active */
  isDark: boolean;
}

/**
 * Theme classes object returned by computed properties
 */
interface ThemeClasses {
  /** Applied when dark theme is active */
  'theme--dark': boolean;
  /** Applied when light theme is active */
  'theme--light': boolean;
}

/**
 * Props interface for themeable components
 */
interface ThemeableProps {
  /**
   * Explicitly enables dark theme when true
   * Overrides inherited theme settings
   * @default null
   */
  dark?: boolean | null;

  /**
   * Explicitly enables light theme when true
   * Overrides inherited theme settings
   * @default null
   */
  light?: boolean | null;
}

/**
 * Computed properties provided by the themeable mixin
 */
interface ThemeableComputed {
  /**
   * Returns the global Vuetify app dark theme setting
   * @returns {boolean} True if app-level dark theme is enabled
   */
  appIsDark: boolean;

  /**
   * Determines if the current component should use dark theme
   * Based on props and injected theme context
   * @returns {boolean} True if component should render in dark mode
   */
  isDark: boolean;

  /**
   * CSS class object for the component's theme
   * @returns {ThemeClasses} Object with theme class flags
   */
  themeClasses: ThemeClasses;

  /**
   * Determines dark theme state at root level (ignoring injection)
   * @returns {boolean} True if root component should use dark theme
   */
  rootIsDark: boolean;

  /**
   * CSS class object for root-level theme styling
   * @returns {ThemeClasses} Object with theme class flags for root
   */
  rootThemeClasses: ThemeClasses;
}

/**
 * Data interface for themeable components
 */
interface ThemeableData {
  /** Theme provider instance passed down to children */
  themeableProvide: ThemeProvider;
}

/**
 * Functional component context for theme class generation
 */
interface FunctionalContext {
  /** Component props */
  props: ThemeableProps;
  /** Injected dependencies */
  injections: {
    theme?: ThemeProvider;
  };
}

/**
 * Themeable Vue mixin
 * Provides theme switching capabilities between dark and light modes
 *
 * @example
 *