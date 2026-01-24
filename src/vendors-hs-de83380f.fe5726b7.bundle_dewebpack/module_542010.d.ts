/**
 * Module: module_542010
 * Original ID: 542010
 * 
 * A React icon component factory that creates a forwarded ref wrapper
 * around a base icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component, excluding ref
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** Optional CSS class name */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  [key: string]: unknown;
}

/**
 * Icon definition object containing SVG path data and metadata
 */
export interface IconDefinition {
  /** SVG path data */
  path: string | string[];
  /** ViewBox dimensions */
  viewBox?: string;
  /** Default width */
  width?: number;
  /** Default height */
  height?: number;
  [key: string]: unknown;
}

/**
 * A forwarded ref icon component that wraps a base icon implementation
 * with the specific icon definition from module 734787.
 * 
 * @example
 *