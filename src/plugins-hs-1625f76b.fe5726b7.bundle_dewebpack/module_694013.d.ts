/**
 * Combined Redux reducers for UI state management
 * 
 * This module exports a combined reducer that manages various UI-related states
 * including readonly mode, visibility, navigation, positioning, animations, and plugin calls.
 */

import { Reducer } from 'redux';

/**
 * State shape for the readonly mode
 */
export interface ReadonlyState {
  readonly value: boolean;
}

/**
 * State shape for visibility control
 */
export interface ShownState {
  readonly isVisible: boolean;
}

/**
 * Navigation state structure
 */
export interface NavigationState {
  readonly currentRoute: string;
  readonly history: string[];
}

/**
 * Position tracking state
 */
export interface PositionsState {
  readonly x: number;
  readonly y: number;
  readonly width?: number;
  readonly height?: number;
}

/**
 * Animation state control
 */
export interface AnimationState {
  readonly enabled: boolean;
  readonly duration?: number;
}

/**
 * Plugin call management state
 */
export interface CallPluginState {
  readonly pluginName: string | null;
  readonly parameters: Record<string, unknown>;
}

/**
 * Combined root state for all UI reducers
 */
export interface UIState {
  readonly isReadonly: ReadonlyState;
  readonly isShown: ShownState;
  readonly navi: NavigationState;
  readonly positions: PositionsState;
  readonly isAnimation: AnimationState;
  readonly callplugin: CallPluginState;
}

/**
 * Combined reducer for UI state management
 * 
 * @remarks
 * This reducer combines multiple sub-reducers to manage different aspects
 * of the UI state in a Redux store.
 */
declare const combinedUIReducer: Reducer<UIState>;

export default combinedUIReducer;