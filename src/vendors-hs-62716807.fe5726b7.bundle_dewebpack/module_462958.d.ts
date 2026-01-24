/**
 * Col Component - Grid Column Component
 * 
 * A responsive grid column component that supports:
 * - Flexible span widths
 * - Responsive breakpoints (xs, sm, md, lg, xl, xxl)
 * - Offset, push, and pull positioning
 * - Flex layout
 * - Integration with Row component gutter system
 */

import * as React from 'react';

/**
 * Responsive breakpoint size type
 */
export type BreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Configuration for a specific breakpoint
 */
export interface ColSize {
  /** Number of columns to span (1-24) */
  span?: number;
  /** Column order */
  order?: number;
  /** Number of columns to offset */
  offset?: number;
  /** Number of columns to push */
  push?: number;
  /** Number of columns to pull */
  pull?: number;
}

/**
 * Flex property value types
 */
export type FlexValue = 
  | number
  | string
  | 'auto'
  | 'none';

/**
 * Props for the Col component
 */
export interface ColProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Custom CSS class prefix, defaults to 'ant-col' */
  prefixCls?: string;
  
  /** Number of columns to span (1-24) */
  span?: number;
  
  /** Column order */
  order?: number;
  
  /** Number of columns to offset */
  offset?: number;
  
  /** Number of columns to push (for ordering) */
  push?: number;
  
  /** Number of columns to pull (for ordering) */
  pull?: number;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Child elements */
  children?: React.ReactNode;
  
  /** 
   * Flex layout configuration
   * - number: flex shorthand "n n auto"
   * - string: custom flex value or CSS size (e.g., "100px", "50%")
   * - 'auto': auto flex
   * - 'none': no flex
   */
  flex?: FlexValue;
  
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Extra-small screen (<576px) configuration */
  xs?: number | ColSize;
  
  /** Small screen (≥576px) configuration */
  sm?: number | ColSize;
  
  /** Medium screen (≥768px) configuration */
  md?: number | ColSize;
  
  /** Large screen (≥992px) configuration */
  lg?: number | ColSize;
  
  /** Extra-large screen (≥1200px) configuration */
  xl?: number | ColSize;
  
  /** Double extra-large screen (≥1600px) configuration */
  xxl?: number | ColSize;
}

/**
 * Context provided by Row component
 * @internal
 */
export interface RowContextState {
  /** 
   * Gutter spacing between columns
   * [horizontal, vertical] in pixels
   */
  gutter?: [number, number] | number;
  
  /** Whether to wrap columns */
  wrap?: boolean;
}

/**
 * Config context from ConfigProvider
 * @internal
 */
export interface ConfigContextState {
  /** Function to get prefixed CSS class name */
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  
  /** Layout direction: 'ltr' or 'rtl' */
  direction?: 'ltr' | 'rtl';
}

/**
 * Grid column component for responsive layouts
 * 
 * @example
 *