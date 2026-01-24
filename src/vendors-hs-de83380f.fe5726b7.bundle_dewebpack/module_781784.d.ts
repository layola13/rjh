/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element props
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** Optional class name for styling */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color/fill */
  color?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * A React component that renders an SVG icon with customizable props
 * 
 * @example
 *