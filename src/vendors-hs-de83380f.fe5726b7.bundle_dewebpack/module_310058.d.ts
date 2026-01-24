/**
 * Module: module_310058
 * Original ID: 310058
 * 
 * React icon component with forwarded ref support
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends all standard React component props
 */
export interface IconComponentProps extends React.ComponentPropsWithoutRef<any> {
  /** Optional className for styling */
  className?: string;
  /** Optional style object */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional props passed to the icon */
  [key: string]: any;
}

/**
 * Icon component with ref forwarding
 * 
 * @param props - Icon component props
 * @param ref - Forwarded ref to the underlying element
 * @returns React element rendering the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<any>
>;

export default IconComponent;