/**
 * UnionSchema class for normalizing and denormalizing union types in data schemas.
 * Extends a base Schema class to provide specialized handling for union type entities.
 */

/**
 * Options for configuring a UnionSchema instance.
 */
export interface UnionSchemaOptions {
  /**
   * The attribute name used to discriminate between different types in the union.
   * This attribute's value determines which schema to use for normalization/denormalization.
   */
  schemaAttribute: string;
  
  /**
   * Additional schema-specific options.
   */
  [key: string]: unknown;
}

/**
 * UnionSchema provides normalization and denormalization for union type entities.
 * It requires a schemaAttribute to determine which specific schema to apply.
 * 
 * @example
 *