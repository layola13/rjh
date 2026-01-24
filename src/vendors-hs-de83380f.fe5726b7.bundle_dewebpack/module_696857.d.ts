/**
 * React component for rendering an icon with forwarded ref support.
 * 
 * This module exports a React component that wraps an icon component with ref forwarding.
 * The component spreads all props to the underlying icon component and applies a default icon.
 * 
 * @module IconComponent
 */

import type React from 'react';

/**
 * Props for the Icon component.
 * Extends all standard HTML attributes and custom properties.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom icon to render. If not provided, uses the default icon.
   */
  icon?: React.ComponentType<any> | React.ReactElement;
  
  /**
   * Additional CSS class names to apply to the icon.
   */
  className?: string;
  
  /**
   * Inline styles to apply to the icon.
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon (if supported by the underlying icon component).
   */
  size?: number | string;
  
  /**
   * Color of the icon (if supported by the underlying icon component).
   */
  color?: string;
  
  /**
   * Accessible label for the icon.
   */
  'aria-label'?: string;
  
  /**
   * Any other props to be passed to the underlying component.
   */
  [key: string]: any;
}

/**
 * Forward ref type for the Icon component.
 * The ref can be attached to the underlying DOM element or component instance.
 */
export type IconComponentRef = HTMLElement | null;

/**
 * Icon component with forwarded ref support.
 * 
 * This component renders an icon using a default icon implementation,
 * while allowing all props to be customized and supporting ref forwarding
 * for direct DOM access.
 * 
 * @example
 *