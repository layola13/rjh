/**
 * Dynamic module resolver for signal files
 * Provides runtime module resolution for catalog and leftmenu signals
 */

/**
 * Module path to ID mapping
 * Maps relative paths to their corresponding module identifiers
 */
interface ModuleMap {
  './catalog.signal.ts': 742749;
  './leftmenu.signal.ts': 119092;
}

/**
 * Module resolver function signature
 * Dynamically imports and resolves signal modules at runtime
 */
interface ModuleResolver {
  /**
   * Resolve and load a module by its path
   * @param modulePath - Relative path to the signal module
   * @returns The resolved module export
   * @throws Error if module cannot be found
   */
  (modulePath: keyof ModuleMap): unknown;
  
  /**
   * Get all available module paths
   * @returns Array of module path strings
   */
  keys(): string[];
  
  /**
   * Resolve a module path to its numeric ID
   * @param modulePath - Relative path to the signal module
   * @returns The numeric module identifier
   * @throws Error if module path is not registered
   */
  resolve(modulePath: keyof ModuleMap): number;
  
  /**
   * Unique identifier for this resolver instance
   */
  id: 250687;
}

/**
 * Module map containing signal file paths and their IDs
 */
declare const MODULE_MAP: ModuleMap;

/**
 * Exported module resolver for signal files
 * Enables dynamic import of catalog and leftmenu signal modules
 */
declare const signalModuleResolver: ModuleResolver;

export default signalModuleResolver;