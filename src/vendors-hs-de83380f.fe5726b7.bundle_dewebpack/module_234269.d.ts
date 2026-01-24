/**
 * React component wrapper for an icon component
 * Forwards ref to the underlying icon element
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component
 * Extends standard HTML attributes and allows custom icon configuration
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** Custom CSS class name */
  className?: string;
  /** Icon size in pixels or CSS value */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Icon data/configuration object */
  icon?: IconDefinition;
  [key: string]: unknown;
}

/**
 * Icon definition structure containing path data and metadata
 */
export interface IconDefinition {
  /** Icon identifier */
  name: string;
  /** SVG path data or child elements */
  icon: unknown[];
  /** Icon prefix (e.g., 'fas', 'far') */
  prefix?: string;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * Forward ref component type for the icon
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with ref forwarding support
 * 
 * @example
 *