/**
 * Icon component module
 * Provides a forward-ref wrapped icon component with default icon configuration
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** CSS class name for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility title */
  title?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Icon component props extending base props with ref support
 */
export interface IconProps extends IconBaseProps {
  /** SVG icon data configuration */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** Icon identifier */
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
 * Icon component with forward ref support
 * 
 * @remarks
 * This component wraps an SVG icon with React's forwardRef to allow
 * parent components to access the underlying DOM element.
 * 
 * @example
 *