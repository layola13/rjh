/**
 * Internal state management module for JavaScript objects.
 * Provides a way to associate private state with objects using WeakMap or property-based storage.
 * 
 * @module InternalState
 */

/**
 * State data structure stored internally for each object.
 */
interface InternalStateData {
  /** Reference to the original object */
  facade?: any;
  /** Type identifier for state validation */
  type?: string;
  /** Additional state properties */
  [key: string]: any;
}

/**
 * Options for creating a typed getter function.
 */
interface GetterOptions {
  /** The expected type name for validation */
  type: string;
}

/**
 * Internal state management system.
 */
interface InternalStateModule {
  /**
   * Associates internal state with an object.
   * @param target - The object to attach state to
   * @param state - The state data to store
   * @returns The state object
   * @throws TypeError if the object already has state initialized
   */
  set<T extends object, S extends InternalStateData>(
    target: T,
    state: S
  ): S;

  /**
   * Retrieves the internal state associated with an object.
   * @param target - The object to get state from
   * @returns The state object, or an empty object if no state exists
   */
  get<T extends object, S extends InternalStateData = InternalStateData>(
    target: T
  ): S;

  /**
   * Checks if an object has internal state.
   * @param target - The object to check
   * @returns True if the object has internal state
   */
  has<T extends object>(target: T): boolean;

  /**
   * Gets existing state or initializes new state for an object.
   * @param target - The object to enforce state on
   * @returns The state object (existing or newly created)
   */
  enforce<T extends object, S extends InternalStateData = InternalStateData>(
    target: T
  ): S;

  /**
   * Creates a typed getter function that validates the receiver type.
   * @param expectedType - The expected type name for validation
   * @returns A getter function that throws on type mismatch
   */
  getterFor<S extends InternalStateData>(
    expectedType: string
  ): (target: any) => S;
}

declare const internalState: InternalStateModule;

export = internalState;