/**
 * Core module export configuration
 * Provides version information for the library
 */

/**
 * Module configuration interface
 */
interface ModuleConfig {
  /**
   * Semantic version string of the library
   * @example "2.6.12"
   */
  version: string;
}

/**
 * Global reference to the module export
 * Used for compatibility with older module systems
 */
declare const __e: ModuleConfig | undefined;

/**
 * Main module export
 * Contains library metadata and configuration
 */
declare const moduleConfig: ModuleConfig;

export default moduleConfig;
export type { ModuleConfig };