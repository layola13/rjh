/**
 * Data normalization and denormalization utilities for schema-based data transformation.
 * @module normalization
 */

/**
 * Schema definition type - can be a single schema or array of schemas
 */
type SchemaDefinition<T = any> = T | T[];

/**
 * Entity type representing normalized data structure
 */
type Entity = Record<string, any>;

/**
 * Normalization result containing entities and their relationships
 */
interface NormalizedData {
  entities: Record<string, Record<string, Entity>>;
  result: any;
}

/**
 * Normalize function signature for processing individual values
 */
type NormalizeValueFunction = (
  value: any,
  parent: Entity,
  key: string,
  schema: any,
  addEntity: Function
) => any;

/**
 * Denormalize function signature for reconstructing values from normalized data
 */
type DenormalizeValueFunction = (id: any, schema: any) => any;

/**
 * Normalizes an array or object of data according to the provided schema.
 * Converts nested data structures into a flat structure with entity references.
 * 
 * @param schema - Schema definition (should be a single schema, not an array)
 * @param data - Data to normalize (array or object)
 * @param parent - Parent entity context
 * @param key - Key in parent entity
 * @param normalizeValue - Function to normalize individual values
 * @param addEntity - Function to add entities to the normalized structure
 * @returns Array of normalized entity identifiers
 */
export function normalize(
  schema: SchemaDefinition,
  data: any[] | Record<string, any>,
  parent: Entity,
  key: string,
  normalizeValue: NormalizeValueFunction,
  addEntity: Function
): any[];

/**
 * Denormalizes data by reconstructing the original nested structure from flat entities.
 * Converts entity references back into full nested objects.
 * 
 * @param schema - Schema definition used for denormalization
 * @param data - Normalized data (typically array of IDs or entity references)
 * @param denormalizeValue - Function to denormalize individual values
 * @returns Reconstructed data structure or original data if not normalizable
 */
export function denormalize(
  schema: SchemaDefinition,
  data: any[] | any,
  denormalizeValue: DenormalizeValueFunction
): any[] | any;

/**
 * Base schema class for array-like data structures.
 * Handles normalization and denormalization of collections.
 */
export default class ArraySchema {
  /**
   * Normalizes an array or collection of entities.
   * Filters out null/undefined values from the result.
   * 
   * @param data - Data to normalize (array or object)
   * @param parent - Parent entity context
   * @param key - Key in parent entity
   * @param schema - Schema definition
   * @param addEntity - Function to add entities to normalized structure
   * @returns Array of normalized values with nulls filtered out
   */
  normalize(
    data: any[] | Record<string, any>,
    parent: Entity,
    key: string,
    schema: any,
    addEntity: Function
  ): any[];

  /**
   * Denormalizes an array of entity references back to full entities.
   * 
   * @param data - Normalized data (array of IDs or references)
   * @param denormalizeValue - Function to denormalize individual values
   * @returns Denormalized array or original data if not an array
   */
  denormalize(
    data: any[] | any,
    denormalizeValue: DenormalizeValueFunction
  ): any[] | any;

  /**
   * Normalizes a single value within the collection.
   * Should be implemented by subclasses.
   * 
   * @param value - Individual value to normalize
   * @param parent - Parent entity context
   * @param key - Key in parent entity
   * @param schema - Schema definition
   * @param addEntity - Function to add entities to normalized structure
   * @returns Normalized value representation
   */
  protected normalizeValue(
    value: any,
    parent: Entity,
    key: string,
    schema: any,
    addEntity: Function
  ): any;

  /**
   * Denormalizes a single value from the collection.
   * Should be implemented by subclasses.
   * 
   * @param id - Entity identifier or reference
   * @param denormalizeValue - Function to denormalize the value
   * @returns Denormalized entity
   */
  protected denormalizeValue(
    id: any,
    denormalizeValue: DenormalizeValueFunction
  ): any;
}