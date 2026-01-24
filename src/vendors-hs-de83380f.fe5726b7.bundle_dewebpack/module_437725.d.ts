/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Props for the icon component with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Icon data configuration */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG path data */
  path: string | string[];
  /** ViewBox dimensions */
  viewBox?: string;
  /** Default width */
  width?: number;
  /** Default height */
  height?: number;
}

/**
 * Icon component type with forwarded ref
 * Renders an SVG icon with customizable properties
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A React component that renders an icon with forwarded ref support
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;