/**
 * Easing function type definition.
 * Takes a normalized time value (0-1) and returns an eased value (0-1).
 * @param t - Normalized time value between 0 and 1
 * @returns Eased value between 0 and 1
 */
export type EasingFunction = (t: number) => number;

/**
 * Linear easing function with no acceleration.
 * Returns the input value unchanged.
 * @param t - Normalized time value (0-1)
 * @returns Same as input value
 */
export declare function linear(t: number): number;

/**
 * Quadratic easing in - accelerating from zero velocity.
 * @param t - Normalized time value (0-1)
 * @returns Eased value using t²
 */
export declare function easeInQuad(t: number): number;

/**
 * Quadratic easing out - decelerating to zero velocity.
 * @param t - Normalized time value (0-1)
 * @returns Eased value using quadratic deceleration
 */
export declare function easeOutQuad(t: number): number;

/**
 * Quadratic easing in/out - acceleration until halfway, then deceleration.
 * @param t - Normalized time value (0-1)
 * @returns Eased value with symmetric acceleration/deceleration
 */
export declare function easeInOutQuad(t: number): number;

/**
 * Cubic easing in - accelerating from zero velocity.
 * @param t - Normalized time value (0-1)
 * @returns Eased value using t³
 */
export declare function easeInCubic(t: number): number;

/**
 * Cubic easing out - decelerating to zero velocity.
 * @param t - Normalized time value (0-1)
 * @returns Eased value using cubic deceleration
 */
export declare function easeOutCubic(t: number): number;

/**
 * Cubic easing in/out - acceleration until halfway, then deceleration.
 * @param t - Normalized time value (0-1)
 * @returns Eased value with symmetric cubic acceleration/deceleration
 */
export declare function easeInOutCubic(t: number): number;

/**
 * Quartic easing in - accelerating from zero velocity.
 * @param t - Normalized time value (0-1)
 * @returns Eased value using t⁴
 */
export declare function easeInQuart(t: number): number;

/**
 * Quartic easing out - decelerating to zero velocity.
 * @param t - Normalized time value (0-1)
 * @returns Eased value using quartic deceleration
 */
export declare function easeOutQuart(t: number): number;

/**
 * Quartic easing in/out - acceleration until halfway, then deceleration.
 * @param t - Normalized time value (0-1)
 * @returns Eased value with symmetric quartic acceleration/deceleration
 */
export declare function easeInOutQuart(t: number): number;

/**
 * Quintic easing in - accelerating from zero velocity.
 * @param t - Normalized time value (0-1)
 * @returns Eased value using t⁵
 */
export declare function easeInQuint(t: number): number;

/**
 * Quintic easing out - decelerating to zero velocity.
 * @param t - Normalized time value (0-1)
 * @returns Eased value using quintic deceleration
 */
export declare function easeOutQuint(t: number): number;

/**
 * Quintic easing in/out - acceleration until halfway, then deceleration.
 * @param t - Normalized time value (0-1)
 * @returns Eased value with symmetric quintic acceleration/deceleration
 */
export declare function easeInOutQuint(t: number): number;