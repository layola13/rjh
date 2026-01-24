/**
 * Icon component module
 * 
 * This module exports a React icon component that wraps a base icon
 * with forwarded ref support for integration with React applications.
 * 
 * @module IconComponent
 */

import * as React from 'react';

/**
 * Base properties for icon components
 * Extends standard SVG element attributes
 */
export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  /**
   * Icon size (width and height)
   * @default 16
   */
  size?: string | number;
  
  /**
   * Icon color
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline style overrides
   */
  style?: React.CSSProperties;
}

/**
 * Icon component props type
 * Combines base icon props with any additional custom properties
 */
export type IconComponentProps = IconBaseProps & Record<string, unknown>;

/**
 * Icon component type with forwarded ref support
 * 
 * This component renders an SVG icon element with the ability to forward
 * refs to the underlying SVG element for imperative DOM access.
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGElement>
>;

/**
 * Default export: Icon component with forwarded ref
 * 
 * A React component that renders an icon with ref forwarding capability.
 * 
 * @example
 *