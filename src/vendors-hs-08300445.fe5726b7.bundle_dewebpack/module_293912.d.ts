/**
 * Binds action creators to a dispatch function.
 * This is a utility for Redux that automatically wraps action creators with dispatch.
 * 
 * @module bindActionCreators
 */

/**
 * Type definition for a Redux dispatch function.
 */
export type Dispatch<A = any> = (action: A) => A;

/**
 * Represents a single action creator function.
 */
export type ActionCreator<A = any> = (...args: any[]) => A;

/**
 * Maps action creators to dispatch-bound versions.
 */
export type BoundActionCreators<T extends Record<string, ActionCreator>> = {
  [K in keyof T]: T[K] extends ActionCreator<infer A>
    ? (...args: Parameters<T[K]>) => A
    : never;
};

/**
 * Binds a single action creator to the dispatch function.
 * 
 * @param actionCreator - The action creator function to bind
 * @param dispatch - The dispatch function to bind to
 * @returns A function that calls the action creator and dispatches the result
 */
export function bindActionCreator<A>(
  actionCreator: ActionCreator<A>,
  dispatch: Dispatch<A>
): (...args: Parameters<typeof actionCreator>) => A;

/**
 * Binds multiple action creators to the dispatch function.
 * 
 * @param actionCreators - An object containing action creator functions
 * @param dispatch - The dispatch function to bind to
 * @returns An object with the same keys, but bound action creators
 * @throws {Error} If actionCreators is not an object or function
 */
export function bindActionCreators<T extends Record<string, ActionCreator>>(
  actionCreators: T,
  dispatch: Dispatch
): BoundActionCreators<T>;

/**
 * Binds action creator(s) to a dispatch function.
 * 
 * @param actionCreators - Either a single action creator function or an object of action creators
 * @param dispatch - The Redux store dispatch function
 * @returns Either a single bound action creator or an object of bound action creators
 * @throws {Error} If actionCreators is neither a function nor an object, or is null
 * 
 * @example
 *