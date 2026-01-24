/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props spreading functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Optional className for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Any other props passed to the underlying icon component
   */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps a base icon implementation and forwards refs to the underlying SVG element.
 * It merges props using Object.assign pattern and passes an icon definition to the base component.
 * 
 * @example
 *