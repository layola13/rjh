type SchemaAttributeSelector<T = any> = (entity: T, parent: any, key: string) => string;

interface NormalizedValue {
  id: any;
  schema: string;
}

interface Schema {
  [key: string]: any;
}

export default class UnionSchema<T = any> {
  private _schemaAttribute?: SchemaAttributeSelector<T>;
  private schema!: Schema | any;

  constructor(
    definition: Schema | any,
    schemaAttribute?: string | SchemaAttributeSelector<T>
  ) {
    if (schemaAttribute) {
      this._schemaAttribute = typeof schemaAttribute === 'string'
        ? (entity: T) => (entity as any)[schemaAttribute]
        : schemaAttribute;
    }
    this.define(definition);
  }

  get isSingleSchema(): boolean {
    return !this._schemaAttribute;
  }

  define(definition: Schema | any): void {
    this.schema = definition;
  }

  getSchemaAttribute(entity: T, parent: any, key: string): string {
    if (this.isSingleSchema || !this._schemaAttribute) {
      return '';
    }
    return this._schemaAttribute(entity, parent, key);
  }

  inferSchema(entity: T, parent: any, key: string): any {
    if (this.isSingleSchema) {
      return this.schema;
    }
    const schemaKey = this.getSchemaAttribute(entity, parent, key);
    return this.schema[schemaKey];
  }

  normalizeValue(
    entity: T,
    parent: any,
    key: string,
    visit: (entity: T, parent: any, key: string, schema: any, addEntity: any) => any,
    addEntity: any
  ): any | NormalizedValue {
    const schema = this.inferSchema(entity, parent, key);
    if (!schema) {
      return entity;
    }
    const normalizedId = visit(entity, parent, key, schema, addEntity);
    if (this.isSingleSchema || normalizedId == null) {
      return normalizedId;
    }
    return {
      id: normalizedId,
      schema: this.getSchemaAttribute(entity, parent, key)
    };
  }

  denormalizeValue(
    value: any | NormalizedValue,
    unvisit: (id: any, schema: any) => any
  ): any {
    if (!this.isSingleSchema && !value.schema) {
      return value;
    }
    const schema = this.isSingleSchema ? this.schema : this.schema[value.schema];
    const id = value.id ?? value;
    return unvisit(id, schema);
  }
}