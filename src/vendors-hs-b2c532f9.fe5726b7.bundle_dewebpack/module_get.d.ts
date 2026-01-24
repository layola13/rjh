/**
 * Module: module_get
 * Original ID: get
 * 
 * Checks whether the schema attribute is not set.
 * This is typically used to determine if an element or component
 * lacks a schema definition.
 * 
 * @returns {boolean} Returns true if _schemaAttribute is falsy (undefined, null, false, etc.), false otherwise
 */
declare function hasNoSchemaAttribute(this: { _schemaAttribute?: unknown }): boolean;

/**
 * Alternative: If this is a class method/getter
 */
declare class SchemaAwareComponent {
  /**
   * Internal schema attribute that may or may not be defined
   * @private
   */
  private _schemaAttribute?: unknown;

  /**
   * Checks whether the schema attribute is not set.
   * 
   * @returns {boolean} Returns true if no schema attribute is defined, false otherwise
   */
  get hasNoSchema(): boolean;
}