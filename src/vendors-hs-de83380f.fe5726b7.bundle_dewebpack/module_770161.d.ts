/**
 * Icon Component Module
 * 
 * This module exports a forwardRef-wrapped React icon component.
 * It combines properties from parent components with a specific icon implementation.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * SVG icon definition structure
 */
interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG path data or content */
  icon: [number, number, unknown[], string, unknown[]];
  /** Icon prefix (e.g., 'fas', 'far', 'fab') */
  prefix: string;
  /** Icon width */
  iconName: string;
}

/**
 * Base properties for icon components
 */
interface IconBaseProps {
  /** Icon definition object */
  icon: IconDefinition;
  /** Additional CSS class names */
  className?: string;
  /** Icon color */
  color?: string;
  /** Icon size (numeric or string like '2x', '3x') */
  size?: string | number;
  /** Rotation angle (0, 90, 180, 270) */
  rotation?: 0 | 90 | 180 | 270;
  /** Flip direction */
  flip?: 'horizontal' | 'vertical' | 'both';
  /** Spin animation */
  spin?: boolean;
  /** Pulse animation */
  pulse?: boolean;
  /** Border around icon */
  border?: boolean;
  /** Pull icon to left or right */
  pull?: 'left' | 'right';
  /** Custom styles */
  style?: React.CSSProperties;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Title for accessibility */
  title?: string;
}

/**
 * Props accepted by the icon component, combining base props with standard HTML attributes
 */
type IconComponentProps = IconBaseProps & Omit<ComponentPropsWithoutRef<'svg'>, keyof IconBaseProps>;

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *