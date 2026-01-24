/**
 * Association module providing base and concrete association classes
 * for managing entity relationships and bindings.
 */

/**
 * Map storing registered association class types.
 * Key: class identifier string
 * Value: association class constructor
 */
declare const associationClassRegistry: Map<string, typeof AssociationBase>;

/**
 * Base class for managing associations between entities.
 * Provides bidirectional binding, validation, and serialization capabilities.
 */
export declare class AssociationBase {
  /**
   * Unique identifier for this association instance.
   */
  id: string;

  /**
   * The class type identifier for this association.
   * Set via registerClass and used for serialization/deserialization.
   */
  protected _Class: string;

  /**
   * The source entity that owns this association.
   */
  protected _entity: any; // Replace 'any' with specific entity type if known

  /**
   * Map of target entities bound to this association.
   * Key: target entity ID
   * Value: target entity instance
   */
  protected _targets: Map<string, any>; // Replace 'any' with specific entity type if known

  /**
   * Creates a new association instance.
   * @param id - Initial ID for the association (will be regenerated if needed)
   * @param entity - The source entity that owns this association
   */
  constructor(id: string, entity: any);

  /**
   * Registers an association class type with the system.
   * @param classId - Unique identifier for the class type
   * @param classConstructor - Constructor function for the association class
   */
  static registerClass(classId: string, classConstructor: typeof AssociationBase): void;

  /**
   * Retrieves a registered association class by its type identifier.
   * @param classId - The class type identifier
   * @returns The association class constructor, or undefined if not found
   */
  static getClassByType(classId: string): typeof AssociationBase | undefined;

  /**
   * Gets the class type identifier for this association.
   */
  get Class(): string;

  /**
   * Binds a target entity to this association.
   * @param target - The entity to bind
   * @returns This association instance for method chaining
   */
  bind(target: any): this | undefined;

  /**
   * Unbinds a target entity from this association.
   * @param targetOrId - The target entity or its ID to unbind
   * @returns This association instance for method chaining
   */
  unbind(targetOrId: any | string): this;

  /**
   * Removes all target bindings from this association.
   */
  unbindAll(): void;

  /**
   * Clears all target bindings (alias for unbindAll).
   */
  clear(): void;

  /**
   * Generates a unique ID for this association using the HSCore ID generator.
   */
  generateId(): void;

  /**
   * Gets the source entity that owns this association.
   */
  get entity(): any;

  /**
   * Gets all target entities bound to this association as an array.
   */
  get targets(): any[];

  /**
   * Gets the first target entity in the targets collection.
   */
  get firstTarget(): any;

  /**
   * Validates that all target entities have at least one parent.
   * @returns True if all targets are valid, false otherwise
   */
  isValid(): boolean;

  /**
   * Serializes this association to a plain object for persistence.
   * @param context - Serialization context (unused in base implementation)
   * @returns Object containing association data with short class name, ID, entity ID, and target IDs
   */
  dump(context?: any): {
    /** Short class name from HSConstants lookup */
    l: string;
    /** Association ID */
    id: string;
    /** Source entity ID */
    entity: string;
    /** Array of target entity IDs */
    targets: string[];
  };

  /**
   * Deserializes association data and restores entity references.
   * @param data - Serialized association data
   * @param context - Deserialization context containing entity mappings
   * @param useFallback - If true, attempts to retrieve entities from active document when not found in context
   */
  load(
    data: {
      entity: string;
      targets: string[];
    },
    context: {
      entities: Record<string, any>;
    },
    useFallback?: boolean
  ): void;

  /**
   * Computes or updates the association state.
   * Base implementation is empty; intended for override in subclasses.
   * @param flag - Computation flag (default: true)
   */
  compute(flag?: boolean): void;
}

/**
 * Concrete association class extending AssociationBase.
 * Provides default association behavior without additional customization.
 */
export declare class Association extends AssociationBase {
  // Inherits all members from AssociationBase
}