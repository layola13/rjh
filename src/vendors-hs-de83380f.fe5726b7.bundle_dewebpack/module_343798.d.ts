import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
}

/**
 * Forward ref icon component type
 * A React component that accepts icon props and forwards ref to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps an SVG icon definition and provides:
 * - Ref forwarding to the underlying SVG element
 * - Prop spreading for customization
 * - Type-safe icon properties
 * 
 * @example
 *