/**
 * BaseItem component for VItemGroup
 * Provides basic item functionality with active state management
 */

/**
 * Props configuration for BaseItem component
 */
export interface BaseItemProps {
  /**
   * CSS class to apply when item is active
   */
  activeClass?: string;
  
  /**
   * Value associated with this item
   * @default undefined
   */
  value?: any;
}

/**
 * Data state for BaseItem component
 */
export interface BaseItemData {
  /**
   * Whether the item is currently active
   */
  isActive: boolean;
}

/**
 * Methods available on BaseItem component
 */
export interface BaseItemMethods {
  /**
   * Toggle the active state of the item
   */
  toggle(): void;
}

/**
 * Scoped slot props passed to default slot
 */
export interface BaseItemSlotProps {
  /**
   * Current active state of the item
   */
  active: boolean;
  
  /**
   * Method to toggle the item's active state
   */
  toggle(): void;
}

/**
 * Base item component providing core item functionality
 * Used internally by VItemGroup for managing grouped items
 */
export interface BaseItem extends Vue {
  /**
   * Props
   */
  activeClass?: string;
  value?: any;
  
  /**
   * Data
   */
  isActive: boolean;
  
  /**
   * Methods
   */
  toggle(): void;
}

/**
 * VItem component - wrapper component for items in a VItemGroup
 * Extends BaseItem with groupable mixin functionality
 */
export interface VItem extends BaseItem {
  /**
   * Component name
   */
  readonly name: 'v-item';
}

/**
 * VItem component constructor
 */
declare const VItemComponent: VueConstructor<VItem>;

export { BaseItem };
export default VItemComponent;