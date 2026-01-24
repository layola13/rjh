/**
 * React component for rendering an icon with forwarded ref support.
 * Module ID: 809169
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component.
 * Extends base icon component props from the icon library.
 */
export interface IconComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding capability.
 * Wraps the base icon component and merges provided props with the default icon definition.
 * 
 * @example
 *