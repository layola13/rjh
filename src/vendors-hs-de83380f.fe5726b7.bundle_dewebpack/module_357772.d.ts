/**
 * Module: module_357772
 * Original ID: 357772
 * 
 * React icon component wrapper module.
 * Creates a forwarded ref component that wraps a base icon component with custom icon data.
 */

import type * as React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props and adds icon-specific properties.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional CSS class name */
  className?: string;
  /** Icon size in pixels or as string (e.g., "24px", "1em") */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Additional props passed to the underlying icon component */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support.
 * 
 * This component wraps a base icon renderer with specific icon data,
 * allowing consumers to render the icon with custom props and maintain
 * ref access to the underlying DOM element.
 * 
 * @example
 *