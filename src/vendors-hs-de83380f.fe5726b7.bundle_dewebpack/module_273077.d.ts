/**
 * Icon Component Module
 * 
 * This module exports a React icon component that wraps an icon with forwardRef support.
 * The component accepts all standard props and merges them with an internal icon definition.
 * 
 * @module IconComponent
 */

import { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Icon definition interface
 * Represents the structure of an icon SVG or icon data
 */
interface IconDefinition {
  /** Icon identifier or name */
  name?: string;
  /** SVG path data or icon content */
  content?: string;
  /** Icon viewBox dimensions */
  viewBox?: string;
  /** Additional icon attributes */
  [key: string]: unknown;
}

/**
 * Base props for the icon component
 * Extends standard HTML SVG element attributes
 */
interface IconBaseProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon definition to render */
  icon?: IconDefinition;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color/fill */
  color?: string;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Props for the icon wrapper component
 * Combines base icon props with React ref attributes
 */
type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon Component
 * 
 * A forward ref component that renders an SVG icon with customizable properties.
 * Automatically merges provided props with the internal icon definition.
 * 
 * @example
 *