/**
 * Module: Raised
 * A component that creates a raised Material Design shadow effect around its children.
 * Supports multiple z-depth levels (0-5) for different elevation appearances.
 */

import React, { CSSProperties, ReactNode } from 'react';

/**
 * Z-depth level type definition
 * Represents Material Design elevation levels from 0 (no shadow) to 5 (maximum elevation)
 */
export type ZDepth = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Style overrides for Raised component sections
 */
export interface RaisedStyles {
  /** Styles for the wrapper container */
  wrap?: CSSProperties;
  /** Styles for the content layer */
  content?: CSSProperties;
  /** Styles for the background/shadow layer */
  bg?: CSSProperties;
}

/**
 * Props for the Raised component
 */
export interface RaisedProps {
  /** 
   * Background color for the raised surface
   * @default "#fff"
   */
  background?: string;
  
  /** 
   * Material Design z-depth level (0-5)
   * Higher values create more pronounced shadows
   * @default 1
   */
  zDepth?: ZDepth;
  
  /** 
   * Border radius in pixels
   * @default 2
   */
  radius?: number;
  
  /** 
   * Custom style overrides
   * @default {}
   */
  styles?: RaisedStyles;
  
  /** Child elements to render inside the raised container */
  children?: ReactNode;
}

/**
 * Raised component that applies Material Design elevation effects
 * 
 * Creates a layered structure with a shadow background and content overlay,
 * providing visual depth through configurable z-depth levels.
 * 
 * @example
 *