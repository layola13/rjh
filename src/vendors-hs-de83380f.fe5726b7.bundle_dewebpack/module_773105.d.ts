import * as React from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element attributes for flexibility
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * Icon size in pixels or as a string value
   * @default undefined
   */
  size?: number | string;
  
  /**
   * Icon color, supports CSS color values
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon rotation angle in degrees
   */
  rotate?: number;
  
  /**
   * Spin animation flag
   */
  spin?: boolean;
}

/**
 * Forward ref type for the icon component
 * Allows parent components to access the underlying SVG element
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forward ref support
 * 
 * @remarks
 * This component wraps an SVG icon and forwards refs to the underlying element.
 * It accepts all standard SVG attributes plus custom icon-specific props.
 * 
 * @example
 *