/**
 * Module: module_674725
 * Original ID: 674725
 * 
 * React icon component wrapper that forwards refs to the underlying icon implementation.
 */

import React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props and icon-specific properties.
 */
export interface IconComponentProps extends React.ComponentPropsWithoutRef<'svg'> {
  /**
   * Size of the icon (width and height)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Custom icon data or configuration
   */
  icon?: unknown;
  
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support.
 * 
 * @param props - Component props including standard SVG/HTML attributes
 * @param ref - Forwarded ref to the underlying DOM element
 * @returns React element representing the icon
 */
declare function IconComponent(
  props: IconComponentProps,
  ref: React.ForwardedRef<SVGSVGElement>
): React.ReactElement;

/**
 * Forward ref wrapped icon component.
 * Merges provided props with default icon configuration and passes ref through.
 */
declare const ForwardedIconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default ForwardedIconComponent;