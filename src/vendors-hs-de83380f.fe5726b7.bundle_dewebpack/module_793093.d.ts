/**
 * Icon component module
 * Provides a forwardRef-wrapped icon component with default icon configuration
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  
  /** Icon color */
  color?: string;
  
  /** Custom className for styling */
  className?: string;
  
  /** Custom inline styles */
  style?: React.CSSProperties;
  
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** Accessibility label */
  'aria-label'?: string;
  
  /** Additional props passed to the icon */
  [key: string]: unknown;
}

/**
 * Props for the default icon wrapper component
 */
export interface DefaultIconProps extends IconComponentProps {
  /** Reference to the underlying SVG element */
  ref?: Ref<SVGSVGElement>;
  
  /** Icon definition object */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** Icon name/identifier */
  name: string;
  
  /** SVG path data */
  path: string | string[];
  
  /** ViewBox dimensions */
  viewBox?: string;
  
  /** Default size */
  size?: number;
}

/**
 * Forward ref icon component type
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default icon component with forwardRef support
 * 
 * This component wraps an icon with React's forwardRef to allow
 * parent components to access the underlying SVG element reference.
 * 
 * @example
 *