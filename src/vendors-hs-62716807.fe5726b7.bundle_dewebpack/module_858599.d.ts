/**
 * Immer-based Redux configuration module
 * Provides a combineReducers wrapper that uses Immer for immutable state updates
 */

import { Draft } from 'immer';
import { Reducer, ReducersMapObject, AnyAction } from 'redux';

/**
 * Configuration options for the Immer Redux plugin
 */
export interface ImmerReduxConfig {
  /**
   * List of reducer keys that should bypass Immer processing
   * These reducers will handle state updates without Immer's draft mechanism
   */
  blacklist?: string[];
}

/**
 * Enhanced Redux configuration with Immer integration
 */
export interface ImmerReduxPluginConfig {
  /**
   * Redux-specific configuration
   */
  redux: {
    /**
     * Enhanced combineReducers that wraps reducers with Immer's produce
     * 
     * @param reducers - Map of reducer functions
     * @returns Combined reducer function with Immer support
     */
    combineReducers: <S>(
      reducers: ReducersMapObject<S, AnyAction>
    ) => Reducer<S, AnyAction>;
  };
}

/**
 * Plugin configuration result
 */
export interface ImmerReduxPlugin {
  config: ImmerReduxPluginConfig;
}

/**
 * Creates an Immer-enhanced Redux plugin configuration
 * 
 * This plugin wraps Redux reducers with Immer's `produce` function, allowing
 * developers to write reducers with mutable-style code that produces immutable updates.
 * Reducers in the blacklist will bypass Immer processing.
 * 
 * @param options - Configuration options
 * @param options.blacklist - Array of reducer names to exclude from Immer processing
 * @returns Plugin configuration object with enhanced combineReducers
 * 
 * @example
 *