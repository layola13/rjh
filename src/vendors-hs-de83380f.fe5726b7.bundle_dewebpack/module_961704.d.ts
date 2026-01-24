/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props and functionality.
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Size of the icon (width and height)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
}

/**
 * Props for the forwarded icon component
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * The icon data/definition to render
   */
  icon?: unknown;
}

/**
 * Forwarded ref icon component type
 * 
 * This component accepts icon props and forwards refs to the underlying SVG element.
 * It merges provided props with the default icon configuration.
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * @example
 *