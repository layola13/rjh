/**
 * React icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Other HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Forwarded ref to the underlying element */
  ref?: Ref<SVGSVGElement>;
}

/**
 * Icon definition object containing SVG path data and metadata
 */
export interface IconDefinition {
  /** SVG path data */
  path?: string | string[];
  /** ViewBox dimensions */
  viewBox?: string;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Forwarded ref icon component type
 * Renders an icon with the ability to forward refs to the underlying SVG element
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;