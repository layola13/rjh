import React from 'react';

/**
 * Props for the ClickableDiv component
 */
export interface ClickableDivProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom inline styles to apply to the component
   */
  style?: React.CSSProperties;
  
  /**
   * If true, disables default button-like styles
   * @default false
   */
  noStyle?: boolean;
  
  /**
   * If true, disables pointer events on the component
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Click event handler
   */
  onClick?: (event?: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * A div element that behaves like a button with keyboard accessibility support.
 * 
 * Features:
 * - Supports keyboard interaction (Enter key triggers onClick)
 * - Can be styled as a transparent button
 * - Supports disabled state
 * - Fully accessible with role="button" and tabIndex
 * 
 * @example
 *