/**
 * React icon component module
 * 
 * This module exports a forwarded ref icon component that wraps
 * a base icon component with additional props and an icon definition.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: string | number;
  
  /** Icon color */
  color?: string;
  
  /** Icon style */
  style?: React.CSSProperties;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** Icon name */
  name: string;
  
  /** SVG path data */
  path: string | string[];
  
  /** ViewBox dimensions */
  viewBox?: string;
  
  /** Icon metadata */
  attrs?: Record<string, unknown>;
}

/**
 * Props for the forwarded icon component
 */
export interface IconComponentProps extends IconBaseProps, RefAttributes<SVGSVGElement> {}

/**
 * Forwarded ref icon component
 * 
 * A React component that renders an SVG icon with support for forwarded refs.
 * This component merges user-provided props with a predefined icon definition.
 * 
 * @example
 *