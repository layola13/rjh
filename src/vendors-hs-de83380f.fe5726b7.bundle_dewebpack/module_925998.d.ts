import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  /** Icon color, defaults to currentColor */
  color?: string;
  /** Custom className for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Forward ref icon component type
 * Allows ref forwarding to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * @remarks
 * This is a forward ref component that renders an SVG icon.
 * It accepts all standard SVG props plus custom icon-specific props.
 * 
 * @example
 *