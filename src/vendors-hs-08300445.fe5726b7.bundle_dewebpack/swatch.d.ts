/**
 * Color swatch component that displays a clickable color tile
 * @module Swatch
 */

import React from 'react';

/**
 * Style object for the swatch container
 */
export interface SwatchStyle extends React.CSSProperties {
  background?: string;
  height?: string;
  width?: string;
  cursor?: string;
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static';
  outline?: string;
  borderRadius?: string | number;
}

/**
 * Properties for the Swatch component
 */
export interface SwatchProps {
  /**
   * The color to display in the swatch (hex, rgb, rgba, or 'transparent')
   */
  color: string;

  /**
   * Custom style object to apply to the swatch
   */
  style?: SwatchStyle;

  /**
   * Callback fired when the swatch is clicked
   * @param color - The color of the clicked swatch
   * @param event - The mouse event
   */
  onClick?: (color: string, event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Callback fired when mouse hovers over the swatch
   * @param color - The color of the hovered swatch
   * @param event - The mouse event
   */
  onHover?: (color: string, event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Title/tooltip text for the swatch
   * @default color
   */
  title?: string;

  /**
   * Child elements to render inside the swatch
   */
  children?: React.ReactNode;

  /**
   * Whether the swatch is currently focused
   */
  focus?: boolean;

  /**
   * Additional styles to apply when the swatch is focused
   */
  focusStyle?: SwatchStyle;
}

/**
 * A color swatch component that renders a clickable color tile
 * Supports keyboard navigation and hover states
 */
export declare const Swatch: React.FC<SwatchProps>;

/**
 * Default export with focus handling HOC applied
 */
declare const SwatchWithFocus: React.ComponentType<SwatchProps>;
export default SwatchWithFocus;