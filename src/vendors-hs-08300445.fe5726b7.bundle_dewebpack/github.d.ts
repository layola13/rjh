import React from 'react';
import { ColorWrap, ColorResult, CustomPickerInjectedProps } from 'react-color';

/**
 * Color values for the Github color picker
 */
export type GithubColor = string;

/**
 * Triangle position options for the Github picker popover
 */
export type TrianglePosition = 'hide' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Style overrides for Github picker components
 */
export interface GithubPickerStyles {
  /** Root card container styles */
  card?: React.CSSProperties;
  /** Triangle pointer styles */
  triangle?: React.CSSProperties;
  /** Triangle shadow styles */
  triangleShadow?: React.CSSProperties;
}

/**
 * Props for the Github color picker component
 */
export interface GithubPickerProps extends Partial<CustomPickerInjectedProps> {
  /** Width of the picker card in pixels or CSS string */
  width?: number | string;
  
  /** Array of hex color strings to display */
  colors?: GithubColor[];
  
  /** Callback fired when a color is selected */
  onChange?: (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Callback fired when hovering over a color swatch */
  onSwatchHover?: (color: ColorResult, event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Position of the triangle pointer */
  triangle?: TrianglePosition;
  
  /** Custom style overrides */
  styles?: GithubPickerStyles;
  
  /** Additional CSS class name */
  className?: string;
}

/**
 * Github-style color picker component
 * 
 * A compact color picker displaying a grid of predefined colors with an optional
 * triangular pointer for popover positioning.
 * 
 * @example
 *