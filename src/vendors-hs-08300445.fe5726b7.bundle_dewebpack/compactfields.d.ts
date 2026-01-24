/**
 * CompactFields Component
 * A compact color picker fields component that displays hex and RGB input fields
 * @module CompactFields
 */

import React from 'react';

/**
 * RGB color representation
 */
export interface RGBColor {
  /** Red channel (0-255) */
  r: number;
  /** Green channel (0-255) */
  g: number;
  /** Blue channel (0-255) */
  b: number;
}

/**
 * Color change event data
 */
export interface ColorChangeData {
  /** Hexadecimal color value */
  hex?: string;
  /** Red channel value (0-255) */
  r?: number;
  /** Green channel value (0-255) */
  g?: number;
  /** Blue channel value (0-255) */
  b?: number;
  /** Source of the change event */
  source: 'hex' | 'rgb';
}

/**
 * Props for CompactFields component
 */
export interface CompactFieldsProps {
  /** Hexadecimal color value (e.g., "#FF5733") */
  hex: string;
  /** RGB color object */
  rgb: RGBColor;
  /** Callback fired when color value changes */
  onChange: (color: ColorChangeData, event: React.SyntheticEvent) => void;
}

/**
 * CompactFields Component
 * Renders a compact color input interface with hex and RGB fields
 * 
 * @param props - Component properties
 * @returns React functional component displaying color input fields
 * 
 * @example
 *