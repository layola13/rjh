/**
 * React hook for tracking and managing element heights dynamically.
 * Monitors DOM elements and updates when their computed heights (including margins) change.
 */

import { useState, useEffect, useRef, Ref } from 'react';

/**
 * Callback function invoked when an element is mounted/registered.
 * @param key - The unique identifier for the element
 */
type OnElementMount = (key: unknown) => void;

/**
 * Callback function invoked when an element is unmounted/unregistered.
 * @param key - The unique identifier for the element
 */
type OnElementUnmount = (key: unknown) => void;

/**
 * Function to extract a unique key from an element identifier.
 * @param identifier - The element identifier
 * @returns A unique key for tracking
 */
type KeyExtractor<T = unknown> = (identifier: T) => unknown;

/**
 * Ref callback function for attaching to DOM elements.
 * @param identifier - The element identifier
 * @param element - The DOM element (null when unmounting)
 */
type RefCallback<T = unknown> = (identifier: T, element: HTMLElement | null) => void;

/**
 * Forces a height recalculation of all tracked elements.
 * @param immediate - If true, runs synchronously; if false, defers to next microtask
 */
type RecalculateHeights = (immediate?: boolean) => void;

/**
 * Hook return value tuple.
 * @template T - Type of element identifier
 */
type UseHeightTrackerReturn<T = unknown> = [
  RefCallback<T>,
  RecalculateHeights,
  Map<unknown, number>,
  number
];

/**
 * Custom React hook for tracking element heights with margin calculations.
 * 
 * @template T - Type of element identifier used for tracking
 * @param keyExtractor - Function to extract unique key from element identifier
 * @param onMount - Optional callback when element is registered
 * @param onUnmount - Optional callback when element is unregistered
 * @returns Tuple containing [refCallback, recalculate, heightsMap, updateCounter]
 * 
 * @example
 *