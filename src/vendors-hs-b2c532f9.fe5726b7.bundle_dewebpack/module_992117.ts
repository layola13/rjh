import type { Schema } from './types';

type Primitive = string | number | boolean | null | undefined;

interface NormalizeOptions {
  normalize?: (value: any, parent: any, key: string, visit: VisitFunction, addEntity: AddEntityFunction) => any;
}

interface DenormalizeOptions {
  denormalize?: (id: any, unvisit: UnvisitFunction) => any;
  getId?: (entity: any) => string | number;
  key?: string;
}

type VisitFunction = (value: any, parent: any, key: string, schema: any, addEntity: AddEntityFunction) => any;
type UnvisitFunction = (id: any, schema: any) => any;
type AddEntityFunction = (entity: any) => void;

interface EntityCache {
  [key: string]: {
    [id: string]: any;
  };
}

interface ImmutableEntity {
  getIn(path: Array<string | number>): any;
}

const isImmutable = (value: any): value is ImmutableEntity => {
  return value && typeof value.getIn === 'function';
};

const getTypeOf = (value: any): string => {
  return typeof value === 'symbol' 
    ? 'symbol' 
    : (value && typeof Symbol === 'function' && value.constructor === Symbol && value !== Symbol.prototype 
        ? 'symbol' 
        : typeof value);
};

const objectAssign = Object.assign || function<T extends object>(target: T, ...sources: any[]): T {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        (target as any)[key] = source[key];
      }
    }
  }
  return target;
};

export const normalize = (
  value: any,
  parent: any,
  key: string,
  schema: any,
  addEntity: AddEntityFunction
): any => {
  if (typeof value !== 'object' || !value) {
    return value;
  }

  if (typeof schema !== 'object' || (schema.normalize && typeof schema.normalize === 'function')) {
    return schema.normalize(value, parent, key, normalize, addEntity);
  }

  if (Array.isArray(schema)) {
    return normalizeArray(schema, value, parent, key, normalize, addEntity);
  }

  return normalizeObject(schema, value, parent, key, normalize, addEntity);
};

const normalizeArray = (
  schema: any[],
  value: any,
  parent: any,
  key: string,
  visit: VisitFunction,
  addEntity: AddEntityFunction
): any => {
  // Implementation would be imported from external module
  throw new Error('Not implemented');
};

const normalizeObject = (
  schema: any,
  value: any,
  parent: any,
  key: string,
  visit: VisitFunction,
  addEntity: AddEntityFunction
): any => {
  // Implementation would be imported from external module
  throw new Error('Not implemented');
};

const createEntityGetter = (entities: any) => {
  const isImmutableEntities = isImmutable(entities);

  return (id: string | number, schema: DenormalizeOptions): any => {
    const key = schema.key;
    if (!key) {
      return typeof id === 'object' ? id : undefined;
    }

    if (typeof id === 'object') {
      return id;
    }

    if (isImmutableEntities) {
      return entities.getIn([key, id.toString()]);
    }

    return entities[key]?.[id];
  };
};

export const denormalize = (entities: any) => {
  const entityCache: EntityCache = {};
  const getEntity = createEntityGetter(entities);

  const unvisit = (id: any, schema: any): any => {
    if (typeof schema !== 'object' || (schema.denormalize && typeof schema.denormalize === 'function')) {
      if (id == null) {
        return id;
      }

      if (schema && typeof schema.getId === 'function') {
        return denormalizeEntity(id, schema, unvisit, getEntity, entityCache);
      }

      return schema.denormalize(id, unvisit);
    }

    if (Array.isArray(schema)) {
      return denormalizeArray(schema, id, unvisit);
    }

    return denormalizeObject(schema, id, unvisit);
  };

  return unvisit;
};

const denormalizeEntity = (
  id: string | number,
  schema: DenormalizeOptions & { getId: (entity: any) => string | number; key: string },
  unvisit: UnvisitFunction,
  getEntity: (id: string | number, schema: any) => any,
  cache: EntityCache
): any => {
  const entity = getEntity(id, schema);

  if (typeof entity !== 'object' || entity === null) {
    return entity;
  }

  const entityId = schema.getId(entity);
  const key = schema.key;

  if (!cache[key]) {
    cache[key] = {};
  }

  if (!cache[key][entityId]) {
    const clonedEntity = isImmutable(entity) 
      ? entity 
      : objectAssign({}, entity);

    cache[key][entityId] = clonedEntity;
    cache[key][entityId] = schema.denormalize!(clonedEntity, unvisit);
  }

  return cache[key][entityId];
};

const denormalizeArray = (schema: any[], id: any, unvisit: UnvisitFunction): any => {
  // Implementation would be imported from external module
  throw new Error('Not implemented');
};

const denormalizeObject = (schema: any, id: any, unvisit: UnvisitFunction): any => {
  // Implementation would be imported from external module
  throw new Error('Not implemented');
};