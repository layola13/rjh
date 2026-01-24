/**
 * Module: module_set
 * Original ID: set
 * 
 * A utility module that processes an entity through a predefined handler.
 */

/**
 * Processes an entity using the registered processor function.
 * 
 * @template T - The type of entity being processed
 * @param entity - The entity to be processed
 * @returns The result of processing, if any
 */
declare function processEntity<T = unknown>(entity: T): void;

/**
 * Type alias for the entity processor function.
 * 
 * @template T - The type of entity being processed
 */
type EntityProcessor<T = unknown> = (entity: T) => void;

/**
 * Registers or retrieves the processor function for entities.
 * Commonly used in module initialization or dependency injection scenarios.
 */
declare const p: EntityProcessor;

export { processEntity, EntityProcessor, p };
export default processEntity;