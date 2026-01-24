/**
 * Checkbox Group Component
 * Provides a container for managing multiple checkboxes with shared state
 */

import React from 'react';

/**
 * Configuration for individual checkbox option within the group
 */
export interface CheckboxOptionType {
  /** Display text for the checkbox */
  label: React.ReactNode;
  /** Unique value identifying this checkbox */
  value: string | number | boolean;
  /** Additional CSS styles for this option */
  style?: React.CSSProperties;
  /** Whether this specific checkbox is disabled */
  disabled?: boolean;
  /** Custom change handler for this specific checkbox */
  onChange?: (e: CheckboxChangeEvent) => void;
}

/**
 * Event object passed to checkbox change handlers
 */
export interface CheckboxChangeEvent {
  target: {
    checked: boolean;
    value: CheckboxValueType;
  };
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: Event;
}

/**
 * Valid types for checkbox values
 */
export type CheckboxValueType = string | number | boolean;

/**
 * Props for the Checkbox Group component
 */
export interface CheckboxGroupProps {
  /** Custom CSS class name */
  className?: string;
  /** Array of checkbox options (can be strings or option objects) */
  options?: Array<CheckboxOptionType | string>;
  /** Initial default selected values (uncontrolled mode) */
  defaultValue?: CheckboxValueType[];
  /** Currently selected values (controlled mode) */
  value?: CheckboxValueType[];
  /** Callback fired when selection changes */
  onChange?: (checkedValues: CheckboxValueType[]) => void;
  /** Disable all checkboxes in the group */
  disabled?: boolean;
  /** Custom prefix for CSS classes */
  prefixCls?: string;
  /** Shared name attribute for all checkboxes */
  name?: string;
  /** Child checkbox elements */
  children?: React.ReactNode;
  /** Inline styles for the container */
  style?: React.CSSProperties;
  /** HTML ID attribute */
  id?: string;
}

/**
 * Context value provided to child checkboxes
 */
export interface CheckboxGroupContext {
  /** Toggle the selection state of a checkbox option */
  toggleOption: (option: { value: CheckboxValueType }) => void;
  /** Currently selected values */
  value: CheckboxValueType[];
  /** Whether the entire group is disabled */
  disabled?: boolean;
  /** Shared name for form submission */
  name?: string;
  /** Register a new checkbox value with the group */
  registerValue: (value: CheckboxValueType) => void;
  /** Unregister a checkbox value from the group */
  cancelValue: (value: CheckboxValueType) => void;
}

/**
 * React Context for sharing checkbox group state with child components
 */
export const GroupContext: React.Context<CheckboxGroupContext | null>;

/**
 * Checkbox Group Component
 * 
 * @description
 * A wrapper component that manages the state of multiple checkboxes.
 * Supports both controlled and uncontrolled modes, and can render
 * checkboxes from an options array or accept child Checkbox components.
 * 
 * @example
 *