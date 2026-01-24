/**
 * Icon component module
 * A forwarded ref icon component that wraps a base icon with additional props
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
interface IconBaseProps {
  /** CSS class name for styling */
  className?: string;
  /** Inline style object */
  style?: React.CSSProperties;
  /** Icon size in pixels or as a string */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon definition object containing SVG path data and metadata
 */
interface IconDefinition {
  /** SVG path data or icon content */
  icon: any;
  /** Icon name identifier */
  iconName?: string;
  /** Icon prefix (e.g., 'fas', 'far') */
  prefix?: string;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * Props for the forwarded icon component
 */
type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * The default exported icon component
 * A React forwardRef component that renders an SVG icon with customizable properties
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns A rendered icon element
 */
declare const IconComponent: ForwardRefExoticComponent<IconComponentProps>;

export default IconComponent;

/**
 * Type definitions for the icon module exports
 */
export type { IconBaseProps, IconDefinition, IconComponentProps };