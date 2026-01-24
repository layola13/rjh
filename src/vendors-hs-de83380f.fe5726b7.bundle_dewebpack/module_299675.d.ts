/**
 * Icon component module
 * 
 * This module exports a React component that wraps an icon with forwarded refs.
 * It uses React.forwardRef to allow parent components to access the underlying DOM element.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 * Extends standard React component props and allows any additional properties
 */
export interface IconComponentProps {
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
   * Any additional props passed to the underlying icon component
   */
  [key: string]: unknown;
}

/**
 * Props for the forwarded ref icon component
 * Combines base icon props with ref attributes
 */
export type IconComponentPropsWithRef = IconComponentProps & RefAttributes<HTMLElement>;

/**
 * Icon component with forwarded ref support
 * 
 * This component wraps an icon implementation and forwards refs to allow
 * parent components to interact with the underlying DOM element.
 * 
 * @example
 *