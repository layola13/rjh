import React from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element attributes and supports ref forwarding
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon size in pixels or string format */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline style object */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * Icon component type with forwarded ref support
 * A React component that renders an SVG icon with customizable properties
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * Uses forwardRef to expose the underlying SVG element reference
 * 
 * @example
 *