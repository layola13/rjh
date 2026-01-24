/**
 * Icon component module
 * Provides a forward-ref wrapped icon component using React
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Props for the base icon component
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon definition object containing SVG paths and metadata
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG viewBox attribute */
  viewBox?: string;
  /** SVG path data or child elements */
  path: string | ReactElement | ReactElement[];
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * Props passed to the icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /** Reference to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
  /** Icon definition object */
  icon: IconDefinition;
}

/**
 * Forward ref icon component type
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forward ref support
 * Wraps the base icon renderer with the specific icon definition
 */
declare const IconForwardRef: IconComponent;

export default IconForwardRef;