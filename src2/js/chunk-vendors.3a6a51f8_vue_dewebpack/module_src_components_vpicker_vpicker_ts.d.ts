/**
 * VPicker Component Type Definitions
 * A versatile picker component that serves as a base for date/time pickers
 */

import Vue, { VNode, CreateElement } from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';

/**
 * Props configuration for VPicker component
 */
export interface VPickerProps {
  /**
   * Removes the picker's elevation shadow
   * @default false
   */
  flat?: boolean;

  /**
   * Forces the picker to take up 100% width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Orients the picker horizontally
   * @default false
   */
  landscape?: boolean;

  /**
   * Hides the picker title section
   * @default false
   */
  noTitle?: boolean;

  /**
   * Transition animation name for body content changes
   * @default 'fade-transition'
   */
  transition?: string;

  /**
   * Width of the picker in pixels or CSS unit
   * @default 290
   */
  width?: number | string;

  /**
   * Applies specified color to the component
   * Accepts color name (e.g., 'primary', 'secondary') or hex/rgb value
   */
  color?: string;

  /**
   * Applies the dark theme variant
   * @default false
   */
  dark?: boolean;

  /**
   * Applies the light theme variant
   * @default true
   */
  light?: boolean;

  /**
   * Designates elevation applied to component (0-24)
   * @default 0
   */
  elevation?: number | string;
}

/**
 * Computed properties for VPicker component
 */
export interface VPickerComputed {
  /**
   * Computed title background color based on theme and color prop
   * Returns the specified color or 'primary' for light theme
   */
  computedTitleColor: string | false;

  /**
   * Classes applied based on current theme (light/dark)
   */
  themeClasses: Record<string, boolean>;

  /**
   * Classes applied based on elevation prop
   */
  elevationClasses: Record<string, boolean>;

  /**
   * Whether the component is in dark mode
   */
  isDark: boolean;
}

/**
 * Methods available on VPicker component instance
 */
export interface VPickerMethods {
  /**
   * Generates the title section VNode
   * @returns VNode with title content and background color
   */
  genTitle(): VNode;

  /**
   * Generates the body transition wrapper VNode
   * @returns Transition component wrapping default slot content
   */
  genBodyTransition(): VNode;

  /**
   * Generates the main body section VNode
   * @returns VNode containing the body with proper styling and width
   */
  genBody(): VNode;

  /**
   * Generates the actions section VNode
   * @returns VNode with actions slot content
   */
  genActions(): VNode;

  /**
   * Sets background color on element data object
   * @param color - Color to apply
   * @param data - VNode data object to modify
   * @returns Modified data object with background color classes/styles
   */
  setBackgroundColor(color: string | false, data: Record<string, any>): Record<string, any>;
}

/**
 * Slot definitions for VPicker component
 */
export interface VPickerSlots {
  /**
   * Content displayed in the title section
   */
  title?: VNode[];

  /**
   * Main content of the picker body
   */
  default?: VNode[];

  /**
   * Action buttons displayed at the bottom
   */
  actions?: VNode[];
}

/**
 * VPicker Component Instance Type
 */
export type VPickerInstance = CombinedVueInstance<
  Vue,
  object,
  VPickerMethods,
  VPickerComputed,
  VPickerProps
> & {
  $slots: VPickerSlots;
};

/**
 * VPicker Component Constructor
 */
declare const VPicker: {
  new (): VPickerInstance;
  extend: typeof Vue.extend;
};

export default VPicker;