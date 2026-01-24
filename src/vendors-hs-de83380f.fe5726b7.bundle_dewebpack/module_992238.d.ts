/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS units */
  size?: number | string;
  
  /** Icon color */
  color?: string;
  
  /** Custom CSS class name */
  className?: string;
  
  /** Custom inline styles */
  style?: React.CSSProperties;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
  
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the icon component with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Forwarded ref to the underlying SVG element */
  ref?: Ref<SVGSVGElement>;
}

/**
 * Icon component type definition
 * A React component that wraps an SVG icon with forwarded ref support
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * @remarks
 * This component:
 * - Forwards refs to the underlying SVG element
 * - Merges provided props with default icon configuration
 * - Supports all standard SVG attributes
 * 
 * @example
 *