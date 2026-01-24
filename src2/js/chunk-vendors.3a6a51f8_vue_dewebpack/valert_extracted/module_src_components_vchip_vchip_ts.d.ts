import Vue, { VNode, VNodeData } from 'vue';
import { PropType } from 'vue';

/**
 * VChip Component - A small interactive element used for displaying information
 * Supports various styles (outlined, pill, label), filtering, closing, and grouping
 */
export interface VChipProps {
  /** Whether the chip is in active state */
  active?: boolean;
  
  /** CSS class applied when chip is active */
  activeClass?: string;
  
  /** Shows a close icon button */
  close?: boolean;
  
  /** Icon to display for the close button */
  closeIcon?: string;
  
  /** Disables the chip interaction */
  disabled?: boolean;
  
  /** Makes the chip draggable */
  draggable?: boolean;
  
  /** Shows a filter icon when active */
  filter?: boolean;
  
  /** Icon to display when filter is active */
  filterIcon?: string;
  
  /** Applies label styling (rectangular) */
  label?: boolean;
  
  /** Treats the chip as a link */
  link?: boolean;
  
  /** Applies outlined styling */
  outlined?: boolean;
  
  /** Applies pill styling (fully rounded) */
  pill?: boolean;
  
  /** HTML tag to render as root element */
  tag?: string;
  
  /** Text color for the chip content */
  textColor?: string;
  
  /** The value used when the chip is part of a group */
  value?: any;
  
  /** Background color of the chip */
  color?: string;
  
  /** Size variations (from sizeable mixin) */
  small?: boolean;
  large?: boolean;
  xSmall?: boolean;
  xLarge?: boolean;
  
  /** Theme variant (from themeable mixin) */
  dark?: boolean;
  light?: boolean;
  
  /** Routing props (from routable mixin) */
  href?: string | object;
  to?: string | object;
  exact?: boolean;
  append?: boolean;
  replace?: boolean;
  nuxt?: boolean;
  activeClass?: string;
  exactActiveClass?: string;
}

/**
 * VChip component data structure
 */
export interface VChipData {
  /** Internal class used for active state proxy */
  proxyClass: string;
}

/**
 * VChip computed properties
 */
export interface VChipComputed {
  /** Combined CSS classes for the chip */
  classes: Record<string, boolean>;
  
  /** Whether the chip has close functionality */
  hasClose: boolean;
  
  /** Whether the chip can be clicked */
  isClickable: boolean;
}

/**
 * VChip component methods
 */
export interface VChipMethods {
  /**
   * Handles click events on the chip
   * @param event - Native click event
   */
  click(event: MouseEvent): void;
  
  /**
   * Generates the filter icon element
   * @returns VNode for the filter icon with expand transition
   */
  genFilter(): VNode;
  
  /**
   * Generates the close button element
   * @returns VNode for the close icon button
   */
  genClose(): VNode;
  
  /**
   * Generates the main content wrapper
   * @returns VNode containing filter, slots, and close button
   */
  genContent(): VNode;
  
  /**
   * Main render function
   * @param createElement - Vue's createElement function
   * @returns Complete VNode tree for the chip
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;
}

/**
 * VChip Component
 * A versatile chip component with support for filtering, closing, dragging,
 * theming, sizing, and integration with chip groups
 */
declare const VChip: Vue.ComponentOptions<
  Vue,
  VChipData,
  VChipMethods,
  VChipComputed,
  VChipProps
>;

export default VChip;