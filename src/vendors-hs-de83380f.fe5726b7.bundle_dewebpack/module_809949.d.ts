/**
 * Icon component module with ref forwarding support
 * 
 * This module exports a React component that renders an icon with forwarded ref.
 * The component wraps an underlying icon implementation and passes through all props.
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element attributes for flexibility
 */
interface IconBaseProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Size of the icon in pixels or as a CSS string
   * @default undefined
   */
  size?: number | string;
  
  /**
   * Color of the icon
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for the icon
   */
  'aria-label'?: string;
  
  /**
   * Additional props passed to the underlying icon component
   */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding
 * 
 * A forward ref component that renders an icon element with the ability
 * to access the underlying DOM node through a ref.
 * 
 * @example
 *