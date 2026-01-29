import Schema from './Schema';

interface UnionSchemaOptions {
  schemaAttribute: string;
  [key: string]: unknown;
}

export default class UnionSchema extends Schema {
  constructor(definitions: unknown, options?: UnionSchemaOptions) {
    super(definitions, options);

    if (!options) {
      throw new Error('Expected option "schemaAttribute" not found on UnionSchema.');
    }
  }

  normalize(
    entity: unknown,
    parent: unknown,
    key: string,
    visit: unknown,
    addEntity: unknown
  ): unknown {
    return this.normalizeValue(entity, parent, key, visit, addEntity);
  }

  denormalize(entity: unknown, unvisit: unknown): unknown {
    return this.denormalizeValue(entity, unvisit);
  }
}