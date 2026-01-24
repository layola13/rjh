/**
 * Icon component module
 * Exports a forwarded ref icon component
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Props for the icon component
 * Extends standard HTML attributes and custom icon properties
 */
export interface IconComponentProps {
  /** Custom class name for styling */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Any other valid SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon definition interface
 * Contains the icon's SVG path data and metadata
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG path data */
  path: string;
  /** ViewBox dimensions */
  viewBox?: string;
  /** Default width */
  width?: number;
  /** Default height */
  height?: number;
}

/**
 * Forwarded ref icon component
 * 
 * Renders an icon with support for ref forwarding, allowing parent components
 * to access the underlying DOM element.
 * 
 * @example
 *