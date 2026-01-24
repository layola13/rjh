/**
 * Comparable mixin for Vue components
 * Provides value comparison functionality with customizable comparator
 * 
 * @module ComparableMixin
 */

import Vue, { PropOptions } from 'vue';

/**
 * Custom comparator function type
 * Used to compare two values for equality
 * 
 * @template T - The type of values being compared
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns True if values are considered equal, false otherwise
 */
export type ValueComparator<T = any> = (a: T, b: T) => boolean;

/**
 * Props interface for the Comparable mixin
 */
export interface ComparableProps {
  /**
   * Custom function to compare values for equality
   * Defaults to deep equality comparison
   */
  valueComparator: ValueComparator;
}

/**
 * Comparable mixin declaration
 * Extends Vue components with value comparison capabilities
 * 
 * @example
 *