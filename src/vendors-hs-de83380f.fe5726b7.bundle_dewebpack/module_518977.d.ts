/**
 * React component that wraps an icon with forwarded ref support.
 * 
 * This module exports a forwardRef-wrapped component that renders an icon
 * using a base icon component with merged props.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for the icon component.
 * Extends common HTML element attributes that can be passed to the icon.
 */
export interface IconBaseProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the icon component with ref support.
 */
export interface IconComponentProps extends IconBaseProps {
  /** Reference to the underlying SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon component definition type.
 * A forward ref component that accepts icon props and forwards refs to the underlying SVG.
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A forwardRef-wrapped icon component.
 * 
 * This component:
 * - Accepts all base icon props
 * - Forwards refs to the underlying SVG element
 * - Merges custom props with default icon configuration
 * - Renders using a base icon wrapper component
 * 
 * @example
 *