/**
 * Icon component module
 * A React forwardRef component that wraps an icon with customizable props
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 * Extends standard HTML element attributes and custom icon configurations
 */
export interface IconProps {
  /** Custom CSS class name for styling */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Icon size (width and height) */
  size?: number | string;
  
  /** Icon color */
  color?: string;
  
  /** Accessibility label */
  'aria-label'?: string;
  
  /** ARIA role */
  role?: string;
  
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon data interface defining the structure of icon definitions
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  
  /** SVG icon content or path data */
  icon: ReactElement | string | unknown;
  
  /** Icon theme (outlined, filled, two-tone, etc.) */
  theme?: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Icon component with ref forwarding support
 * 
 * @example
 *