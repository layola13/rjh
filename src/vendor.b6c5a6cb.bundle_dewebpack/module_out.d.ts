/**
 * Easing function that produces an ease-out effect.
 * 
 * This function implements a quadratic ease-out animation curve, where the rate of change
 * starts fast and decelerates towards the end. Commonly used in UI animations to create
 * a natural deceleration effect.
 * 
 * Mathematical formula: f(t) = t * (2 - t)
 * 
 * @param t - The normalized time value, typically in the range [0, 1]
 *            where 0 represents the start and 1 represents the end of the animation
 * @returns The eased value, also typically in the range [0, 1], representing
 *          the interpolated position along the animation curve
 * 
 * @example
 *