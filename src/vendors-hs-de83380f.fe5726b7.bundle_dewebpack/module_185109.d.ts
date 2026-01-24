/**
 * React component for rendering an icon with forwarded ref support.
 * This module wraps a base icon component with specific icon data.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component, excluding ref.
 * Extends all standard props from the base icon component.
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Additional CSS class names to apply to the icon.
   */
  className?: string;
  
  /**
   * Size of the icon (width and height).
   */
  size?: number | string;
  
  /**
   * Color of the icon.
   */
  color?: string;
  
  /**
   * Icon data passed to the base component.
   */
  icon?: unknown;
  
  /**
   * Any additional props supported by the underlying icon implementation.
   */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding support.
 * 
 * This component merges user-provided props with a default icon configuration
 * and forwards the ref to the underlying icon implementation.
 * 
 * @example
 *