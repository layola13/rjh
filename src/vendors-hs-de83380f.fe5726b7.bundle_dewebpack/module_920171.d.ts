/**
 * React Icon Component Module
 * Provides a forwarded ref icon component wrapper
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends standard HTML attributes and icon-specific properties
 */
interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps an icon definition and provides ref forwarding
 * for direct DOM access when needed.
 * 
 * @example
 *