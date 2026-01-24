/**
 * Icon component module
 * 
 * This module exports a forwardRef-wrapped React component that renders an icon.
 * The component accepts standard React props and forwards refs to the underlying element.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props for the icon component
 * Extends standard HTML attributes and custom icon properties
 */
export interface IconComponentProps {
  /** Custom class name for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon component with ref forwarding support
 * 
 * This component wraps an icon element and allows parent components
 * to access the underlying DOM element through a ref.
 * 
 * @example
 *