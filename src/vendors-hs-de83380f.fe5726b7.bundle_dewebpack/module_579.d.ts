/**
 * Module: module_579
 * Original ID: 579
 * 
 * React component wrapper for an icon component.
 * Forwards refs to the underlying icon element.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props with icon-specific configuration.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** Additional CSS class names */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Inline style overrides */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional props passed through to the underlying component */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support.
 * 
 * @param props - Component props including icon configuration
 * @param ref - Forwarded ref to the underlying icon element
 * @returns React element rendering the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

export default IconComponent;