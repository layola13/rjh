/**
 * Map state to props utilities for Redux connect.
 * Provides factory functions to handle different mapStateToProps configurations.
 * 
 * @module mapStateToProps
 */

import { wrapMapToPropsFunc, wrapMapToPropsConstant } from './wrapMapToProps';

/**
 * State from Redux store
 */
export type State = unknown;

/**
 * Props to be mapped from state
 */
export type StateProps = Record<string, unknown>;

/**
 * Own props passed to the component
 */
export type OwnProps = Record<string, unknown>;

/**
 * Function type for mapping state to props
 */
export type MapStateToProps<TStateProps = StateProps, TOwnProps = OwnProps, TState = State> = (
  state: TState,
  ownProps?: TOwnProps
) => TStateProps;

/**
 * Handles the case when mapStateToProps is a function.
 * Wraps the function with appropriate logic for state mapping.
 * 
 * @param mapStateToProps - The function to map state to props
 * @returns Wrapped function or undefined if input is not a function
 */
export function whenMapStateToPropsIsFunction(
  mapStateToProps: unknown
): ReturnType<typeof wrapMapToPropsFunc> | undefined {
  return typeof mapStateToProps === 'function'
    ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps')
    : undefined;
}

/**
 * Handles the case when mapStateToProps is missing.
 * Returns undefined if mapStateToProps exists, otherwise provides a default empty object mapper.
 * 
 * @param mapStateToProps - The mapStateToProps value to check
 * @returns Wrapped constant function returning empty object, or undefined
 */
export function whenMapStateToPropsIsMissing(
  mapStateToProps: unknown
): ReturnType<typeof wrapMapToPropsConstant> | undefined {
  return mapStateToProps
    ? undefined
    : wrapMapToPropsConstant(() => ({}));
}

/**
 * Default export: Array of factory functions to process mapStateToProps.
 * These functions are applied in order to determine the appropriate wrapper.
 */
const mapStateToPropsFactories: Array<(mapStateToProps: unknown) => unknown> = [
  whenMapStateToPropsIsFunction,
  whenMapStateToPropsIsMissing
];

export default mapStateToPropsFactories;