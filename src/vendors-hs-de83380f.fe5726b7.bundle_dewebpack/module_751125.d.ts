/**
 * React component wrapper for an icon component.
 * This module creates a forwarded ref icon component using a base icon definition.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component, extending standard SVG element properties.
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Size of the icon (width and height).
   */
  size?: number | string;
  
  /**
   * Color of the icon.
   */
  color?: string;
  
  /**
   * Additional CSS class name.
   */
  className?: string;
  
  /**
   * Icon definition data structure.
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure containing SVG path data and metadata.
 */
export interface IconDefinition {
  /**
   * SVG tag name.
   */
  tag: string;
  
  /**
   * SVG attributes.
   */
  attrs: Record<string, unknown>;
  
  /**
   * Child elements or paths.
   */
  children: Array<{
    tag: string;
    attrs: Record<string, unknown>;
  }>;
}

/**
 * Props for the icon component with ref support.
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forwarded ref icon component type.
 * 
 * This component renders an SVG icon with full ref forwarding support,
 * allowing parent components to access the underlying SVG element.
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default exported icon component with forwarded ref.
 * 
 * @example
 *