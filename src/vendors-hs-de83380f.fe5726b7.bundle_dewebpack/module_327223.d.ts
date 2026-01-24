/**
 * Module: module_327223
 * Original ID: 327223
 * 
 * Icon component wrapper that forwards refs to the underlying IconBase component.
 * This module creates a React component that wraps a specific icon with forwarded ref support.
 */

import React from 'react';

/**
 * Props for the icon component.
 * Extends all standard SVG attributes that can be applied to an icon.
 */
export interface IconProps extends React.SVGAttributes<SVGElement> {
  /** Icon size in pixels or as a string */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Accessibility title */
  title?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * Internal icon data structure from the icon registry.
 * Contains the path data and metadata for rendering the icon.
 */
export interface IconDefinition {
  /** SVG path data */
  path: string | string[];
  /** Icon width */
  width?: number;
  /** Icon height */
  height?: number;
  /** ViewBox dimensions */
  viewBox?: string;
  /** Additional attributes */
  attrs?: Record<string, unknown>;
}

/**
 * Props for the base icon component that accepts an icon definition.
 */
export interface IconBaseProps extends IconProps {
  /** Icon definition containing SVG path and metadata */
  icon: IconDefinition;
  /** Forwarded ref */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Creates an icon component with the specified icon definition.
 * 
 * @param props - Icon component props
 * @param ref - Forwarded ref to the SVG element
 * @returns React element rendering the icon
 */
declare function IconComponent(
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement;

/**
 * Icon component with forwarded ref support.
 * Allows parent components to access the underlying SVG element.
 */
declare const Icon: React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export default Icon;