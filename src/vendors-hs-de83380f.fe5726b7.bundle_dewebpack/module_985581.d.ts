/**
 * Icon component module
 * Provides a forwardRef-wrapped icon component with default icon configuration
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 * Extends properties from the underlying icon implementation
 */
export interface IconComponentProps {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  
  /** Icon color */
  color?: string;
  
  /** CSS class name */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
  
  /** Additional attributes passed to the icon element */
  [key: string]: unknown;
}

/**
 * Props for the wrapped icon component including ref support
 */
export interface IconProps extends IconComponentProps {
  /** Icon configuration object */
  icon?: unknown;
  
  /** Ref forwarded to the underlying DOM element */
  ref?: React.Ref<HTMLElement>;
}

/**
 * Default exported icon component with forwardRef support
 * 
 * @example
 *