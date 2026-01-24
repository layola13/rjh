import type { VNode, VNodeData, DirectiveOptions, VueConstructor } from 'vue';

/**
 * Ripple configuration object
 */
export interface RippleConfig {
  /** Center the ripple effect */
  center?: boolean;
  /** Custom class for ripple */
  class?: string;
  /** Ripple color */
  color?: string;
}

/**
 * Props for the Rippleable mixin
 */
export interface RippleableProps {
  /**
   * Enable or configure ripple effect
   * - true: Enable default ripple
   * - false: Disable ripple
   * - RippleConfig: Custom ripple configuration
   * @default true
   */
  ripple?: boolean | RippleConfig;
}

/**
 * Methods provided by the Rippleable mixin
 */
export interface RippleableMethods {
  /**
   * Generate a ripple effect VNode
   * @param data - Optional VNode data configuration
   * @returns VNode with ripple directive or null if ripple is disabled
   */
  genRipple(data?: VNodeData): VNode | null;
}

/**
 * Rippleable mixin component
 * Provides ripple effect functionality to components
 */
export interface Rippleable extends Vue, RippleableProps, RippleableMethods {
  /** Component name */
  name: 'rippleable';
  /** Ripple directive */
  directives: {
    ripple: DirectiveOptions;
  };
}

/**
 * Rippleable mixin
 * Adds Material Design ripple effect to components
 */
declare const Rippleable: VueConstructor<Rippleable>;

export default Rippleable;