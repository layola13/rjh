/**
 * Redux reducer for managing readonly state
 * Handles SETREADONLY action to update the readonly flag
 */

import { handleActions, Action } from 'redux-actions';

/**
 * Payload type for SETREADONLY action
 */
interface SetReadonlyPayload {
  payload: boolean;
}

/**
 * State type for readonly reducer
 */
type ReadonlyState = boolean;

/**
 * Action type constant for setting readonly state
 */
declare const SETREADONLY: string;

/**
 * Readonly state reducer
 * 
 * @param state - Current readonly state (default: false)
 * @param action - Redux action with boolean payload
 * @returns Updated readonly state
 * 
 * @remarks
 * Only updates state when the new value differs from the current state
 * to prevent unnecessary re-renders
 */
declare const readonlyReducer: (
  state: ReadonlyState | undefined,
  action: Action<boolean>
) => ReadonlyState;

export default readonlyReducer;