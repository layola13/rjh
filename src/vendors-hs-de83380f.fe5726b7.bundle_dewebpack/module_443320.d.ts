/**
 * Ant Design Icon Component
 * A React component for rendering icons with support for two-tone colors, spinning, and rotation.
 */

import type { ForwardRefExoticComponent, RefAttributes, MouseEvent, CSSProperties } from 'react';

/**
 * Two-tone color configuration
 * Can be a single color string or a tuple of [primaryColor, secondaryColor]
 */
export type TwoToneColor = string | [string, string];

/**
 * Icon definition object structure
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** SVG theme type */
  theme: 'filled' | 'outlined' | 'twotone';
  /** SVG icon content */
  icon: {
    tag: string;
    attrs: Record<string, string>;
    children?: Array<{ tag: string; attrs: Record<string, string> }>;
  };
}

/**
 * Props for the AntdIcon component
 */
export interface AntdIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** Additional CSS class name */
  className?: string;
  /** Icon definition object */
  icon: IconDefinition;
  /** Whether to spin the icon */
  spin?: boolean;
  /** Rotation angle in degrees */
  rotate?: number;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Click event handler */
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  /** Two-tone color configuration */
  twoToneColor?: TwoToneColor;
  /** Inline styles */
  style?: CSSProperties;
  /** ARIA role */
  role?: string;
  /** ARIA label */
  'aria-label'?: string;
}

/**
 * Context configuration for icon component
 */
export interface IconContextConfig {
  /** CSS class prefix (default: "anticon") */
  prefixCls?: string;
  /** Root class name for styling */
  rootClassName?: string;
}

/**
 * Ant Design Icon Component
 * 
 * @example
 *