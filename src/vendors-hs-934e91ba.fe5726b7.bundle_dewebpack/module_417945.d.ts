/**
 * Simple state management store creator
 * Provides a lightweight pub-sub pattern for state management
 */

/**
 * Listener function type that gets called when state changes
 */
type Listener = () => void;

/**
 * Unsubscribe function type returned by subscribe method
 */
type Unsubscribe = () => void;

/**
 * Store interface for managing application state
 * @template TState - The type of state being managed
 */
export interface Store<TState> {
  /**
   * Updates the store state by merging the provided partial state with current state
   * Notifies all subscribed listeners after state update
   * @param partialState - Partial state object to merge with current state
   */
  setState(partialState: Partial<TState>): void;

  /**
   * Retrieves the current state of the store
   * @returns The current state object
   */
  getState(): TState;

  /**
   * Subscribes a listener function to state changes
   * The listener will be invoked whenever setState is called
   * @param listener - Callback function to execute on state changes
   * @returns Unsubscribe function to remove the listener
   */
  subscribe(listener: Listener): Unsubscribe;
}

/**
 * Creates a new store instance with the provided initial state
 * Implements a simple observer pattern for state management
 * 
 * @template TState - The type of state being managed
 * @param initialState - Initial state object for the store
 * @returns Store instance with setState, getState, and subscribe methods
 * 
 * @example
 *