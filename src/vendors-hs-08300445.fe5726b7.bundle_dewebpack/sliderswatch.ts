import React from 'react';

/**
 * HSL color representation
 */
export interface HSLColor {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Lightness (0-1) */
  l: number;
  /** Source format identifier */
  source?: string;
}

/**
 * Color change event data
 */
export interface ColorChangeData {
  /** Hue value (0-360) */
  h: number;
  /** Saturation value (0-1) */
  s: number;
  /** Lightness value (0-1) */
  l: number;
  /** Source identifier */
  source: string;
}

/**
 * Props for SliderSwatch component
 */
export interface SliderSwatchProps {
  /** HSL color object */
  hsl: HSLColor;
  /** Lightness offset value (0-1) */
  offset: number;
  /** Click handler with color data and mouse event */
  onClick?: (color: ColorChangeData, event: React.MouseEvent<HTMLDivElement>) => void;
  /** Whether this swatch is currently active */
  active?: boolean;
  /** Whether this is the first swatch in the slider */
  first?: boolean;
  /** Whether this is the last swatch in the slider */
  last?: boolean;
}

/**
 * A swatch component for color slider that displays a single color sample.
 * Part of a slider control for selecting lightness values.
 */
export declare const SliderSwatch: React.FC<SliderSwatchProps>;

export default SliderSwatch;