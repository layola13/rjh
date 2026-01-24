/**
 * Icon component module
 * Provides a forwardRef-wrapped icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends properties from the underlying icon wrapper component
 */
export interface IconComponentProps {
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
   * Additional props passed to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding support
 * 
 * @remarks
 * This component wraps an icon definition with a forwardRef-enabled container,
 * allowing parent components to access the underlying DOM element.
 * 
 * @example
 *