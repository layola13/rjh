/**
 * Toggleable Mixin Factory
 * 
 * Creates a Vue mixin that provides two-way binding functionality for toggleable components.
 * This factory allows customization of the prop name and event name used for v-model binding.
 * 
 * @module Toggleable
 */

import { VueConstructor } from 'vue';

/**
 * Options for defining a toggleable component's model binding
 */
interface ToggleableOptions {
  /** The prop name to use for v-model binding */
  prop: string;
  /** The event name to emit when the value changes */
  event: string;
}

/**
 * Data structure for the toggleable mixin
 */
interface ToggleableData {
  /** Internal active state of the toggleable component */
  isActive: boolean;
}

/**
 * Props definition for the toggleable mixin
 */
interface ToggleableProps {
  [key: string]: {
    required: boolean;
  };
}

/**
 * Watch handlers for the toggleable mixin
 */
interface ToggleableWatchers {
  [key: string]: (newValue: boolean) => void;
  isActive: (newValue: boolean) => void;
}

/**
 * Vue component instance with toggleable capabilities
 */
interface ToggleableComponent extends Vue {
  [key: string]: unknown;
  isActive: boolean;
  $emit(event: string, value: boolean): void;
}

/**
 * Factory function that creates a Vue mixin for toggleable behavior.
 * 
 * The mixin provides:
 * - A configurable prop for the component's value
 * - An internal `isActive` state synchronized with the prop
 * - Automatic event emission when the internal state changes
 * - Two-way data binding support via v-model
 * 
 * @param propName - The name of the prop to use for v-model (default: 'value')
 * @param eventName - The name of the event to emit on changes (default: 'input')
 * @returns A Vue mixin constructor with toggleable functionality
 * 
 * @example
 *