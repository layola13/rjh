/**
 * Icon component module
 * 
 * A forwarded ref icon component that wraps a base icon implementation.
 * This module provides a reusable icon component with proper TypeScript typing.
 */

import * as React from 'react';

/**
 * Props for the Icon component
 * Extends standard HTML attributes and adds icon-specific properties
 */
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom class name for styling
   */
  className?: string;

  /**
   * Size of the icon (in pixels or CSS units)
   */
  size?: number | string;

  /**
   * Color of the icon
   */
  color?: string;

  /**
   * Icon style variant
   */
  style?: React.CSSProperties;

  /**
   * Additional props passed to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *