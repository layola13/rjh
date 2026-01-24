/**
 * Icon component module
 * 
 * This module exports a forward-ref React component that wraps an icon.
 * It combines properties from the parent component with a predefined icon.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Properties that can be passed to the icon component
 */
export interface IconComponentProps {
  /**
   * CSS class name for styling
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component renders an SVG icon and forwards refs to the underlying element.
 * It merges incoming props with the predefined icon configuration.
 * 
 * @example
 *