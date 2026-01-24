/**
 * Icon component module
 * Wraps an SVG icon with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /** Icon size in pixels or CSS unit */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Icon stroke width */
  strokeWidth?: number;
  /** Accessibility label */
  'aria-label'?: string;
  /** Icon title for accessibility */
  title?: string;
}

/**
 * Icon component with ref forwarding support
 * 
 * @example
 *