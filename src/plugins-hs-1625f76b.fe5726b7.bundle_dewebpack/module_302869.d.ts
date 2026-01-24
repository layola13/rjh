/**
 * Action creator for setting readonly state
 * Creates a Redux action to toggle or set readonly mode
 */

import { Action } from 'redux';
import { createAction } from './createAction';
import ActionTypes from './ActionTypes';

/**
 * Action payload for readonly state change
 */
export interface SetReadonlyPayload {
  readonly: boolean;
}

/**
 * Redux action for setting readonly state
 */
export interface SetReadonlyAction extends Action<string> {
  type: typeof ActionTypes.SETREADONLY;
  payload?: SetReadonlyPayload;
}

/**
 * Creates an action to set the readonly state
 * @param payload - Optional payload containing readonly flag
 * @returns Redux action object
 */
declare const setReadonly: (payload?: SetReadonlyPayload) => SetReadonlyAction;

export default setReadonly;