/**
 * Easing function type definition.
 * Takes a normalized time value (0-1) and returns the eased progress value.
 * @param t - Normalized time parameter, typically ranges from 0 to 1
 * @returns Eased value
 */
export type EasingFunction = (t: number) => number;

/**
 * Linear easing function with no acceleration.
 * Returns the input value unchanged, resulting in constant speed.
 * @param t - Normalized time (0-1)
 * @returns The same value as input
 */
export declare function linear(t: number): number;

/**
 * Quadratic ease-in function.
 * Starts slowly and accelerates towards the end.
 * Formula: t²
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeInQuad(t: number): number;

/**
 * Quadratic ease-out function.
 * Starts quickly and decelerates towards the end.
 * Formula: t * (2 - t)
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeOutQuad(t: number): number;

/**
 * Quadratic ease-in-out function.
 * Accelerates in the first half, decelerates in the second half.
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeInOutQuad(t: number): number;

/**
 * Cubic ease-in function.
 * Starts slowly with cubic acceleration.
 * Formula: t³
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeInCubic(t: number): number;

/**
 * Cubic ease-out function.
 * Starts quickly with cubic deceleration.
 * Formula: (t - 1)³ + 1
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeOutCubic(t: number): number;

/**
 * Cubic ease-in-out function.
 * Cubic acceleration in the first half, cubic deceleration in the second half.
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeInOutCubic(t: number): number;

/**
 * Quartic ease-in function.
 * Starts slowly with quartic (4th power) acceleration.
 * Formula: t⁴
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeInQuart(t: number): number;

/**
 * Quartic ease-out function.
 * Starts quickly with quartic deceleration.
 * Formula: 1 - (t - 1)⁴
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeOutQuart(t: number): number;

/**
 * Quartic ease-in-out function.
 * Quartic acceleration in the first half, quartic deceleration in the second half.
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeInOutQuart(t: number): number;

/**
 * Quintic ease-in function.
 * Starts slowly with quintic (5th power) acceleration.
 * Formula: t⁵
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeInQuint(t: number): number;

/**
 * Quintic ease-out function.
 * Starts quickly with quintic deceleration.
 * Formula: 1 + (t - 1)⁵
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeOutQuint(t: number): number;

/**
 * Quintic ease-in-out function.
 * Quintic acceleration in the first half, quintic deceleration in the second half.
 * @param t - Normalized time (0-1)
 * @returns Eased value
 */
export declare function easeInOutQuint(t: number): number;