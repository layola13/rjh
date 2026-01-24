/**
 * Icon component module
 * Wraps an icon with forwardRef support for ref forwarding
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon rotation angle */
  rotate?: number;
  /** Icon spin animation */
  spin?: boolean;
  /** Accessibility label */
  'aria-label'?: string;
  /** ARIA hidden attribute */
  'aria-hidden'?: boolean;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Reference to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type definition
 * A forward ref component that renders an SVG icon
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * This is a forward ref component that wraps an icon definition
 * and passes all props along with the ref to the base icon component
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;