import { VNode } from 'vue';
import { BaseItemGroup } from '../VItemGroup/VItemGroup';
import Colorable from '../../mixins/colorable';

/**
 * VListItemGroup component - A group component for managing list item selections
 * Extends BaseItemGroup with colorable functionality
 */
export interface VListItemGroupProvide {
  /** Indicates whether the component is within a group context */
  isInGroup: boolean;
  /** Reference to the list item group instance */
  listItemGroup: VListItemGroup;
}

export interface VListItemGroupComputed {
  /** Computed CSS classes for the component */
  classes: Record<string, boolean>;
}

export interface VListItemGroupMethods {
  /**
   * Generates the data object for rendering
   * Applies text color and sets ARIA role for accessibility
   * @returns VNode data object with attributes and color applied
   */
  genData(): Record<string, unknown>;
}

/**
 * VListItemGroup - A Vue component for grouping and managing selectable list items
 * 
 * Features:
 * - Extends BaseItemGroup for selection management
 * - Applies colorable mixin for theming support
 * - Provides ARIA listbox role for accessibility
 * - Injects group context to child list items
 */
interface VListItemGroup extends VListItemGroupComputed, VListItemGroupMethods {
  /** Component name identifier */
  name: 'v-list-item-group';
  
  /** Active color for selected items */
  color?: string;
  
  /**
   * Provides context to child components
   * @returns Object containing group state and reference
   */
  provide(): VListItemGroupProvide;
}

declare const VListItemGroup: {
  new (): VListItemGroup;
};

export default VListItemGroup;