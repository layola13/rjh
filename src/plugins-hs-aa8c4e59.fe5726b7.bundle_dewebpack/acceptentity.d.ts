/**
 * Entity that accepts and processes data with build capabilities
 * Provides promise-based entity wrapping utilities
 */

import { Entity } from './Entity';

/**
 * Result of building entity data
 * Can be synchronous or asynchronous (Promise-based)
 */
export type BuildResult<T = unknown> = T | Promise<T>;

/**
 * Entity that can accept and build data from a source
 * Extends base Entity with build and acceptance capabilities
 */
export declare class AcceptEntity extends Entity {
  /**
   * Cached result from the last build operation
   */
  private _buildResult?: BuildResult;

  /**
   * Original source data that was accepted
   */
  source?: unknown;

  /**
   * Gets the result of the last build operation
   * @returns The build result, which may be a Promise
   */
  getBuildResult(): BuildResult | undefined;

  /**
   * Accepts source data and builds the entity
   * Sets legal=false and errorMsg if building fails
   * 
   * @param source - The source data to accept and process
   * @param context - Additional context for building (optional)
   * @returns This entity instance for chaining
   */
  accept(source: unknown, context?: unknown): this;

  /**
   * Builds entity data from source
   * Must be implemented by subclasses
   * 
   * @param source - The source data to build from
   * @param context - Additional build context
   * @returns Build result (sync or async)
   */
  protected buildEntityData(source: unknown, context?: unknown): BuildResult;

  /**
   * Builds child entities
   * Must be implemented by subclasses
   * 
   * @param source - The source data
   * @param context - Additional build context
   */
  protected buildChildren(source: unknown, context?: unknown): void;
}

/**
 * Wraps a single entity, resolving any pending build promises
 * Returns the entity once all AcceptEntity build results are resolved
 * 
 * @param entity - Entity to wrap and wait for
 * @returns The entity itself, or a Promise resolving to the entity
 */
export declare function wrapPromiseEntity<T extends Entity>(
  entity: T
): T | Promise<T>;

/**
 * Wraps multiple entities, resolving all pending build promises
 * If any entity has pending promises, waits for all to complete
 * Otherwise returns the array synchronously
 * 
 * @param entities - Array of entities to wrap
 * @returns Entities array or Promise resolving to entities array
 */
export declare function wrapPromiseEntities<T extends Entity>(
  entities: T[]
): T[] | Promise<T[]>;