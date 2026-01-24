/**
 * React component that wraps an icon with forwarded ref support
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Icon title for tooltips
   */
  title?: string;
}

/**
 * Icon wrapper component with ref forwarding support
 * Combines default icon data with custom props
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Forwarded ref icon component
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;