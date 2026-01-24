/**
 * React Icon Component Module
 * 
 * A forwardRef-wrapped icon component that merges props with a default icon.
 * This module provides a reusable icon component with ref forwarding support.
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Props interface for the icon component
 * Extends standard HTML attributes for SVG elements
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
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
   * Accessibility label
   */
  'aria-label'?: string;
}

/**
 * Type definition for the forwarded ref
 */
export type IconComponentRef = SVGSVGElement;

/**
 * The main icon component with ref forwarding capability
 * 
 * @remarks
 * This component wraps a base icon component and forwards refs to the underlying SVG element.
 * It merges user-provided props with default icon configuration.
 * 
 * @example
 *