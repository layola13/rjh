/**
 * React Icon Component
 * 
 * This module exports a forward-ref wrapped icon component.
 * It combines props with a default icon and renders through a generic icon wrapper.
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends standard SVG attributes and React component props
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
}

/**
 * Icon definition object containing SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG path data or element tree
   */
  icon: React.ReactNode | string;
  
  /**
   * ViewBox dimensions
   */
  viewBox?: string;
  
  /**
   * Default width
   */
  width?: number;
  
  /**
   * Default height
   */
  height?: number;
}

/**
 * Forward ref type for the icon component
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A forward-ref icon component
 * 
 * @remarks
 * This component wraps an icon definition with React's forwardRef,
 * allowing parent components to access the underlying SVG element ref.
 * 
 * @example
 *