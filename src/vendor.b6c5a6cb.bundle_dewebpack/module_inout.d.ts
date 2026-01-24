/**
 * Easing function: Ease In-Out (Quadratic)
 * 
 * Provides a smooth acceleration at the start and deceleration at the end.
 * Uses quadratic (t²) interpolation for both phases.
 * 
 * @param t - Normalized time value, typically in range [0, 1]
 *            - 0 represents the start of the animation
 *            - 1 represents the end of the animation
 * @returns Eased value, typically in range [0, 1]
 *          - Returns quadratic ease-in for t < 0.5
 *          - Returns quadratic ease-out for t >= 0.5
 * 
 * @example
 *