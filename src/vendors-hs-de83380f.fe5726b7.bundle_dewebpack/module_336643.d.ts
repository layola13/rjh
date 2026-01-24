/**
 * React component module for an icon component
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props merging functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Optional class name for styling
   */
  className?: string;
  
  /**
   * Optional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   * @default 24
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
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps a base icon definition with React.forwardRef,
 * allowing parent components to access the underlying SVG element.
 * 
 * @example
 *