import React from 'react';
import { Swatch } from './Swatch';

/**
 * Circle swatch color size in pixels
 * @default 28
 */
export type CircleSize = number;

/**
 * Circle swatch spacing in pixels
 * @default 14
 */
export type CircleSpacing = number;

/**
 * Props for the CircleSwatch component
 */
export interface CircleSwatchProps {
  /**
   * The color value to display in the swatch
   */
  color: string;

  /**
   * Callback fired when the swatch is clicked
   */
  onClick?: (color: string, event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Callback fired when the mouse hovers over the swatch
   */
  onSwatchHover?: (color: string, event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Whether the swatch is currently being hovered
   * @default false
   */
  hover?: boolean;

  /**
   * Whether the swatch is currently active/selected
   * @default false
   */
  active?: boolean;

  /**
   * The diameter of the circle swatch in pixels
   * @default 28
   */
  circleSize?: CircleSize;

  /**
   * The spacing between circle swatches in pixels
   * @default 14
   */
  circleSpacing?: CircleSpacing;
}

/**
 * Internal style object for the swatch container
 */
interface SwatchContainerStyle {
  width: number;
  height: number;
  marginRight: number;
  marginBottom: number;
  transform: string;
  transition: string;
}

/**
 * Internal style object for the Swatch component
 */
interface SwatchElementStyle {
  borderRadius: string;
  background: string;
  boxShadow: string;
  transition: string;
}

/**
 * Combined styles for the CircleSwatch component
 */
interface CircleSwatchStyles {
  swatch: SwatchContainerStyle;
  Swatch: SwatchElementStyle;
}

/**
 * A circular color swatch component with hover and active states
 * 
 * @param props - The component props
 * @returns A circular swatch element that displays a color and responds to user interaction
 * 
 * @example
 *