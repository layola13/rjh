import * as React from 'react';

/**
 * Props interface for the icon component
 * Extends standard SVG element attributes for React
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS size string
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Custom icon data (SVG path or component)
   */
  icon?: React.ReactNode | string;
}

/**
 * Icon component with forward ref support
 * 
 * This component wraps an SVG icon and provides a consistent API
 * for rendering icons with customizable props like size, color, etc.
 * 
 * @example
 *