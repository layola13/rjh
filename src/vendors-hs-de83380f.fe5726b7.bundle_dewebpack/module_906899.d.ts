/**
 * React component module for an icon wrapper
 * Provides a forwarded ref icon component
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** Additional CSS class names */
  className?: string;
  /** Icon color */
  color?: string;
  /** Icon size */
  size?: number | string;
  /** Custom style object */
  style?: React.CSSProperties;
}

/**
 * Forward ref icon component
 * Wraps an icon definition with proper ref forwarding
 * 
 * @example
 *