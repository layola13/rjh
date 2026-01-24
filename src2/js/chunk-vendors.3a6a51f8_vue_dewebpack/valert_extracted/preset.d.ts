/**
 * Vuetify default preset configuration
 * Defines the default theme, breakpoints, icons, and localization settings
 */

/**
 * Breakpoint threshold values for responsive design
 */
export interface BreakpointThresholds {
  /** Extra small devices (phones, < 600px) */
  xs: number;
  /** Small devices (tablets, 600px - 960px) */
  sm: number;
  /** Medium devices (small laptops, 960px - 1280px) */
  md: number;
  /** Large devices (desktops, 1280px - 1920px) */
  lg: number;
}

/**
 * Breakpoint configuration for responsive layout behavior
 */
export interface BreakpointOptions {
  /** Breakpoint width in pixels where mobile layout is triggered */
  mobileBreakpoint: number;
  /** Width of the browser scrollbar in pixels */
  scrollBarWidth: number;
  /** Pixel thresholds for each breakpoint tier */
  thresholds: BreakpointThresholds;
}

/**
 * Icon font configuration
 */
export interface IconOptions {
  /** Icon font library to use (e.g., 'mdi', 'fa', 'md') */
  iconfont: string;
  /** Custom icon value mappings */
  values: Record<string, string>;
}

/**
 * Localization and internationalization settings
 */
export interface LocaleOptions {
  /** Currently active locale code */
  current: string;
  /** Available locale translations */
  locales: Record<string, unknown>;
  /** Translation function (set at runtime) */
  t: ((key: string, ...params: unknown[]) => string) | undefined;
}

/**
 * Color palette for a theme variant
 */
export interface ThemeColors {
  /** Primary brand color */
  primary: string;
  /** Secondary brand color */
  secondary: string;
  /** Accent color for highlights */
  accent: string;
  /** Error state color */
  error: string;
  /** Informational message color */
  info: string;
  /** Success state color */
  success: string;
  /** Warning state color */
  warning: string;
}

/**
 * Theme variant definitions
 */
export interface ThemeVariants {
  /** Light theme color palette */
  light: ThemeColors;
  /** Dark theme color palette */
  dark: ThemeColors;
}

/**
 * Advanced theme generation options
 */
export interface ThemeOptions {
  /** Content Security Policy nonce for inline styles */
  cspNonce: string | undefined;
  /** Enable CSS custom properties for theme colors */
  customProperties: boolean | undefined;
  /** Function to minify generated theme CSS */
  minifyTheme: ((css: string) => string) | undefined;
  /** Cache for compiled theme styles */
  themeCache: unknown | undefined;
  /** Generate color variations (lighten/darken) */
  variations: boolean;
}

/**
 * Theme configuration
 */
export interface ThemeConfiguration {
  /** Enable dark mode by default */
  dark: boolean;
  /** Default theme variant name */
  default: string;
  /** Disable theme system entirely */
  disable: boolean;
  /** Advanced theme options */
  options: ThemeOptions;
  /** Theme variant definitions */
  themes: ThemeVariants;
}

/**
 * Complete Vuetify preset configuration
 */
export interface VuetifyPreset {
  /** Responsive breakpoint settings */
  breakpoint: BreakpointOptions;
  /** Icon configuration */
  icons: IconOptions;
  /** Localization settings */
  lang: LocaleOptions;
  /** Right-to-left text direction */
  rtl: boolean;
  /** Theme configuration */
  theme: ThemeConfiguration;
}

/**
 * Default Vuetify preset with Material Design color scheme and standard breakpoints
 */
export declare const preset: VuetifyPreset;