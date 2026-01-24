/**
 * React icon component module
 * Exports a forwarded ref icon component wrapper
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element props with custom icon properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** Optional CSS class name */
  className?: string;
  /** Icon size in pixels or CSS units */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Accessible title for the icon */
  title?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
}

/**
 * Icon component with forward ref support
 * Wraps an SVG icon with standardized props and ref forwarding
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A React icon component with forwarded ref
 * Combines props with a predefined icon definition and renders through a generic icon wrapper
 */
declare const IconWithRef: IconComponent;

export default IconWithRef;