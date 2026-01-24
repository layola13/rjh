/**
 * Button group mixin module
 * Extends BaseItemGroup to provide button group functionality
 * Original module: ./src/mixins/button-group/index.ts
 */

import { BaseItemGroup } from '../../components/VItemGroup/VItemGroup';
import { VueConstructor } from 'vue';

/**
 * Provide object injected into child components
 */
interface ButtonGroupProvide {
  /** Reference to the parent button toggle group */
  btnToggle: ButtonGroupMixin;
}

/**
 * Button group mixin interface
 * Provides shared functionality for grouped button components
 */
interface ButtonGroupMixin extends InstanceType<typeof BaseItemGroup> {
  /** Component name identifier */
  readonly name: 'button-group';
}

/**
 * Button group mixin component
 * Extends BaseItemGroup with button-specific behavior and dependency injection
 */
declare const ButtonGroupMixin: VueConstructor<ButtonGroupMixin> & {
  /**
   * Provides button toggle context to descendant components
   * @returns Object containing reference to this button group instance
   */
  provide(): ButtonGroupProvide;

  computed: {
    /**
     * Computes CSS classes for the button group
     * Delegates to BaseItemGroup's class computation
     * @returns Record of CSS class names and their active state
     */
    classes(): Record<string, boolean>;
  };

  methods: {
    /**
     * Generates data object for component rendering
     * Inherited from BaseItemGroup
     * @returns VNode data object with classes, attrs, listeners, etc.
     */
    genData(): Record<string, unknown>;
  };
};

export default ButtonGroupMixin;