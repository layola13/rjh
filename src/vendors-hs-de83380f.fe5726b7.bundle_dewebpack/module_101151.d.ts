/**
 * React icon component wrapper
 * @module IconComponent
 */

import type { Ref, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Icon size in pixels or CSS size value */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon data structure containing SVG path and metadata
 */
export interface IconDefinition {
  /** SVG tag name (usually 'svg') */
  tag: string;
  /** Icon attributes (viewBox, width, height, etc.) */
  attr: Record<string, string | number>;
  /** Child elements (paths, shapes) */
  child: Array<{
    tag: string;
    attr: Record<string, string | number>;
    child?: unknown[];
  }>;
}

/**
 * Props for the icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /** Icon definition data */
  icon: IconDefinition;
  /** Forwarded ref */
  ref?: Ref<SVGSVGElement>;
}

/**
 * Forwarded ref icon component
 * 
 * This component wraps an icon definition and renders it as an SVG element
 * with full React ref support for DOM manipulation.
 * 
 * @example
 *