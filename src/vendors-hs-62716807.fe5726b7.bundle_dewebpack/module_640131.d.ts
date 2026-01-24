/**
 * Easing function that provides cubic (t³) acceleration until halfway, then deceleration.
 * Commonly used for smooth animations with a gentle start and end.
 * 
 * @param currentTime - Current time/position in the animation (e.g., elapsed milliseconds or frame count)
 * @param startValue - Starting value of the property being animated
 * @param endValue - Target/ending value of the property being animated
 * @param duration - Total duration of the animation (in same units as currentTime)
 * @returns The calculated value at the current time point
 * 
 * @example
 *