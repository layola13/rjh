/**
 * Webpack dynamic module context for event-related modules.
 * Provides a require-like interface for importing event modules at runtime.
 */

/**
 * Module mapping from relative paths to their webpack module IDs.
 */
interface EventModuleMap {
  './canvas.event.ts': 180261;
  './command/command.event.ts': 47918;
  './usertracklogger.event.ts': 717811;
}

/**
 * Valid module paths that can be dynamically imported.
 */
type EventModulePath = keyof EventModuleMap;

/**
 * Module ID type used internally by webpack.
 */
type ModuleId = number;

/**
 * Dynamically imports an event module by its relative path.
 * 
 * @param modulePath - The relative path to the module (e.g., './canvas.event.ts')
 * @returns The imported module
 * @throws {ModuleNotFoundError} If the module path is not registered
 * 
 * @example
 *