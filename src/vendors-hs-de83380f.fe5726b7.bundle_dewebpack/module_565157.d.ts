/**
 * Icon component module
 * Provides a forward-ref enabled icon component wrapper
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
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Ref forwarded to the underlying element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type definition
 * A forward-ref component that renders an SVG icon with customizable properties
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * Supports ref forwarding and accepts standard icon props
 */
declare const IconForwardRef: IconComponent;

export default IconForwardRef;