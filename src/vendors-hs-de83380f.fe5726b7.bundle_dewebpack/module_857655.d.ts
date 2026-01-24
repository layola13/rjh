/**
 * Module: module_857655
 * Original ID: 857655
 * 
 * Icon component wrapper that wraps a base icon component with forwarded ref support.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component, excluding ref
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** Custom className for styling */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional custom properties */
  [key: string]: any;
}

/**
 * Icon definition object containing SVG path data and metadata
 */
export interface IconDefinition {
  /** Icon name/identifier */
  name: string;
  /** SVG path data or children */
  icon: React.ReactNode | string;
  /** ViewBox dimensions */
  viewBox?: string;
  /** Default width */
  width?: number;
  /** Default height */
  height?: number;
}

/**
 * Props passed to the underlying icon wrapper component
 */
export interface IconWrapperProps extends IconComponentProps {
  /** Icon definition containing SVG data */
  icon: IconDefinition;
  /** Forwarded ref to the root element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forwarded ref icon component type
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support.
 * 
 * This component wraps a base icon component, merging provided props with
 * a predefined icon definition and forwarding the ref to the underlying element.
 * 
 * @example
 *