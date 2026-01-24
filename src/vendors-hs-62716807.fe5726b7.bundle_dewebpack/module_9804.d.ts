/**
 * Ant Design Spin Component Type Definitions
 * A loading spinner component with optional nested content support
 */

import * as React from 'react';

/**
 * Size variants for the Spin component
 */
export type SpinSize = 'small' | 'default' | 'large';

/**
 * Props for the Spin component
 */
export interface SpinProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Custom CSS class name for the spin element
   */
  className?: string;

  /**
   * Delay in milliseconds before showing the spinner (avoids flickering for fast operations)
   */
  delay?: number;

  /**
   * Custom loading indicator element to replace the default spinner
   */
  indicator?: React.ReactElement;

  /**
   * Custom CSS class prefix (for theming/customization)
   * @default 'ant-spin'
   */
  prefixCls?: string;

  /**
   * Size of the spinner
   * @default 'default'
   */
  size?: SpinSize;

  /**
   * Whether the spinner is actively spinning
   * @default true
   */
  spinning?: boolean;

  /**
   * Inline styles for the spin container
   */
  style?: React.CSSProperties;

  /**
   * Descriptive text displayed below the spinner
   */
  tip?: React.ReactNode;

  /**
   * Custom CSS class name for the wrapper element (when wrapping content)
   */
  wrapperClassName?: string;

  /**
   * Nested content to be overlaid with the spinner
   */
  children?: React.ReactNode;
}

/**
 * A spinner component for displaying loading states
 * 
 * @example
 *