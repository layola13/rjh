/**
 * VBtn Component Type Definitions
 * A versatile button component with multiple variants and states
 */

import { VNode } from 'vue';
import { PropType } from 'vue';

/**
 * Button value type - can be string, number, or any serializable value
 */
export type ButtonValue = string | number | Record<string, any> | null;

/**
 * Ripple effect configuration
 */
export interface RippleConfig {
  /** Whether to use circular ripple effect */
  circle?: boolean;
}

/**
 * VBtn component props interface
 */
export interface VBtnProps {
  /**
   * CSS class applied when button is active
   * Defaults to btnToggle's activeClass if in a button group
   */
  activeClass?: string;

  /** Makes button full-width */
  block?: boolean;

  /** Removes box shadow (elevation) */
  depressed?: boolean;

  /** Makes button circular floating action button */
  fab?: boolean;

  /** Makes button circular icon button */
  icon?: boolean;

  /** Shows loading state with progress indicator */
  loading?: boolean;

  /** Applies outlined variant style */
  outlined?: boolean;

  /** Prevents blur on click (keeps focus) */
  retainFocusOnClick?: boolean;

  /** Applies rounded border style */
  rounded?: boolean;

  /** HTML tag to render as (button, a, div, etc.) */
  tag?: string;

  /** Applies text variant (no background) */
  text?: boolean;

  /** Removes border radius */
  tile?: boolean;

  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';

  /** Button value for toggle groups */
  value?: ButtonValue;

  /** Button color */
  color?: string;

  /** Disables button interaction */
  disabled?: boolean;

  /** Ripple effect configuration */
  ripple?: boolean | RippleConfig;

  /** Elevation depth (0-24) */
  elevation?: number | string;

  // Positionable props
  /** Positions button absolute */
  absolute?: boolean;

  /** Positions button fixed */
  fixed?: boolean;

  /** Aligns to top */
  top?: boolean;

  /** Aligns to bottom */
  bottom?: boolean;

  /** Aligns to left */
  left?: boolean;

  /** Aligns to right */
  right?: boolean;

  // Routable props
  /** Router link destination */
  to?: string | object;

  /** Exact route matching */
  exact?: boolean;

  /** Append route */
  append?: boolean;

  /** Replace current history entry */
  replace?: boolean;

  /** Native href attribute */
  href?: string;

  /** Link target attribute */
  target?: string;

  // Sizeable props
  /** Extra small size */
  xSmall?: boolean;

  /** Small size */
  small?: boolean;

  /** Large size */
  large?: boolean;

  /** Extra large size */
  xLarge?: boolean;
}

/**
 * VBtn component data interface
 */
export interface VBtnData {
  /** Proxy class for active state */
  proxyClass: string;
}

/**
 * VBtn computed properties interface
 */
export interface VBtnComputed {
  /** Combined CSS classes for button */
  classes: Record<string, boolean>;

  /** Whether button has contained style (default elevated style) */
  contained: boolean;

  /** Computed ripple configuration */
  computedRipple: boolean | RippleConfig;

  /** Whether button uses flat style (no elevation) */
  isFlat: boolean;

  /** Whether button is circular */
  isRound: boolean;

  /** Inline styles object */
  styles: Record<string, any>;
}

/**
 * VBtn component methods interface
 */
export interface VBtnMethods {
  /**
   * Handles button click event
   * @param event - Native click event
   */
  click(event: MouseEvent): void;

  /**
   * Generates button content wrapper
   * @returns VNode with button content
   */
  genContent(): VNode;

  /**
   * Generates loading indicator
   * @returns VNode with loading spinner
   */
  genLoader(): VNode;
}

/**
 * VBtn component definition
 * Extends VSheet with routing, positioning, and sizing capabilities
 */
declare const VBtn: {
  name: 'v-btn';
  props: VBtnProps;
  data(): VBtnData;
  computed: VBtnComputed;
  methods: VBtnMethods;
  created(): void;
  render(createElement: (tag: string, data: any, children: VNode[]) => VNode): VNode;
};

export default VBtn;