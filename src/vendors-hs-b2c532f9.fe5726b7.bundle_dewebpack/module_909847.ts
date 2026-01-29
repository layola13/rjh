import * as ImmutableUtils from './immutable-utils';

interface SchemaDefinition {
  [key: string]: any;
}

interface NormalizedEntity {
  [key: string]: any;
}

type NormalizeVisitor = (
  value: any,
  parent: any,
  key: string,
  schema: any,
  context: any
) => any;

type DenormalizeVisitor = (value: any, schema: any) => any;

export const normalize = (
  schema: SchemaDefinition,
  entity: NormalizedEntity,
  context: any,
  recurse: any,
  visit: NormalizeVisitor,
  visitContext: any
): NormalizedEntity => {
  const normalized = { ...entity };

  Object.keys(schema).forEach((key) => {
    const schemaValue = schema[key];
    const visitedValue = visit(entity[key], entity, key, schemaValue, visitContext);

    if (visitedValue == null) {
      delete normalized[key];
    } else {
      normalized[key] = visitedValue;
    }
  });

  return normalized;
};

export const denormalize = (
  schema: SchemaDefinition,
  entity: NormalizedEntity,
  unvisit: DenormalizeVisitor
): NormalizedEntity => {
  if (ImmutableUtils.isImmutable(entity)) {
    return ImmutableUtils.denormalizeImmutable(schema, entity, unvisit);
  }

  const denormalized = { ...entity };

  Object.keys(schema).forEach((key) => {
    if (denormalized[key]) {
      denormalized[key] = unvisit(denormalized[key], schema[key]);
    }
  });

  return denormalized;
};

export default class ObjectSchema {
  schema: SchemaDefinition;

  constructor(definition: SchemaDefinition) {
    this.define(definition);
  }

  define(definition: SchemaDefinition): void {
    this.schema = Object.keys(definition).reduce((acc, key) => {
      const value = definition[key];
      return {
        ...acc,
        [key]: value
      };
    }, this.schema ?? {});
  }

  normalize(...args: any[]): NormalizedEntity {
    return normalize(this.schema, ...args);
  }

  denormalize(...args: any[]): NormalizedEntity {
    return denormalize(this.schema, ...args);
  }
}