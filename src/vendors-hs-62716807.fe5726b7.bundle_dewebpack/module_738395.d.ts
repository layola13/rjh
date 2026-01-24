/**
 * Type definitions for Redux model state management utility
 * Automatically adds default reducers (setState and SET_STATE) to model definitions
 */

/**
 * Generic reducer function type
 * @template S - State type
 * @template P - Payload type
 */
type Reducer<S = any, P = any> = (state: S, payload: P) => S;

/**
 * Collection of reducer functions for a model
 */
interface Reducers<S = any> {
  /**
   * Merges partial state into current state
   */
  setState?: Reducer<S, Partial<S>>;
  
  /**
   * Replaces entire state with new state
   */
  [SET_STATE]?: Reducer<S, S>;
  
  /**
   * Custom reducers defined by the model
   */
  [key: string]: Reducer<S, any> | undefined;
}

/**
 * Model definition for a Redux-like store slice
 * @template S - State shape for this model
 */
interface Model<S = any> {
  /**
   * Reducer functions that handle state transitions
   */
  reducers?: Reducers<S>;
  
  /**
   * Other model properties (effects, state, namespace, etc.)
   */
  [key: string]: any;
}

/**
 * Collection of models keyed by model name
 */
interface Models {
  [modelName: string]: Model;
}

/**
 * Action type constant for setting complete state
 * Imported from constants module
 */
declare const SET_STATE: unique symbol;

/**
 * Enhances model definitions by ensuring each model has default reducers
 * 
 * Default reducers added:
 * - `setState`: Shallow merges partial state into current state
 * - `[SET_STATE]`: Replaces entire state with new state
 * 
 * @param models - Collection of model definitions to enhance
 * @returns Enhanced models with guaranteed default reducers
 * 
 * @example
 *