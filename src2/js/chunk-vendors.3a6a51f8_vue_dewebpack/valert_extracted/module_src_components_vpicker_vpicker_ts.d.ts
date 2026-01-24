import Vue, { VNode, VNodeData } from 'vue';
import { PropType } from 'vue';

/**
 * VPicker component props interface
 */
export interface VPickerProps {
  /** Remove elevation and border radius */
  flat?: boolean;
  /** Force the picker to take up full available width */
  fullWidth?: boolean;
  /** Orient the picker horizontally */
  landscape?: boolean;
  /** Hide the picker title */
  noTitle?: boolean;
  /** Sets the component transition. Can be one of the built-in transitions or your own */
  transition?: string;
  /** Width of the picker */
  width?: number | string;
  /** Applies specified color to the control - supports utility colors or css color values */
  color?: string;
  /** Applies the dark theme variant to the component */
  dark?: boolean;
  /** Applies the light theme variant to the component */
  light?: boolean;
  /** Designates an elevation applied to the component between 0 and 24 */
  elevation?: number | string;
}

/**
 * VPicker component computed properties interface
 */
export interface VPickerComputed {
  /** Computed title color based on color prop and theme */
  computedTitleColor: string | false;
  /** Theme classes from themeable mixin */
  themeClasses: Record<string, boolean>;
  /** Elevation classes from elevatable mixin */
  elevationClasses: Record<string, boolean>;
  /** Whether component is using dark theme */
  isDark: boolean;
}

/**
 * VPicker component methods interface
 */
export interface VPickerMethods {
  /**
   * Generate the title section of the picker
   * @returns VNode for the title element
   */
  genTitle(): VNode;
  
  /**
   * Generate the body transition wrapper
   * @returns VNode for the transition element
   */
  genBodyTransition(): VNode;
  
  /**
   * Generate the body section of the picker
   * @returns VNode for the body element
   */
  genBody(): VNode;
  
  /**
   * Generate the actions section of the picker
   * @returns VNode for the actions element
   */
  genActions(): VNode;
  
  /**
   * Set background color on element
   * Inherited from colorable mixin
   */
  setBackgroundColor(color: string | false, data: VNodeData): VNodeData;
}

/**
 * VPicker component slots interface
 */
export interface VPickerSlots {
  /** Slot for picker title content */
  title?: VNode[];
  /** Default slot for picker body content */
  default?: VNode[];
  /** Slot for picker action buttons */
  actions?: VNode[];
}

/**
 * VPicker - Base picker component
 * 
 * Provides a consistent UI for picker-type components (date picker, time picker, color picker, etc.)
 * with support for title section, body content, and action buttons.
 * 
 * @mixins colorable, elevatable, themeable
 */
declare const VPicker: Vue.ExtendedVue<
  Vue,
  {},
  VPickerMethods,
  VPickerComputed,
  VPickerProps
>;

export default VPicker;

export type VPickerInstance = InstanceType<typeof VPicker>;