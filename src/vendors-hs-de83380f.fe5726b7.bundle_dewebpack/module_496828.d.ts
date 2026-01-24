/**
 * React component that wraps an icon with forwarded ref support
 * @module IconComponent
 */

import React from 'react';

/**
 * Props for the icon component
 */
export interface IconComponentProps {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding
 * Renders an icon element with customizable props
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

export default IconComponent;