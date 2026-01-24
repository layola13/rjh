/**
 * VCheckbox component type definitions
 * A checkbox component with indeterminate state support
 */

import Vue, { VNode } from 'vue';
import { VInput } from '../VInput';
import { VIcon } from '../VIcon';

/**
 * Props interface for VCheckbox component
 */
export interface VCheckboxProps {
  /**
   * Whether the checkbox is in an indeterminate state (neither checked nor unchecked)
   */
  indeterminate?: boolean;

  /**
   * Icon to display when checkbox is in indeterminate state
   * @default "$checkboxIndeterminate"
   */
  indeterminateIcon?: string;

  /**
   * Icon to display when checkbox is unchecked
   * @default "$checkboxOff"
   */
  offIcon?: string;

  /**
   * Icon to display when checkbox is checked
   * @default "$checkboxOn"
   */
  onIcon?: string;
}

/**
 * Data interface for VCheckbox component
 */
export interface VCheckboxData {
  /**
   * Internal state tracking the indeterminate status
   */
  inputIndeterminate: boolean;
}

/**
 * Computed properties interface for VCheckbox component
 */
export interface VCheckboxComputed {
  /**
   * Combined CSS classes for the checkbox component
   * Includes selection control, checkbox-specific, and indeterminate state classes
   */
  classes: Record<string, boolean>;

  /**
   * Determines which icon to display based on component state
   * Returns indeterminate icon, on icon, or off icon depending on current state
   */
  computedIcon: string;

  /**
   * Validation state for styling purposes
   * Returns 'error', 'success', computed color, or undefined
   */
  validationState: string | undefined;
}

/**
 * Methods interface for VCheckbox component
 */
export interface VCheckboxMethods {
  /**
   * Generates the checkbox input element with icon and ripple effect
   * @returns VNode containing the checkbox structure
   */
  genCheckbox(): VNode;

  /**
   * Generates the default slot content (checkbox + label)
   * @returns Array of VNodes for the default slot
   */
  genDefaultSlot(): VNode[];
}

/**
 * VCheckbox component
 * Extends VInput with checkbox-specific functionality including indeterminate state
 */
declare const VCheckbox: Vue.VueConstructor<
  Vue & 
  VCheckboxProps & 
  VCheckboxData & 
  VCheckboxComputed & 
  VCheckboxMethods
>;

export default VCheckbox;

/**
 * Events emitted by VCheckbox component
 */
export interface VCheckboxEvents {
  /**
   * Emitted when indeterminate state changes
   * @param value - New indeterminate state
   */
  'update:indeterminate': (value: boolean) => void;
}