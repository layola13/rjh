import * as React from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /** Icon size in pixels or CSS size value */
  size?: number | string;
  
  /** Icon color, defaults to currentColor */
  color?: string;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Click event handler */
  onClick?: React.MouseEventHandler<SVGElement>;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
  
  /** Additional props passed to underlying icon component */
  [key: string]: unknown;
}

/**
 * Forward ref type for Icon component
 * Allows parent components to access the underlying SVG element
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * @example
 *