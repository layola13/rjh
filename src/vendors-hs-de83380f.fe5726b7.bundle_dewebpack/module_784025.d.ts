/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Accessibility label */
  'aria-label'?: string;
  /** Custom data attributes */
  [key: `data-${string}`]: unknown;
}

/**
 * Icon component props extending base props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Icon definition object containing path data */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** SVG path data */
  path: string | string[];
  /** ViewBox dimensions */
  viewBox?: string;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * Forwarded ref type for SVG element
 */
export type IconRef = SVGSVGElement;

/**
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps an icon definition with React.forwardRef,
 * allowing parent components to access the underlying SVG element.
 * 
 * @example
 *