import { VNode } from 'vue';
import { PropType } from 'vue';

/**
 * VTabsSlider Component
 * 
 * A visual indicator component that slides underneath the active tab in a VTabs component.
 * Extends the Colorable mixin to support dynamic background color styling.
 */
export default interface VTabsSlider {
  /**
   * Component name identifier
   */
  name: 'v-tabs-slider';

  /**
   * Color property inherited from Colorable mixin
   * Sets the background color of the slider indicator
   */
  color?: string;

  /**
   * Render function that creates the slider element
   * 
   * @param createElement - Vue's createElement function (h function)
   * @returns A VNode representing a div element with the v-tabs-slider class and background color
   */
  render(createElement: typeof import('vue').CreateElement): VNode;

  /**
   * Method inherited from Colorable mixin
   * Applies background color to the provided data object
   * 
   * @param color - The color value to apply
   * @param data - The component data object to modify
   * @returns Modified data object with background color styling applied
   */
  setBackgroundColor(
    color: string | undefined,
    data: Record<string, any>
  ): Record<string, any>;
}

/**
 * Component options type for VTabsSlider
 */
export interface VTabsSliderOptions {
  /**
   * Component name
   */
  name: 'v-tabs-slider';

  /**
   * Props definition
   */
  props?: {
    /**
     * Color of the slider indicator
     */
    color?: PropType<string>;
  };

  /**
   * Render function
   */
  render(h: typeof import('vue').CreateElement): VNode;
}