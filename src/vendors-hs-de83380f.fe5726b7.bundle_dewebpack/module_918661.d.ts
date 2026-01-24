/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends from the wrapped component's props
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<any> {
  /**
   * Additional props passed to the underlying icon component
   */
  [key: string]: any;
}

/**
 * Icon component with forwarded ref support
 * Wraps an icon definition with a React forwardRef component
 * 
 * @example
 *