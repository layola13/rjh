/**
 * Module: module_770115
 * Original ID: 770115
 * 
 * React icon component with forwarded ref support.
 * Wraps an icon in a reusable component structure.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component.
 * Extends standard HTML attributes that can be passed to the underlying element.
 */
export interface IconComponentProps {
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Inline styles for the icon element
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
   * Additional props passed to the underlying icon wrapper
   */
  [key: string]: unknown;
}

/**
 * Props for the icon component with ref support
 */
export type IconComponentPropsWithRef = IconComponentProps & RefAttributes<HTMLElement>;

/**
 * Forward ref icon component type definition.
 * Renders an icon element with the ability to forward refs to the underlying DOM node.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying HTML element
 * @returns React element representing the icon
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentPropsWithRef>;

/**
 * Default exported icon component with forwarded ref.
 * Combines icon data with a wrapper component and supports ref forwarding.
 * 
 * @example
 *