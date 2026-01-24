/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** Custom class name for styling */
  className?: string;
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Forward ref icon component
 * 
 * A React component that wraps an SVG icon with forwarded ref support.
 * Allows parent components to access the underlying SVG element.
 * 
 * @example
 *