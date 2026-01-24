/**
 * Redux reducer for managing visibility state
 * Handles SHOW and HIDE actions to toggle boolean state
 * @module VisibilityReducer
 */

import { handleActions, Action } from 'redux-actions';
import ActionTypes from './actionTypes';

/**
 * State shape for the visibility reducer
 */
export type VisibilityState = boolean;

/**
 * Action payload types
 */
interface ShowAction extends Action<void> {
  type: typeof ActionTypes.SHOW;
}

interface HideAction extends Action<void> {
  type: typeof ActionTypes.HIDE;
}

type VisibilityAction = ShowAction | HideAction;

/**
 * Reducer that manages visibility state
 * 
 * @remarks
 * - Initial state is `false` (hidden)
 * - SHOW action sets state to `true`
 * - HIDE action sets state to `false`
 * 
 * @returns Visibility reducer function
 */
const visibilityReducer = handleActions<VisibilityState, void>(
  {
    [ActionTypes.SHOW]: (): boolean => true,
    [ActionTypes.HIDE]: (): boolean => false,
  },
  false // Initial state: hidden
);

export default visibilityReducer;