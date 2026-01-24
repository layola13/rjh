/**
 * React component icon wrapper module
 * Provides a forwarded ref icon component using a default icon implementation
 */

import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props interface for the icon component
 * Extends any additional properties passed to the underlying icon implementation
 */
export interface IconComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional props are allowed */
  [key: string]: unknown;
}

/**
 * Internal render function for the icon component
 * Merges props with the default icon and passes ref through
 * 
 * @param props - Component properties
 * @param ref - Forwarded ref to the underlying element
 * @returns React element representing the icon
 */
declare function renderIconComponent(
  props: IconComponentProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement;

/**
 * Forwarded ref icon component
 * Wraps a default icon implementation with ref forwarding support
 * 
 * @example
 *