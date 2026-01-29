export interface EntityOptions<T = any> {
  idAttribute?: string | ((entity: T, parent?: any, key?: string) => string | number);
  mergeStrategy?: (entityA: T, entityB: T) => T;
  processStrategy?: (entity: T, parent?: any, key?: string) => T;
}

export type IdAttributeFunction<T = any> = (entity: T, parent?: any, key?: string) => string | number;
export type MergeStrategyFunction<T = any> = (entityA: T, entityB: T) => T;
export type ProcessStrategyFunction<T = any> = (entity: T, parent?: any, key?: string) => T;
export type NormalizationFunction = (input: any, parent: any, key: string, schema: any, addEntity: AddEntityFunction) => any;
export type DenormalizationFunction = (input: any, schema: any) => any;
export type AddEntityFunction = (schema: Entity, processedEntity: any, originalEntity: any, parent: any, key: string) => void;

export interface SchemaDefinition {
  [key: string]: any;
}

export default class Entity<T = any> {
  private _key: string;
  private _getId: IdAttributeFunction<T>;
  private _idAttribute: string | IdAttributeFunction<T>;
  private _mergeStrategy: MergeStrategyFunction<T>;
  private _processStrategy: ProcessStrategyFunction<T>;
  public schema: SchemaDefinition = {};

  constructor(
    key: string,
    definition: SchemaDefinition = {},
    options: EntityOptions<T> = {}
  ) {
    if (!key || typeof key !== 'string') {
      throw new Error(`Expected a string key for Entity, but found ${key}.`);
    }

    const {
      idAttribute = 'id',
      mergeStrategy = (entityA: T, entityB: T): T => ({ ...entityA, ...entityB }),
      processStrategy = (entity: T): T => ({ ...entity })
    } = options;

    this._key = key;
    this._idAttribute = idAttribute;
    this._mergeStrategy = mergeStrategy;
    this._processStrategy = processStrategy;

    if (typeof idAttribute === 'function') {
      this._getId = idAttribute;
    } else {
      this._getId = (entity: T): string | number => {
        if (isImmutable(entity)) {
          return (entity as any).get(idAttribute);
        }
        return (entity as any)[idAttribute];
      };
    }

    this.define(definition);
  }

  get key(): string {
    return this._key;
  }

  get idAttribute(): string | IdAttributeFunction<T> {
    return this._idAttribute;
  }

  public define(definition: SchemaDefinition): void {
    this.schema = Object.keys(definition).reduce(
      (acc, key) => ({
        ...acc,
        [key]: definition[key]
      }),
      this.schema || {}
    );
  }

  public getId(entity: T, parent?: any, key?: string): string | number {
    return this._getId(entity, parent, key);
  }

  public merge(entityA: T, entityB: T): T {
    return this._mergeStrategy(entityA, entityB);
  }

  public normalize(
    input: any,
    parent: any,
    key: string,
    visit: NormalizationFunction,
    addEntity: AddEntityFunction
  ): string | number {
    const processedEntity = this._processStrategy(input, parent, key);

    Object.keys(this.schema).forEach((schemaKey) => {
      if (
        processedEntity.hasOwnProperty(schemaKey) &&
        typeof processedEntity[schemaKey] === 'object' &&
        processedEntity[schemaKey] !== null
      ) {
        const schemaValue = this.schema[schemaKey];
        processedEntity[schemaKey] = visit(
          processedEntity[schemaKey],
          processedEntity,
          schemaKey,
          schemaValue,
          addEntity
        );
      }
    });

    addEntity(this, processedEntity, input, parent, key);
    return this.getId(input, parent, key);
  }

  public denormalize(entity: T, unvisit: DenormalizationFunction): T {
    if (isImmutable(entity)) {
      return denormalizeImmutable(this.schema, entity, unvisit);
    }

    Object.keys(this.schema).forEach((key) => {
      if ((entity as any).hasOwnProperty(key)) {
        const schemaValue = this.schema[key];
        (entity as any)[key] = unvisit((entity as any)[key], schemaValue);
      }
    });

    return entity;
  }
}

function isImmutable(value: any): boolean {
  return value !== null && typeof value === 'object' && typeof value.get === 'function';
}

function denormalizeImmutable(schema: SchemaDefinition, entity: any, unvisit: DenormalizationFunction): any {
  return entity;
}