/**
 * BOM (Bill of Materials) database for querying and managing hierarchical entity data
 * @module BomDateBase
 */

import { BomData, Entity } from './types';

/**
 * Options for entity matching and traversal
 */
export interface EntityMatchOption {
  /** Whether to recursively traverse child entities */
  recursion?: boolean;
  /** Stop recursion when a match is found */
  hitStopRecursion?: boolean;
  [key: string]: unknown;
}

/**
 * Predicate function for filtering entities
 */
export interface EntityPredicate {
  /**
   * Execute the predicate on an entity
   * @param entity - The entity to test
   * @returns true if the entity matches the predicate
   */
  execute(entity: Entity): boolean;
}

/**
 * Result of grouping entities by a key
 */
export interface GroupResult<TKey, TEntity> {
  /** The key used for grouping */
  groupKey: TKey;
  /** Entities belonging to this group */
  entities: TEntity[];
}

/**
 * Function to extract a grouping key from an entity
 */
export type KeyExtractor<T, K> = (item: T) => K;

/**
 * Equality comparison function for group keys
 */
export type EqualityComparer<T> = (a: T, b: T) => boolean;

/**
 * Input type for entity queries - can be BomData, Entity, or Entity array
 */
export type EntityInput = BomData | Entity | Entity[];

/**
 * BOM database class for querying and manipulating bill of materials data
 */
export declare class BomDateBase {
  private readonly bomData: BomData;

  /**
   * Creates a new BomDateBase instance
   * @param bomData - The BOM data to query
   */
  constructor(bomData: BomData);

  /**
   * Normalize input to an array of entities
   * @param input - BomData, Entity, or Entity array
   * @returns Array of entities
   */
  getEntities(input: EntityInput): Entity[];

  /**
   * Retrieve a specific entity by ID
   * @param entityId - The unique identifier of the entity
   * @returns The entity with the given ID
   */
  getEntity(entityId: string): Entity | undefined;

  /**
   * Find all entities matching a predicate
   * @param input - The data source to search
   * @param predicate - Filtering predicate
   * @param options - Search options (recursion, etc.)
   * @returns Array of matching entities
   */
  findAll(
    input: EntityInput,
    predicate: EntityPredicate,
    options?: EntityMatchOption
  ): Entity[];

  /**
   * Find the first entity matching a predicate
   * @param input - The data source to search
   * @param predicate - Filtering predicate
   * @param options - Search options (recursion, etc.)
   * @returns The first matching entity or undefined
   */
  find(
    input: EntityInput,
    predicate: EntityPredicate,
    options?: EntityMatchOption
  ): Entity | undefined;

  /**
   * Group entities by a key extractor function
   * @param input - The data source
   * @param keyExtractor - Function to extract grouping key
   * @param equalityComparer - Optional custom equality comparer
   * @param predicate - Optional filter predicate
   * @param options - Optional match options
   * @returns Array of grouped results
   */
  groupBy<K>(
    input: EntityInput,
    keyExtractor: KeyExtractor<Entity, K>,
    equalityComparer?: EqualityComparer<K>,
    predicate?: EntityPredicate,
    options?: EntityMatchOption
  ): GroupResult<K, Entity>[];

  /**
   * Count entities matching a predicate
   * @param input - The data source
   * @param predicate - Filtering predicate
   * @param options - Search options
   * @returns Number of matching entities
   */
  count(
    input: EntityInput,
    predicate: EntityPredicate,
    options?: EntityMatchOption
  ): number;
}

/**
 * Group items by a key with custom equality comparison
 * @param items - Items to group
 * @param keyExtractor - Function to extract grouping key
 * @param equalityComparer - Optional equality comparer (defaults to ===)
 * @returns Array of grouped results
 */
export declare function groupBy<T, K>(
  items: T[],
  keyExtractor: KeyExtractor<T, K>,
  equalityComparer?: EqualityComparer<K>
): GroupResult<K, T>[];

/**
 * Group items by string key (optimized with Map)
 * @param items - Items to group
 * @param keyExtractor - Function to extract string key
 * @returns Map of keys to entity arrays
 */
export declare function groupByStringKey<T>(
  items: T[],
  keyExtractor: KeyExtractor<T, string>
): Map<string, T[]>;

/**
 * Count the number of items in an array
 * @param items - Array to count
 * @returns Number of items
 */
export declare function count<T>(items: T[]): number;