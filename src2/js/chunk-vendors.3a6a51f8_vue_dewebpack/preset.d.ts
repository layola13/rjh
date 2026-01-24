/**
 * Vuetify default preset configuration
 * Defines the default theme, breakpoints, icons, and localization settings
 */

/**
 * Breakpoint threshold values for responsive design
 */
export interface BreakpointThresholds {
  /** Extra small devices (portrait phones, less than 600px) */
  xs: number;
  /** Small devices (landscape phones, 600px and up) */
  sm: number;
  /** Medium devices (tablets, 960px and up) */
  md: number;
  /** Large devices (desktops, 1280px and up) */
  lg: number;
}

/**
 * Breakpoint configuration for responsive layouts
 */
export interface BreakpointConfig {
  /** Breakpoint value to switch to mobile layout */
  mobileBreakpoint: number;
  /** Width of the browser scrollbar in pixels */
  scrollBarWidth: number;
  /** Responsive breakpoint thresholds */
  thresholds: BreakpointThresholds;
}

/**
 * Icon font configuration
 */
export interface IconsConfig {
  /** Icon font family to use (e.g., 'mdi', 'mdiSvg', 'md', 'fa', 'fa4', 'faSvg') */
  iconfont: string;
  /** Custom icon values mapping */
  values: Record<string, string>;
}

/**
 * Locale definition with translations
 */
export interface Locale {
  [key: string]: string | Locale;
}

/**
 * Internationalization and localization configuration
 */
export interface LangConfig {
  /** Currently active locale code */
  current: string;
  /** Available locale definitions */
  locales: Record<string, Locale>;
  /** Translation function (injected at runtime) */
  t: ((key: string, ...params: unknown[]) => string) | undefined;
}

/**
 * Theme color palette
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
  /** Informational messages color */
  info: string;
  /** Success state color */
  success: string;
  /** Warning state color */
  warning: string;
  /** Additional custom colors */
  [key: string]: string;
}

/**
 * Theme configuration options
 */
export interface ThemeOptions {
  /** Content Security Policy nonce for injected styles */
  cspNonce: string | undefined;
  /** Enable CSS custom properties (CSS variables) */
  customProperties: boolean | undefined;
  /** Function to minify theme CSS */
  minifyTheme: ((css: string) => string) | undefined;
  /** Custom theme cache implementation */
  themeCache: unknown | undefined;
  /** Enable automatic color variations generation */
  variations: boolean;
}

/**
 * Theme configuration with light and dark variants
 */
export interface ThemeConfig {
  /** Use dark theme by default */
  dark: boolean;
  /** Default theme name */
  default: string;
  /** Disable theme functionality */
  disable: boolean;
  /** Advanced theme options */
  options: ThemeOptions;
  /** Theme variants (light, dark, and custom) */
  themes: {
    light: ThemeColors;
    dark: ThemeColors;
    [themeName: string]: ThemeColors;
  };
}

/**
 * Complete Vuetify preset configuration
 */
export interface VuetifyPreset {
  /** Responsive breakpoint settings */
  breakpoint: BreakpointConfig;
  /** Icon font configuration */
  icons: IconsConfig;
  /** Localization settings */
  lang: LangConfig;
  /** Right-to-left layout support */
  rtl: boolean;
  /** Theme and color settings */
  theme: ThemeConfig;
}

/**
 * Default Vuetify preset with Material Design values
 */
export declare const preset: VuetifyPreset;