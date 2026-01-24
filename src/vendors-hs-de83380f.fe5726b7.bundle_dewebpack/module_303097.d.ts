/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentType } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps {
  /** CSS class name for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Spin animation */
  spin?: boolean;
  /** Rotation angle */
  rotate?: number;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component wraps an icon definition with React's forwardRef,
 * allowing parent components to access the underlying DOM element.
 * 
 * @example
 *