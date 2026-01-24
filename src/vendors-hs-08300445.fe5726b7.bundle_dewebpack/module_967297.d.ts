/**
 * Request animation frame utility with frame delay support
 * Provides a cross-platform way to schedule callbacks after N animation frames
 */

/**
 * Unique identifier for each scheduled animation frame request
 */
type FrameId = number;

/**
 * Callback function to be executed after the specified number of frames
 */
type FrameCallback = () => void;

/**
 * Schedule a callback to execute after a specified number of animation frames
 * 
 * @param callback - The function to execute after the delay
 * @param frameCount - Number of frames to wait before executing (default: 1)
 * @returns A unique identifier that can be used to cancel the scheduled callback
 * 
 * @example
 *