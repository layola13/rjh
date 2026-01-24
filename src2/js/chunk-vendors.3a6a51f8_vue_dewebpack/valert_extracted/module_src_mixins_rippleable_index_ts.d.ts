import type { VNode, VNodeData, VNodeDirective } from 'vue';
import type { DirectiveOptions } from 'vue/types/options';

/**
 * Ripple directive value configuration
 */
export interface RippleDirectiveValue {
  /** Whether to center the ripple effect */
  center?: boolean;
  /** Custom class for ripple */
  class?: string;
}

/**
 * Ripple prop type - can be boolean to enable/disable or object for configuration
 */
export type RippleProp = boolean | RippleDirectiveValue;

/**
 * Rippleable mixin props
 */
export interface RippleableProps {
  /**
   * Enables or configures the ripple effect on the component
   * @default true
   */
  ripple: RippleProp;
}

/**
 * Rippleable mixin methods
 */
export interface RippleableMethods {
  /**
   * Generates a ripple effect div element
   * @param data - VNode data configuration for the ripple element
   * @returns VNode with ripple directive or null if ripple is disabled
   */
  genRipple(data?: VNodeData): VNode | null;
}

/**
 * Rippleable mixin directives
 */
export interface RippleableDirectives {
  /** Ripple directive for applying ripple effects */
  ripple: DirectiveOptions;
}

/**
 * Rippleable mixin - Provides ripple effect functionality to components
 * 
 * This mixin adds support for Material Design ripple effects that can be
 * enabled via the `ripple` prop and rendered using the `genRipple` method.
 */
declare const Rippleable: {
  name: 'rippleable';
  directives: RippleableDirectives;
  props: {
    ripple: {
      type: [BooleanConstructor, ObjectConstructor];
      default: boolean;
    };
  };
  methods: RippleableMethods;
};

export default Rippleable;