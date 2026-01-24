import * as React from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element attributes for flexibility
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /** Custom class name for styling */
  className?: string;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color, defaults to currentColor */
  color?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Additional props passed to the underlying icon component */
  [key: string]: any;
}

/**
 * Forward ref type for the icon component
 * Allows parent components to access the underlying SVG element
 */
export type IconComponentType = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component (module_709398)
 * 
 * This is a forward-ref wrapped React component that renders an SVG icon.
 * It combines props from the parent with internal icon data and forwards
 * the ref to the underlying SVG element.
 * 
 * @example
 *