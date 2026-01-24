/**
 * Checkboard component for displaying a checkered pattern background
 * Commonly used in color pickers to show transparency
 * @module Checkboard
 */

import React from 'react';

/**
 * Canvas rendering utilities for generating checkboard patterns
 */
interface CheckboardRenderers {
  /**
   * Canvas renderer instance for drawing the checkboard pattern
   */
  canvas?: CanvasRenderingContext2D | null;
}

/**
 * Props for the Checkboard component
 */
export interface CheckboardProps {
  /**
   * Color of the white/light squares in the checkboard pattern
   * @default "transparent"
   */
  white?: string;
  
  /**
   * Color of the grey/dark squares in the checkboard pattern
   * @default "rgba(0, 0, 0, .08)"
   */
  grey?: string;
  
  /**
   * Size of each square in the checkboard pattern (in pixels)
   * @default 8
   */
  size?: number;
  
  /**
   * Custom renderers for generating the checkboard pattern
   * @default {}
   */
  renderers?: CheckboardRenderers;
  
  /**
   * Border radius to apply to the checkboard container
   */
  borderRadius?: string;
  
  /**
   * Box shadow to apply to the checkboard container
   */
  boxShadow?: string;
}

/**
 * Style configuration for the checkboard grid
 */
interface CheckboardStyles {
  grid: {
    borderRadius?: string;
    boxShadow?: string;
    absolute: string;
    background: string;
  };
}

/**
 * Checkboard component that renders a checkered pattern background
 * Typically used to visualize transparency in color selection interfaces
 * 
 * @param props - Component properties
 * @returns React element displaying the checkboard pattern
 */
export declare const Checkboard: React.FC<CheckboardProps>;

export default Checkboard;