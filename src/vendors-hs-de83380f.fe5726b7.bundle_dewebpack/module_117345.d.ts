/**
 * React icon component wrapper module
 * Provides a forwarded ref icon component with default icon configuration
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS size string */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom class name */
  className?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: any;
}

/**
 * Props for the icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /** Icon data configuration */
  icon?: IconDefinition;
}

/**
 * Icon definition structure containing SVG path data and metadata
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG viewBox dimensions */
  viewBox?: string;
  /** SVG path data or child elements */
  children?: ReactElement | ReactElement[];
  /** Additional icon metadata */
  [key: string]: any;
}

/**
 * Forwarded ref icon component type
 * Combines icon props with ref support for SVG elements
 */
export type IconComponent = ForwardRefExoticComponent<
  IconWrapperProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref
 * Wraps the base icon with pre-configured default icon data
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;