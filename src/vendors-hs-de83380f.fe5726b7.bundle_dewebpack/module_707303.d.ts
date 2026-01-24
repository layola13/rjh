import React from 'react';

/**
 * Props for the icon component
 */
export interface IconComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Additional SVG attributes */
  [key: string]: unknown;
}

/**
 * Icon component created by wrapping the base icon with a forward ref
 * This component renders an SVG icon with customizable properties
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A forward ref component that renders an icon with the ability to pass refs
 */
declare const IconForwardRefComponent: IconComponent;

export default IconForwardRefComponent;