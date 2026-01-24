/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps {
  /**
   * CSS class name for styling
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size in pixels or CSS size value
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Spin animation flag
   */
  spin?: boolean;
  
  /**
   * Rotation degree
   */
  rotate?: number;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * Additional ARIA attributes
   */
  'aria-label'?: string;
  
  /**
   * Tab index for accessibility
   */
  tabIndex?: number;
  
  /**
   * Any other valid SVG attributes
   */
  [key: string]: any;
}

/**
 * Icon component reference type
 */
export interface IconComponentRef extends SVGSVGElement {}

/**
 * Icon component props with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<IconComponentRef>;

/**
 * Forwarded ref icon component
 * 
 * @remarks
 * This component wraps an icon definition with React.forwardRef
 * to allow parent components to access the underlying SVG element.
 * 
 * @example
 *