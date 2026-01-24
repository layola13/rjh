/**
 * Small-sized select component wrapper
 * A convenience component that wraps a base Select component with a fixed "small" size prop
 */

import type { ComponentType, ReactElement } from 'react';

/**
 * Props for the small select component
 * Extends all props from the base Select component except 'size' which is fixed to 'small'
 */
export interface SmallSelectProps<T = unknown> {
  /** The value of the select */
  value?: T;
  /** Default value for uncontrolled component */
  defaultValue?: T;
  /** Callback fired when value changes */
  onChange?: (value: T) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Child Option elements */
  children?: React.ReactNode;
  /** Allow multiple selection */
  multiple?: boolean;
  /** Allow clearing the selection */
  allowClear?: boolean;
  /** Additional props from base Select component */
  [key: string]: unknown;
}

/**
 * Props for Select.Option component
 */
export interface SelectOptionProps<T = unknown> {
  /** The value of the option */
  value: T;
  /** Display label for the option */
  label?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Child content to render */
  children?: React.ReactNode;
  /** Additional props */
  [key: string]: unknown;
}

/**
 * Option component type attached to SmallSelect
 */
export interface OptionComponent<T = unknown> {
  (props: SelectOptionProps<T>): ReactElement;
}

/**
 * Small select component with Option sub-component
 */
export interface SmallSelectComponent {
  <T = unknown>(props: SmallSelectProps<T>): ReactElement;
  /** Option sub-component for defining select options */
  Option: OptionComponent;
}

/**
 * A pre-configured Select component with size fixed to "small"
 * Useful for consistent small-sized selects throughout the application
 * 
 * @example
 *