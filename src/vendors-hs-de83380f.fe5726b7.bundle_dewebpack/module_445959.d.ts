/**
 * Ant Design Icon Component
 * A React component for rendering icons with support for spin animation, rotation, and two-tone colors.
 */

import React from 'react';

/**
 * Two-tone color configuration
 * Can be a single color string or a tuple of [primary, secondary] colors
 */
export type TwoToneColor = string | [string, string];

/**
 * Icon definition interface
 * Describes the structure of an icon object
 */
export interface IconDefinition {
  /** The unique name/identifier of the icon */
  name: string;
  /** SVG theme type */
  theme?: 'filled' | 'outlined' | 'twoTone';
  /** Icon SVG node data */
  icon: {
    tag: string;
    attrs: Record<string, string>;
    children?: any[];
  };
}

/**
 * Props for the AntdIcon component
 */
export interface AntdIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** Additional CSS class name */
  className?: string;
  
  /** Icon definition object containing the icon's SVG data and metadata */
  icon: IconDefinition;
  
  /** Whether to spin the icon (useful for loading states) */
  spin?: boolean;
  
  /** Rotation angle in degrees */
  rotate?: number;
  
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  
  /** Click event handler */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  
  /** 
   * Two-tone color configuration
   * Can be a single color (applied to primary) or tuple [primary, secondary]
   */
  twoToneColor?: TwoToneColor;
}

/**
 * Context value for icon configuration
 */
export interface IconContextValue {
  /** CSS class prefix for icon elements (default: "anticon") */
  prefixCls?: string;
  
  /** Root-level CSS class name */
  rootClassName?: string;
}

/**
 * Ant Design Icon Component
 * 
 * A flexible icon component supporting:
 * - Spin animation for loading states
 * - Arbitrary rotation angles
 * - Two-tone color customization
 * - Accessibility features (ARIA labels, keyboard navigation)
 * 
 * @example
 *