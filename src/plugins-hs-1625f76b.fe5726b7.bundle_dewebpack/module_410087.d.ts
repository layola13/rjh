/**
 * Animation state reducer module
 * Manages boolean state for animation start/end events
 */

/**
 * Action types for animation state management
 */
interface AnimationActionTypes {
  /** Action type dispatched when animation starts */
  START_ANIMATION: string;
  /** Action type dispatched when animation ends */
  END_ANIMATION: string;
}

/**
 * Redux action interface
 */
interface Action<T = any> {
  type: string;
  payload?: T;
}

/**
 * Animation state (boolean indicating if animation is active)
 */
type AnimationState = boolean;

/**
 * Animation reducer that handles START_ANIMATION and END_ANIMATION actions
 * 
 * @remarks
 * - START_ANIMATION sets state to true
 * - END_ANIMATION sets state to false
 * - Initial state is false
 * 
 * @param state - Current animation state
 * @param action - Redux action
 * @returns Updated animation state
 */
declare const animationReducer: (
  state: AnimationState | undefined,
  action: Action
) => AnimationState;

export default animationReducer;

/**
 * Action creator type for starting animation
 * @returns Action that sets animation state to true
 */
export type StartAnimationAction = () => Action<void>;

/**
 * Action creator type for ending animation
 * @returns Action that sets animation state to false
 */
export type EndAnimationAction = () => Action<void>;