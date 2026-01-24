/**
 * Property Bar Checkbox Component
 * A React component that renders a checkbox with customizable properties
 */

import type { ReactElement } from 'react';

/**
 * Props for the PropertyBarCheckbox component
 */
export interface PropertyBarCheckboxProps {
  /**
   * Configuration data for the checkbox component
   */
  data: PropertyBarCheckboxData;
}

/**
 * Data structure for checkbox configuration
 */
export interface PropertyBarCheckboxData {
  /**
   * Tooltip text to display on hover
   */
  tooltip?: string;

  /**
   * Label text to display next to the checkbox
   */
  text: string;

  /**
   * Current status of the checkbox
   * @default "unchecked"
   */
  status?: CheckboxStatus;

  /**
   * Additional CSS class names to apply
   */
  className?: string;

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback function triggered when checkbox is clicked
   * @param event - The checkbox change event
   */
  onClick?: (event: CheckboxChangeEvent) => void;

  /**
   * Callback function triggered when checkbox status changes
   * @param status - The new checkbox status
   */
  onStatusChange?: (status: CheckboxStatus) => void;
}

/**
 * Checkbox status type
 */
export type CheckboxStatus = 'checked' | 'unchecked';

/**
 * Event object passed to onClick callback
 */
export interface CheckboxChangeEvent {
  /**
   * Target element information
   */
  target: {
    /**
     * Whether the checkbox is checked
     */
    checked: boolean;
  };
}

/**
 * Property Bar Checkbox Component
 * 
 * @param props - Component props containing checkbox configuration
 * @returns A React element representing the checkbox component
 * 
 * @example
 *