/**
 * Icon component module
 * Provides a forwardRef-wrapped icon component
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
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
 * Props for the forwarded icon component
 */
export interface IconComponentProps extends IconBaseProps {
  /** Icon definition object */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** Icon name/identifier */
  name: string;
  /** SVG path data */
  path: string | string[];
  /** ViewBox dimensions */
  viewBox?: string;
  /** Default width */
  width?: number;
  /** Default height */
  height?: number;
}

/**
 * Icon component with ref forwarding support
 * 
 * @example
 *