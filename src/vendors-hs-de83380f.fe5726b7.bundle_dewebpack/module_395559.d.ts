import * as React from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom className */
  className?: string;
  /** Inline style object */
  style?: React.CSSProperties;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Icon definition interface
 * Contains the SVG icon data structure
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** Icon theme (outlined, filled, etc.) */
  theme?: string;
  /** SVG icon data */
  icon: {
    /** SVG tag name */
    tag: string;
    /** SVG attributes */
    attrs: Record<string, any>;
    /** Child elements */
    children?: Array<{
      tag: string;
      attrs: Record<string, any>;
    }>;
  };
}

/**
 * Forward ref icon component type
 * A React component that accepts props and supports ref forwarding to SVGSVGElement
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Icon component created from icon definition
 * This is a forwardRef component that renders an SVG icon
 * 
 * @example
 *