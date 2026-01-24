/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props merging functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** Icon size in pixels or CSS size string */
  size?: number | string;
  
  /** Icon color, defaults to currentColor */
  color?: string;
  
  /** Additional CSS class names */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Icon title for accessibility */
  title?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component merges provided props with internal icon configuration
 * and forwards the ref to the underlying SVG element.
 * 
 * @example
 *