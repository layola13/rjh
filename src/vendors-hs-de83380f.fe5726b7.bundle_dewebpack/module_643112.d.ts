/**
 * Icon Component Module
 * 
 * This module provides a forwardRef-wrapped React icon component that combines
 * default icon properties with custom props and renders using a base icon wrapper.
 * 
 * @module IconComponent
 * @version 1.0.0
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base properties for the icon wrapper component
 */
interface IconWrapperProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * The icon definition object containing path data and metadata
   */
  icon: IconDefinition;
  
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Optional inline styles
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
}

/**
 * Icon definition structure containing SVG path data and metadata
 */
interface IconDefinition {
  /**
   * SVG viewBox coordinates
   */
  viewBox?: string;
  
  /**
   * SVG path data (d attribute)
   */
  path: string | string[];
  
  /**
   * Icon width
   */
  width?: number;
  
  /**
   * Icon height
   */
  height?: number;
  
  /**
   * Additional SVG attributes
   */
  attrs?: Record<string, unknown>;
}

/**
 * Props accepted by the exported icon component
 */
export interface IconComponentProps extends Omit<IconWrapperProps, 'icon'> {
  /**
   * Forward ref to the underlying SVG element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forward-ref enabled icon component
 * 
 * This component wraps a base icon implementation with predefined icon data
 * and allows consumers to override styling and behavior through props.
 * 
 * @example
 *