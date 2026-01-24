/**
 * Icon font types supported by the Icons service
 */
export type IconFont = string;

/**
 * Icon values configuration mapping icon names to their definitions
 */
export interface IconValues {
  [iconName: string]: unknown;
}

/**
 * Configuration options for initializing the Icons service
 */
export interface IconsOptions {
  /** The icon font library to use (e.g., 'mdi', 'fa', 'md') */
  iconfont: IconFont;
  /** Custom icon value definitions to merge with preset values */
  values: IconValues;
}

/**
 * Application configuration object containing service options
 */
export interface AppOptions {
  /** Icons service configuration */
  icons: IconsOptions;
  [key: string]: unknown;
}

/**
 * Icons service for managing icon font configurations and values.
 * Extends the base Service class to provide icon-related functionality.
 * 
 * @remarks
 * This service merges preset icon definitions from the selected icon font
 * with custom user-provided values to create a unified icon configuration.
 * 
 * @example
 *