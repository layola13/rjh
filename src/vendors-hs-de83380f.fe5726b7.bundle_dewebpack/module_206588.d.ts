/**
 * React component module that wraps an icon component with forwarded ref support.
 * 
 * This module exports a React component that combines props from the parent
 * with an icon component, supporting ref forwarding for direct DOM access.
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props interface for the icon component.
 * Extend this interface with specific props your component accepts.
 */
interface IconComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * The forwarded ref type for the component.
 * Typically references the root DOM element (SVG or HTMLElement).
 */
type IconComponentRef = HTMLElement | SVGSVGElement;

/**
 * Icon component with forwarded ref support.
 * 
 * This component wraps an icon (from module 949045) within a container component
 * (from module 445959), merging all passed props and forwarding the ref to the
 * underlying DOM element.
 * 
 * @example
 *