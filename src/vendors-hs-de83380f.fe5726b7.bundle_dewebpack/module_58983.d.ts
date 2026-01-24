/**
 * Icon component module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon component
 * with additional props and a specific icon definition.
 */

import { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconBaseProps extends ComponentPropsWithoutRef<'svg'> {
  /** Icon size in pixels or CSS unit */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** ARIA role override */
  role?: string;
}

/**
 * Icon definition structure
 * Defines the SVG path data and metadata for an icon
 */
export interface IconDefinition {
  /** Icon name/identifier */
  name: string;
  /** SVG viewBox attribute */
  viewBox?: string;
  /** SVG path data or child elements */
  path: string | React.ReactNode;
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
}

/**
 * Props accepted by the icon component
 * Combines base icon props with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forwarded ref icon component
 * 
 * A React component that renders an SVG icon with forwarded ref support.
 * This component merges provided props with a predefined icon definition
 * and passes them to the underlying icon implementation.
 * 
 * @example
 *