import React from 'react';

/**
 * Props for the CompactColor component
 */
export interface CompactColorProps {
  /** The color value to display (hex, rgb, or 'transparent') */
  color: string;
  
  /** Callback fired when the color swatch is clicked */
  onClick?: (color: string, event: React.MouseEvent) => void;
  
  /** Callback fired when hovering over the swatch */
  onSwatchHover?: (color: string, event: React.MouseEvent) => void;
  
  /** Whether this color is currently active/selected */
  active?: boolean;
}

/**
 * A compact color swatch component for color pickers
 * Displays a small square color tile with an optional active indicator dot
 */
export declare const CompactColor: React.FC<CompactColorProps>;

export default CompactColor;