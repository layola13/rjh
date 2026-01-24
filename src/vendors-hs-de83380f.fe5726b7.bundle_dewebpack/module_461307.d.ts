/**
 * React component for rendering an icon with forwarded ref support.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the icon component.
 * Extends any additional props passed to the underlying icon implementation.
 */
export interface IconComponentProps {
  /**
   * Additional properties that can be passed to the icon component.
   * These will be spread onto the underlying icon element.
   */
  [key: string]: any;
}

/**
 * Ref type for the icon component.
 * Points to the underlying DOM element or component instance.
 */
export type IconComponentRef = any;

/**
 * Default exported icon component with forwarded ref support.
 * 
 * This component wraps an icon implementation and forwards refs to the underlying element.
 * All props are passed through to the base icon component along with a default icon definition.
 * 
 * @example
 *