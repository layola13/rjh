/**
 * Scroll Number Component Type Definitions
 * A component that displays animated scrolling numbers, commonly used in badges or counters
 */

import type { CSSProperties, ReactElement, ReactNode } from 'react';

/**
 * Props for the ScrollNumber component
 */
export interface ScrollNumberProps {
  /**
   * Custom class name prefix for styling
   * @default 'scroll-number'
   */
  prefixCls?: string;

  /**
   * The number to display with scroll animation
   */
  count?: number | string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Inline styles for the component
   */
  style?: CSSProperties;

  /**
   * Title attribute for accessibility
   */
  title?: string | number;

  /**
   * Whether to show the scroll number
   * @default true
   */
  show?: boolean;

  /**
   * HTML tag or React component to render as wrapper
   * @default 'sup'
   */
  component?: keyof JSX.IntrinsicElements | React.ComponentType;

  /**
   * Child elements to render instead of default number display
   */
  children?: ReactNode;

  /**
   * Callback fired when animation completes
   */
  onAnimated?: () => void;
}

/**
 * ScrollNumber Component
 * Displays numbers with smooth scroll animation effect.
 * Commonly used for badge counts, notifications, or statistical displays.
 * 
 * @param props - Component props
 * @returns React element
 * 
 * @example
 *