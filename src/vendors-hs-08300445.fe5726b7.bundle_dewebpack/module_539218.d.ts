/**
 * Action type delimiter constant
 */
declare const ACTION_TYPE_DELIMITER: string;

/**
 * Reducer function type that handles state transitions
 * @template S State type
 * @template A Action type
 */
type ReducerFunction<S = any, A = any> = (state: S, action: A) => S;

/**
 * Reducer configuration object with separate handlers for success and error cases
 * @template S State type
 * @template A Action type
 */
interface ReducerConfig<S = any, A = any> {
  /**
   * Reducer to handle successful actions (error: false)
   */
  next: ReducerFunction<S, A>;
  
  /**
   * Reducer to handle error actions (error: true)
   */
  throw: ReducerFunction<S, A>;
}

/**
 * Action interface with optional error flag
 */
interface Action {
  /**
   * Action type identifier
   */
  type: string;
  
  /**
   * Indicates if this action represents an error state
   */
  error?: boolean;
  
  /**
   * Additional action payload
   */
  [key: string]: any;
}

/**
 * Identity reducer that returns state unchanged
 * @template S State type
 * @param state Current state
 * @returns Unchanged state
 */
declare function identityReducer<S>(state: S): S;

/**
 * Creates a higher-order reducer that handles specific action types
 * 
 * @template S State type
 * @template A Action type extending base Action
 * 
 * @param actionType - Action type(s) to handle (can be delimited string)
 * @param reducer - Reducer function or config object with next/throw handlers
 * @param defaultState - Initial/default state value (must be defined)
 * 
 * @returns A reducer function that applies the handler only for matching action types
 * 
 * @throws {Error} When defaultState is undefined
 * @throws {Error} When reducer is not a function or valid config object
 * 
 * @example
 *