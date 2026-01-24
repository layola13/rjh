/**
 * Redux action creator for calling plugins
 * 
 * This module exports a default action creator that dispatches a CALL_PLUGIN action.
 * Typically used in a Redux architecture to trigger plugin execution.
 */

import { Action } from 'redux';

/**
 * Payload for the CALL_PLUGIN action
 */
export interface CallPluginPayload {
  /** Plugin identifier or name */
  pluginId?: string;
  /** Additional parameters to pass to the plugin */
  params?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Action type for calling a plugin
 */
export interface CallPluginAction extends Action {
  type: string;
  payload?: CallPluginPayload;
}

/**
 * Action creator for dispatching a CALL_PLUGIN action
 * 
 * @param payload - The payload containing plugin information and parameters
 * @returns A Redux action object with the CALL_PLUGIN type
 * 
 * @example
 *