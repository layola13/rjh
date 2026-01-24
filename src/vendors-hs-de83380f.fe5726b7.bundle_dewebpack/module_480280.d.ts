/**
 * React icon component wrapper
 * Wraps an icon with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Ref forwarded to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type with forwarded ref
 * 
 * @example
 *