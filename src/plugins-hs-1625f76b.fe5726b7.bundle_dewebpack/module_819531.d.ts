/**
 * Redux action creator for resetting application state.
 * Creates a standardized action that triggers state reset in the Redux store.
 * 
 * @module StateResetAction
 */

import { Action } from 'redux';
import { ActionCreator } from './types/action-creator';

/**
 * Action type constant for state reset operation.
 * Used to identify reset actions in reducers.
 */
declare const RESET_STATE: string;

/**
 * Interface representing the reset state action.
 * Extends Redux base Action with specific type.
 */
export interface ResetStateAction extends Action<typeof RESET_STATE> {
  type: typeof RESET_STATE;
  payload?: undefined;
}

/**
 * Action creator function that creates a RESET_STATE action.
 * When dispatched, this action triggers a complete state reset in the application.
 * 
 * @returns A Redux action with RESET_STATE type
 * 
 * @example
 *