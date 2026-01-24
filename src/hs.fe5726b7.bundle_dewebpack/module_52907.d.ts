/**
 * Dynamic configuration module loader
 * Provides lazy-loading capabilities for JSON configuration files
 */

/**
 * Module manifest mapping configuration paths to their module IDs and chunk IDs
 */
interface ModuleManifest {
  [configPath: string]: [moduleId: number, chunkId: number];
}

/**
 * Configuration module loader function type
 * Dynamically imports configuration modules based on the provided path
 */
interface ConfigLoaderFunction {
  /**
   * Load a configuration module by path
   * @param modulePath - The path to the configuration module (e.g., "./ezhome/config/config.json")
   * @returns Promise that resolves to the loaded configuration module
   * @throws {Error} When the requested module cannot be found (MODULE_NOT_FOUND)
   */
  (modulePath: string): Promise<any>;
  
  /**
   * Get all available configuration module paths
   * @returns Array of all registered module paths
   */
  keys(): string[];
  
  /**
   * Unique identifier for this loader module
   */
  id: number;
}

/**
 * Available configuration modules with their corresponding module and chunk IDs
 */
declare const MODULE_MANIFEST: ModuleManifest;

/**
 * Dynamic configuration loader
 * Loads configuration files on-demand using code splitting
 */
declare const configLoader: ConfigLoaderFunction;

export default configLoader;
export type { ConfigLoaderFunction, ModuleManifest };