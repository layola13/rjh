/**
 * A React component that wraps an icon with forwarded ref support.
 * This module creates a forwardRef component that applies props and a specific icon.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component.
 * Extends standard HTML element props while allowing custom icon configuration.
 */
interface BaseIconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * The icon data to render
   */
  icon?: unknown;
  
  /**
   * Optional custom className for styling
   */
  className?: string;
  
  /**
   * Icon size (width/height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
}

/**
 * The icon component with ref forwarding capability.
 * Allows parent components to access the underlying DOM element via ref.
 * 
 * @example
 *