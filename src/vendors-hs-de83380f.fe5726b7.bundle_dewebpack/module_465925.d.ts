/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon component
 * with additional props and a specific icon configuration.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props interface for the icon component.
 * Extends standard React component props with icon-specific properties.
 */
interface IconComponentProps {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Optional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size in pixels or as a string with units
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Internal icon data structure
 * Contains the icon definition/configuration
 */
interface IconData {
  /**
   * Icon identifier or SVG path data
   */
  id?: string;
  
  /**
   * Icon viewBox dimensions
   */
  viewBox?: string;
  
  /**
   * SVG path or element data
   */
  paths?: unknown;
  
  [key: string]: unknown;
}

/**
 * Forwarded icon component with ref support.
 * 
 * This component merges provided props with a predefined icon configuration
 * and forwards refs to the underlying DOM element.
 * 
 * @example
 *