/**
 * React Icon Component Module
 * Provides a forwardRef-wrapped icon component with merged props
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
interface IconBaseProps {
  /**
   * Custom CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

/**
 * Props for the wrapped icon component
 */
interface IconComponentProps extends IconBaseProps {
  /**
   * The icon definition object
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * Icon identifier
   */
  id?: string;
  
  /**
   * SVG path data or component
   */
  data?: string | React.ComponentType;
  
  /**
   * Icon metadata
   */
  [key: string]: unknown;
}

/**
 * Forward ref icon component
 * 
 * @remarks
 * This component wraps an icon with React.forwardRef to allow ref forwarding.
 * It merges provided props with a default icon definition.
 * 
 * @example
 *