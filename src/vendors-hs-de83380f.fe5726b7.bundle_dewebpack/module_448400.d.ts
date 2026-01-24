/**
 * React component that wraps an icon with forwarded ref support.
 * This appears to be an icon component factory that creates a React component
 * with ref forwarding capabilities.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Props for the icon component.
 * Extends the base props from the underlying icon wrapper component.
 */
export interface IconComponentProps {
  /** Additional CSS class names */
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
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding support.
 * Combines props with an icon definition and renders through a wrapper component.
 * 
 * @template T - The type of the ref element (typically SVGSVGElement or HTMLElement)
 */
export type IconComponent<T = SVGSVGElement> = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<T>
>;

/**
 * The default exported icon component.
 * Created using React.forwardRef to support ref forwarding.
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;