/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props spreading functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps {
  /** Icon size in pixels or CSS size string */
  size?: number | string;
  /** Icon color, accepts CSS color values */
  color?: string;
  /** CSS class name for custom styling */
  className?: string;
  /** Inline styles object */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon component reference type
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Complete icon component type with forwarded ref support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * Default exported icon component with ref forwarding capabilities.
 * 
 * @example
 *