/**
 * Module: module_722308
 * Original ID: 722308
 * 
 * React icon component wrapper that forwards refs to an underlying icon element.
 * This module creates a reusable icon component by wrapping a base icon with additional props.
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props for the icon component.
 * Extend this interface based on the actual props accepted by the wrapped icon component.
 */
interface IconProps {
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Inline styles to apply to the icon
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
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Any additional props passed to the underlying element
   */
  [key: string]: unknown;
}

/**
 * Ref type for the icon component, typically a DOM element reference
 */
type IconRef = HTMLElement | SVGSVGElement | null;

/**
 * Combined type for the forwarded ref icon component
 */
type IconComponent = ForwardRefExoticComponent<
  PropsWithoutRef<IconProps> & RefAttributes<IconRef>
>;

/**
 * Default export: A forward ref icon component that merges props with a predefined icon
 * and passes them to a wrapper component while maintaining ref forwarding capability.
 * 
 * @example
 *