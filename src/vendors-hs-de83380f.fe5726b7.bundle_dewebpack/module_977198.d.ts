/**
 * Icon component module
 * Wraps an icon with React.forwardRef for ref forwarding capability
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon size in pixels or as a string (e.g., "24px", "1.5em")
   */
  size?: number | string;
  
  /**
   * Icon color, defaults to currentColor
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon data structure containing SVG path definitions
 */
export interface IconDefinition {
  /**
   * Icon name or identifier
   */
  name: string;
  
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  path: string | React.ReactNode;
  
  /**
   * Additional SVG attributes
   */
  attrs?: Record<string, unknown>;
}

/**
 * Props passed to the internal icon wrapper component
 */
interface IconWrapperProps extends IconComponentProps {
  /**
   * Icon definition containing SVG data
   */
  icon: IconDefinition;
  
  /**
   * Forwarded ref to the underlying SVG element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forward ref icon component type
 * Combines component props with ref forwarding capabilities
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A forward-ref enabled icon component
 * 
 * This component merges user props with a predefined icon definition
 * and renders it through an IconWrapper component with ref support.
 * 
 * @example
 *