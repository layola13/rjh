/**
 * React hook for handling touch-based swipe gestures with momentum scrolling
 * 
 * @module useTouchSwipe
 */

import { useRef, useEffect, MutableRefObject } from 'react';

/**
 * Callback function invoked during swipe gestures
 * 
 * @param isHorizontal - True if the swipe is primarily horizontal, false if vertical
 * @param delta - The distance moved in pixels (positive or negative)
 * @param isMomentum - True if this is a momentum/inertia scroll, false for direct touch
 * @param event - The original touch event (only present when isMomentum is false)
 * @returns True to prevent default browser behavior, false otherwise
 */
type SwipeCallback = (
  isHorizontal: boolean,
  delta: number,
  isMomentum: boolean,
  event?: TouchEvent
) => boolean;

/**
 * Custom React hook for handling touch swipe gestures with momentum scrolling
 * 
 * Features:
 * - Detects horizontal and vertical swipes
 * - Applies momentum/inertia effect after release
 * - Supports custom swipe handling logic
 * - Automatic cleanup of event listeners
 * 
 * @param enabled - Whether the touch swipe handler is active
 * @param elementRef - React ref to the DOM element to attach listeners to
 * @param onSwipe - Callback function invoked during swipe and momentum phases
 * 
 * @example
 *