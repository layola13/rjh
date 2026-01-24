/**
 * React icon component with forwarded ref support
 * Module: module_937979
 * Original ID: 937979
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom title for accessibility */
  title?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the icon wrapper component
 */
export interface IconWrapperProps extends IconBaseProps {
  /** Icon data/path definition */
  icon?: unknown;
  /** Forwarded ref */
  ref?: React.Ref<unknown>;
}

/**
 * Icon component with forwarded ref
 * Wraps icon data with a base icon renderer component
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<unknown>
>;

export default IconComponent;