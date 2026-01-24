import * as React from 'react';

/**
 * Props for the SVG Icon Container component
 * @interface SvgIconContainerProps
 */
export interface SvgIconContainerProps {
  /**
   * Icon source URL or path
   * @required
   */
  icon: string;

  /**
   * Additional CSS class name to apply to the container
   * @default ""
   */
  className?: string;

  /**
   * Inline styles to apply to the container
   */
  style?: React.CSSProperties;

  /**
   * Click event handler
   */
  click?: () => void;

  /**
   * Mouse over event handler
   */
  onMouseOver?: () => void;

  /**
   * Mouse out event handler
   */
  onMouseOut?: () => void;
}

/**
 * SVG Icon Container Component
 * 
 * A wrapper component that renders an SVG icon within a styled container div.
 * Provides support for custom styling, click events, and hover interactions.
 * 
 * @example
 *