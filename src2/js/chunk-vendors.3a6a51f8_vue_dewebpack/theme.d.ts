/**
 * Vuetify Theme Service
 * Manages theme colors, dark/light mode, and CSS generation
 */

import { Service } from '../service';
import { VueConstructor } from 'vue';

/**
 * Theme color palette interface
 * Defines available color names and their values
 */
export interface ThemeColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  error?: string;
  info?: string;
  success?: string;
  warning?: string;
  [key: string]: string | undefined;
}

/**
 * Theme configuration for light and dark variants
 */
export interface ThemeVariant {
  light: ThemeColors;
  dark: ThemeColors;
}

/**
 * Theme cache interface for storing generated CSS
 */
export interface ThemeCache {
  /**
   * Retrieve cached CSS for a theme configuration
   */
  get(theme: ParsedThemeColors): string | null | undefined;
  
  /**
   * Store generated CSS for a theme configuration
   */
  set(theme: ParsedThemeColors, css: string): void;
}

/**
 * Theme service options
 */
export interface ThemeOptions {
  /**
   * Content Security Policy nonce for inline styles
   */
  cspNonce?: string;
  
  /**
   * Cache for theme CSS to avoid regeneration
   */
  themeCache?: ThemeCache;
  
  /**
   * Custom minifier function for generated CSS
   */
  minifyTheme?: (css: string) => string;
  
  /**
   * Enable CSS custom properties (CSS variables)
   */
  customProperties?: boolean;
  
  /**
   * Generate color variations (lighten/darken shades)
   */
  variations?: boolean;
}

/**
 * Theme configuration passed to the service
 */
export interface ThemeConfiguration {
  /**
   * Enable dark mode by default
   */
  dark?: boolean;
  
  /**
   * Disable theme service entirely
   */
  disable?: boolean;
  
  /**
   * Theme options
   */
  options?: ThemeOptions;
  
  /**
   * Theme color definitions
   */
  themes?: ThemeVariant;
}

/**
 * Parsed theme colors with computed variations
 */
export interface ParsedThemeColors {
  [key: string]: string | ParsedThemeColors;
}

/**
 * Vue Meta v2.3+ interface
 */
interface VueMeta {
  /**
   * Add an app to vue-meta (v2.3+)
   */
  addApp(name: string): {
    set(meta: MetaInfo): void;
  };
  
  /**
   * Get vue-meta options
   */
  getOptions?(): {
    keyName: string;
  };
}

/**
 * Meta info structure for vue-meta
 */
interface MetaInfo {
  style?: Array<{
    cssText: string;
    type: string;
    id: string;
    nonce?: string;
  }>;
}

/**
 * Server-side rendering context
 */
export interface SSRContext {
  head?: string;
}

/**
 * Vuetify Theme Service
 * Manages application theming, including dark mode, color palettes, and CSS generation
 */
export declare class Theme extends Service {
  /**
   * Service property name in Vuetify framework
   */
  static readonly property: 'theme';
  
  /**
   * Whether the theme service is disabled
   */
  disabled: boolean;
  
  /**
   * Current dark mode state (null = not initialized)
   */
  private isDark: boolean | null;
  
  /**
   * Vue watcher cleanup function
   */
  private unwatch: (() => void) | null;
  
  /**
   * Vue Meta plugin instance
   */
  private vueMeta: VueMeta | null;
  
  /**
   * Style element for injecting theme CSS
   */
  private styleEl?: HTMLStyleElement;
  
  /**
   * Default theme configurations
   */
  private defaults: ThemeVariant;
  
  /**
   * Current theme configurations
   */
  themes: ThemeVariant;
  
  /**
   * Theme service options
   */
  options: ThemeOptions;
  
  /**
   * Create a new Theme service instance
   * @param framework - Vuetify framework configuration
   */
  constructor(framework: { theme: ThemeConfiguration });
  
  /**
   * Generated CSS styles for the current theme
   * Setting this will inject the CSS into the document or vue-meta
   */
  css: string;
  
  /**
   * Dark mode state
   */
  dark: boolean;
  
  /**
   * Apply the current theme by generating and injecting CSS
   */
  applyTheme(): void;
  
  /**
   * Clear all theme CSS
   */
  clearCss(): void;
  
  /**
   * Initialize the theme service
   * @param app - Vue application instance
   * @param ssrContext - Server-side rendering context (optional)
   */
  init(app: VueConstructor, ssrContext?: SSRContext): void;
  
  /**
   * Update theme colors for a specific variant
   * @param variant - Theme variant name ('light' or 'dark')
   * @param theme - Partial theme colors to merge
   */
  setTheme(variant: 'light' | 'dark', theme: Partial<ThemeColors>): void;
  
  /**
   * Reset themes to default configurations
   */
  resetThemes(): void;
  
  /**
   * Check if style element exists, create if not
   * @returns true if style element is available
   */
  private checkOrCreateStyleElement(): boolean;
  
  /**
   * Fill in missing theme colors with defaults
   * @param customColors - Custom color overrides
   * @param dark - Whether to use dark variant defaults
   * @returns Complete theme color palette
   */
  fillVariant(customColors: Partial<ThemeColors> | undefined, dark: boolean): ThemeColors;
  
  /**
   * Create the style element for theme CSS injection
   */
  private genStyleElement(): void;
  
  /**
   * Initialize vue-meta integration
   * @param app - Vue application instance
   */
  private initVueMeta(app: VueConstructor): void;
  
  /**
   * Apply theme styles using vue-meta v2.3+
   */
  private applyVueMeta23(): void;
  
  /**
   * Initialize server-side rendering theme injection
   * @param context - SSR context to inject styles into
   */
  private initSSR(context: SSRContext): void;
  
  /**
   * Initialize theme reactivity and watchers
   * @param app - Vue application instance
   */
  private initTheme(app: VueConstructor): void;
  
  /**
   * Get the current active theme (light or dark)
   */
  readonly currentTheme: ThemeColors;
  
  /**
   * Get generated CSS styles for the current theme
   */
  readonly generatedStyles: string;
  
  /**
   * Get parsed theme with computed color variations
   */
  readonly parsedTheme: ParsedThemeColors;
  
  /**
   * Check if vue-meta version is 2.3 or higher
   */
  private readonly isVueMeta23: boolean;
}