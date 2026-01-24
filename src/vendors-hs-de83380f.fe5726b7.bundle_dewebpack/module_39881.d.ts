/**
 * Icon component module
 * Wraps an icon with React.forwardRef for ref forwarding support
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
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
  
  /** Accessibility label */
  'aria-label'?: string;
  
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Reference to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon wrapper component type
 * A forward ref component that renders an icon with the provided props
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Icon component with forward ref support
 * 
 * @example
 *