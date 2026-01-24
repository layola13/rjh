/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Additional props passed to the underlying icon element
   */
  [key: string]: unknown;
}

/**
 * Props for the icon wrapper component including ref
 */
export interface IconWrapperProps extends IconComponentProps {
  /**
   * Icon definition object from the icon library
   */
  icon?: unknown;
}

/**
 * Ref type for the icon component
 */
export type IconRef = SVGSVGElement | null;

/**
 * Forward ref icon component type
 * Wraps an icon with proper ref forwarding support
 */
export type IconComponent = ForwardRefExoticComponent<
  PropsWithoutRef<IconWrapperProps> & RefAttributes<IconRef>
>;

/**
 * Default exported icon component with forwarded ref
 * 
 * @example
 *