/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

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
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Forwarded ref to the underlying SVG element */
  ref?: Ref<SVGSVGElement>;
}

/**
 * Icon component type with forwarded ref
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * @example
 *