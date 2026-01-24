/**
 * A custom React hook that provides debounced callback execution with cancellation support.
 * Automatically cancels pending callbacks on unmount.
 */

import { useRef, useEffect } from 'react';

/**
 * Cancellation status checker interface
 */
interface CancellationChecker {
  /**
   * Checks if the current callback execution has been cancelled
   * @returns true if cancelled, false otherwise
   */
  isCanceled: () => boolean;
}

/**
 * Callback function that receives cancellation status
 */
type CancelableCallback = (checker: CancellationChecker) => void;

/**
 * Schedule function that executes a callback after a specified number of animation frames
 * @param callback - The function to execute
 * @param frameCount - Number of animation frames to wait (default: 2)
 */
type ScheduleFunction = (callback: CancelableCallback, frameCount?: number) => void;

/**
 * Cancel function that cancels any pending scheduled callback
 */
type CancelFunction = () => void;

/**
 * Return type of the useRafTimeout hook
 * @returns A tuple containing [schedule, cancel] functions
 */
type UseRafTimeoutReturn = [ScheduleFunction, CancelFunction];

/**
 * Custom hook for scheduling callbacks using requestAnimationFrame with automatic cleanup.
 * 
 * @example
 *