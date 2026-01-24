/**
 * RC Switch Component Type Definitions
 * A React toggle switch component with support for checked/unchecked states,
 * custom children, loading states, and keyboard navigation.
 */

import { ForwardRefExoticComponent, RefAttributes, MouseEvent, KeyboardEvent, ReactNode } from 'react';

/**
 * Props for the Switch component
 */
export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'onClick' | 'type'> {
  /**
   * CSS class prefix for the component
   * @default 'rc-switch'
   */
  prefixCls?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether the switch is checked (controlled mode)
   */
  checked?: boolean;

  /**
   * Initial checked state (uncontrolled mode)
   */
  defaultChecked?: boolean;

  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;

  /**
   * Loading icon to display when switch is in loading state
   */
  loadingIcon?: ReactNode;

  /**
   * Content to display when switch is checked
   */
  checkedChildren?: ReactNode;

  /**
   * Content to display when switch is unchecked
   */
  unCheckedChildren?: ReactNode;

  /**
   * Callback fired when switch is clicked
   * @param checked - The new checked state
   * @param event - The mouse event
   */
  onClick?: (checked: boolean, event: MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback fired when switch state changes
   * @param checked - The new checked state
   * @param event - The triggering event (mouse or keyboard)
   */
  onChange?: (checked: boolean, event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void;

  /**
   * Callback fired on key down event
   * @param event - The keyboard event
   */
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

/**
 * RC Switch Component
 * 
 * A toggle switch component that supports:
 * - Controlled and uncontrolled modes
 * - Custom checked/unchecked content
 * - Keyboard navigation (LEFT/RIGHT arrow keys)
 * - Disabled and loading states
 * - Forward ref support
 * 
 * @example
 *