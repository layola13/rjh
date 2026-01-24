/**
 * VTabsSlider Component
 * A visual slider indicator for VTabs component
 */

import { VNode } from 'vue';
import { Component } from 'vue/types/options';

/**
 * Props for VTabsSlider component
 */
export interface VTabsSliderProps {
  /** The color of the slider */
  color?: string;
}

/**
 * VTabsSlider component instance
 */
export interface VTabsSlider extends Component {
  /** Component name */
  name: string;
  
  /** 
   * Render function for the slider element
   * @param createElement - Vue's createElement function
   * @returns Virtual DOM node representing the slider
   */
  render(createElement: typeof import('vue').CreateElement): VNode;
  
  /**
   * Sets background color on an element
   * Inherited from colorable mixin
   * @param color - Color value to apply
   * @param data - Element data object
   * @returns Modified data object with background color styles
   */
  setBackgroundColor(color: string | undefined, data: Record<string, unknown>): Record<string, unknown>;
}

/**
 * VTabsSlider Component
 * Renders a colored slider bar for tab navigation
 */
declare const VTabsSlider: VTabsSlider;

export default VTabsSlider;