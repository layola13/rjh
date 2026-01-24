/**
 * VSheet Component Type Definitions
 * A flexible sheet component that supports various visual styles and behaviors
 */

import Vue, { VNode, VueConstructor } from 'vue';

/**
 * Props interface for VSheet component
 */
interface VSheetProps {
  /**
   * Applies outlined style (border with no background)
   * @default false
   */
  outlined?: boolean;

  /**
   * Applies shaped style (larger border-radius on one side)
   * @default false
   */
  shaped?: boolean;

  /**
   * Specifies the custom HTML tag to render
   * @default "div"
   */
  tag?: string;

  /**
   * Applies specified color to the component background
   * Inherited from Colorable mixin
   */
  color?: string;

  /**
   * Designates elevation applied to the component (0-24)
   * Inherited from Elevatable mixin
   */
  elevation?: number | string;

  /**
   * Specifies the component height
   * Inherited from Measurable mixin
   */
  height?: number | string;

  /**
   * Sets maximum height for the component
   * Inherited from Measurable mixin
   */
  maxHeight?: number | string;

  /**
   * Sets maximum width for the component
   * Inherited from Measurable mixin
   */
  maxWidth?: number | string;

  /**
   * Sets minimum height for the component
   * Inherited from Measurable mixin
   */
  minHeight?: number | string;

  /**
   * Sets minimum width for the component
   * Inherited from Measurable mixin
   */
  minWidth?: number | string;

  /**
   * Specifies the component width
   * Inherited from Measurable mixin
   */
  width?: number | string;

  /**
   * Designates the border-radius applied to the component
   * Inherited from Roundable mixin
   */
  rounded?: boolean | string;

  /**
   * Applies the light theme variant
   * Inherited from Themeable mixin
   */
  light?: boolean;

  /**
   * Applies the dark theme variant
   * Inherited from Themeable mixin
   */
  dark?: boolean;
}

/**
 * Computed properties interface for VSheet component
 */
interface VSheetComputed {
  /**
   * Computed CSS classes combining all mixin classes and component-specific classes
   */
  classes: Record<string, boolean>;

  /**
   * Computed inline styles for measurable properties
   */
  styles: Record<string, string | number | undefined>;

  /**
   * Theme classes from Themeable mixin
   */
  themeClasses: Record<string, boolean>;

  /**
   * Elevation classes from Elevatable mixin
   */
  elevationClasses: Record<string, boolean>;

  /**
   * Rounded classes from Roundable mixin
   */
  roundedClasses: Record<string, boolean>;

  /**
   * Measurable styles from Measurable mixin
   */
  measurableStyles: Record<string, string | number | undefined>;

  /**
   * Listeners from BindsAttrs mixin
   */
  listeners$: Record<string, Function | Function[]>;
}

/**
 * Methods interface for VSheet component
 */
interface VSheetMethods {
  /**
   * Sets background color on the component
   * Inherited from Colorable mixin
   * @param color - The color to apply
   * @param data - VNode data object to merge color into
   * @returns Modified VNode data with background color applied
   */
  setBackgroundColor(color: string | undefined, data: Record<string, any>): Record<string, any>;
}

/**
 * VSheet Component
 * A versatile sheet component that combines multiple mixins for styling flexibility
 */
declare const VSheet: VueConstructor<
  Vue & VSheetProps & VSheetComputed & VSheetMethods
>;

export default VSheet;

/**
 * VSheet component instance type
 */
export type VSheetInstance = InstanceType<typeof VSheet>;