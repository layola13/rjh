/**
 * Module: module_248697
 * Original ID: 248697
 * 
 * A React component that wraps an icon component with forwarded ref support.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props that can be passed to the icon component.
 * Extend this interface with specific icon props as needed.
 */
export interface IconComponentProps {
  /** Additional CSS class name */
  className?: string;
  /** Inline style object */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Additional props passed to the underlying element */
  [key: string]: unknown;
}

/**
 * Props for the forwarded icon component, including ref support.
 */
export type ForwardedIconProps = IconComponentProps & RefAttributes<HTMLElement>;

/**
 * A forward ref component that renders an icon.
 * 
 * @param props - Component props
 * @param ref - Forwarded ref to the underlying DOM element
 * @returns React element representing the icon
 */
declare const IconComponent: ForwardRefExoticComponent<ForwardedIconProps>;

export default IconComponent;