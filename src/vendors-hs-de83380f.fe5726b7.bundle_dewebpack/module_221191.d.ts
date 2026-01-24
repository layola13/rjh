import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** Custom className for styling */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessible title for the icon */
  title?: string;
  /** Additional style properties */
  style?: React.CSSProperties;
}

/**
 * Icon component type with forwarded ref support
 * Wraps an SVG icon with React.forwardRef for ref forwarding
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * This component renders an SVG icon with forwarded ref support.
 * It merges provided props with the base icon definition and passes
 * them to the underlying icon wrapper component.
 * 
 * @example
 *