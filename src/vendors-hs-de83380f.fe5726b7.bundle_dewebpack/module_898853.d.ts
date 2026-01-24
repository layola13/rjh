/**
 * Icon component module
 * Exports a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component wraps an SVG icon and forwards refs to the underlying element.
 * It accepts all standard SVG attributes plus custom icon-specific props.
 * 
 * @example
 *