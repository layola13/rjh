/**
 * Module: module_479797
 * Original ID: 479797
 * 
 * Icon component wrapper that creates a forwarded ref component
 * using a default icon configuration.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component.
 * Extend this interface with specific icon properties as needed.
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  
  /** Icon color */
  color?: string;
  
  /** CSS class name */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the icon wrapper component.
 * Combines base icon props with the icon definition.
 */
export interface IconWrapperProps extends IconBaseProps {
  /** The icon definition object */
  icon?: unknown;
}

/**
 * Icon component with forwarded ref support.
 * 
 * This component wraps an icon definition and provides ref forwarding
 * for direct DOM access when needed.
 * 
 * @example
 *