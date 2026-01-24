/**
 * Module: module_360692
 * Original ID: 360692
 * 
 * Icon component wrapper that forwards refs to the underlying icon element.
 * This module creates a React component that renders an icon using a base icon component.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard SVG element attributes and includes icon-specific properties.
 */
export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * CSS class name for styling the icon
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string (e.g., "24px", "1.5em")
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessible title for the icon
   */
  title?: string;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Whether the icon is decorative only (hidden from screen readers)
   */
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * Icon component with ref forwarding support.
 * 
 * This component wraps a base icon component and forwards refs to allow
 * parent components to access the underlying DOM element.
 * 
 * @example
 *