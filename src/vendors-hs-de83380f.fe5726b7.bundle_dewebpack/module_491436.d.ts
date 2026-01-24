/**
 * React Icon Component
 * 
 * A forwarded ref icon component that wraps a base icon implementation.
 * This module exports a React component with icon rendering capabilities.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base icon data structure
 * Contains the SVG path data and metadata for the icon
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG path data or icon configuration */
  icon: unknown;
  /** Additional icon metadata */
  [key: string]: unknown;
}

/**
 * Props for the icon component
 */
export interface IconComponentProps {
  /** Icon size in pixels or CSS size string */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component type with forwarded ref support
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * A React component that renders an SVG icon with forwarded ref support.
 * Combines provided props with the icon definition and passes them to the base icon renderer.
 * 
 * @example
 *