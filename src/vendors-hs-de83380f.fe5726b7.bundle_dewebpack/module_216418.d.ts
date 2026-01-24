/**
 * React Icon Component
 * 
 * A forwarded ref icon component wrapper that applies icon configuration
 * and passes through props to the base icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /** Icon size in pixels or CSS size string */
  size?: number | string;
  /** Icon color, defaults to currentColor */
  color?: string;
  /** Additional CSS class names */
  className?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Accessibility title */
  title?: string;
  /** Accessibility role */
  role?: string;
}

/**
 * Icon definition interface
 * Contains the SVG path data and viewBox configuration
 */
export interface IconDefinition {
  /** SVG tag name */
  tag: string;
  /** SVG attributes including viewBox */
  attr: Record<string, string>;
  /** Child elements/paths of the icon */
  child: Array<{
    tag: string;
    attr: Record<string, unknown>;
  }>;
}

/**
 * Props passed to the icon component with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forwarded ref icon component type
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default export: A React forwarded ref component that renders an SVG icon.
 * 
 * @remarks
 * This component wraps a base icon implementation with the specific icon definition,
 * merging user props with the icon configuration and forwarding the ref to the SVG element.
 * 
 * @example
 *