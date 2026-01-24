/**
 * React component module that wraps an icon component with forwarded ref support.
 * 
 * This module exports a React component that combines properties from multiple sources
 * and renders a default icon component with ref forwarding capability.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base properties for the icon component.
 * Extends standard HTML attributes and custom icon-specific props.
 */
interface IconComponentProps {
  /**
   * Icon data or configuration from the imported icon module.
   */
  icon?: unknown;
  
  /**
   * Additional CSS class names to apply to the icon.
   */
  className?: string;
  
  /**
   * Inline styles to apply to the icon element.
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon (can be numeric or string).
   */
  size?: number | string;
  
  /**
   * Color of the icon.
   */
  color?: string;
  
  /**
   * Any additional props to be spread onto the underlying component.
   */
  [key: string]: unknown;
}

/**
 * Ref type for the icon component element.
 * Typically refers to an SVG or HTML element.
 */
type IconComponentRef = HTMLElement | SVGSVGElement | null;

/**
 * A forward ref component that wraps an icon with additional properties.
 * 
 * This component:
 * - Accepts all standard icon props
 * - Forwards refs to the underlying DOM element
 * - Merges props with default icon configuration
 * - Uses a wrapped default component for rendering
 * 
 * @example
 *