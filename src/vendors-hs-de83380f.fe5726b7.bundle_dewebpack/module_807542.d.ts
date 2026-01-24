/**
 * React component module for rendering an icon
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props interface for the icon component
 * Extends standard HTML attributes and custom icon properties
 */
export interface IconComponentProps {
  /** Icon size in pixels or CSS unit string */
  size?: number | string;
  /** Icon color, supports CSS color values */
  color?: string;
  /** Custom className for styling */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional props passed to the underlying element */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * Wraps the icon implementation with ref forwarding capability
 * 
 * @example
 *