/**
 * React Icon Component Module
 * 
 * This module exports a React component that wraps an icon with forwarded ref support.
 * The component accepts props and merges them with a default icon configuration.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard HTML element props while allowing custom overrides
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   * @default 24
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
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Icon data configuration (passed from internal icon definition)
   * @internal
   */
  icon?: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component renders an SVG icon with customizable props.
 * The ref is forwarded to the underlying SVG element.
 * 
 * @example
 *