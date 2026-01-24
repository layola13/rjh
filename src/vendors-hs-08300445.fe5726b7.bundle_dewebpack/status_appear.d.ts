/**
 * Animation status and step constants for component transitions.
 * This module defines the lifecycle states and steps for appear, enter, and leave animations.
 * @module STATUS_APPEAR
 */

/**
 * Represents no animation status
 */
export const STATUS_NONE = "none";

/**
 * Represents the appear animation status (initial mount)
 */
export const STATUS_APPEAR = "appear";

/**
 * Represents the enter animation status (element entering)
 */
export const STATUS_ENTER = "enter";

/**
 * Represents the leave animation status (element leaving)
 */
export const STATUS_LEAVE = "leave";

/**
 * Represents no animation step
 */
export const STEP_NONE = "none";

/**
 * Represents the prepare step of an animation (before start)
 */
export const STEP_PREPARE = "prepare";

/**
 * Represents the start step of an animation
 */
export const STEP_START = "start";

/**
 * Represents the active step of an animation (in progress)
 */
export const STEP_ACTIVE = "active";

/**
 * Represents the end/activated step of an animation (completed)
 */
export const STEP_ACTIVATED = "end";

/**
 * Represents the prepared step of an animation (ready to start)
 */
export const STEP_PREPARED = "prepared";

/**
 * Union type of all possible animation status values
 */
export type AnimationStatus = typeof STATUS_NONE | typeof STATUS_APPEAR | typeof STATUS_ENTER | typeof STATUS_LEAVE;

/**
 * Union type of all possible animation step values
 */
export type AnimationStep = typeof STEP_NONE | typeof STEP_PREPARE | typeof STEP_START | typeof STEP_ACTIVE | typeof STEP_ACTIVATED | typeof STEP_PREPARED;