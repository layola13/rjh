/**
 * VSheet component type definitions
 * A flexible sheet component with elevation, color, and shape options
 */

import Vue, { VNode, VueConstructor } from 'vue';

/**
 * Props interface for VSheet component
 */
interface VSheetProps {
  /**
   * Applies outlined style (border instead of elevation)
   */
  outlined?: boolean;

  /**
   * Applies shaped style (larger border radius on one side)
   */
  shaped?: boolean;

  /**
   * Specifies the HTML tag to render
   * @default 'div'
   */
  tag?: string;

  /**
   * Applies specified color to the background
   * Supports theme colors and CSS colors
   */
  color?: string;

  /**
   * Designates an elevation applied to the component (0-24)
   */
  elevation?: number | string;

  /**
   * Sets the height for the component
   */
  height?: number | string;

  /**
   * Sets the maximum height for the component
   */
  maxHeight?: number | string;

  /**
   * Sets the maximum width for the component
   */
  maxWidth?: number | string;

  /**
   * Sets the minimum height for the component
   */
  minHeight?: number | string;

  /**
   * Sets the minimum width for the component
   */
  minWidth?: number | string;

  /**
   * Sets the width for the component
   */
  width?: number | string;

  /**
   * Applies the light theme variant
   */
  light?: boolean;

  /**
   * Applies the dark theme variant
   */
  dark?: boolean;

  /**
   * Designates the border-radius applied to the component
   * Can be xs, sm, md, lg, xl, or a specific value
   */
  rounded?: boolean | string;

  /**
   * Applies rounded corners to top-left
   */
  tile?: boolean;
}

/**
 * Computed properties interface for VSheet component
 */
interface VSheetComputed {
  /**
   * Combined CSS classes for the component
   */
  classes: Record<string, boolean>;

  /**
   * Combined inline styles for the component
   */
  styles: Record<string, string | number | undefined>;

  /**
   * Theme-related CSS classes
   */
  themeClasses: Record<string, boolean>;

  /**
   * Elevation-related CSS classes
   */
  elevationClasses: Record<string, boolean>;

  /**
   * Border-radius-related CSS classes
   */
  roundedClasses: Record<string, boolean>;

  /**
   * Measurable-related inline styles (width, height, etc.)
   */
  measurableStyles: Record<string, string | undefined>;

  /**
   * Event listeners bound to the component
   */
  listeners$: Record<string, Function | Function[]>;
}

/**
 * Methods interface for VSheet component
 */
interface VSheetMethods {
  /**
   * Sets background color on the provided data object
   * @param color - Color to apply
   * @param data - VNode data object to modify
   * @returns Modified VNode data object
   */
  setBackgroundColor(color: string | undefined, data: Record<string, any>): Record<string, any>;
}

/**
 * VSheet component instance type
 */
export type VSheet = Vue & VSheetProps & VSheetComputed & VSheetMethods;

/**
 * VSheet component constructor
 * A flexible sheet component that combines multiple mixins:
 * - BindsAttrs: Binds HTML attributes
 * - Colorable: Provides color functionality
 * - Elevatable: Provides elevation functionality
 * - Measurable: Provides sizing functionality
 * - Roundable: Provides border-radius functionality
 * - Themeable: Provides theme support
 */
declare const VSheet: VueConstructor<VSheet>;

export default VSheet;