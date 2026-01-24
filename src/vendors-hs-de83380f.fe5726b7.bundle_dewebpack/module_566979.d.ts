/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  
  /** Icon color */
  color?: string;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** Aria label for accessibility */
  'aria-label'?: string;
  
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Props for the internal icon wrapper component
 */
export interface IconWrapperProps extends IconComponentProps {
  /** Icon definition object */
  icon: unknown;
  
  /** Forwarded ref */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forwarded ref icon component type
 * Combines icon props with ref forwarding capabilities
 */
export type IconComponent = ForwardRefExoticComponent<
  PropsWithoutRef<IconComponentProps> & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * @example
 *