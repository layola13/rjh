/**
 * Module: module_222054
 * Original ID: 222054
 * 
 * React icon component wrapper that forwards refs and applies icon configuration
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS size string */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Additional arbitrary props */
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
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
  /** Additional SVG attributes */
  attrs?: Record<string, unknown>;
}

/**
 * Props passed to the icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /** Icon definition containing SVG data */
  icon: IconDefinition;
  /** Forwarded ref to the underlying element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component type with ref forwarding support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref
 * 
 * @remarks
 * This component wraps an icon definition with React.forwardRef,
 * merging provided props with the icon configuration.
 * 
 * @example
 *