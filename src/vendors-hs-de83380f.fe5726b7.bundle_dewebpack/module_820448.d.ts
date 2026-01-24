/**
 * Module: module_820448
 * Original ID: 820448
 * 
 * React icon component wrapper that forwards refs and applies default icon configuration.
 */

import React from 'react';

/**
 * Props for the icon component.
 * Extends all standard React element props with icon-specific properties.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data/path configuration
   */
  icon?: IconData;
}

/**
 * Icon data structure containing SVG paths and viewBox configuration
 */
export interface IconData {
  /**
   * SVG path data or path elements
   */
  path?: string | React.ReactNode;
  
  /**
   * ViewBox dimensions
   */
  viewBox?: string;
  
  /**
   * Icon width
   */
  width?: number;
  
  /**
   * Icon height
   */
  height?: number;
}

/**
 * Base icon component type from the icon library
 */
declare const IconBaseComponent: React.ComponentType<IconComponentProps>;

/**
 * Default icon configuration/data
 */
declare const defaultIconData: IconData;

/**
 * Forward ref render function for the icon component.
 * Merges provided props with default icon data and forwards the ref.
 * 
 * @param props - Icon component props
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns Rendered icon element
 */
declare function renderIconWithRef(
  props: IconComponentProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement;

/**
 * Icon component with forwarded ref support.
 * Wraps the base icon component and applies default configuration.
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;