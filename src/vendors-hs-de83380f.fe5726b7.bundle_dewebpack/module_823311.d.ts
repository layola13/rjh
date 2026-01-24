/**
 * A React component that renders an icon with forwarded ref support.
 * This module wraps an icon component with React's forwardRef for ref forwarding.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentProps } from 'react';

/**
 * Props for the icon component.
 * Extends all standard props of the base icon component.
 */
export interface IconComponentProps extends Omit<ComponentProps<any>, 'icon' | 'ref'> {
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Size of the icon */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: any;
}

/**
 * Icon component with ref forwarding capability.
 * 
 * @remarks
 * This component internally uses a base icon renderer and applies
 * the icon definition from the imported icon data.
 * 
 * @example
 *