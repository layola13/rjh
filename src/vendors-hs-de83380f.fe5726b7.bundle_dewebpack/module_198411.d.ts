/**
 * React component module for an icon wrapper
 * Exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Custom inline styles
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
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Props for the default icon wrapper component
 */
export interface DefaultIconProps extends IconComponentProps {
  /**
   * Forwarded ref to the underlying SVG element
   */
  ref?: Ref<SVGSVGElement>;
}

/**
 * Default exported icon component with forwarded ref support
 * 
 * This component wraps an icon implementation and forwards refs to allow
 * parent components to access the underlying DOM element.
 * 
 * @example
 *