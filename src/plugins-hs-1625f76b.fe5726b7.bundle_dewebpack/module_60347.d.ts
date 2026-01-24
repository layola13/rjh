/**
 * Module: module_60347
 * Original ID: 60347
 * 
 * This module exports a Redux action creator for hiding functionality.
 */

import { ActionCreator } from 'redux';
import { Action } from 'redux';

/**
 * Action type constant for the HIDE action.
 */
declare const HIDE_ACTION_TYPE: string;

/**
 * Interface representing the HIDE action payload structure.
 */
export interface HideAction extends Action<string> {
  type: typeof HIDE_ACTION_TYPE;
}

/**
 * Action creator function that creates a HIDE action.
 * 
 * This function is created using createAction utility and dispatches
 * an action to hide a component or UI element in the application state.
 * 
 * @returns {HideAction} The HIDE action object
 * 
 * @example
 *