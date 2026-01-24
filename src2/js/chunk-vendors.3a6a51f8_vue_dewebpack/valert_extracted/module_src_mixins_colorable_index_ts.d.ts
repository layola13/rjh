import Vue from 'vue';

/**
 * Data object for setting element attributes and styles
 */
export interface VNodeData {
  /** CSS class bindings */
  class?: Record<string, boolean>;
  /** Inline style object */
  style?: Record<string, string>;
}

/**
 * Colorable Mixin
 * 
 * Provides utilities for applying color to components via background or text color.
 * Supports both CSS color values (hex, rgb, etc.) and Vuetify color classes.
 */
export interface Colorable extends Vue {
  /** Color value - can be a CSS color or Vuetify color class name */
  color?: string;

  /**
   * Sets background and border color on a VNode data object
   * 
   * @param color - Color value (CSS color or class name)
   * @param data - VNode data object to modify
   * @returns Modified VNode data object with background color applied
   * 
   * @example
   * // CSS color
   * setBackgroundColor('#FF0000', {}) // { style: { 'background-color': '#FF0000', 'border-color': '#FF0000' } }
   * 
   * @example
   * // Vuetify class
   * setBackgroundColor('primary', {}) // { class: { primary: true } }
   */
  setBackgroundColor(color: string, data?: VNodeData): VNodeData;

  /**
   * Sets text and caret color on a VNode data object
   * 
   * @param color - Color value (CSS color or class name with optional shade)
   * @param data - VNode data object to modify
   * @returns Modified VNode data object with text color applied
   * 
   * @example
   * // CSS color
   * setTextColor('#FF0000', {}) // { style: { color: '#FF0000', 'caret-color': '#FF0000' } }
   * 
   * @example
   * // Vuetify class with shade
   * setTextColor('primary darken-2', {}) // { class: { 'primary--text': true, 'text--darken-2': true } }
   */
  setTextColor(color: string, data?: VNodeData): VNodeData;
}

/**
 * Colorable mixin component definition
 */
declare const Colorable: Vue.Component<Vue, {}, {}, {}, Colorable>;

export default Colorable;