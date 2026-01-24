/**
 * Module: module_618159
 * Original ID: 618159
 * 
 * A React component module that wraps an icon component with forwarded ref support.
 */

import React from 'react';

/**
 * Props interface for the icon component.
 * Extends standard React component props and accepts additional properties.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string (e.g., "24px", "1em")
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Custom style object to apply to the icon
   */
  style?: React.CSSProperties;
  
  /**
   * The icon data/definition to render
   */
  icon?: unknown;
}

/**
 * Forward ref component type that wraps an icon with additional props.
 * 
 * @remarks
 * This component is created using React.forwardRef to allow ref forwarding
 * to the underlying icon element. It merges provided props with an icon definition
 * from an imported source.
 * 
 * @example
 *