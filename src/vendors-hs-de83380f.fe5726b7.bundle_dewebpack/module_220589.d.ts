/**
 * IconReact - A React component for rendering icon definitions with two-tone color support
 * 
 * This module provides a flexible icon rendering component that supports:
 * - Custom icon definitions
 * - Two-tone color schemes
 * - Dynamic color calculation
 * - SVG generation
 */

import type { CSSProperties, MouseEventHandler, SVGAttributes } from 'react';

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** Unique name identifier for the icon */
  name: string;
  /** Theme variant of the icon */
  theme?: string;
  /** Icon content - can be a function for dynamic generation or static content */
  icon: ((primaryColor: string, secondaryColor: string) => any) | any;
}

/**
 * Two-tone color configuration
 */
export interface TwoToneColorConfig {
  /** Primary color for the icon (default: "#333") */
  primaryColor: string;
  /** Secondary color for the icon (default: "#E6E6E6") */
  secondaryColor: string;
  /** Whether the secondary color was explicitly calculated */
  calculated: boolean;
}

/**
 * Props for the IconReact component
 */
export interface IconReactProps extends Omit<SVGAttributes<SVGElement>, 'onClick'> {
  /** Icon definition object containing name and rendering information */
  icon: IconDefinition;
  /** Additional CSS class names */
  className?: string;
  /** Click event handler */
  onClick?: MouseEventHandler<SVGElement>;
  /** Inline styles */
  style?: CSSProperties;
  /** Primary color override for the icon */
  primaryColor?: string;
  /** Secondary color override for two-tone icons */
  secondaryColor?: string;
}

/**
 * IconReact component for rendering icon definitions
 * 
 * @param props - Component props including icon definition and styling options
 * @returns Rendered SVG icon element or null if icon definition is invalid
 * 
 * @example
 *