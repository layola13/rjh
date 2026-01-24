/**
 * Vue directive for handling click events outside of an element
 * @module ClickOutside
 */

import type { DirectiveOptions } from 'vue';
import type { VNode } from 'vue/types/vnode';

/**
 * Handler function that is called when a click occurs outside the element
 */
export type ClickOutsideHandler = (event: MouseEvent) => void;

/**
 * Conditional function to determine if the click outside handler should be executed
 * @param event - The mouse event that triggered the click
 * @returns true if the handler should execute, false otherwise
 */
export type ClickOutsideConditional = (event: MouseEvent) => boolean;

/**
 * Function that returns additional elements to include in the click-outside check
 * @returns Array of HTML elements that should be considered "inside"
 */
export type ClickOutsideInclude = () => HTMLElement[];

/**
 * Configuration object for the click-outside directive
 */
export interface ClickOutsideConfig {
  /**
   * The handler function to call when a click occurs outside
   */
  handler: ClickOutsideHandler;
  
  /**
   * Optional conditional function to determine if the handler should execute
   * @default () => true
   */
  closeConditional?: ClickOutsideConditional;
  
  /**
   * Optional function that returns additional elements to include in the click-outside check
   * @default () => []
   */
  include?: ClickOutsideInclude;
}

/**
 * Value type for the v-click-outside directive
 * Can be either a handler function or a configuration object
 */
export type ClickOutsideValue = ClickOutsideHandler | ClickOutsideConfig;

/**
 * Extended HTMLElement with the click-outside listener attached
 */
export interface ClickOutsideElement extends HTMLElement {
  /**
   * Reference to the click event listener attached by the directive
   * @internal
   */
  _clickOutside?: (event: MouseEvent) => void;
}

/**
 * Binding object for the click-outside directive
 */
export interface ClickOutsideBinding {
  /**
   * The value passed to the directive
   */
  value: ClickOutsideValue;
}

/**
 * Vue directive that triggers a callback when a click occurs outside the bound element
 * 
 * @example
 * // Simple usage with handler function
 * <div v-click-outside="handleClickOutside"></div>
 * 
 * @example
 * // Advanced usage with configuration
 * <div v-click-outside="{ handler: handleClickOutside, closeConditional: isOpen, include: getIncludedElements }"></div>
 */
export declare const ClickOutside: DirectiveOptions;

/**
 * Default export of the ClickOutside directive
 */
declare const _default: DirectiveOptions;
export default _default;