/**
 * React component for rendering an icon with forwarded ref support.
 * 
 * @module IconComponent
 */

import React from 'react';

/**
 * Props for the icon component.
 * Extends all standard React component props.
 */
export interface IconComponentProps extends React.ComponentPropsWithoutRef<'svg'> {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;
  
  /**
   * Size of the icon in pixels
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  [key: string]: unknown;
}

/**
 * Icon data structure containing SVG path and metadata
 */
export interface IconDefinition {
  /**
   * SVG path data
   */
  path: string;
  
  /**
   * ViewBox dimensions
   */
  viewBox?: string;
  
  /**
   * Icon width
   */
  width?: number;
  
  /**
   * Icon height
   */
  height?: number;
}

/**
 * Props for the base icon wrapper component
 */
interface IconWrapperProps extends IconComponentProps {
  /**
   * Icon definition containing SVG data
   */
  icon: IconDefinition;
  
  /**
   * Forwarded ref to the underlying element
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Render function for the icon component.
 * Merges props with icon definition and forwards ref.
 * 
 * @param props - Component props
 * @param ref - Forwarded ref to SVG element
 * @returns Rendered icon element
 */
declare function renderIcon(
  props: IconComponentProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement;

/**
 * Icon component with forwarded ref support.
 * Wraps the icon definition in a reusable React component.
 * 
 * @example
 *