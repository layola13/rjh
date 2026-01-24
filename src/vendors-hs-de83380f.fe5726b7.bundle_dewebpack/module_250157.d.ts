/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Props for the icon component
 * Extends standard HTML attributes and custom icon properties
 */
export interface IconComponentProps {
  /** Custom class name for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps an icon implementation with React.forwardRef
 * to allow parent components to access the underlying DOM element.
 * 
 * @example
 *