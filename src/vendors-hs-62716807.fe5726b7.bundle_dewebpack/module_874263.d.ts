/**
 * Ribbon component type definitions
 * A decorative ribbon component for wrapping content with a colored label
 */

import type { CSSProperties, ReactNode } from 'react';

/**
 * Placement position of the ribbon
 */
export type RibbonPlacement = 'start' | 'end';

/**
 * Preset color types for the ribbon
 */
export type PresetColorType =
  | 'pink'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'cyan'
  | 'green'
  | 'blue'
  | 'purple'
  | 'geekblue'
  | 'magenta'
  | 'volcano'
  | 'gold'
  | 'lime';

/**
 * Props for the Ribbon component
 */
export interface RibbonProps {
  /**
   * Additional CSS class name for the ribbon
   */
  className?: string;

  /**
   * Custom prefix for CSS classes (for theming)
   */
  prefixCls?: string;

  /**
   * Inline styles for the ribbon
   */
  style?: CSSProperties;

  /**
   * Color of the ribbon - can be a preset color name or any valid CSS color value
   */
  color?: PresetColorType | string;

  /**
   * Content to be wrapped by the ribbon
   */
  children?: ReactNode;

  /**
   * Text content displayed on the ribbon label
   */
  text?: ReactNode;

  /**
   * Placement position of the ribbon
   * @default 'end'
   */
  placement?: RibbonPlacement;
}

/**
 * Ribbon component for adding decorative colored labels to wrapped content
 * 
 * @example
 *