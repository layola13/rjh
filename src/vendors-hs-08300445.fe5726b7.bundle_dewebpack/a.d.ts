/**
 * Redux middleware factory for resetting state based on specific action types.
 * 
 * @module ReduxResetMiddleware
 * @description Creates a store enhancer that allows resetting Redux state to initial values
 * when a specific action type is dispatched.
 */

/**
 * Configuration options for the reset enhancer.
 */
export interface ResetEnhancerOptions {
  /**
   * The action type that triggers a state reset.
   * @default "RESET"
   */
  type?: string | symbol;

  /**
   * The property name in the action payload that contains the new state.
   * @default "state"
   */
  data?: string;
}

/**
 * Redux store enhancer type.
 * @template State - The shape of the Redux state
 */
type StoreEnhancer<State = unknown> = (
  next: StoreEnhancerStoreCreator<State>
) => StoreEnhancerStoreCreator<State>;

/**
 * Store creator function signature.
 * @template State - The shape of the Redux state
 */
type StoreEnhancerStoreCreator<State = unknown> = (
  reducer: Reducer<State>,
  preloadedState?: State,
  enhancer?: StoreEnhancer<State>
) => unknown;

/**
 * Redux reducer function type.
 * @template State - The shape of the state
 * @template Action - The action type
 */
type Reducer<State = unknown, Action = ReduxAction> = (
  state: State,
  action: Action
) => State;

/**
 * Redux action interface.
 */
interface ReduxAction {
  type: string | symbol;
  [key: string]: unknown;
}

/**
 * Creates a Redux store enhancer that resets state when a specific action is dispatched.
 * 
 * @param config - Configuration for the reset behavior. Can be:
 *   - A string/symbol representing the reset action type (defaults to "RESET")
 *   - An object with `type` (action type) and `data` (payload property name) properties
 * @returns A store enhancer that wraps the reducer to handle reset actions
 * 
 * @example
 *