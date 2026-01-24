import { VNode } from 'vue';
import { BaseItemGroup } from '../VItemGroup/VItemGroup';
import Colorable from '../../mixins/colorable';

/**
 * VListItemGroup Component
 * 
 * A component for grouping list items with selectable functionality.
 * Extends BaseItemGroup and applies colorable mixin for color theming.
 * 
 * @remarks
 * This component provides a context for child list items, enabling
 * group selection behavior and accessibility features.
 */
export default interface VListItemGroup extends InstanceType<typeof VListItemGroup> {}

declare const VListItemGroup: {
  new (): {
    /** Component name identifier */
    readonly name: 'v-list-item-group';
    
    /**
     * Provides context to child components
     * @returns Context object with group information
     */
    provide(): {
      /** Indicates children are within a group context */
      isInGroup: true;
      /** Reference to this list item group instance */
      listItemGroup: VListItemGroup;
    };
    
    /** Computed properties */
    readonly computed: {
      /**
       * Computes CSS classes for the component
       * @returns Object containing CSS class names and their active state
       */
      classes(): Record<string, boolean> & {
        'v-list-item-group': true;
      };
    };
    
    /** Component methods */
    readonly methods: {
      /**
       * Generates component render data with accessibility attributes
       * @returns VNode data object with attrs, class, and color bindings
       */
      genData(): VNode['data'] & {
        attrs: {
          /** ARIA role for accessibility */
          role: 'listbox';
        };
      };
    };
  } & BaseItemGroup & Colorable;
};