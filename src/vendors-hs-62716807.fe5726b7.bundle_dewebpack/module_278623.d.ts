/**
 * Ant Design Password Input Component Type Definitions
 * A password input component with visibility toggle functionality
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, MouseEvent } from 'react';
import type { InputProps } from './Input';
import type { SizeType } from '../config-provider/SizeContext';

/**
 * Trigger action type for password visibility toggle
 */
export type PasswordVisibilityToggleAction = 'click' | 'hover';

/**
 * Icon render function type
 * @param visible - Current visibility state of the password
 * @returns React element representing the toggle icon
 */
export type IconRenderFunction = (visible: boolean) => ReactElement;

/**
 * Password input component props
 */
export interface PasswordProps extends Omit<InputProps, 'type' | 'suffix'> {
  /**
   * CSS class name for the password input container
   */
  className?: string;

  /**
   * Custom prefix class name for the component
   */
  prefixCls?: string;

  /**
   * Custom prefix class name for the input element
   */
  inputPrefixCls?: string;

  /**
   * Size of the password input
   * @default undefined
   */
  size?: SizeType;

  /**
   * Whether to show the visibility toggle icon
   * @default true
   */
  visibilityToggle?: boolean;

  /**
   * Action that triggers the visibility toggle
   * @default 'click'
   */
  action?: PasswordVisibilityToggleAction;

  /**
   * Custom render function for the visibility toggle icon
   * @param visible - Current visibility state
   * @returns Icon element
   * @default (visible) => visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
   */
  iconRender?: IconRenderFunction;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Suffix element (overridden by visibility toggle icon when enabled)
   */
  suffix?: ReactElement;
}

/**
 * Password input component with visibility toggle functionality
 * 
 * @example
 *