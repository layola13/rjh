/**
 * Represents the different types of field values that can be used in the system.
 * This enum defines various data structure types for field classification and type checking.
 */
export enum FieldValueType {
  /**
   * Generic field type - used for basic, unspecialized values
   */
  Generic = 0,

  /**
   * Single entity field type
   */
  Entity = 1,

  /**
   * Map of entities indexed by numeric keys
   */
  EntityMap = 2,

  /**
   * Map of entities indexed by string keys
   */
  KeyEntityMap = 3,

  /**
   * Array of entity objects
   */
  EntityArray = 4,

  /**
   * Material data container field type
   */
  MaterialData = 5,

  /**
   * Individual field within material data
   */
  MaterialDataField = 6,

  /**
   * State management field type
   */
  State = 7,

  /**
   * Individual field within state data
   */
  StateField = 8,

  /**
   * Constraint definition field type
   */
  Constraint = 9,

  /**
   * Metadata information field type
   */
  Metadata = 10
}