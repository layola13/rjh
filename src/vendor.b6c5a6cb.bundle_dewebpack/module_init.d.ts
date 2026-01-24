/**
 * Configuration interface for module initialization
 */
interface Config {
  /** Extends the current configuration with new properties */
  extend(properties: Partial<Config>): Config;
}

/**
 * Module initialization interface
 */
interface ModuleInit {
  /** Current configuration object */
  cfg: Config;
  
  /**
   * Initializes or updates the module configuration
   * @param config - Configuration object to merge with existing settings
   */
  init(config: Partial<Config>): void;
}