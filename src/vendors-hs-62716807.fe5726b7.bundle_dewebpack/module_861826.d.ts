/**
 * Ant Design Button Component Type Definitions
 * 
 * This module provides type definitions for the Button component,
 * including legacy props conversion utilities and the main Button component interface.
 */

import * as React from 'react';

/**
 * Button types supported by the component
 */
export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';

/**
 * Button shapes
 */
export type ButtonShape = 'circle' | 'round';

/**
 * Button HTML types
 */
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

/**
 * Button sizes
 */
export type SizeType = 'small' | 'middle' | 'large';

/**
 * Loading state configuration
 * Can be a boolean or an object with a delay property
 */
export type LoadingConfig = boolean | { delay?: number };

/**
 * Legacy button type that needs conversion
 */
export type LegacyButtonType = ButtonType | 'danger';

/**
 * Result of converting legacy props
 */
export interface ConvertedLegacyProps {
  danger?: boolean;
  type?: ButtonType;
}

/**
 * Converts legacy button props (e.g., type="danger") to new format
 * 
 * @param legacyType - The legacy button type string
 * @returns Converted props object with separate danger flag
 * 
 * @example
 * convertLegacyProps('danger') // returns { danger: true }
 * convertLegacyProps('primary') // returns { type: 'primary' }
 */
export function convertLegacyProps(legacyType: LegacyButtonType): ConvertedLegacyProps;

/**
 * Base button props interface
 */
export interface BaseButtonProps {
  /**
   * Button type
   * @default 'default'
   */
  type?: ButtonType;
  
  /**
   * Set the danger status of button
   * @default false
   */
  danger?: boolean;
  
  /**
   * Button shape
   */
  shape?: ButtonShape;
  
  /**
   * Button size
   */
  size?: SizeType;
  
  /**
   * Loading state of button
   * @default false
   */
  loading?: LoadingConfig;
  
  /**
   * Custom CSS class name
   */
  className?: string;
  
  /**
   * Custom prefix for CSS classes
   */
  prefixCls?: string;
  
  /**
   * Button content
   */
  children?: React.ReactNode;
  
  /**
   * Icon to display in button
   */
  icon?: React.ReactNode;
  
  /**
   * Make background transparent and invert text and border colors
   * @default false
   */
  ghost?: boolean;
  
  /**
   * Make button fit its parent width
   * @default false
   */
  block?: boolean;
  
  /**
   * Set the original html type of button
   * @default 'button'
   */
  htmlType?: ButtonHTMLType;
  
  /**
   * Redirect URL of a link button
   */
  href?: string;
  
  /**
   * Click event handler
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
}

/**
 * Button props for native button element
 */
export interface NativeButtonProps extends BaseButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  htmlType?: ButtonHTMLType;
  href?: never;
}

/**
 * Button props for anchor element
 */
export interface AnchorButtonProps extends BaseButtonProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'onClick'> {
  htmlType?: never;
  href: string;
}

/**
 * Combined button props type
 */
export type ButtonProps = NativeButtonProps | AnchorButtonProps;

/**
 * Button Group props interface
 */
export interface ButtonGroupProps {
  /**
   * Custom CSS class name
   */
  className?: string;
  
  /**
   * Custom prefix for CSS classes
   */
  prefixCls?: string;
  
  /**
   * Button size for all buttons in the group
   */
  size?: SizeType;
  
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Buttons to be grouped
   */
  children?: React.ReactNode;
}

/**
 * Button component interface with static properties
 */
export interface ButtonComponent extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> {
  /**
   * Button Group sub-component
   */
  Group: React.FC<ButtonGroupProps>;
  
  /**
   * Internal marker for Ant Design Button component
   * @internal
   */
  __ANT_BUTTON: boolean;
}

/**
 * Ant Design Button Component
 * 
 * To trigger an operation.
 * 
 * @example
 *