/**
 * Module: module_306239
 * Original ID: 306239
 * 
 * A React component that wraps an icon component with forwarded refs.
 */

import React from 'react';

/**
 * Props for the icon wrapper component.
 * Extends standard React component props and adds icon-specific properties.
 */
export interface IconWrapperProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Any other valid React props
   */
  [key: string]: unknown;
}

/**
 * Icon component type with forwarded ref support
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconWrapperProps & React.RefAttributes<HTMLElement>
>;

/**
 * Forwarded ref type for the icon element
 */
export type IconRef = HTMLElement;

/**
 * Default export: A React component that renders an icon with forwarded ref support.
 * 
 * @example
 *