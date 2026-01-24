/**
 * Module: module_761748
 * Original ID: 761748
 * 
 * Icon component module that wraps a default icon with forwarded ref support.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentProps } from 'react';

/**
 * Base icon component props interface
 */
export interface IconComponentProps {
  /** Icon size in pixels or CSS string */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Custom attributes to spread on the SVG element */
  [key: string]: unknown;
}

/**
 * Icon wrapper component props
 */
export interface IconWrapperProps extends IconComponentProps {
  /** The icon data/configuration object */
  icon?: IconData;
  /** Ref to be forwarded to the underlying element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon data structure
 */
export interface IconData {
  /** Icon name/identifier */
  name?: string;
  /** SVG path data or icon definition */
  path?: string | string[];
  /** Icon view box dimensions */
  viewBox?: string;
  /** Additional icon metadata */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support.
 * 
 * This component wraps a base icon implementation and forwards refs
 * to allow parent components to access the underlying DOM element.
 * 
 * @example
 *