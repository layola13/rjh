/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import * as React from 'react';

/**
 * Props for the Icon component
 * Extends standard SVG element props and supports ref forwarding
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Optional class name for custom styling */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *