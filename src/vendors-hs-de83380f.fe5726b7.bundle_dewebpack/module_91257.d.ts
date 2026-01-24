/**
 * React icon component wrapper
 * @module IconComponent
 */

import * as React from 'react';

/**
 * Icon component props interface
 */
export interface IconComponentProps {
  /** Optional CSS class name */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon definition type
 */
export interface IconDefinition {
  /** Icon name */
  name: string;
  /** Icon theme */
  theme?: string;
  /** SVG icon data */
  icon: {
    tag: string;
    attrs: Record<string, string>;
    children?: unknown[];
  };
}

/**
 * Forward ref type for the icon component
 */
export type IconComponentType = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forward ref support
 * Renders an SVG icon with customizable props
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the SVG element
 * @returns React icon component
 */
declare const IconComponent: IconComponentType;

export default IconComponent;