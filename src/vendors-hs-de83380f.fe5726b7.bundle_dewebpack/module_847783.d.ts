import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component properties
 * Extends standard SVG element properties
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Custom class name for styling */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color/fill */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
}

/**
 * Icon component with forward ref support
 * 
 * A reusable icon component that renders SVG graphics with customizable properties.
 * Supports ref forwarding to access the underlying SVG element.
 * 
 * @example
 *