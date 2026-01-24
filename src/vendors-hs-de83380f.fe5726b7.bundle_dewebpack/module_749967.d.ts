/**
 * React icon component with forwarded ref support
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps extends SVGAttributes<SVGElement> {
  /** Icon size in pixels or CSS unit */
  size?: string | number;
  /** Icon color */
  color?: string;
  /** Custom class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  /** Title for accessibility */
  title?: string;
}

/**
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /** Optional ref to the SVG element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Icon definition interface
 */
export interface IconDefinition {
  /** SVG tag name */
  tag: string;
  /** SVG attributes */
  attr: Record<string, unknown>;
  /** Child elements */
  child?: Array<{
    tag: string;
    attr: Record<string, unknown>;
  }>;
}

/**
 * Forwarded ref icon component
 * 
 * This component wraps an icon definition and forwards refs to the underlying SVG element.
 * It merges user-provided props with the default icon configuration.
 * 
 * @example
 *