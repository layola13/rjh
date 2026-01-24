/**
 * React component that renders an icon using a forwarded ref pattern.
 * This module exports a forwarded ref component that wraps a base icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component.
 * Extends standard component props and allows any additional properties.
 */
export interface IconComponentProps extends Record<string, unknown> {
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Icon component with forwarded ref support.
 * Allows parent components to access the underlying DOM element via ref.
 * 
 * @example
 *