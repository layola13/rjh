/**
 * Icon component module
 * Wraps an icon with forwarded ref support
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline style object */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the forwarded icon component
 */
export interface IconComponentProps extends IconBaseProps {
  /** Forwarded ref to the underlying element */
  ref?: Ref<SVGSVGElement>;
}

/**
 * Icon component with forwardRef support
 * 
 * @remarks
 * This component wraps an icon definition and forwards refs to allow
 * parent components to access the underlying DOM element.
 * 
 * @example
 *