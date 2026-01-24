/**
 * Module: module_553203
 * Original ID: 553203
 * 
 * A React component that wraps a base component with icon support and ref forwarding.
 * This is typically used for icon components in a UI library.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
interface IconComponentProps {
  /** The icon data/configuration object */
  icon?: unknown;
  /** Additional className for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Size of the icon */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

/**
 * Props type for the forwarded ref component
 */
type IconComponentPropsWithRef = IconComponentProps & RefAttributes<HTMLElement>;

/**
 * A forward ref icon component that combines props with a predefined icon.
 * 
 * @remarks
 * This component is created using React.forwardRef to support ref forwarding.
 * It merges incoming props with a default icon configuration.
 * 
 * @example
 *