import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component interface
 * Represents the props structure for icon components
 */
export interface IconComponentProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Optional className for custom styling */
  className?: string;
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Icon title for accessibility */
  title?: string;
  /** Custom style object */
  style?: React.CSSProperties;
}

/**
 * Icon definition interface
 * Represents the structure of an icon definition object
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG path data or elements */
  icon: unknown;
  /** Optional icon prefix */
  prefix?: string;
}

/**
 * Forwarded Icon Component
 * 
 * A React component that renders an icon with forwarded ref support.
 * This component wraps the base icon component and applies provided props,
 * including the icon definition from the imported module.
 * 
 * @example
 *