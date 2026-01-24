/**
 * React component that wraps an icon with forwarded ref support.
 * This module creates a forwardRef component that renders a default icon component.
 * 
 * @module IconComponent
 */

import { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML attributes and accepts additional custom properties.
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
   * Size of the icon
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * Additional props passed to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support.
 * 
 * This component wraps an icon element and forwards refs to allow
 * parent components to access the underlying DOM node.
 * 
 * @example
 *