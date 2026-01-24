/**
 * Checkbox component type definitions
 * A wrapper component for checkboxes with support for indeterminate state and checkbox groups
 */

import type { ConfigConsumerProps } from './ConfigContext';
import type { GroupContext } from './GroupContext';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps {
  /**
   * Custom CSS class prefix for the checkbox
   * @default 'ant-checkbox'
   */
  prefixCls?: string;

  /**
   * Additional CSS class name for the wrapper element
   */
  className?: string;

  /**
   * Content to be displayed next to the checkbox (label)
   */
  children?: ReactNode;

  /**
   * Whether the checkbox is in indeterminate state (partially checked)
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Inline styles for the wrapper element
   */
  style?: CSSProperties;

  /**
   * Mouse enter event handler
   */
  onMouseEnter?: (event: MouseEvent<HTMLLabelElement>) => void;

  /**
   * Mouse leave event handler
   */
  onMouseLeave?: (event: MouseEvent<HTMLLabelElement>) => void;

  /**
   * Whether to skip group context integration
   * When true, the checkbox will not register with parent CheckboxGroup
   * @default false
   */
  skipGroup?: boolean;

  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;

  /**
   * Value of the checkbox (used in CheckboxGroup)
   */
  value?: string | number | boolean;

  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;

  /**
   * Name attribute for the input element
   */
  name?: string;

  /**
   * Change event handler
   * @param event - The change event
   */
  onChange?: (event: CheckboxChangeEvent) => void;
}

/**
 * Checkbox change event type
 */
export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: Event;
}

/**
 * Checkbox change event target type
 */
export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

/**
 * Option type for checkbox group toggle
 */
export interface CheckboxOptionType {
  /**
   * Label content for the checkbox
   */
  label: ReactNode;

  /**
   * Value of the checkbox option
   */
  value: string | number | boolean;
}

/**
 * Checkbox component with forward ref support
 * 
 * @example
 *