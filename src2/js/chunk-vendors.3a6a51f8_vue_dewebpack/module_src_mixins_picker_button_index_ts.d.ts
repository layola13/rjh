/**
 * Picker button mixin
 * 
 * Provides functionality for generating picker button elements with color support.
 * Used in date/time picker components to create interactive title buttons.
 * 
 * @module PickerButtonMixin
 */

import { VNode, CreateElement } from 'vue';
import { Vue } from 'vue/types/vue';

/**
 * Props for the picker button mixin
 */
interface PickerButtonMixin extends Vue {
  /**
   * Generates a picker button element
   * 
   * @param propertyName - The data property name to bind to (e.g., 'activeTab', 'selectedYear')
   * @param propertyValue - The value to compare and emit on click
   * @param content - The button content (text or VNode array)
   * @param isReadonly - Whether the button should be readonly (non-interactive)
   * @param additionalClass - Additional CSS class to apply to the button
   * @returns A VNode representing the picker button
   */
  genPickerButton(
    propertyName: string,
    propertyValue: unknown,
    content: string | VNode[],
    isReadonly?: boolean,
    additionalClass?: string
  ): VNode;
}

/**
 * Picker button mixin declaration
 * 
 * Extends colorable mixin to provide color utilities.
 * Adds method for generating standardized picker button elements.
 */
declare const PickerButtonMixin: {
  methods: {
    /**
     * Generates a picker button div element
     * 
     * Creates a clickable button with active/readonly states.
     * Emits kebab-cased update events when clicked (e.g., 'update:active-tab').
     * 
     * @param propertyName - Component property to bind (camelCase)
     * @param propertyValue - Value to set on click
     * @param content - Button text content or VNode children
     * @param isReadonly - Disables click interaction (default: false)
     * @param additionalClass - Extra CSS classes to append (default: '')
     * @returns VNode with picker button structure
     */
    genPickerButton(
      propertyName: string,
      propertyValue: unknown,
      content: string | VNode[],
      isReadonly?: boolean,
      additionalClass?: string
    ): VNode;
  };
};

export default PickerButtonMixin;