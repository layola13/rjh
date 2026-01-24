import { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Icon component props interface
 * Extends base props with icon-specific properties
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
  /** Spin animation */
  spin?: boolean;
  /** Rotation angle */
  rotate?: number;
  /** Custom onClick handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** Aria label for accessibility */
  'aria-label'?: string;
  /** Additional SVG attributes */
  [key: string]: any;
}

/**
 * Icon component with forward ref support
 * 
 * @remarks
 * This component wraps the base icon component and applies default icon data.
 * It supports all standard SVG element properties and forwards refs to the underlying SVG element.
 * 
 * @example
 *