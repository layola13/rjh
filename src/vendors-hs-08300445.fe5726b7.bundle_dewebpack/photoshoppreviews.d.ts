import React from 'react';

/**
 * RGB color value object
 */
export interface RGBColor {
  /** Red channel value (0-255) */
  r: number;
  /** Green channel value (0-255) */
  g: number;
  /** Blue channel value (0-255) */
  b: number;
}

/**
 * Props for the PhotoshopPreviews component
 */
export interface PhotoshopPreviewsProps {
  /** RGB color object for the new color preview */
  rgb: RGBColor;
  /** CSS color string for the current color preview */
  currentColor: string;
}

/**
 * Style object for the component
 */
interface PhotoshopPreviewsStyles {
  /** Container style for color swatches */
  swatches: React.CSSProperties;
  /** Style for the new color preview box */
  new: React.CSSProperties;
  /** Style for the current color preview box */
  current: React.CSSProperties;
  /** Style for text labels */
  label: React.CSSProperties;
}

/**
 * PhotoshopPreviews Component
 * 
 * Displays a color comparison preview in the style of Adobe Photoshop,
 * showing both a new color (from RGB values) and the current color side by side.
 * 
 * @param props - Component props containing rgb and currentColor values
 * @returns React element displaying the color preview comparison
 * 
 * @example
 *