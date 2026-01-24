/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps {
  /** Icon name or identifier */
  icon?: any;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Size of the icon */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps an icon element and forwards refs to the underlying DOM node.
 * It merges provided props with a default icon configuration.
 * 
 * @example
 *