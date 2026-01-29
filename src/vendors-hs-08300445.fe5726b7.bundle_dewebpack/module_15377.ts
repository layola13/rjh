/**
 * Redux mapDispatchToProps factory utilities
 * Provides factory functions to handle different types of mapDispatchToProps configurations
 */

import type { Dispatch, Action } from 'redux';

/**
 * Function type for mapping dispatch to props
 * @template TDispatchProps - The props object containing dispatch-bound action creators
 * @template TOwnProps - The component's own props
 * @template TAction - The Redux action type
 */
export type MapDispatchToPropsFunction<
  TDispatchProps = Record<string, unknown>,
  TOwnProps = Record<string, unknown>,
  TAction extends Action = Action
> = (dispatch: Dispatch<TAction>, ownProps: TOwnProps) => TDispatchProps;

/**
 * Object type for mapping dispatch to props using action creators
 */
export type MapDispatchToPropsObject<TAction extends Action = Action> = Record<
  string,
  (...args: any[]) => TAction
>;

/**
 * Union type for all possible mapDispatchToProps configurations
 */
export type MapDispatchToProps<
  TDispatchProps = Record<string, unknown>,
  TOwnProps = Record<string, unknown>,
  TAction extends Action = Action
> =
  | MapDispatchToPropsFunction<TDispatchProps, TOwnProps, TAction>
  | MapDispatchToPropsObject<TAction>;

/**
 * Factory function result type
 * Returns a function that wraps mapDispatchToProps or undefined if not applicable
 */
export type MapDispatchToPropsFactory = (
  mapDispatchToProps: MapDispatchToProps | undefined | null
) => ((dispatch: Dispatch, ownProps?: Record<string, unknown>) => Record<string, unknown>) | undefined;

/**
 * Handles mapDispatchToProps when it is a function
 * Wraps the function to inject dispatch and ownProps
 * 
 * @param mapDispatchToProps - The mapDispatchToProps value to check
 * @returns Wrapped function if input is a function, undefined otherwise
 */
export function whenMapDispatchToPropsIsFunction(
  mapDispatchToProps: unknown
): ((dispatch: Dispatch, ownProps?: Record<string, unknown>) => Record<string, unknown>) | undefined;

/**
 * Handles mapDispatchToProps when it is missing
 * Returns a function that provides dispatch as a prop
 * 
 * @param mapDispatchToProps - The mapDispatchToProps value to check
 * @returns Function that injects dispatch prop if input is falsy, undefined otherwise
 */
export function whenMapDispatchToPropsIsMissing(
  mapDispatchToProps: unknown
): ((dispatch: Dispatch) => { dispatch: Dispatch }) | undefined;

/**
 * Handles mapDispatchToProps when it is an object of action creators
 * Wraps the object to bind action creators to dispatch
 * 
 * @param mapDispatchToProps - The mapDispatchToProps value to check
 * @returns Function that binds action creators to dispatch if input is an object, undefined otherwise
 */
export function whenMapDispatchToPropsIsObject(
  mapDispatchToProps: unknown
): ((dispatch: Dispatch) => Record<string, unknown>) | undefined;

/**
 * Array of factory functions to match different mapDispatchToProps types
 * Factories are tried in order until one returns a non-undefined value
 */
declare const defaultFactories: readonly [
  typeof whenMapDispatchToPropsIsFunction,
  typeof whenMapDispatchToPropsIsMissing,
  typeof whenMapDispatchToPropsIsObject
];

export default defaultFactories;