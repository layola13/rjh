/**
 * React Icon Component Module
 * @module module_222493
 * @description A forwardRef-wrapped icon component that combines props with an icon definition
 */

import * as React from 'react';

/**
 * Icon SVG path data and metadata
 */
export interface IconDefinition {
  /** SVG path data */
  readonly icon: [number, number, string[], string, string | string[]];
  /** Icon name */
  readonly iconName?: string;
  /** Icon prefix (e.g., 'fas', 'far') */
  readonly prefix?: string;
}

/**
 * Base props for the icon component
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon definition containing SVG data */
  icon?: IconDefinition;
  /** Icon size */
  size?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
  /** Fixed width */
  fixedWidth?: boolean;
  /** Rotate angle */
  rotation?: 90 | 180 | 270;
  /** Flip direction */
  flip?: 'horizontal' | 'vertical' | 'both';
  /** Border */
  border?: boolean;
  /** Pull left or right */
  pull?: 'left' | 'right';
  /** Spin animation */
  spin?: boolean;
  /** Pulse animation */
  pulse?: boolean;
  /** Custom class name */
  className?: string;
  /** Inverse color */
  inverse?: boolean;
  /** List item */
  listItem?: boolean;
  /** Transform */
  transform?: string | object;
  /** Symbol ID for SVG sprite */
  symbol?: boolean | string;
  /** Mask icon */
  mask?: IconDefinition;
  /** Title for accessibility */
  title?: string;
}

/**
 * Forward ref type for the icon component
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forward ref support
 * @description Renders an SVG icon element with customizable props and ref forwarding
 * @example
 *