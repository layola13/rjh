/**
 * React Icon Component Module
 * 
 * This module exports a forward-ref icon component that wraps a base icon
 * with custom props and applies an icon definition.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Icon definition structure containing the icon's visual data
 * Typically includes SVG path data, dimensions, and metadata
 */
interface IconDefinition {
  /** Icon identifier/name */
  readonly iconName: string;
  /** Icon prefix (e.g., 'fas', 'far', 'fab') */
  readonly prefix: string;
  /** SVG viewBox dimensions [width, height] */
  readonly icon: readonly [
    number, // width
    number, // height
    readonly string[], // ligatures
    string, // unicode
    string | readonly string[] // svg path data
  ];
}

/**
 * Base props for icon components
 */
interface BaseIconProps extends ComponentPropsWithoutRef<'svg'> {
  /** Additional CSS class names */
  readonly className?: string;
  /** Icon color (CSS color value) */
  readonly color?: string;
  /** Icon size (CSS dimension value) */
  readonly size?: string | number;
  /** Accessibility title */
  readonly title?: string;
  /** Icon definition to render */
  readonly icon?: IconDefinition;
  /** Additional inline styles */
  readonly style?: React.CSSProperties;
}

/**
 * Props for the exported icon component
 * Extends base icon props with forwarded ref support
 */
type IconComponentProps = BaseIconProps & RefAttributes<SVGSVGElement>;

/**
 * Forward-ref icon component
 * 
 * This component wraps the base icon implementation with a specific icon definition
 * and supports ref forwarding for direct SVG element access.
 * 
 * @example
 *