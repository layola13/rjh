/**
 * React icon component module
 * 
 * This module exports a forward ref icon component that wraps a base icon
 * with configurable props.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props for the icon component
 */
export interface IconProps {
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;

  /**
   * Inline styles for the icon
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
   * Accessibility label for screen readers
   */
  'aria-label'?: string;

  /**
   * Whether the icon should be focusable
   */
  tabIndex?: number;

  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;

  /**
   * Any additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Ref type for the icon component (typically an SVG element)
 */
export type IconRef = SVGSVGElement;

/**
 * Forward ref icon component type
 * 
 * This component accepts icon props and forwards refs to the underlying SVG element.
 * It combines props from the parent with the default icon configuration.
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<IconRef>
>;

/**
 * Default export: A forward ref React component that renders an icon
 * 
 * @example
 *