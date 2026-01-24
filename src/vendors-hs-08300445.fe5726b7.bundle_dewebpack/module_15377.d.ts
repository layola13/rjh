/**
 * Redux connect utilities for mapDispatchToProps parameter handling.
 * Provides factory functions to normalize different mapDispatchToProps formats.
 */

import { Dispatch, Action, ActionCreatorsMapObject } from 'redux';

/**
 * Function type that maps dispatch to props object
 */
export type MapDispatchToPropsFunction<TDispatchProps = {}, TOwnProps = {}, TAction extends Action = Action> = (
  dispatch: Dispatch<TAction>,
  ownProps: TOwnProps
) => TDispatchProps;

/**
 * Object type containing action creators
 */
export type MapDispatchToPropsObject<TDispatchProps = {}> = ActionCreatorsMapObject<TDispatchProps>;

/**
 * Union type for all valid mapDispatchToProps formats
 */
export type MapDispatchToProps<TDispatchProps = {}, TOwnProps = {}, TAction extends Action = Action> =
  | MapDispatchToPropsFunction<TDispatchProps, TOwnProps, TAction>
  | MapDispatchToPropsObject<TDispatchProps>;

/**
 * Internal factory function result type
 */
export type MapDispatchToPropsFactory<TDispatchProps = {}, TOwnProps = {}, TAction extends Action = Action> = (
  dispatch: Dispatch<TAction>,
  options: { displayName: string; areMergedPropsEqual: (a: unknown, b: unknown) => boolean }
) => MapDispatchToPropsFunction<TDispatchProps, TOwnProps, TAction>;

/**
 * Handles mapDispatchToProps when it's a function.
 * Wraps the function with additional validation and memoization logic.
 * 
 * @param mapDispatchToProps - Function that maps dispatch to props
 * @returns Wrapped factory function or undefined if input is not a function
 */
export function whenMapDispatchToPropsIsFunction<TDispatchProps = {}, TOwnProps = {}, TAction extends Action = Action>(
  mapDispatchToProps: unknown
): MapDispatchToPropsFactory<TDispatchProps, TOwnProps, TAction> | undefined;

/**
 * Handles mapDispatchToProps when it's missing (undefined/null).
 * Returns a default implementation that injects dispatch as a prop.
 * 
 * @param mapDispatchToProps - The mapDispatchToProps parameter (expected to be missing)
 * @returns Factory function that injects dispatch, or undefined if parameter is present
 */
export function whenMapDispatchToPropsIsMissing<TAction extends Action = Action>(
  mapDispatchToProps: unknown
): MapDispatchToPropsFactory<{ dispatch: Dispatch<TAction> }, {}, TAction> | undefined;

/**
 * Handles mapDispatchToProps when it's an object of action creators.
 * Automatically binds action creators to dispatch using bindActionCreators.
 * 
 * @param mapDispatchToProps - Object containing action creator functions
 * @returns Factory function that binds action creators, or undefined if input is not an object
 */
export function whenMapDispatchToPropsIsObject<TDispatchProps = {}, TAction extends Action = Action>(
  mapDispatchToProps: unknown
): MapDispatchToPropsFactory<TDispatchProps, {}, TAction> | undefined;

/**
 * Default export: Array of factory functions to handle different mapDispatchToProps formats.
 * These are tried in order until one returns a defined value.
 */
declare const mapDispatchToPropsFactories: [
  typeof whenMapDispatchToPropsIsFunction,
  typeof whenMapDispatchToPropsIsMissing,
  typeof whenMapDispatchToPropsIsObject
];

export default mapDispatchToPropsFactories;