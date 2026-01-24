/**
 * Creates action creators from action type definitions.
 * Supports multiple action types or an action map with optional namespace configuration.
 */

/**
 * Configuration options for action creators
 */
export interface ActionCreatorOptions {
  /** Namespace prefix for action types */
  namespace?: string;
}

/**
 * Payload creator function that generates the payload for an action
 */
export type PayloadCreator<TPayload = any, TArgs extends any[] = any[]> = (
  ...args: TArgs
) => TPayload;

/**
 * Meta creator function that generates metadata for an action
 */
export type MetaCreator<TMeta = any, TArgs extends any[] = any[]> = (
  ...args: TArgs
) => TMeta;

/**
 * Action definition - can be a payload creator, undefined, or a tuple of [payloadCreator, metaCreator]
 */
export type ActionDefinition<TPayload = any, TMeta = any> =
  | PayloadCreator<TPayload>
  | undefined
  | [PayloadCreator<TPayload> | undefined, MetaCreator<TMeta>];

/**
 * Map of action types to their definitions
 */
export interface ActionMap {
  [actionType: string]: ActionDefinition | ActionMap;
}

/**
 * Action creator function that creates FSA-compliant actions
 */
export interface ActionCreator<TPayload = any, TMeta = any> {
  (...args: any[]): {
    type: string;
    payload?: TPayload;
    meta?: TMeta;
    error?: boolean;
  };
  toString(): string;
}

/**
 * Collection of action creators indexed by action type
 */
export interface ActionCreators {
  [actionType: string]: ActionCreator | ActionCreators;
}

/**
 * Utility namespace for action map operations
 */
export declare const defaultNamespace: string;

/**
 * Flattens a nested action map into a single-level map with namespaced keys
 * @param actionMap - The action map to flatten
 * @param namespace - Optional namespace prefix
 * @returns Flattened action map
 */
export declare function flattenActionMap(
  actionMap: ActionMap,
  namespace?: string
): Record<string, ActionDefinition>;

/**
 * Converts a flat action creator map back into a nested structure
 * @param actionCreators - Flat map of action creators
 * @param namespace - Optional namespace prefix
 * @returns Nested action creators object
 */
export declare function unflattenActionCreators(
  actionCreators: Record<string, ActionCreator>,
  namespace?: string
): ActionCreators;

/**
 * Creates action creators from action types or an action map.
 * 
 * @example
 * // Simple action types
 * const actions = createActions('ADD_TODO', 'REMOVE_TODO');
 * 
 * @example
 * // Action map with payload creators
 * const actions = createActions({
 *   ADD_TODO: (text) => ({ text }),
 *   REMOVE_TODO: (id) => ({ id })
 * });
 * 
 * @example
 * // With namespace
 * const actions = createActions(
 *   { ADD_TODO: undefined, REMOVE_TODO: undefined },
 *   { namespace: 'todos' }
 * );
 * 
 * @param actionMapOrFirstActionType - Either an action map object or the first action type string
 * @param restActionTypesOrOptions - Additional action type strings, with optional options object as last parameter
 * @returns Object containing action creator functions
 */
export default function createActions(
  actionMapOrFirstActionType: ActionMap | string,
  ...restActionTypesOrOptions: Array<string | ActionCreatorOptions>
): ActionCreators;