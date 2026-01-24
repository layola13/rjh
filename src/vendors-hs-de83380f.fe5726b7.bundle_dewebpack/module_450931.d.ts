/**
 * React icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 * Extends standard SVG element props
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /** Icon size in pixels or CSS units */
  size?: string | number;
  /** Icon color, accepts any valid CSS color value */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Icon style object */
  style?: React.CSSProperties;
}

/**
 * Icon component props
 * Combines base icon props with ref attributes
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component type definition
 * A forward ref component that renders an SVG icon
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default exported icon component
 * Created using React.forwardRef to support ref forwarding
 * 
 * @example
 *