/**
 * Module: module_705113
 * Original ID: 705113
 * 
 * Icon component wrapper that forwards refs to the underlying icon element.
 */

import * as React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props and includes icon-specific configuration.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a CSS value
   */
  size?: number | string;
  
  /**
   * Icon color, can be any valid CSS color value
   */
  color?: string;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon wrapper component that applies props and forwards refs.
 * 
 * @param props - Component props including icon configuration
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element representing the icon
 */
declare function IconComponent(
  props: IconComponentProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement;

/**
 * Forward ref wrapper for the icon component.
 * Allows parent components to access the underlying DOM element.
 */
declare const ForwardedIconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default ForwardedIconComponent;