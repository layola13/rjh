import Vue, { VNode, VNodeData, FunctionalComponentOptions } from 'vue';
import { VueConstructor } from 'vue/types/vue';

/**
 * Props for VSimpleCheckbox component
 */
export interface VSimpleCheckboxProps {
  /**
   * Applies specified color to the control
   * Supports utility colors (e.g. 'primary', 'secondary', 'success', etc.)
   */
  color?: string;

  /**
   * Applies the dark theme variant to the component
   */
  dark?: boolean;

  /**
   * Applies the light theme variant to the component
   */
  light?: boolean;

  /**
   * Disables the checkbox, preventing user interaction
   */
  disabled?: boolean;

  /**
   * Enables ripple effect on click
   * @default true
   */
  ripple?: boolean;

  /**
   * The checked state of the checkbox
   */
  value?: boolean;

  /**
   * Sets the checkbox to indeterminate state
   * Useful for "select all" scenarios where some items are selected
   */
  indeterminate?: boolean;

  /**
   * Icon displayed when checkbox is in indeterminate state
   * @default "$checkboxIndeterminate"
   */
  indeterminateIcon?: string;

  /**
   * Icon displayed when checkbox is checked
   * @default "$checkboxOn"
   */
  onIcon?: string;

  /**
   * Icon displayed when checkbox is unchecked
   * @default "$checkboxOff"
   */
  offIcon?: string;
}

/**
 * Events emitted by VSimpleCheckbox component
 */
export interface VSimpleCheckboxEvents {
  /**
   * Emitted when the checkbox state changes
   * @param value - The new checked state
   */
  input?: (value: boolean) => void;
}

/**
 * VSimpleCheckbox - A simplified checkbox component without additional form control features
 * 
 * This is a functional component that provides a lightweight checkbox implementation
 * with support for indeterminate state, theming, and ripple effects.
 * 
 * @example
 *