/**
 * React icon component wrapper
 * Provides a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size in pixels or string */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility title */
  title?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component props with ref support
 */
export type IconProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component type with forwarded ref
 */
export type IconComponent = ForwardRefExoticComponent<IconProps>;

/**
 * Default exported icon component
 * A React component that renders an SVG icon with forwarded ref support
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;