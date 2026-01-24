/**
 * Module: module_187837
 * Original ID: 187837
 * 
 * Icon component wrapper that forwards refs to the underlying icon element.
 * This module creates a React component that wraps an icon with configurable props.
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props for the icon component
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
   * Icon size (width and height)
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
   * Additional props passed to the underlying SVG element
   */
  [key: string]: unknown;
}

/**
 * Props for the icon wrapper component including ref support
 */
export type IconWrapperProps = IconComponentProps & RefAttributes<SVGSVGElement>;

/**
 * Forward ref icon component type
 */
export type IconComponent = ForwardRefExoticComponent<
  PropsWithoutRef<IconComponentProps> & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with ref forwarding support.
 * 
 * This component wraps an icon definition and allows passing a ref to the underlying SVG element.
 * All props are merged and forwarded to the base icon component.
 * 
 * @example
 *