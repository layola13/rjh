/**
 * React Icon Component Module
 * 
 * This module exports a forwardRef-wrapped icon component that combines
 * properties and renders using a base icon component.
 * 
 * @module IconComponent
 */

import React from 'react';

/**
 * Base properties for icon components
 * Extended by specific icon implementations
 */
interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon stroke width
   */
  strokeWidth?: number;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon definition interface
 * Contains the SVG path data and metadata for rendering icons
 */
interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  path: React.ReactNode;
  
  /**
   * Optional icon attributes
   */
  attrs?: Record<string, unknown>;
}

/**
 * Props for the icon wrapper component
 * Combines base icon props with the specific icon definition
 */
interface IconComponentProps extends IconBaseProps {
  /**
   * Icon definition containing SVG data
   */
  icon: IconDefinition;
  
  /**
   * Forward ref to the SVG element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon Component Type
 * A forwardRef component that renders SVG icons
 */
type IconComponent = React.ForwardRefExoticComponent<
  IconBaseProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * This is a forwardRef-wrapped React component that:
 * - Accepts all standard SVG attributes via IconBaseProps
 * - Merges provided props with icon definition
 * - Forwards ref to the underlying SVG element
 * - Renders the icon using a base icon renderer
 * 
 * @example
 *