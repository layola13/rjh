/**
 * Module: module_163179
 * Original ID: 163179
 * 
 * Icon component with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element props
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** Additional CSS class name */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom style object */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref
 * Allows parent components to access the underlying SVG element
 * 
 * @example
 *