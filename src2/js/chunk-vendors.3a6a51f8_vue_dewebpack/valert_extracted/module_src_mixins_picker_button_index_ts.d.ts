/**
 * Picker Button Mixin
 * 
 * Provides functionality for generating interactive picker button elements.
 * This mixin extends the colorable mixin and adds methods for creating
 * clickable title buttons commonly used in picker components (date, time, etc.)
 */

import { VNode } from 'vue';
import { Vue } from 'vue/types/vue';

/**
 * Properties that components using this mixin should implement
 */
interface PickerButtonMixin extends Vue {
  /**
   * Dynamic properties that hold the current selected value
   * Used to compare against the target value for active state
   */
  [key: string]: any;
}

/**
 * Picker Button Mixin
 * 
 * Extends colorable mixin to provide picker button generation capabilities
 */
declare const PickerButtonMixin: {
  methods: {
    /**
     * Generates a picker button element for selection UI
     * 
     * @param propertyName - The name of the component property to update (e.g., 'selectingYear', 'selectingMonth')
     * @param targetValue - The value to set when the button is clicked
     * @param content - The content to display inside the button (can be a single VNode or array of VNodes)
     * @param isReadonly - Whether the button is in readonly mode (non-interactive), defaults to false
     * @param additionalClass - Additional CSS classes to apply to the button, defaults to empty string
     * @returns A VNode representing the picker button element
     * 
     * @example
     * // Generate a year button
     * this.genPickerButton('selectingYear', 2024, '2024', false, 'custom-class')
     * 
     * @remarks
     * - The button will have 'v-picker__title__btn--active' class when the current value matches targetValue
     * - Click events are disabled when the button is active or readonly
     * - Emits an 'update:{propertyName}' event (kebab-cased) when clicked
     */
    genPickerButton(
      propertyName: string,
      targetValue: any,
      content: VNode | VNode[],
      isReadonly?: boolean,
      additionalClass?: string
    ): VNode;
  };
};

export default PickerButtonMixin;