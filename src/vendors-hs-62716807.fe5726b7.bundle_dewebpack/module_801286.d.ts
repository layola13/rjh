/**
 * Internal state management module for objects.
 * Provides secure state storage using either WeakMap or hidden properties.
 */

/**
 * Internal state data structure
 */
interface InternalState<T = any> {
  /** Type identifier for the state */
  type?: string;
  /** Reference to the object that owns this state */
  facade?: any;
  /** Additional state properties */
  [key: string]: T;
}

/**
 * State storage operations
 */
interface StateStorage {
  /**
   * Associates internal state with an object
   * @param target - The target object
   * @param state - The state data to store
   * @throws {TypeError} If the object already has state initialized
   * @returns The state object
   */
  set<T extends InternalState>(target: object, state: T): T;

  /**
   * Retrieves internal state from an object
   * @param target - The target object
   * @returns The state object, or empty object if none exists
   */
  get<T extends InternalState>(target: object): T;

  /**
   * Checks if an object has internal state
   * @param target - The target object
   * @returns True if the object has state, false otherwise
   */
  has(target: object): boolean;

  /**
   * Gets existing state or creates new empty state for an object
   * @param target - The target object
   * @returns The state object
   */
  enforce<T extends InternalState>(target: object): T;

  /**
   * Creates a getter function that validates the receiver type
   * @param type - Expected type identifier
   * @returns A function that retrieves and validates state
   * @throws {TypeError} If receiver is incompatible or wrong type
   */
  getterFor<T extends InternalState>(type: string): (receiver: any) => T;
}

/**
 * Exported state management API
 */
declare const internalState: StateStorage;

export = internalState;