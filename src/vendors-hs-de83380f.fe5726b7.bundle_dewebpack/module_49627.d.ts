/**
 * Module: module_49627
 * Original ID: 49627
 * 
 * React icon component with forwarded ref support.
 * This module creates a React component that wraps an icon with customizable properties.
 */

import React from 'react';

/**
 * Properties that can be passed to the icon component.
 * Extend this interface with specific icon properties as needed.
 */
export interface IconComponentProps {
  /** Optional CSS class name for styling */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Accessibility label for screen readers */
  'aria-label'?: string;
  /** Additional properties */
  [key: string]: unknown;
}

/**
 * Icon data structure containing path definitions and metadata
 */
export interface IconDefinition {
  /** SVG path data */
  path?: string | string[];
  /** ViewBox dimensions */
  viewBox?: string;
  /** Default width */
  width?: number;
  /** Default height */
  height?: number;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Renders an icon component with the provided properties and forwarded ref.
 * 
 * @param props - Component properties including icon customization options
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element representing the icon
 */
declare function IconComponent(
  props: IconComponentProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement;

/**
 * Icon component with forwarded ref support.
 * Combines icon definition with custom properties and allows ref forwarding.
 */
declare const ForwardedIconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default ForwardedIconComponent;