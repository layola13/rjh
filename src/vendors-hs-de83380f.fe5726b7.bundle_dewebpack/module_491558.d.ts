/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentType } from 'react';

/**
 * Base props for the icon component
 */
interface IconBaseProps {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom className for styling */
  className?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the icon wrapper component
 * Combines base icon props with the icon definition
 */
interface IconWrapperProps extends IconBaseProps {
  /** The icon definition object containing SVG paths and attributes */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 * Contains the SVG data and metadata for rendering
 */
interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG viewBox attribute */
  viewBox?: string;
  /** SVG path data or child elements */
  children?: React.ReactNode;
  /** Default width */
  width?: number;
  /** Default height */
  height?: number;
}

/**
 * Forward ref icon component type
 * A React component that accepts props and forwards ref to the underlying element
 */
type IconComponent = ForwardRefExoticComponent<
  IconWrapperProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * This is a forwardRef component that wraps an icon with the specified configuration
 * 
 * @example
 *