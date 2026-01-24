/**
 * Event module registry for dynamic event imports
 * Provides type-safe access to event modules including logcollector and save events
 */

/**
 * Module path mapping for event modules
 */
export interface EventModuleMap {
  './logcollector.event.ts': 572236;
  './save.event.ts': 524572;
}

/**
 * Valid event module paths
 */
export type EventModulePath = keyof EventModuleMap;

/**
 * Event module IDs
 */
export type EventModuleId = EventModuleMap[EventModulePath];

/**
 * Dynamically imports an event module by its path
 * @param modulePath - The relative path to the event module
 * @returns The loaded event module
 * @throws {ModuleNotFoundError} When the specified module path does not exist
 */
export function requireEventModule(modulePath: EventModulePath): unknown;

/**
 * Resolves an event module path to its internal module ID
 * @param modulePath - The relative path to the event module
 * @returns The internal module identifier
 * @throws {ModuleNotFoundError} When the specified module path does not exist
 */
export function resolveEventModule(modulePath: EventModulePath): EventModuleId;

/**
 * Gets all available event module paths
 * @returns Array of registered event module paths
 */
export function getEventModuleKeys(): EventModulePath[];

/**
 * The internal context module identifier
 */
export const CONTEXT_MODULE_ID = 274228;

/**
 * Error thrown when a requested module cannot be found
 */
export interface ModuleNotFoundError extends Error {
  code: 'MODULE_NOT_FOUND';
  message: string;
}