import * as React from 'react';

/**
 * Icon component properties extending standard SVG attributes
 * Allows customization of icon appearance and behavior
 */
export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * Icon size in pixels or CSS size value
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional CSS class name for styling
   */
  className?: string;
  
  /**
   * Inline styles to apply to the icon
   */
  style?: React.CSSProperties;
}

/**
 * Default icon data/configuration object
 * Contains the SVG path data and metadata for the icon
 */
export interface IconDefinition {
  /**
   * SVG path data or element structure
   */
  icon: unknown;
  
  /**
   * Icon name identifier
   */
  iconName?: string;
  
  /**
   * Icon prefix (e.g., 'fas', 'far', 'fab')
   */
  prefix?: string;
  
  /**
   * Icon width in viewBox units
   */
  width?: number;
  
  /**
   * Icon height in viewBox units
   */
  height?: number;
}

/**
 * Forwarded ref icon component
 * A React icon component that wraps the icon definition with forwarded ref support
 * 
 * @example
 *