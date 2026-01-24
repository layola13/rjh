/**
 * Module: module_569141
 * Original ID: 569141
 * 
 * Icon component wrapper module that creates a forwarded ref component
 * wrapping a base icon component with a specific icon definition.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components.
 * Extend this interface with specific icon properties as needed.
 */
export interface IconComponentProps {
  /** CSS class name for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon definition object containing SVG path data and metadata.
 */
export interface IconDefinition {
  /** Icon name/identifier */
  name: string;
  /** SVG viewBox dimensions */
  viewBox?: string;
  /** SVG path data or child elements */
  icon: unknown;
  [key: string]: unknown;
}

/**
 * Props for the forwarded icon component including ref support.
 */
export type IconComponentPropsWithRef = IconComponentProps & RefAttributes<SVGSVGElement>;

/**
 * Forward ref icon component type.
 * Renders an SVG icon with forwarded ref support.
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentPropsWithRef>;

/**
 * Default exported icon component.
 * A React component that renders an icon with ref forwarding capability.
 * 
 * @example
 *