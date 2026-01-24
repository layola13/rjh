/**
 * Presets service module
 * 
 * This module provides preset configuration management capabilities,
 * allowing users to merge default presets with custom user-defined presets.
 */

/**
 * Preset configuration structure
 */
export interface PresetConfig {
  /** Custom preset configurations */
  preset?: Record<string, unknown>;
  /** Additional preset properties that can be merged */
  [key: string]: unknown;
}

/**
 * User preset configuration
 */
export interface UserPreset {
  /** Base preset configuration */
  preset?: PresetConfig;
  /** Additional user-defined preset properties */
  [key: string]: unknown;
}

/**
 * Service initialization options
 */
export interface ServiceOptions {
  /** User-provided preset configuration */
  userPreset: UserPreset;
  /** Merged final preset configuration */
  preset?: PresetConfig;
  /** Additional service options */
  [key: string]: unknown;
}

/**
 * Base service class interface
 */
export interface Service {
  /** Service constructor */
  new (): Service;
}

/**
 * Presets service class
 * 
 * Manages preset configurations by merging default presets with user-defined settings.
 * This service extends the base Service class and provides preset management functionality.
 * 
 * @example
 *