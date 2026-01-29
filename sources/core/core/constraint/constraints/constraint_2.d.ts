/**
 * Constraint module - Core constraint system for managing state dependencies
 * @module Constraint
 */

/**
 * Serialized constraint data structure used for dumping/loading
 */
export interface ConstraintDumpData {
  /** Short class name */
  l: string;
  /** Unique constraint identifier */
  id: string;
  /** Local identifier within document scope */
  localId: string;
  /** Constraint type discriminator */
  type: string;
  /** Array of input state IDs */
  inputs: string[];
  /** Array of output state IDs */
  outputs: string[];
}

/**
 * Options for constraint dump operations
 */
export interface ConstraintDumpOptions {
  /** Cache for serialized constraint data */
  constraintsData?: Map<string, ConstraintDumpData>;
}

/**
 * Options for constraint load/restore operations
 */
export interface ConstraintLoadOptions {
  /** Existing constraint instances indexed by ID */
  constraints?: Record<string, Constraint>;
  /** Cache of serialized constraint data */
  constraintsData?: Map<string, ConstraintDumpData>;
  /** ID generator for mapping old IDs to new ones during restore */
  constraintIdGenerator?: {
    generate(oldId: string): string;
    getNewId?(oldId: string): string | undefined;
  };
  /** Custom constraint lookup function */
  getConstraintById?(id: string): Constraint | undefined;
  /** Flag indicating restoration is in progress */
  duringRestore?: boolean;
}

/**
 * Core constraint class - manages relationships between input and output states
 */
 * Constraints define computational dependencies in the document model.
 * They automatically recompute outputs when inputs change.
 */
export declare class Constraint {
  /**
   * Fully qualified class name (e.g. "HSCore.Constraint")
   */
  readonly Class: string;

  /**
   * Unique constraint identifier
   */
  protected id: string;

  /**
   * Local identifier within document scope
   */
  localId: string;

  /**
   * Constraint type discriminator
   */
  type: string;

  /**
   * Input states indexed by state ID
   */
  inputs: Record<string, any>;

  /**
   * Output states indexed by state ID
   */
  outputs: Record<string, any>;

  /**
   * Cached tag for logging/debugging
   * @private
   */
  private _tag?: string;

  /**
   * Registry mapping class names to constructors
   * @private
   */
  private static _constructorByClassName: Map<string, new (id?: string) => Constraint>;

  /**
   * Creates a new constraint instance
   * @param idOrPrefix - Optional ID or prefix for ID generation
   */
  constructor(idOrPrefix?: string);

  /**
   * Initialize constraint with custom parameters
   * @param param1 - First initialization parameter
   * @param param2 - Second initialization parameter
   */
  init(param1: any, param2: any): void;

  /**
   * Gets the unique constraint identifier
   * @readonly
   */
  get ID(): string;

  /**
   * Extracts the simple class name from the fully qualified Class property
   * @returns Simple class name (e.g. "Constraint" from "HSCore.Constraint")
   */
  getClassName(): string;

  /**
   * Gets a unique tag for logging/debugging
   * Format: "ClassName-id"
   * @readonly
   */
  get tag(): string;

  /**
   * Verifies constraint has required properties set
   * @returns True if id and localId are both set
   */
  verify(): boolean;

  /**
   * Verifies constraint is valid before serialization
   * @returns True if constraint can be safely dumped
   */
  verifyBeforeDump(): boolean;

  /**
   * Serializes constraint to JSON-compatible format
   * @param options - Dump options including optional data cache
   * @returns Array containing serialized constraint data
   */
  dump(options?: ConstraintDumpOptions): ConstraintDumpData[];

  /**
   * Deserializes constraint from dump data
   * @param data - Serialized constraint data
   * @param options - Load options including constraint registry
   */
  load(data: ConstraintDumpData, options?: ConstraintLoadOptions): void;

  /**
   * Computes output states based on current input states
   * Override in subclasses to implement constraint logic
   */
  compute(): void;

  /**
   * Cleans up constraint resources
   * Called before constraint is removed from document
   */
  destroy(): void;

  /**
   * Refreshes constraint state
   * @param context - Refresh context/parameters
   */
  refresh(context: any): void;

  /**
   * Registers a constraint class in the global registry
   * @param className - Fully qualified class name
   * @param constructor - Constructor function for the class
   */
  static registerClass(
    className: string,
    constructor: new (id?: string) => Constraint
  ): void;

  /**
   * Retrieves a constraint class constructor by name
   * @param classNameOrShort - Full or short class name
   * @returns Constructor function or undefined if not found
   */
  static getClass(
    classNameOrShort: string
  ): (new (id?: string) => Constraint) | undefined;

  /**
   * Creates a new constraint instance from serialized data
   * @param data - Serialized constraint data
   * @param options - Load options including constraint registry
   * @returns New constraint instance or undefined if class not found
   */
  static createFromDump(
    data: ConstraintDumpData,
    options?: ConstraintLoadOptions
  ): Constraint | undefined;

  /**
   * Dumps a constraint, using cached data if available
   * @param constraint - Constraint instance to dump
   * @param options - Dump options including optional data cache
   * @returns Array containing serialized constraint data
   */
  static dumpConstraint(
    constraint: Constraint,
    options?: ConstraintDumpOptions
  ): ConstraintDumpData[];

  /**
   * Loads constraint from dump data, reusing existing instance if available
   * @param data - Serialized constraint data
   * @param options - Load options including constraint registry
   * @returns Constraint instance or undefined
   */
  static loadFromDump(
    data: ConstraintDumpData,
    options?: ConstraintLoadOptions
  ): Constraint | undefined;

  /**
   * Loads constraint by ID, reusing existing instance if available
   * @param id - Constraint ID to load
   * @param options - Load options including constraint registry and data cache
   * @returns Constraint instance or undefined
   */
  static loadFromDumpById(
    id: string,
    options?: ConstraintLoadOptions
  ): Constraint | undefined;

  /**
   * Retrieves an existing constraint instance by ID
   * @param id - Constraint ID to retrieve
   * @param options - Load options for ID mapping and lookup
   * @returns Existing constraint instance or undefined
   */
  static getExistingConstraint(
    id: string,
    options?: ConstraintLoadOptions
  ): Constraint | undefined;
}