/**
 * Theme service for managing Vuetify application themes
 * Handles light/dark mode switching, CSS generation, and SSR support
 */

import { Service } from '../service';
import { VueConstructor } from 'vue';

/**
 * Theme variant configuration
 * Defines color values for a theme (light or dark)
 */
export interface ThemeVariant {
  [key: string]: string | number | undefined;
}

/**
 * Theme configuration object
 */
export interface ThemeDefinition {
  /** Light theme variant */
  light: ThemeVariant;
  /** Dark theme variant */
  dark: ThemeVariant;
}

/**
 * Theme options configuration
 */
export interface ThemeOptions {
  /** Content Security Policy nonce for inline styles */
  cspNonce?: string;
  /** Enable CSS custom properties (CSS variables) */
  customProperties?: boolean;
  /** Theme cache for storing generated styles */
  themeCache?: ThemeCache;
  /** Optional minification function for theme CSS */
  minifyTheme?: (css: string) => string;
  /** Enable theme color variations */
  variations?: boolean;
}

/**
 * Theme cache interface for storing/retrieving generated CSS
 */
export interface ThemeCache {
  /**
   * Get cached CSS for a parsed theme
   * @param theme - Parsed theme object
   * @returns Cached CSS string or null if not found
   */
  get(theme: ParsedTheme): string | null;
  
  /**
   * Store generated CSS for a parsed theme
   * @param theme - Parsed theme object
   * @param css - Generated CSS string
   */
  set(theme: ParsedTheme, css: string): void;
}

/**
 * Parsed theme object (internal representation after processing)
 */
export interface ParsedTheme {
  [key: string]: any;
}

/**
 * SSR context for server-side rendering
 */
export interface SSRContext {
  /** HTML head content */
  head?: string;
}

/**
 * Theme service configuration
 */
export interface ThemeServiceOptions {
  /** Initial dark mode state */
  dark?: boolean;
  /** Disable theme functionality */
  disable?: boolean;
  /** Theme configuration options */
  options?: ThemeOptions;
  /** Theme variants (light and dark) */
  themes?: ThemeDefinition;
}

/**
 * Vue Meta integration interface
 */
export interface VueMeta {
  /**
   * Get vue-meta options
   */
  getOptions?: () => { keyName: string };
  
  /**
   * Add app for vue-meta 2.3+
   * @param name - App name
   */
  addApp?: (name: string) => {
    set: (meta: any) => void;
  };
}

/**
 * Vue instance with meta support
 */
export interface VueWithMeta extends VueConstructor {
  $meta?: () => VueMeta;
  $nextTick?: (callback: () => void) => void;
  $once?: (event: string, callback: () => void) => void;
  $watch?: (getter: () => any, callback: () => void, options?: any) => () => void;
  $options?: any;
}

/**
 * Theme service class
 * Manages application theming including dark mode, CSS generation, and SSR support
 */
export declare class Theme extends Service {
  /**
   * Service property name for framework registration
   */
  static readonly property: 'theme';

  /**
   * Whether theme functionality is disabled
   */
  disabled: boolean;

  /**
   * Current dark mode state (null = not initialized)
   */
  isDark: boolean | null;

  /**
   * Watcher cleanup function
   */
  private unwatch: (() => void) | null;

  /**
   * Vue Meta instance for managing theme styles in head
   */
  private vueMeta: VueMeta | null;

  /**
   * Reference to the theme stylesheet element
   */
  private styleEl?: HTMLStyleElement;

  /**
   * Default theme configurations
   */
  private defaults: ThemeDefinition;

  /**
   * Active theme configurations
   */
  themes: ThemeDefinition;

  /**
   * Theme options
   */
  options: ThemeOptions;

  /**
   * Generated CSS string for current theme
   * Setting this property updates the theme stylesheet
   */
  css: string;

  /**
   * Dark mode state
   * @returns True if dark mode is enabled
   */
  get dark(): boolean;

  /**
   * Set dark mode state and apply theme
   * @param value - Enable/disable dark mode
   */
  set dark(value: boolean);

  /**
   * Get the currently active theme variant
   * @returns Current theme object (light or dark)
   */
  get currentTheme(): ThemeVariant;

  /**
   * Get generated CSS styles for current theme
   * Uses cache if available, otherwise generates and caches
   * @returns Generated CSS string
   */
  get generatedStyles(): string;

  /**
   * Get parsed theme object for current theme
   * @returns Parsed theme with processed color values
   */
  get parsedTheme(): ParsedTheme;

  /**
   * Check if using vue-meta 2.3+ API
   * @returns True if vue-meta supports addApp method
   */
  private get isVueMeta23(): boolean;

  /**
   * Create a new Theme service instance
   * @param framework - Framework configuration object
   */
  constructor(framework: { theme: ThemeServiceOptions });

  /**
   * Apply current theme by generating and injecting CSS
   * Clears CSS if theme is disabled
   */
  applyTheme(): void;

  /**
   * Clear all theme CSS
   */
  clearCss(): void;

  /**
   * Initialize theme service
   * @param root - Vue root instance
   * @param ssrContext - Optional SSR context for server-side rendering
   */
  init(root: VueWithMeta, ssrContext?: SSRContext): void;

  /**
   * Update a theme variant with new values
   * @param name - Theme name ('light' or 'dark')
   * @param theme - Theme values to merge
   */
  setTheme(name: keyof ThemeDefinition, theme: Partial<ThemeVariant>): void;

  /**
   * Reset themes to default values
   */
  resetThemes(): void;

  /**
   * Check for existing style element or create new one
   * @returns True if style element exists or was created
   */
  private checkOrCreateStyleElement(): boolean;

  /**
   * Fill theme variant with default values
   * @param variant - Partial theme variant
   * @param dark - Whether to use dark theme defaults
   * @returns Complete theme variant
   */
  fillVariant(variant?: Partial<ThemeVariant>, dark?: boolean): ThemeVariant;

  /**
   * Generate and append theme stylesheet element to document head
   */
  private genStyleElement(): void;

  /**
   * Initialize vue-meta integration
   * @param root - Vue root instance
   */
  private initVueMeta(root: VueWithMeta): void;

  /**
   * Apply theme using vue-meta 2.3+ API
   */
  private applyVueMeta23(): void;

  /**
   * Initialize SSR support by injecting styles into SSR context
   * @param context - SSR context object
   */
  private initSSR(context: SSRContext): void;

  /**
   * Initialize reactive theme watching
   * @param root - Vue root instance
   */
  private initTheme(root: VueWithMeta): void;
}