import type * as React from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element props for flexible icon rendering
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
}

/**
 * Forward ref type for icon component
 * Allows parent components to access the underlying SVG element
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Icon component with forward ref support
 * 
 * @example
 *