/**
 * Preset configuration object that can be deeply merged
 */
interface PresetConfig {
  /** Optional nested preset configuration (not supported at global level) */
  preset?: PresetConfig;
  [key: string]: unknown;
}

/**
 * User-provided preset options
 */
interface UserPresetOptions {
  /** User-defined preset configuration */
  preset?: PresetConfig;
  [key: string]: unknown;
}

/**
 * Constructor options for the Presets service
 */
interface PresetsConstructorOptions {
  /** User-provided preset configuration */
  userPreset: UserPresetOptions;
}

/**
 * Abstract base service class that all services extend
 */
declare abstract class Service {
  /**
   * Creates a new service instance
   */
  constructor();
  
  /**
   * Static property identifier for the service
   */
  static property: string;
}

/**
 * Presets service that manages application preset configurations.
 * Handles merging of default presets with user-provided overrides.
 * 
 * @example
 *