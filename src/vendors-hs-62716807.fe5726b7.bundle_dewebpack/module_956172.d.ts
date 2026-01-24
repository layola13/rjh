/**
 * Button Group Component Type Definitions
 * A wrapper component for grouping multiple buttons together
 */

import { ReactElement, HTMLAttributes } from 'react';

/**
 * Size options for the button group
 */
export type ButtonGroupSize = 'large' | 'middle' | 'small';

/**
 * Props for the ButtonGroup component
 */
export interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
  /**
   * Custom class prefix for styling
   * @default 'ant-btn-group'
   */
  prefixCls?: string;

  /**
   * Size of all buttons in the group
   * @default 'middle'
   */
  size?: ButtonGroupSize;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Child buttons to be grouped
   */
  children?: React.ReactNode;
}

/**
 * Button Group Component
 * Groups multiple buttons together with consistent styling and spacing
 * 
 * @example
 *