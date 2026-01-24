/**
 * Redux Actions utility module
 * Provides helper functions for creating and handling Redux actions in a type-safe manner
 * @module redux-actions
 */

/**
 * Combines multiple action types into a single action type
 * Useful for handling multiple actions with the same reducer logic
 * @function combineActions
 */
export { default as combineActions } from './combineActions';

/**
 * Creates a Flux Standard Action (FSA) compliant action creator
 * @function createAction
 * @template Payload - The type of the action payload
 * @template Meta - The type of the action metadata
 * @returns A function that creates actions with the specified type
 */
export { default as createAction } from './createAction';

/**
 * Creates multiple action creators at once from a map of action type strings
 * Simplifies the creation of multiple related actions
 * @function createActions
 * @template Actions - Map of action type strings to payload creators
 * @returns An object containing the created action creators
 */
export { default as createActions } from './createActions';

/**
 * Creates a reducer that handles a single action type
 * @function handleAction
 * @template State - The type of the reducer state
 * @template Payload - The type of the action payload
 * @param actionType - The action type to handle
 * @param reducer - The reducer function or reducer map (next/throw)
 * @param defaultState - The initial state value
 * @returns A reducer function that handles the specified action type
 */
export { default as handleAction } from './handleAction';

/**
 * Creates a reducer that handles multiple action types
 * Maps action types to their corresponding reducer functions
 * @function handleActions
 * @template State - The type of the reducer state
 * @param reducerMap - Map of action types to reducer functions
 * @param defaultState - The initial state value
 * @param options - Optional configuration for the reducer
 * @returns A reducer function that handles all specified action types
 */
export { default as handleActions } from './handleActions';