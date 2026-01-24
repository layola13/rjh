/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS size value */
  size?: number | string;
  /** Icon color, accepts any valid CSS color value */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline style object */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: any;
}

/**
 * Icon component definition with SVG path data
 */
export interface IconDefinition {
  /** SVG viewBox attribute */
  viewBox?: string;
  /** SVG path data or child elements */
  path: string | ReactElement | ReactElement[];
  /** Default width */
  width?: number;
  /** Default height */
  height?: number;
}

/**
 * Props for the icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /** Icon definition object containing SVG data */
  icon: IconDefinition;
  /** Forwarded ref */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forwarded ref icon component type
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * This component wraps an icon definition with proper ref forwarding
 * and merges additional props for customization.
 * 
 * @example
 *