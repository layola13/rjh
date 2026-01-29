function isSchemaAttributeUndefined(this: { _schemaAttribute?: unknown }): boolean {
    return !this._schemaAttribute;
}