/**
 * IconReact component for rendering two-tone icon definitions
 * @module IconReact
 */

import type { CSSProperties, MouseEventHandler } from 'react';

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** Icon theme type */
  theme: string;
  /** Icon SVG data or function to generate it */
  icon: ((primaryColor: string, secondaryColor: string) => IconSVGData) | IconSVGData;
}

/**
 * SVG icon data structure
 */
export interface IconSVGData {
  /** SVG tag name */
  tag: string;
  /** SVG attributes */
  attrs: Record<string, string | number>;
  /** Child elements */
  children?: IconSVGData[];
}

/**
 * Two-tone color configuration
 */
export interface TwoToneColors {
  /** Primary color for the icon */
  primaryColor: string;
  /** Secondary color for the icon */
  secondaryColor: string;
  /** Whether colors were explicitly calculated */
  calculated?: boolean;
}

/**
 * Props for the IconReact component
 */
export interface IconReactProps {
  /** Icon definition object */
  icon: IconDefinition;
  /** Additional CSS class names */
  className?: string;
  /** Click event handler */
  onClick?: MouseEventHandler<SVGSVGElement>;
  /** Inline styles */
  style?: CSSProperties;
  /** Primary color override */
  primaryColor?: string;
  /** Secondary color override */
  secondaryColor?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * IconReact component for rendering icons with two-tone color support
 * 
 * @param props - Component props
 * @returns Rendered SVG element or null if icon definition is invalid
 */
export default function IconReact(props: IconReactProps): JSX.Element | null;

export default namespace IconReact {
  /**
   * Display name for debugging
   */
  export const displayName: 'IconReact';
  
  /**
   * Get current two-tone color configuration
   * 
   * @returns Current two-tone colors
   */
  export function getTwoToneColors(): TwoToneColors;
  
  /**
   * Set global two-tone color configuration
   * 
   * @param colors - Color configuration to apply
   * @param colors.primaryColor - Primary color value
   * @param colors.secondaryColor - Optional secondary color (auto-calculated if omitted)
   */
  export function setTwoToneColors(colors: {
    primaryColor: string;
    secondaryColor?: string;
  }): void;
}