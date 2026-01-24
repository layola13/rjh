/**
 * Dynamic module loader for partner integrations
 * Provides lazy-loading capabilities for partner-specific modules
 */

/**
 * Module registry mapping module paths to their chunk information
 * Each entry contains [moduleId, chunkId]
 */
interface ModuleRegistry {
  './ezhome/partner.js': readonly [699896, 896];
  './fp/partner.js': readonly [239266, 266];
}

/**
 * Module path type - valid keys from the module registry
 */
type ModulePath = keyof ModuleRegistry;

/**
 * Module metadata tuple: [moduleId, chunkId]
 */
type ModuleMetadata = readonly [number, number];

/**
 * Dynamic module loader function
 * Loads partner modules on-demand using webpack's code-splitting
 * 
 * @param modulePath - The path to the module to load (e.g., './ezhome/partner.js')
 * @returns Promise that resolves to the loaded module
 * @throws Error with code 'MODULE_NOT_FOUND' if module path is not registered
 */
interface PartnerModuleLoader {
  (modulePath: ModulePath): Promise<unknown>;
  
  /**
   * Returns all registered module paths
   */
  keys(): ModulePath[];
  
  /**
   * Unique identifier for this loader module
   */
  id: 272977;
}

/**
 * Partner module loader instance
 * Used to dynamically import partner integration modules
 */
declare const partnerModuleLoader: PartnerModuleLoader;

export = partnerModuleLoader;