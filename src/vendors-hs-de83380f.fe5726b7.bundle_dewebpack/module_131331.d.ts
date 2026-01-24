import * as React from 'react';

/**
 * Icon component props interface
 * Extends standard React component props with icon-specific properties
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon reference for forwarding refs
   */
  ref?: React.Ref<SVGSVGElement>;
  
  /**
   * Icon definition object containing SVG path data
   */
  icon?: IconDefinition;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /**
   * Icon name
   */
  name: string;
  
  /**
   * Icon theme (outlined, filled, etc.)
   */
  theme?: string;
  
  /**
   * SVG path data or icon content
   */
  icon: React.ReactNode | string;
}

/**
 * Icon component type with forwarded ref support
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with ref forwarding capability
 * This component renders an icon based on the provided icon definition
 * 
 * @example
 *