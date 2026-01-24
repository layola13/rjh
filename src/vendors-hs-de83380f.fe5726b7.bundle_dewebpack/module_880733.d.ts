/**
 * Module: module_880733
 * Original ID: 880733
 * 
 * React icon component wrapper module.
 * Creates a forwarded ref component that wraps a base icon component with custom properties.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base icon data interface
 * Represents the icon definition imported from the icon registry
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** Icon theme variant (outlined, filled, etc.) */
  theme?: string;
  /** SVG path data or icon content */
  icon: string | React.ReactNode;
  /** Icon dimensions and viewBox configuration */
  viewBox?: string;
}

/**
 * Props for the base icon component
 */
export interface BaseIconProps extends ComponentPropsWithoutRef<'svg'> {
  /** Icon definition object */
  icon: IconDefinition;
  /** Custom class name */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Spin animation flag */
  spin?: boolean;
  /** Rotation angle in degrees */
  rotate?: number;
  /** Additional custom properties */
  [key: string]: unknown;
}

/**
 * Icon component props (extends base props without the icon property)
 */
export type IconComponentProps = Omit<BaseIconProps, 'icon'> & RefAttributes<SVGSVGElement>;

/**
 * Forwarded ref icon component type
 * A React component that accepts a ref to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default exported icon component
 * 
 * This component wraps a base icon renderer with a specific icon definition.
 * It supports ref forwarding to access the underlying SVG element.
 * 
 * @example
 *