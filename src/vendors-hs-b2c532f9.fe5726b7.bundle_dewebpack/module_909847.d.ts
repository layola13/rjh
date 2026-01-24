/**
 * Normalization schema module for managing data structure transformations
 * Provides utilities for normalizing and denormalizing nested data structures
 */

/**
 * Schema definition mapping field names to their normalization rules
 */
export interface SchemaDefinition {
  [key: string]: any;
}

/**
 * Normalization function type that processes a value during normalization
 * @param value - The current value being normalized
 * @param parent - The parent object containing the value
 * @param key - The property key of the value
 * @param schema - The schema definition for this value
 * @param context - Additional context passed through normalization
 * @returns The normalized value or null/undefined to remove the property
 */
export type NormalizeFunction = (
  value: any,
  parent: any,
  key: string,
  schema: any,
  context: any
) => any;

/**
 * Denormalization function type that reconstructs original values
 * @param value - The normalized value
 * @param schema - The schema definition for this value
 * @returns The denormalized value
 */
export type DenormalizeFunction = (value: any, schema: any) => any;

/**
 * Normalizes an object according to a schema definition
 * Processes each field in the schema and applies normalization transformations
 * 
 * @param schema - Schema definition mapping fields to normalization rules
 * @param data - The object to normalize
 * @param key - Current key being processed
 * @param parentSchema - Parent schema context
 * @param normalizeFunc - Function to apply normalization to each field
 * @param context - Additional context for normalization
 * @returns Normalized object with transformed values
 */
export function normalize(
  schema: SchemaDefinition,
  data: Record<string, any>,
  key: string,
  parentSchema: any,
  normalizeFunc: NormalizeFunction,
  context: any
): Record<string, any>;

/**
 * Denormalizes an object from its normalized form
 * Reconstructs the original nested structure using schema definitions
 * Supports both plain objects and Immutable.js data structures
 * 
 * @param schema - Schema definition mapping fields to denormalization rules
 * @param data - The normalized object to denormalize
 * @param denormalizeFunc - Function to apply denormalization to each field
 * @returns Denormalized object with reconstructed nested structures
 */
export function denormalize(
  schema: SchemaDefinition,
  data: Record<string, any>,
  denormalizeFunc: DenormalizeFunction
): Record<string, any>;

/**
 * Schema class for defining and applying normalization/denormalization rules
 * Manages bidirectional transformations between normalized and nested data structures
 */
export default class Schema {
  /**
   * The internal schema definition
   */
  schema: SchemaDefinition;

  /**
   * Creates a new Schema instance
   * @param definition - Object mapping field names to their schema rules
   */
  constructor(definition: SchemaDefinition);

  /**
   * Defines or redefines the schema structure
   * Merges new definitions with existing schema
   * 
   * @param definition - Object mapping field names to their schema rules
   */
  define(definition: SchemaDefinition): void;

  /**
   * Normalizes data according to the schema
   * Delegates to the normalize utility function
   * 
   * @param args - Arguments passed through to the normalize function
   * @returns Normalized data structure
   */
  normalize(...args: any[]): Record<string, any>;

  /**
   * Denormalizes data according to the schema
   * Delegates to the denormalize utility function
   * 
   * @param args - Arguments passed through to the denormalize function
   * @returns Denormalized data structure
   */
  denormalize(...args: any[]): Record<string, any>;
}