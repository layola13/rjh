/**
 * Icon component type definitions
 * Exported as a forwardRef React component with icon properties
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconBaseProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string (e.g., "24px", "1.5em")
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Optional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Additional data attributes
   */
  [key: `data-${string}`]: unknown;
}

/**
 * Icon component props combining base props with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Main icon component exported as a React forward ref component
 * Accepts all standard SVG props and forwards refs to the underlying SVG element
 * 
 * @example
 *