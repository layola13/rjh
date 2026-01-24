/**
 * Utility module for wrapping mapToProps functions in React-Redux connectors.
 * Provides helpers to determine and optimize component prop dependencies.
 * @module MapToPropsUtils
 */

/**
 * Function that maps state or dispatch to component props.
 * @template TStateOrDispatch - The state or dispatch object type
 * @template TOwnProps - The component's own props type
 * @template TResult - The resulting props object type
 */
export type MapToPropsFunction<TStateOrDispatch, TOwnProps, TResult> = (
  stateOrDispatch: TStateOrDispatch,
  ownProps?: TOwnProps
) => TResult;

/**
 * Extended MapToPropsFunction with dependency metadata.
 * @template TStateOrDispatch - The state or dispatch object type
 * @template TOwnProps - The component's own props type
 * @template TResult - The resulting props object type
 */
export interface MapToPropsProxy<TStateOrDispatch, TOwnProps, TResult> {
  (stateOrDispatch: TStateOrDispatch, ownProps: TOwnProps): TResult;
  
  /** Indicates whether this function depends on the component's own props */
  dependsOnOwnProps: boolean;
  
  /** The actual mapping function being proxied */
  mapToProps: MapToPropsFunction<TStateOrDispatch, TOwnProps, TResult>;
}

/**
 * Factory function that creates constant mapToProps functions.
 * @template TStateOrDispatch - The state or dispatch object type
 * @template TOwnProps - The component's own props type
 * @template TResult - The resulting props object type
 */
export type MapToPropsFactory<TStateOrDispatch, TOwnProps, TResult> = (
  stateOrDispatch: TStateOrDispatch,
  ownProps: TOwnProps
) => MapToPropsFunction<TStateOrDispatch, TOwnProps, TResult>;

/**
 * Determines if a mapToProps function depends on the component's own props.
 * Checks the explicit `dependsOnOwnProps` property if present, otherwise
 * infers from function arity (length !== 1 means it accepts ownProps).
 * 
 * @template TStateOrDispatch - The state or dispatch object type
 * @template TOwnProps - The component's own props type
 * @template TResult - The resulting props object type
 * @param mapToProps - The mapping function to analyze
 * @returns True if the function depends on ownProps, false otherwise
 */
export function getDependsOnOwnProps<TStateOrDispatch, TOwnProps, TResult>(
  mapToProps: MapToPropsFunction<TStateOrDispatch, TOwnProps, TResult> & {
    dependsOnOwnProps?: boolean;
  }
): boolean;

/**
 * Wraps a constant mapToProps object in a function that always returns the same value.
 * Marks the wrapper as not depending on ownProps for optimization.
 * 
 * @template TResult - The constant props object type
 * @param constantMapToProps - A function that returns a constant props object
 * @returns A wrapper function that caches and returns the constant result
 */
export function wrapMapToPropsConstant<TResult>(
  constantMapToProps: <TStateOrDispatch, TOwnProps>(
    stateOrDispatch: TStateOrDispatch,
    ownProps: TOwnProps
  ) => TResult
): <TStateOrDispatch, TOwnProps>(
  stateOrDispatch: TStateOrDispatch,
  ownProps: TOwnProps
) => (() => TResult) & { dependsOnOwnProps: false };

/**
 * Wraps a mapToProps function in a proxy that handles dynamic dependency detection.
 * The proxy initially assumes the function depends on ownProps, then adapts based on
 * the actual function signature or explicit dependsOnOwnProps metadata.
 * 
 * @template TStateOrDispatch - The state or dispatch object type
 * @template TOwnProps - The component's own props type
 * @template TResult - The resulting props object type
 * @param mapToPropsFunc - The mapping function to wrap
 * @param _displayName - Optional display name for debugging (unused in implementation)
 * @returns A proxy function that optimizes calls based on detected dependencies
 */
export function wrapMapToPropsFunc<TStateOrDispatch, TOwnProps, TResult>(
  mapToPropsFunc: 
    | MapToPropsFunction<TStateOrDispatch, TOwnProps, TResult>
    | MapToPropsFactory<TStateOrDispatch, TOwnProps, TResult>,
  _displayName?: string
): (
  stateOrDispatch: TStateOrDispatch,
  ownProps: TOwnProps
) => MapToPropsProxy<TStateOrDispatch, TOwnProps, TResult>;