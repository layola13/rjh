/**
 * Icon component module
 * Provides a forwardRef-wrapped icon component with default icon implementation
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Props for the icon component
 * Extends the base icon component props from the underlying implementation
 */
export interface IconComponentProps {
  /** Custom className for styling */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Icon style object */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional props passed to the underlying SVG element */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding support
 * Renders an icon using the default icon implementation
 * 
 * @example
 *