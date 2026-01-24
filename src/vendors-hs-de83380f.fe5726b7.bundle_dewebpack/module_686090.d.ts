/**
 * React Icon Component Module
 * 
 * This module exports a forwardRef-wrapped icon component that combines
 * icon data with a base icon component for rendering.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base properties for icon components
 */
interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon data object containing SVG path information and metadata
   */
  icon: IconDefinition;
  
  /**
   * Additional CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Size of the icon (width and height)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Title for accessibility (shown on hover)
   */
  title?: string;
}

/**
 * Icon definition containing SVG metadata and path data
 */
interface IconDefinition {
  /**
   * Icon name/identifier
   */
  name: string;
  
  /**
   * SVG viewBox dimensions
   */
  viewBox?: string;
  
  /**
   * SVG path data
   */
  path: string | string[];
  
  /**
   * Additional SVG attributes
   */
  attrs?: Record<string, unknown>;
}

/**
 * Icon component with forwardRef support
 * 
 * Renders an SVG icon with support for custom styling and ref forwarding.
 * Combines icon definition data with a base icon rendering component.
 * 
 * @example
 *