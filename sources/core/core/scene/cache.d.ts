/**
 * Cache module for managing entities with unique identifiers
 * @module Cache
 */

/**
 * Interface representing a cacheable entity
 */
export interface CacheableEntity {
  /** Unique identifier for the entity */
  id: string;
  /** Optional tag for the entity, used in logging */
  tag?: string;
}

/**
 * Generic cache implementation for storing and managing entities
 * @template T - Type of entities stored in the cache, must extend CacheableEntity
 */
export declare class Cache<T extends CacheableEntity = CacheableEntity> {
  /**
   * Logger instance for this cache
   */
  private readonly logger: unknown;

  /**
   * Internal cache name
   */
  private readonly _name?: string;

  /**
   * Internal storage for cached entities, keyed by entity ID
   */
  private _cache: Record<string, T>;

  /**
   * Creates a new Cache instance
   * @param name - Optional name for the cache, defaults to "HSCore.Cache"
   */
  constructor(name?: string);

  /**
   * Gets the name of this cache
   * @returns The cache name, or "HSCore.Cache" if not specified
   */
  get cacheName(): string;

  /**
   * Adds an entity to the cache
   * Logs a warning in DEBUG mode if an entity with the same ID already exists
   * @param entity - The entity to add to the cache
   */
  add(entity: T): void;

  /**
   * Retrieves all cached entities
   * @returns A record of all entities keyed by their IDs
   */
  getAll(): Record<string, T>;

  /**
   * Clears all entities from the cache
   */
  clear(): void;
}