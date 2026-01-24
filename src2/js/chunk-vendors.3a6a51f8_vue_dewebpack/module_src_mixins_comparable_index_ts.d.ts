/**
 * Comparable mixin for Vue components
 * Provides value comparison functionality with customizable comparator
 * 
 * @module ComparableMixin
 */

import Vue, { PropType } from 'vue';

/**
 * Type definition for value comparator function
 * Compares two values and returns true if they are equal
 */
export type ValueComparator<T = any> = (a: T, b: T) => boolean;

/**
 * Props interface for Comparable mixin
 */
export interface ComparableProps {
  /**
   * Custom comparison function for values
   * @default deepEqual from util/helpers
   */
  valueComparator: ValueComparator;
}

/**
 * Comparable mixin declaration
 * Extends Vue components with value comparison capabilities
 */
declare const ComparableMixin: import('vue/types/vue').ExtendedVue<
  Vue,
  {},
  {},
  {},
  ComparableProps
>;

export default ComparableMixin;