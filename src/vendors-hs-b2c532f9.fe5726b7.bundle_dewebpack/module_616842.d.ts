/**
 * Represents a schema union that can handle multiple schemas or a single schema.
 * Used for normalizing and denormalizing data based on schema attributes.
 */
export default class SchemaUnion<T = any, S = any> {
  /**
   * The schema definition. Can be a single schema or a map of schemas keyed by schema attribute.
   */
  public schema: S;

  /**
   * Optional function to extract the schema attribute from an entity.
   * If not provided, this union represents a single schema.
   */
  private _schemaAttribute?: (entity: T, parent?: any, key?: string) => string;

  /**
   * Creates a new SchemaUnion instance.
   * @param schema - The schema or map of schemas to use
   * @param schemaAttribute - Either a string property name or a function to determine which schema to use
   */
  constructor(
    schema: S,
    schemaAttribute?: string | ((entity: T, parent?: any, key?: string) => string)
  );

  /**
   * Defines or updates the schema for this union.
   * @param schema - The schema definition to set
   */
  define(schema: S): void;

  /**
   * Gets the schema attribute value for a given entity.
   * Returns undefined if this is a single schema union.
   * @param entity - The entity to get the schema attribute from
   * @param parent - The parent object containing the entity
   * @param key - The key of the entity in the parent
   * @returns The schema attribute value, or undefined for single schemas
   */
  getSchemaAttribute(entity: T, parent?: any, key?: string): string | undefined;

  /**
   * Infers which schema to use for a given entity.
   * @param entity - The entity to infer the schema for
   * @param parent - The parent object containing the entity
   * @param key - The key of the entity in the parent
   * @returns The appropriate schema for the entity
   */
  inferSchema(entity: T, parent?: any, key?: string): any;

  /**
   * Normalizes a value using the appropriate schema.
   * @param value - The value to normalize
   * @param parent - The parent object containing the value
   * @param key - The key of the value in the parent
   * @param normalize - The normalization function to apply
   * @param visitedEntities - Map of already visited entities to handle circular references
   * @returns The normalized value, potentially wrapped with schema information
   */
  normalizeValue(
    value: T,
    parent: any,
    key: string,
    normalize: (value: T, parent: any, key: string, schema: any, visitedEntities: any) => any,
    visitedEntities: any
  ): any;

  /**
   * Denormalizes a value back to its original form.
   * @param value - The normalized value or object with id and schema
   * @param denormalize - The denormalization function to apply
   * @returns The denormalized value
   */
  denormalizeValue(
    value: { id: any; schema?: string } | any,
    denormalize: (id: any, schema: any) => any
  ): any;

  /**
   * Whether this union represents a single schema or multiple schemas.
   * Returns true if no schema attribute function was provided.
   */
  get isSingleSchema(): boolean;
}