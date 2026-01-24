/**
 * Request Animation Frame utilities for managing state updates
 * Provides hooks for RAF-based state management with batched updates
 * @module rafState
 */

/**
 * State updater function that receives previous state and returns new state
 */
type StateUpdater<T> = (prevState: T) => T;

/**
 * RAF state setter function
 */
type RafStateSetter<T> = (updater: StateUpdater<T>) => void;

/**
 * RAF state tuple: [currentState, setState]
 */
type RafStateResult<T> = [T, RafStateSetter<T>];

/**
 * Initial state or initializer function
 */
type InitialState<T> = T | (() => T);

/**
 * Creates a state hook that batches updates using requestAnimationFrame
 * Ensures smooth animations by deferring state updates to the next frame
 * 
 * @template T - The type of state being managed
 * @param initialState - Initial state value or factory function
 * @returns Tuple of [currentState, setState] where setState batches updates via RAF
 * 
 * @example
 *