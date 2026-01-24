/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon component
 * with additional props spreading functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
interface IconBaseProps extends ComponentPropsWithoutRef<'svg'> {
  /** Icon size in pixels or CSS units */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Icon title for tooltips */
  title?: string;
}

/**
 * Icon component props with ref support
 */
type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forward ref icon component type
 * 
 * This component:
 * - Accepts all standard SVG props
 * - Supports ref forwarding to the underlying SVG element
 * - Merges provided props with default icon configuration
 * - Renders using a base icon component with predefined icon data
 */
type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default exported icon component
 * 
 * @example
 *