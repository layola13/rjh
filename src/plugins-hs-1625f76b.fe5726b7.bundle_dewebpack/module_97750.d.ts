/**
 * Redux reducer for managing render plugin state.
 * Handles CALL_PLUGIN actions to update the plugin data.
 * 
 * @module RenderPluginReducer
 */

import { Action } from 'redux';
import { handleActions } from 'redux-actions';

/**
 * Payload structure for plugin actions
 */
export interface PluginPayload {
  [key: string]: unknown;
}

/**
 * Action type for calling plugins
 */
export interface CallPluginAction extends Action {
  type: string;
  payload?: PluginPayload;
}

/**
 * State shape for the render plugin reducer
 */
export type RenderPluginState = PluginPayload | string;

/**
 * Reducer that handles plugin-related actions.
 * When CALL_PLUGIN action is dispatched, updates state with the payload if present.
 * 
 * @param state - Current render plugin state
 * @param action - Action object containing type and optional payload
 * @returns Updated state or previous state if no payload
 */
declare const renderPluginReducer: (
  state: RenderPluginState | undefined,
  action: CallPluginAction
) => RenderPluginState;

export default renderPluginReducer;