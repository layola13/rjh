/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentType } from 'react';

/**
 * Base props for the icon component
 * Extends standard HTML element attributes
 */
export interface IconComponentProps {
  /** Custom class name for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * Props for the internal icon wrapper component
 */
interface IconWrapperProps extends IconComponentProps {
  /** Icon definition object */
  icon: ComponentType<IconComponentProps>;
}

/**
 * The forwarded ref icon component
 * Wraps an icon definition with ref support for DOM manipulation
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<HTMLElement>
>;

export default IconComponent;