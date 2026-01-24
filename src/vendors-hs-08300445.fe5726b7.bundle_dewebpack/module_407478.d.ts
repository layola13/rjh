/**
 * Custom React hook for managing CSS transition and animation end events
 * @module useTransitionEnd
 */

import { useRef, useEffect } from 'react';

/**
 * Transition and animation event name constants
 */
interface TransitionEventNames {
  /** The name of the transitionend event (browser-prefixed if needed) */
  transitionEndName: string;
  /** The name of the animationend event (browser-prefixed if needed) */
  animationEndName: string;
}

/**
 * Callback function type for transition/animation end events
 */
type TransitionEndCallback = (event: Event) => void;

/**
 * Return type of the useTransitionEnd hook
 * @template T - The type of HTML element
 */
type UseTransitionEndReturn<T extends HTMLElement = HTMLElement> = [
  /** Function to attach event listeners to an element */
  attach: (element: T | null) => void,
  /** Function to detach event listeners from an element */
  detach: (element: T | null) => void
];

/**
 * Hook that manages transition and animation end event listeners on DOM elements
 * 
 * This hook provides functions to safely attach and detach CSS transition/animation
 * end event listeners to DOM elements, with automatic cleanup on unmount.
 * 
 * @param callback - Function to call when transition or animation ends
 * @returns A tuple containing [attach, detach] functions
 * 
 * @example
 *