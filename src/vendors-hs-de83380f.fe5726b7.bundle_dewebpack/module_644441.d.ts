import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /** Additional CSS class name */
  className?: string;
  /** Icon size in pixels or CSS unit */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Icon title for tooltips */
  title?: string;
}

/**
 * Forward ref component type for icon components
 * Allows ref forwarding to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * This is a forward ref component that renders an SVG icon
 * 
 * @example
 *