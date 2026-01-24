/**
 * React component that renders a blue-colored icon or element.
 * This module wraps a base component with a default "blue" color prop.
 * 
 * @module BlueComponentWrapper
 */

import type { ComponentType, ReactElement } from 'react';

/**
 * Props that can be passed to the component.
 * Extends the base component's props with optional color override.
 */
export interface ComponentProps {
  /**
   * Color of the component. Defaults to "blue" if not specified.
   */
  color?: string;
  
  /**
   * Additional props accepted by the underlying component.
   */
  [key: string]: unknown;
}

/**
 * Default export: A React component that renders with blue color by default.
 * 
 * @param props - Component properties
 * @returns A React element with blue color applied
 * 
 * @example
 *