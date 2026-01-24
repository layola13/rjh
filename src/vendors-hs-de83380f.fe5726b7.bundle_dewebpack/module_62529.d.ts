/**
 * React Icon Component Module
 * 
 * A forwardRef-wrapped icon component that combines props with a default icon.
 * This module exports a React component that renders an icon with customizable properties.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base properties for the icon component
 */
export interface IconComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size (width/height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML/SVG attributes */
  [key: string]: unknown;
}

/**
 * Default icon data structure
 * Contains the SVG path data and metadata for the icon
 */
export interface IconData {
  /** Icon name identifier */
  name?: string;
  /** SVG viewBox dimensions */
  viewBox?: string;
  /** SVG path data */
  path?: string | ReactElement;
  /** Icon theme variant */
  theme?: 'filled' | 'outlined' | 'two-tone';
}

/**
 * Props for the internal icon renderer component
 */
export interface IconRendererProps extends IconComponentProps {
  /** Icon data to render */
  icon: IconData;
  /** Forwarded ref */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forward ref icon component type
 * Accepts IconComponentProps and forwards ref to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * @example
 *