/**
 * Easing function that produces a smooth ease-in-out animation curve.
 * Uses a cosine-based formula to create smooth acceleration and deceleration.
 * 
 * @param progress - A normalized progress value, typically in the range [0, 1]
 *                   where 0 represents the start and 1 represents the end of the animation
 * @returns A transformed value in the range [0, 1] with smooth easing applied
 * 
 * @remarks
 * This is a standard easeInOutCosine function commonly used in animations.
 * - At progress = 0, returns 0
 * - At progress = 0.5, returns 0.5
 * - At progress = 1, returns 1
 * - The curve accelerates slowly at the start and end, with faster change in the middle
 * 
 * @example
 *