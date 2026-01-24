/**
 * Module: module_256081
 * Original ID: 256081
 * 
 * A React component that wraps an icon component with forwarded ref support.
 */

import type React from 'react';

/**
 * Props for the icon component wrapper.
 * Extends all standard HTML attributes and React component props.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Custom style object
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
   * Additional props passed to the underlying icon component
   */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support.
 * 
 * @param props - Component props
 * @param ref - Forwarded ref to the underlying DOM element
 * @returns React element wrapping the icon component
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

export default IconComponent;