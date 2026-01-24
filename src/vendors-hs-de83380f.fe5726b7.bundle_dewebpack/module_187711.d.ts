/**
 * Module: module_187711
 * Original ID: 187711
 * 
 * A React component that wraps an icon component with forwarded refs.
 * This module creates a forward-ref enabled icon component.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends all standard React element attributes.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional className for custom styling
   */
  className?: string;

  /**
   * Optional style object for inline styles
   */
  style?: React.CSSProperties;

  /**
   * Icon size (width and height)
   */
  size?: number | string;

  /**
   * Icon color
   */
  color?: string;

  /**
   * Additional props passed to the underlying icon element
   */
  [key: string]: unknown;
}

/**
 * Forward ref type for the icon component.
 * Accepts a ref that can be attached to the underlying DOM element.
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

/**
 * Default export: A forward-ref enabled icon component.
 * 
 * @remarks
 * This component merges provided props with a default icon configuration
 * and forwards refs to the underlying element for imperative access.
 * 
 * @example
 *