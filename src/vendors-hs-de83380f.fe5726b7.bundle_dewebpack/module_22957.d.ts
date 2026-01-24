/**
 * React Icon Component
 * 
 * A forwardRef-wrapped icon component that renders a default icon
 * with merged props and ref forwarding support.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Props for the icon component
 */
export interface IconComponentProps {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * Additional props passed to the icon element
   */
  [key: string]: unknown;
}

/**
 * Icon element ref type (typically SVGSVGElement for icon components)
 */
export type IconRef = SVGSVGElement;

/**
 * The exported icon component type with ref forwarding
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * Default export: A forwardRef icon component
 * 
 * @example
 *