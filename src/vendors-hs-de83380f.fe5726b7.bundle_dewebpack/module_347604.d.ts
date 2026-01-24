/**
 * React component for rendering an icon with forwarded ref support.
 * This module exports a forward-ref wrapped icon component.
 * 
 * @module IconComponent
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props and allows additional attributes.
 */
export interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional className for styling */
  className?: string;
  /** Optional style object */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional props that can be passed to the icon */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref.
 * Wraps an icon definition and provides ref forwarding capability.
 * 
 * @param props - Component props
 * @param ref - Forwarded ref to the icon element
 * @returns React element representing the icon
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

export default IconComponent;