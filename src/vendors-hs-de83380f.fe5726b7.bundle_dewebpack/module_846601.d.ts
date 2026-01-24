/**
 * Module: module_846601
 * Original ID: 846601
 * 
 * React icon component wrapper that forwards refs to an underlying icon component.
 * This module creates a forwardRef-wrapped component that combines props with a default icon.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps {
  /**
   * CSS class name for styling
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size in pixels or as string
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: any;
}

/**
 * Props for the wrapped icon component including ref
 */
export interface WrappedIconProps extends IconComponentProps {
  /**
   * Reference to the underlying icon element
   */
  ref?: React.Ref<HTMLElement>;
  
  /**
   * The icon component or configuration to render
   */
  icon?: any;
}

/**
 * Forward ref icon component type
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<HTMLElement>
>;

/**
 * Default export: A forward-ref wrapped icon component
 * 
 * Combines passed props with a default icon configuration and forwards
 * the ref to the underlying component for direct DOM access.
 * 
 * @example
 *