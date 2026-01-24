/**
 * VDivider Component
 * A component for rendering horizontal or vertical divider lines
 */

import Vue, { VNode, CreateElement } from 'vue';
import Themeable from '../../mixins/themeable';

/**
 * Props for the VDivider component
 */
interface VDividerProps {
  /**
   * Adds indentation (72px) to the divider
   */
  inset: boolean;
  
  /**
   * Displays the divider vertically
   */
  vertical: boolean;
}

/**
 * VDivider component definition
 * Renders a material design divider line (horizontal or vertical)
 */
declare const VDivider: Vue & {
  /** Component name */
  name: 'v-divider';
  
  /** Component props */
  props: VDividerProps;
  
  /**
   * Render function that creates an hr element with appropriate classes and attributes
   * @param createElement - Vue's createElement function
   * @returns Virtual DOM node
   */
  render(createElement: CreateElement): VNode;
};

export default VDivider;

/**
 * Type definition for the VDivider component instance
 */
export type VDividerInstance = InstanceType<typeof VDivider>;

/**
 * Component classes applied based on props
 */
interface VDividerClasses {
  'v-divider': true;
  'v-divider--inset'?: boolean;
  'v-divider--vertical'?: boolean;
}

/**
 * ARIA orientation values for accessibility
 */
type AriaOrientation = 'horizontal' | 'vertical';