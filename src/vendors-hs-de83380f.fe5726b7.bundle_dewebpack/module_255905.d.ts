/**
 * React component module for an icon with forwarded ref support.
 * This module exports a React component that wraps an icon component with ref forwarding capabilities.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Props for the icon component.
 * Extends base icon properties with additional customization options.
 */
export interface IconComponentProps {
  /** CSS class name for styling */
  className?: string;
  /** Inline style object */
  style?: React.CSSProperties;
  /** Icon size in pixels or string format */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Internal props passed to the base icon wrapper component.
 * Combines user props with the icon definition.
 */
interface IconWrapperProps extends IconComponentProps {
  /** Icon definition object containing SVG path data and metadata */
  icon: IconDefinition;
}

/**
 * Icon definition structure containing SVG data and metadata.
 */
interface IconDefinition {
  /** SVG path data or content */
  path: string | string[];
  /** Icon viewBox dimensions */
  viewBox?: string;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
  /** Additional icon metadata */
  [key: string]: any;
}

/**
 * Ref type for the icon component.
 * Can reference an HTML SVG element or custom component instance.
 */
type IconRef = SVGSVGElement | HTMLElement | null;

/**
 * Forwarded ref icon component type.
 * Combines component props with ref forwarding support.
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * Default export: A React component with forwarded ref that renders an icon.
 * 
 * @example
 *