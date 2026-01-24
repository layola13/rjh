/**
 * React Icon Component Module
 * 
 * This module exports a React component that wraps an icon component with forwarded refs.
 * The component extends the base icon component with additional props and ref forwarding support.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component
 * Extends standard SVG element attributes
 */
export interface IconBaseProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon size in pixels or CSS size string
   */
  size?: number | string;
  
  /**
   * Icon color, supports CSS color values
   */
  color?: string;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Props for the icon wrapper component
 * Merges base props with icon-specific configuration
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Icon data/configuration object
   */
  icon?: unknown;
}

/**
 * Icon Component Type
 * 
 * A forward ref component that renders an icon with the provided props.
 * Supports ref forwarding to the underlying SVG element.
 * 
 * @example
 *