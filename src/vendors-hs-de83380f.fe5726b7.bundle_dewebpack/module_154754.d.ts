/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props spread functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG attributes for maximum flexibility
 */
export interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional styling
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility title for screen readers
   */
  title?: string;
}

/**
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This component is created using React.forwardRef to allow parent components
 * to access the underlying SVG element directly.
 * 
 * @example
 *