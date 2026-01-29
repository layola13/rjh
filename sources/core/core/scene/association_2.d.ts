/**
 * Association module providing base and concrete association classes
 * for managing entity relationships and bindings.
 */

/**
 * Serialized association data structure used for persistence
 */
export interface AssociationDumpData {
  /** Short class name identifier */
  l: string;
  /** Unique association identifier */
  id: string;
  /** ID of the associated entity */
  entity: string;
  /** Array of target entity IDs */
  targets: string[];
}

/**
 * Entity interface representing objects that can be associated
 */
export interface Entity {
  /** Unique entity identifier */
  id: string;
  /** Parent entities mapping */
  parents: Record<string, unknown>;
}

/**
 * Load context containing entity registry for deserialization
 */
export interface LoadContext {
  /** Map of entity IDs to entity instances */
  entities: Record<string, Entity>;
}

/**
 * Global utility namespace for ID generation and constants
 */
declare namespace HSCore {
  namespace Util {
    enum IDGeneratorType {
      Association = "Association"
    }
    namespace IDGenerator {
      function generate(id: string | undefined, type: IDGeneratorType): string;
    }
  }
}

declare namespace HSConstants {
  const ClassLNameToSName: Map<string, string>;
}

/**
 * Base class for entity associations, managing relationships between
 * a source entity and multiple target entities.
 */
export declare class AssociationBase {
  /** Unique identifier for this association */
  id: string;
  
  /** The source entity of this association */
  private _entity: Entity;
  
  /** Map of target entities by their IDs */
  private _targets: Map<string, Entity>;
  
  /** Class type identifier */
  protected _Class: string;

  /**
   * Creates a new association instance
   * @param id - Optional initial ID, will be generated if not provided
   * @param entity - The source entity for this association
   */
  constructor(id: string | undefined, entity: Entity);

  /**
   * Registers an association class type with its string identifier
   * @param classType - String identifier for the class
   * @param classConstructor - Constructor function for the class
   */
  static registerClass(
    classType: string,
    classConstructor: new (...args: any[]) => AssociationBase
  ): void;

  /**
   * Retrieves a registered class constructor by its type identifier
   * @param classType - String identifier for the class
   * @returns The constructor function, or undefined if not registered
   */
  static getClassByType(
    classType: string
  ): (new (...args: any[]) => AssociationBase) | undefined;

  /**
   * Gets the class type identifier for this association
   */
  get Class(): string;

  /**
   * Binds a target entity to this association
   * @param target - Entity to bind as a target
   * @returns This association instance for chaining
   */
  bind(target: Entity | undefined): this;

  /**
   * Removes a target entity from this association
   * @param target - Entity instance or entity ID to unbind
   * @returns This association instance for chaining
   */
  unbind(target: Entity | string): this;

  /**
   * Removes all target entities from this association
   */
  unbindAll(): void;

  /**
   * Clears all targets (alias for unbindAll)
   */
  clear(): void;

  /**
   * Generates a unique ID for this association using the global ID generator
   */
  generateId(): void;

  /**
   * Gets the source entity of this association
   */
  get entity(): Entity;

  /**
   * Gets all target entities as an array
   */
  get targets(): Entity[];

  /**
   * Gets the first target entity, or undefined if no targets exist
   */
  get firstTarget(): Entity | undefined;

  /**
   * Validates that all target entities have at least one parent
   * @returns True if all targets have parents, false otherwise
   */
  isValid(): boolean;

  /**
   * Serializes this association to a plain object for persistence
   * @param context - Optional serialization context (unused in base implementation)
   * @returns Serialized association data
   */
  dump(context?: unknown): AssociationDumpData;

  /**
   * Deserializes association data and restores entity references
   * @param data - Serialized association data
   * @param context - Load context containing entity registry
   * @param additionalParam - Additional context parameter (unused in base implementation)
   */
  load(
    data: AssociationDumpData,
    context: LoadContext,
    additionalParam?: unknown
  ): void;

  /**
   * Performs computation on this association
   * @param flag - Optional computation flag, defaults to true
   */
  compute(flag?: boolean): void;
}

/**
 * Concrete association class extending AssociationBase
 * with default behavior. Can be extended for specific association types.
 */
export declare class Association extends AssociationBase {
  // Inherits all members from AssociationBase
}