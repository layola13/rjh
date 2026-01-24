/**
 * Module: module_634099
 * Original ID: 634099
 * 
 * React component that wraps an icon component with forwarded ref support.
 */

import * as React from 'react';

/**
 * Props for the icon component wrapper.
 * Extends all standard props passed to the underlying icon component.
 */
export interface IconComponentProps {
  /** Additional props passed to the underlying component */
  [key: string]: any;
}

/**
 * Icon component with ref forwarding capability.
 * 
 * @param props - All props to be passed to the underlying icon component
 * @param ref - Forwarded ref to be attached to the icon element
 * @returns A React element wrapping the icon with merged props
 * 
 * @example
 *