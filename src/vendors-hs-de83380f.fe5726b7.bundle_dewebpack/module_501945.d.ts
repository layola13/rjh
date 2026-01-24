/**
 * React Icon Component Module
 * 
 * This module exports a forward-ref React component that wraps an icon component
 * with additional props spread functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props interface for the icon component
 * Extends standard HTML element attributes and adds icon-specific properties
 */
interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon data object containing SVG path information and metadata
   */
  icon?: IconDefinition;
  
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Custom style object for the icon element
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional props that can be spread onto the component
   */
  [key: string]: unknown;
}

/**
 * Icon definition structure containing SVG metadata
 */
interface IconDefinition {
  /**
   * Icon identifier/name
   */
  name?: string;
  
  /**
   * SVG viewBox dimensions
   */
  viewBox?: string;
  
  /**
   * SVG path data
   */
  path?: string | string[];
  
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
 * Forward ref icon component type
 * 
 * This component accepts icon props and forwards refs to the underlying SVG element.
 * It merges default props with user-provided props and applies the icon definition.
 * 
 * @example
 *