/**
 * Icon Component Module
 * 
 * This module exports a React forwardRef component that wraps an icon component.
 * It combines props from the parent with an icon definition and passes them to a base icon component.
 * 
 * @module IconComponent
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends the base props from the icon wrapper component
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Accessible title for the icon
   */
  title?: string;
  
  /**
   * Style overrides
   */
  style?: React.CSSProperties;
  
  /**
   * Callback when icon is clicked
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * Icon component type that accepts a ref
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A forward ref React component that renders an icon
 * 
 * @param props - Icon component props
 * @param ref - Forwarded ref to the SVG element
 * @returns A React element representing the icon
 * 
 * @example
 *