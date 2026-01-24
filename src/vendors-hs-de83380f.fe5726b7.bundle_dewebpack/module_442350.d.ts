/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps {
  /** Custom CSS class name */
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
  /** Additional ARIA attributes */
  'aria-label'?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Props with ref support
 */
export type IconWithRefProps = IconComponentProps & RefAttributes<SVGSVGElement>;

/**
 * Forwarded ref icon component
 * 
 * @remarks
 * This component wraps an icon definition with React.forwardRef to support ref forwarding.
 * It merges provided props with the default icon configuration.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element representing the icon
 */
declare const IconComponent: ForwardRefExoticComponent<IconWithRefProps>;

export default IconComponent;