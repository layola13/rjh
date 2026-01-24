/**
 * Entity schema class for normalization and denormalization of data structures.
 * Provides mechanisms for defining entity relationships, ID extraction, and merge strategies.
 */

/**
 * Strategy function for merging two entity objects.
 * @param existingEntity - The existing entity in the store
 * @param newEntity - The new entity data to merge
 * @returns The merged entity object
 */
type MergeStrategy = (existingEntity: any, newEntity: any) => any;

/**
 * Strategy function for processing entity data before normalization.
 * @param entity - The raw entity data
 * @param parent - The parent object containing this entity
 * @param key - The key in the parent object
 * @returns The processed entity object
 */
type ProcessStrategy = (entity: any, parent: any, key: string) => any;

/**
 * Function to extract the ID from an entity.
 * @param entity - The entity object
 * @param parent - The parent object containing this entity
 * @param key - The key in the parent object
 * @returns The entity's ID
 */
type IdAttributeFunction = (entity: any, parent: any, key: string) => string | number;

/**
 * Configuration options for Entity schema.
 */
interface EntityOptions {
  /**
   * The attribute name or function to extract entity ID.
   * Defaults to "id".
   */
  idAttribute?: string | IdAttributeFunction;

  /**
   * Strategy for merging existing and new entity data.
   * Defaults to shallow merge.
   */
  mergeStrategy?: MergeStrategy;

  /**
   * Strategy for processing entity data before normalization.
   * Defaults to shallow copy.
   */
  processStrategy?: ProcessStrategy;
}

/**
 * Schema definition for entity relationships.
 */
interface SchemaDefinition {
  [key: string]: any;
}

/**
 * Normalization visitor function.
 */
type NormalizeVisitor = (
  entity: any,
  parent: any,
  key: string,
  schema: any,
  addEntity: AddEntityFunction
) => any;

/**
 * Function to add normalized entity to the store.
 */
type AddEntityFunction = (
  schema: Entity,
  processedEntity: any,
  originalEntity: any,
  parent: any,
  key: string
) => void;

/**
 * Denormalization visitor function.
 */
type DenormalizeVisitor = (id: any, schema: any) => any;

/**
 * Entity schema class for defining and managing normalized data structures.
 * Handles normalization, denormalization, ID extraction, and entity merging.
 */
export default class Entity {
  private readonly _key: string;
  private readonly _getId: IdAttributeFunction;
  private readonly _idAttribute: string | IdAttributeFunction;
  private readonly _mergeStrategy: MergeStrategy;
  private readonly _processStrategy: ProcessStrategy;
  private schema: SchemaDefinition;

  /**
   * Creates a new Entity schema.
   * @param key - Unique identifier for this entity type
   * @param definition - Schema definition for nested relationships
   * @param options - Configuration options for the entity
   * @throws {TypeError} If not called with 'new' keyword
   * @throws {Error} If key is not a string
   */
  constructor(
    key: string,
    definition: SchemaDefinition = {},
    options: EntityOptions = {}
  ) {
    if (!key || typeof key !== "string") {
      throw new Error(`Expected a string key for Entity, but found ${key}.`);
    }

    const {
      idAttribute = "id",
      mergeStrategy = (existingEntity: any, newEntity: any) => ({
        ...existingEntity,
        ...newEntity,
      }),
      processStrategy = (entity: any) => ({ ...entity }),
    } = options;

    this._key = key;
    this._idAttribute = idAttribute;
    this._mergeStrategy = mergeStrategy;
    this._processStrategy = processStrategy;

    // Create ID extraction function
    this._getId =
      typeof idAttribute === "function"
        ? idAttribute
        : (entity: any): string | number => {
            // Support for Immutable.js
            const isImmutable = entity && typeof entity.get === "function";
            return isImmutable ? entity.get(idAttribute) : entity[idAttribute];
          };

    this.define(definition);
  }

  /**
   * The unique key identifying this entity type.
   */
  get key(): string {
    return this._key;
  }

  /**
   * The ID attribute name or function.
   */
  get idAttribute(): string | IdAttributeFunction {
    return this._idAttribute;
  }

  /**
   * Defines the schema for nested entity relationships.
   * @param definition - Object mapping property names to their schemas
   */
  define(definition: SchemaDefinition): void {
    this.schema = Object.keys(definition).reduce(
      (acc, propertyName) => ({
        ...acc,
        [propertyName]: definition[propertyName],
      }),
      this.schema || {}
    );
  }

  /**
   * Extracts the ID from an entity.
   * @param entity - The entity object
   * @param parent - The parent object containing this entity
   * @param key - The key in the parent object
   * @returns The entity's ID
   */
  getId(entity: any, parent: any, key: string): string | number {
    return this._getId(entity, parent, key);
  }

  /**
   * Merges existing entity data with new entity data.
   * @param existingEntity - The existing entity in the store
   * @param newEntity - The new entity data
   * @returns The merged entity
   */
  merge(existingEntity: any, newEntity: any): any {
    return this._mergeStrategy(existingEntity, newEntity);
  }

  /**
   * Normalizes an entity and its nested relationships.
   * @param entity - The entity to normalize
   * @param parent - The parent object containing this entity
   * @param key - The key in the parent object
   * @param visit - Visitor function for recursive normalization
   * @param addEntity - Function to add normalized entity to store
   * @returns The entity's ID
   */
  normalize(
    entity: any,
    parent: any,
    key: string,
    visit: NormalizeVisitor,
    addEntity: AddEntityFunction
  ): string | number {
    const processedEntity = this._processStrategy(entity, parent, key);

    // Normalize nested schemas
    Object.keys(this.schema).forEach((schemaKey) => {
      if (
        processedEntity.hasOwnProperty(schemaKey) &&
        typeof processedEntity[schemaKey] === "object" &&
        processedEntity[schemaKey] !== null
      ) {
        const nestedSchema = this.schema[schemaKey];
        processedEntity[schemaKey] = visit(
          processedEntity[schemaKey],
          processedEntity,
          schemaKey,
          nestedSchema,
          addEntity
        );
      }
    });

    addEntity(this, processedEntity, entity, parent, key);
    return this.getId(entity, parent, key);
  }

  /**
   * Denormalizes an entity by resolving its nested relationships.
   * @param entity - The normalized entity or Immutable entity
   * @param unvisit - Visitor function for recursive denormalization
   * @returns The denormalized entity with resolved relationships
   */
  denormalize(entity: any, unvisit: DenormalizeVisitor): any {
    // Check if using Immutable.js
    const isImmutable = entity && typeof entity.get === "function";

    if (isImmutable) {
      // Immutable.js denormalization (delegated to utility)
      return this.denormalizeImmutable(this.schema, entity, unvisit);
    }

    // Plain object denormalization
    Object.keys(this.schema).forEach((schemaKey) => {
      if (entity.hasOwnProperty(schemaKey)) {
        const nestedSchema = this.schema[schemaKey];
        entity[schemaKey] = unvisit(entity[schemaKey], nestedSchema);
      }
    });

    return entity;
  }

  /**
   * Denormalizes an Immutable.js entity.
   * @param schema - The schema definition
   * @param entity - The Immutable entity
   * @param unvisit - Visitor function for denormalization
   * @returns The denormalized Immutable entity
   * @private
   */
  private denormalizeImmutable(
    schema: SchemaDefinition,
    entity: any,
    unvisit: DenormalizeVisitor
  ): any {
    // Placeholder for Immutable.js denormalization logic
    // This would typically be imported from a utility module
    return entity;
  }
}