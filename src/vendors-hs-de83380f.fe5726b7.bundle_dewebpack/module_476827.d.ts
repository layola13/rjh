/**
 * React component wrapper for an icon
 * Module: module_476827
 * Original ID: 476827
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Icon component props
 * Extends standard SVG element props and supports forwarded refs
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** Custom CSS class name */
  className?: string;
  /** Icon size in pixels or string value */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * Wraps an SVG icon with React forwardRef for ref forwarding capability
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A forwardRef-wrapped React component that renders an SVG icon
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;