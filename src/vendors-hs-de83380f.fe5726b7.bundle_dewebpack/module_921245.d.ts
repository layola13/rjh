/**
 * React component for rendering an icon.
 * This module exports a forwarded ref icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the base icon component.
 * Extends standard SVG element properties.
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Optional CSS class name */
  className?: string;
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom style object */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support.
 * Wraps an SVG icon definition with proper TypeScript typing.
 * 
 * @example
 *