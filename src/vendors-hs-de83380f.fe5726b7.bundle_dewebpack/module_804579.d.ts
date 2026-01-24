/**
 * React component for rendering an icon with forwarded ref support.
 * This module exports a forwarded ref component that wraps an icon element.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component.
 * Extends any additional props that may be passed to the underlying icon element.
 */
export interface IconComponentProps {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;
  
  /**
   * Inline styles to apply to the icon
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon (width and height)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Ref type that can be attached to the icon component
 */
export type IconComponentRef = HTMLElement | null;

/**
 * Icon component with forwarded ref support.
 * 
 * This component renders an icon element and forwards the ref to the underlying DOM node.
 * It merges props with the icon configuration and passes them to the icon wrapper component.
 * 
 * @example
 *