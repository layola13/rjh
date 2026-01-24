/**
 * Creates a Flux Standard Action (FSA) creator function.
 * 
 * @module ActionCreator
 */

/**
 * Default identity payload creator that returns its first argument.
 */
type IdentityPayloadCreator = <T>(payload: T) => T;

/**
 * A function that transforms arguments into a payload.
 */
type PayloadCreator<P = any, Args extends any[] = any[]> = (...args: Args) => P;

/**
 * A function that transforms arguments into metadata.
 */
type MetaCreator<M = any, Args extends any[] = any[]> = (...args: Args) => M;

/**
 * Flux Standard Action structure.
 */
interface Action<P = any, M = any> {
  /** The action type identifier */
  type: string;
  /** The action payload (optional) */
  payload?: P;
  /** Indicates if this action represents an error */
  error?: true;
  /** Additional metadata for the action */
  meta?: M;
}

/**
 * Action creator function that generates FSA-compliant actions.
 */
interface ActionCreator<P = any, M = any, Args extends any[] = any[]> {
  (...args: Args): Action<P, M>;
  (...args: [Error]): Action<Error, M>;
  toString(): string;
}

/**
 * Creates an action creator function following the Flux Standard Action specification.
 * 
 * @param type - The action type string
 * @param payloadCreator - Optional function to transform arguments into payload. 
 *                         If null/undefined, uses identity function.
 * @param metaCreator - Optional function to generate action metadata
 * @returns Action creator function that generates FSA-compliant actions
 * 
 * @example
 * const increment = createAction('INCREMENT');
 * const addTodo = createAction('ADD_TODO', (text: string) => ({ text }));
 * const fetchUser = createAction('FETCH_USER', null, () => ({ timestamp: Date.now() }));
 */
export default function createAction<P = any, M = any, Args extends any[] = any[]>(
  type: string,
  payloadCreator?: PayloadCreator<P, Args> | null,
  metaCreator?: MetaCreator<M, Args>
): ActionCreator<P, M, Args>;