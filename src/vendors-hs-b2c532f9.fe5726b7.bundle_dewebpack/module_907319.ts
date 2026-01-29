import Schema from './Schema';

interface SchemaDefinition<T = unknown> {
  [key: string]: T;
}

type EntityOrArray<T> = T | T[];

const getFirstSchema = <T>(schema: T | T[]): T => {
  if (Array.isArray(schema) && schema.length > 1) {
    throw new Error(
      `Expected schema definition to be a single schema, but found ${schema.length}.`
    );
  }
  return Array.isArray(schema) ? schema[0] : schema;
};

const ensureArray = <T>(data: EntityOrArray<T> | SchemaDefinition<T>): T[] => {
  return Array.isArray(data) 
    ? data 
    : Object.keys(data).map((key) => data[key]);
};

export const normalize = <T, S>(
  schema: S | S[],
  data: EntityOrArray<T> | SchemaDefinition<T>,
  parent: unknown,
  parentKey: string,
  normalizeEntity: (entity: T, parent: unknown, parentKey: string, schema: S, visited: Set<unknown>) => unknown,
  visited: Set<unknown>
): unknown[] => {
  const normalizedSchema = getFirstSchema(schema);
  const dataArray = ensureArray(data);
  
  return dataArray.map((entity, index) => {
    return normalizeEntity(entity, parent, parentKey, normalizedSchema, visited);
  });
};

export const denormalize = <T, S>(
  schema: S | S[],
  data: unknown[] | null | undefined,
  denormalizeEntity: (id: unknown, schema: S) => T
): T[] | null | undefined => {
  const normalizedSchema = getFirstSchema(schema);
  
  if (data && Array.isArray(data)) {
    return data.map((id) => {
      return denormalizeEntity(id, normalizedSchema);
    });
  }
  
  return data;
};

export default class ArraySchema<T = unknown> extends Schema {
  /**
   * Normalize an array of entities
   */
  normalize(
    data: EntityOrArray<T> | SchemaDefinition<T>,
    parent: unknown,
    parentKey: string,
    visit: (entity: T, parent: unknown, parentKey: string, schema: ArraySchema<T>, visited: Set<unknown>) => unknown,
    addEntity: Set<unknown>
  ): unknown[] {
    const dataArray = ensureArray(data);
    
    return dataArray
      .map((entity, index) => {
        return this.normalizeValue(entity, parent, parentKey, visit, addEntity);
      })
      .filter((value) => value != null);
  }

  /**
   * Denormalize an array of entity IDs
   */
  denormalize(
    data: unknown[] | null | undefined,
    unvisit: (id: unknown, schema: Schema) => T
  ): T[] | null | undefined {
    if (data && Array.isArray(data)) {
      return data.map((id) => {
        return this.denormalizeValue(id, unvisit);
      });
    }
    
    return data;
  }
}