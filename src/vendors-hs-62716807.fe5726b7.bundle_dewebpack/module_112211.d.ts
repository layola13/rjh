/**
 * Typography Title Component
 * 
 * A React component for rendering semantic heading elements (h1-h5) with type safety.
 * Validates the heading level and provides appropriate warnings for invalid values.
 * 
 * @module Typography.Title
 */

import React from 'react';

/**
 * Valid heading levels for the Title component
 */
type TitleLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Props for the Typography Title component
 */
interface TitleProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'level'> {
  /**
   * The heading level to render (h1, h2, h3, h4, or h5)
   * @default 1
   * @remarks Level 5 requires version 4.6.0+
   */
  level?: TitleLevel;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Child elements to render within the heading
   */
  children?: React.ReactNode;
}

/**
 * Internal base component props (for the underlying heading element)
 */
interface BaseComponentProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The HTML element type to render (h1, h2, h3, h4, or h5)
   */
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

/**
 * Typography Title Component
 * 
 * Renders a semantic heading element with validation and type safety.
 * 
 * @example
 *