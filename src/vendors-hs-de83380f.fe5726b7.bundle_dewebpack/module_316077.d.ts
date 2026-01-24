/**
 * Module: module_316077
 * Original ID: 316077
 * 
 * React icon component with forwarded ref support
 */

import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component
 */
export interface IconComponentProps {
  /** Optional CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon component type with ref forwarding
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref
 * 
 * @remarks
 * This component wraps an SVG icon and supports ref forwarding to the underlying element.
 * It merges provided props with default icon configuration.
 * 
 * @example
 *