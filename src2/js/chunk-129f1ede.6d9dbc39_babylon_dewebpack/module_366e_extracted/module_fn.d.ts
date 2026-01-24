/**
 * Vue render function module
 * Generates a fixed button element with internationalized text
 */

import type { CreateElement, VNode, VNodeData } from 'vue';

/**
 * Vue component render context
 */
interface RenderContext {
  /**
   * Event listeners attached to the component
   */
  on: Record<string, Function | Function[]>;
  
  /**
   * Component attributes
   */
  attrs: Record<string, any>;
  
  /**
   * Internationalization translation function
   * @param key - Translation key path
   * @returns Translated string
   */
  $t(key: string): string;
}

/**
 * Vue render function for a fixed button component
 * 
 * Creates a fixed position button with flexbox layout displaying
 * localized "order" text from the right menu translations
 * 
 * @param this - Vue component render context
 * @param createElement - Vue's createElement function (h function)
 * @returns VNode representing the rendered button element
 * 
 * @example
 * // Renders:
 * // <div class="d-flex xs-fixed-btn fixed-1" v-on="listeners">
 * //   {{ $t("rightmenu.xs.order") }}
 * // </div>
 */
declare function renderFixedButton(
  this: RenderContext,
  createElement: CreateElement
): VNode;

export default renderFixedButton;