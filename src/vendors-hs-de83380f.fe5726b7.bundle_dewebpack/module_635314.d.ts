/**
 * Icon component module
 * Wraps an icon with forwarded ref support
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color, defaults to currentColor */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline style overrides */
  style?: React.CSSProperties;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Custom title element */
  title?: string;
}

/**
 * Props specific to this icon component wrapper
 */
export interface IconComponentProps extends IconBaseProps {
  /** Forward ref to underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This is a wrapper around a base icon component that forwards refs
 * to allow direct access to the underlying SVG element.
 * 
 * @example
 *