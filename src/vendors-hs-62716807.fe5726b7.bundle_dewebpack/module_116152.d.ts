/**
 * Ant Design Switch Component
 * A modern toggle switch component with loading state support
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Size variants for the Switch component
 */
export type SwitchSize = 'small' | 'default';

/**
 * Configuration for click events on the Switch
 */
export type SwitchChangeEventHandler = (
  checked: boolean,
  event: MouseEvent
) => void;

/**
 * Props for the Switch component
 */
export interface SwitchProps {
  /**
   * Custom CSS class prefix for styling
   * @default 'ant-switch'
   */
  prefixCls?: string;

  /**
   * Size of the switch
   * @default 'default'
   */
  size?: SwitchSize;

  /**
   * Whether the switch is in loading state
   * When true, the switch is disabled and shows a loading icon
   * @default false
   */
  loading?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Determine whether the switch is checked
   */
  checked?: boolean;

  /**
   * Initial checked state when component is uncontrolled
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Callback executed when the checked state changes
   */
  onChange?: SwitchChangeEventHandler;

  /**
   * Callback executed on click
   */
  onClick?: SwitchChangeEventHandler;

  /**
   * Content to be shown when the state is checked
   */
  checkedChildren?: React.ReactNode;

  /**
   * Content to be shown when the state is unchecked
   */
  unCheckedChildren?: React.ReactNode;

  /**
   * Custom tab index
   */
  tabIndex?: number;

  /**
   * Auto focus when component is mounted
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Custom id attribute
   */
  id?: string;

  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Switch component reference type
 */
export interface SwitchRef {
  focus: () => void;
  blur: () => void;
}

/**
 * Ant Design Switch Component
 * 
 * A toggle switch for selecting between two states (on/off, true/false).
 * Supports loading state, custom sizing, and RTL direction.
 * 
 * @example
 *