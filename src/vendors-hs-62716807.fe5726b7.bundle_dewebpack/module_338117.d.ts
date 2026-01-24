/**
 * Ant Design Checkbox Component Module
 * 
 * This module exports the Checkbox component with its Group subcomponent.
 * The __ANT_CHECKBOX flag is used for internal component identification.
 */

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Default checked state */
  defaultChecked?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Indeterminate state of checkbox */
  indeterminate?: boolean;
  /** Change event handler */
  onChange?: (e: CheckboxChangeEvent) => void;
  /** Value of the checkbox */
  value?: unknown;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Child content */
  children?: React.ReactNode;
}

/**
 * Props for the Checkbox.Group component
 */
export interface CheckboxGroupProps {
  /** Options for checkbox group */
  options?: Array<CheckboxOptionType | string>;
  /** Default selected values */
  defaultValue?: Array<unknown>;
  /** Selected values */
  value?: Array<unknown>;
  /** Whether all checkboxes are disabled */
  disabled?: boolean;
  /** Change event handler */
  onChange?: (checkedValues: Array<unknown>) => void;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Child checkboxes */
  children?: React.ReactNode;
}

/**
 * Checkbox option type for Group
 */
export interface CheckboxOptionType {
  label: React.ReactNode;
  value: unknown;
  disabled?: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
}

/**
 * Checkbox change event
 */
export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: Event;
}

/**
 * Checkbox change event target
 */
export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

/**
 * Checkbox component interface
 */
export interface CheckboxComponent extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>> {
  /** Checkbox Group subcomponent */
  Group: typeof CheckboxGroup;
  /** Internal flag for Ant Design component identification */
  __ANT_CHECKBOX: true;
}

/**
 * Checkbox Group component
 */
declare const CheckboxGroup: React.FC<CheckboxGroupProps>;

/**
 * Ant Design Checkbox component
 * 
 * Checkbox component for selecting multiple options from a set.
 * 
 * @example
 *