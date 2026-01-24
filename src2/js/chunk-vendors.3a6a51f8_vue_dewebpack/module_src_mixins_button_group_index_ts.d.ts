/**
 * Button group mixin module
 * Provides base functionality for button group components
 * Original module path: ./src/mixins/button-group/index.ts
 */

import { BaseItemGroup } from '../../components/VItemGroup/VItemGroup';
import { VueConstructor } from 'vue';

/**
 * Button toggle context provided to child components
 */
export interface ButtonToggleContext {
  /** Reference to the button group component instance */
  btnToggle: Vue;
}

/**
 * Button group computed properties interface
 */
export interface ButtonGroupComputed {
  /** CSS classes for the button group element */
  classes: Record<string, boolean>;
}

/**
 * Button group methods interface
 */
export interface ButtonGroupMethods {
  /**
   * Generates data object for rendering
   * @returns VNode data object with classes, attributes, and event listeners
   */
  genData(): VNodeData;
}

/**
 * Button group mixin
 * Extends BaseItemGroup to provide button-specific group functionality
 * Manages state and styling for grouped button components
 */
declare const ButtonGroupMixin: VueConstructor<
  Vue & ButtonGroupComputed & ButtonGroupMethods
>;

export default ButtonGroupMixin;

/**
 * Type-safe button group component definition
 */
export type ButtonGroup = InstanceType<typeof ButtonGroupMixin>;