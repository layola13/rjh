/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** Custom className for styling */
  className?: string;
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional style object */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Icon component ref type
 */
export type IconRef = SVGSVGElement;

/**
 * Complete icon component props including ref
 */
export type IconComponentProps = IconBaseProps & RefAttributes<IconRef>;

/**
 * Icon component type definition
 * A forward ref component that renders an SVG icon with customizable properties
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default exported icon component
 * Created using React.forwardRef to support ref forwarding to the underlying SVG element
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;