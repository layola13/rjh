/**
 * Module: module_980731
 * Original ID: 980731
 * 
 * This module re-exports utility functions and classes for event handling and array operations.
 */

import type EventEmitterClass from './module_829225';
import type { getArrDiff as getArrDiffFn, getArrUnion as getArrUnionFn } from './module_353358';

/**
 * EventEmitter class for managing event subscriptions and emissions.
 * Provides publish-subscribe pattern implementation.
 */
export { EventEmitterClass as EventEmitter };

/**
 * Calculates the difference between two arrays.
 * Returns elements that exist in the first array but not in the second.
 * 
 * @param array1 - The first array to compare
 * @param array2 - The second array to compare against
 * @returns Array containing elements unique to the first array
 */
export const getArrDiff: typeof getArrDiffFn;

/**
 * Calculates the union of two arrays.
 * Returns a new array containing all unique elements from both arrays.
 * 
 * @param array1 - The first array
 * @param array2 - The second array
 * @returns Array containing all unique elements from both input arrays
 */
export const getArrUnion: typeof getArrUnionFn;