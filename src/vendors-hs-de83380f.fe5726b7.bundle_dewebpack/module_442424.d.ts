/**
 * React Icon Component Module
 * 
 * A forwardRef-wrapped icon component that extends a base icon component
 * with custom icon data and additional props.
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base properties for the icon component
 * Extends standard SVG element attributes
 */
export interface IconBaseProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
   * @default 16
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Additional props passed to the underlying icon component
   */
  [key: string]: unknown;
}

/**
 * Icon data structure containing SVG path information
 */
export interface IconDefinition {
  /**
   * Icon tag (usually 'svg')
   */
  tag: string;
  
  /**
   * Icon attributes (viewBox, etc.)
   */
  attr: Record<string, unknown>;
  
  /**
   * Child elements (paths, etc.)
   */
  child: Array<{
    tag: string;
    attr: Record<string, unknown>;
  }>;
}

/**
 * Props for the icon component
 * Combines base icon props with ref support
 */
export type IconComponentProps = IconBaseProps;

/**
 * Icon component type with ref forwarding
 * Returns a React element that can accept a ref to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  PropsWithoutRef<IconComponentProps> & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Forward ref icon component
 * 
 * A React component that renders an SVG icon with ref forwarding support.
 * The component merges provided props with icon definition data and passes
 * them to the base icon component.
 * 
 * @example
 *