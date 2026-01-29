import Schema from './Schema';

class ObjectSchema extends Schema {
  normalize(
    entity: Record<string, any>,
    parent: any,
    key: string,
    visit: (value: any, parent: any, key: string, schema: any, addEntity: any) => any,
    addEntity: (schema: any, entity: any, parent: any, key: string) => void
  ): Record<string, any> {
    return Object.keys(entity).reduce((acc, entityKey) => {
      const value = entity[entityKey];
      
      if (value == null) {
        return acc;
      }
      
      return {
        ...acc,
        [entityKey]: this.normalizeValue(value, entity, entityKey, visit, addEntity)
      };
    }, {});
  }

  denormalize(
    entity: Record<string, any>,
    unvisit: (value: any, schema: any) => any
  ): Record<string, any> {
    return Object.keys(entity).reduce((acc, key) => {
      const value = entity[key];
      
      return {
        ...acc,
        [key]: this.denormalizeValue(value, unvisit)
      };
    }, {});
  }
}

export default ObjectSchema;