/**
 * SVG pattern module map for wall textures.
 * Provides dynamic imports for various wall material patterns (brick, concrete, gypsum)
 * in different states (default, hover, selected, moving, loadbearing).
 */

/**
 * Map of SVG pattern file paths to their corresponding module IDs.
 * Each key represents a relative path to an SVG pattern file.
 */
interface PatternModuleMap {
  "./brick_wall_hover_pattern.svg": 726434;
  "./brick_wall_loadbearing_pattern.svg": 341014;
  "./brick_wall_moving_pattern.svg": 508660;
  "./brick_wall_pattern.svg": 33561;
  "./brick_wall_selected_pattern.svg": 60981;
  "./concrete_hover_pattern.svg": 27585;
  "./concrete_loadbearing_pattern.svg": 893661;
  "./concrete_moving_pattern.svg": 870149;
  "./concrete_pattern.svg": 51682;
  "./concrete_selected_pattern.svg": 236564;
  "./gypsum_wall_hover_pattern.svg": 458544;
  "./gypsum_wall_loadbearing_pattern.svg": 530524;
  "./gypsum_wall_moving_pattern.svg": 47490;
  "./gypsum_wall_pattern.svg": 314287;
  "./gypsum_wall_selected_pattern.svg": 563731;
}

/**
 * Valid pattern file paths.
 */
type PatternPath = keyof PatternModuleMap;

/**
 * Module ID type (numeric identifier).
 */
type ModuleId = PatternModuleMap[PatternPath];

/**
 * Context function for requiring pattern modules dynamically.
 * 
 * @param path - Relative path to the SVG pattern file
 * @returns The loaded module
 * @throws {ModuleNotFoundError} When the requested module path doesn't exist
 */
interface PatternRequireContext {
  (path: PatternPath): unknown;
  
  /**
   * Returns an array of all available pattern file paths.
   */
  keys(): PatternPath[];
  
  /**
   * Resolves a pattern path to its module ID.
   * 
   * @param path - Relative path to resolve
   * @returns The module ID
   * @throws {ModuleNotFoundError} When the path doesn't exist in the map
   */
  resolve(path: PatternPath): ModuleId;
  
  /**
   * Unique identifier for this context module.
   */
  readonly id: 289355;
}

/**
 * Error thrown when a requested module cannot be found.
 */
interface ModuleNotFoundError extends Error {
  code: "MODULE_NOT_FOUND";
}

/**
 * Exported pattern require context.
 */
declare const patternContext: PatternRequireContext;

export default patternContext;