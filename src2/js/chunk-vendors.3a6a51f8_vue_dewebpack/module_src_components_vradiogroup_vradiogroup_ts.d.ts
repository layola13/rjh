import Vue from 'vue';
import { VNode } from 'vue/types/vnode';

/**
 * VRadioGroup component props interface
 */
export interface VRadioGroupProps {
  /** Whether to display radio buttons in column layout (default: true) */
  column?: boolean;
  /** Height of the radio group, can be number (px) or string (e.g. '100px', 'auto') */
  height?: number | string;
  /** Name attribute for the radio group */
  name?: string;
  /** Whether to display radio buttons in row layout */
  row?: boolean;
  /** The current selected value */
  value?: any;
}

/**
 * VRadioGroup component computed properties
 */
export interface VRadioGroupComputed {
  /** Combined CSS classes for the component */
  classes: Record<string, boolean>;
}

/**
 * VRadioGroup component methods
 */
export interface VRadioGroupMethods {
  /**
   * Generate the default slot wrapper with radio group semantics
   * @returns VNode representing the radio group input container
   */
  genDefaultSlot(): VNode;
  
  /**
   * Generate the input slot (overrides VInput behavior)
   * @returns VNode with modified event handlers
   */
  genInputSlot(): VNode;
  
  /**
   * Generate the label element as a legend for accessibility
   * @returns VNode for the legend element or null
   */
  genLabel(): VNode | null;
  
  /**
   * Handle click events on radio items
   * @param item - The clicked item
   */
  onClick(item: any): void;
}

/**
 * VRadioGroup component - A group container for radio button controls
 * 
 * Extends VInput and BaseItemGroup to provide radio button group functionality
 * with built-in validation, labeling, and accessibility features.
 */
export interface VRadioGroup extends Vue, VRadioGroupMethods {
  /** Component props */
  $props: VRadioGroupProps;
}

/**
 * VRadioGroup component constructor
 */
declare const VRadioGroup: {
  new (): VRadioGroup;
};

export default VRadioGroup;