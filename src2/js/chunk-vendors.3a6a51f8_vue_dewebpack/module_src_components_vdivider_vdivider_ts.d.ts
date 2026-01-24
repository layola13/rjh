/**
 * VDivider Component Type Definitions
 * A versatile divider component that supports both horizontal and vertical orientations
 * with optional inset styling and theme support.
 */

import Vue, { VNode, CreateElement, VNodeData } from 'vue';

/**
 * Props for the VDivider component
 */
export interface VDividerProps {
  /**
   * Applies an indentation (72px on the left for horizontal, 8px on top/bottom for vertical)
   * Useful for list items or to create visual hierarchy
   * @default false
   */
  inset?: boolean;

  /**
   * Changes the divider orientation from horizontal to vertical
   * @default false
   */
  vertical?: boolean;
}

/**
 * Theme classes mixin interface
 * Provides light/dark theme support
 */
export interface ThemeableClasses {
  'theme--light'?: boolean;
  'theme--dark'?: boolean;
}

/**
 * Computed CSS classes for the VDivider component
 */
export interface VDividerClasses extends ThemeableClasses {
  'v-divider': true;
  'v-divider--inset': boolean;
  'v-divider--vertical': boolean;
}

/**
 * Attributes applied to the rendered <hr> element
 */
export interface VDividerAttrs {
  /**
   * ARIA role for accessibility
   * @default 'separator'
   */
  role: string;

  /**
   * ARIA orientation attribute
   * Only set when role is 'separator'
   * @default 'horizontal' | 'vertical'
   */
  'aria-orientation'?: 'horizontal' | 'vertical';
}

/**
 * VNode data configuration for the divider element
 */
export interface VDividerVNodeData extends VNodeData {
  class: VDividerClasses;
  attrs: VDividerAttrs & Record<string, unknown>;
  on: Record<string, Function | Function[]>;
}

/**
 * VDivider Component
 * 
 * Renders a semantic divider (horizontal rule) with support for:
 * - Horizontal and vertical orientations
 * - Inset positioning
 * - Theme integration (light/dark modes)
 * - Full accessibility (ARIA attributes)
 * - Event listener forwarding
 * 
 * @example
 *