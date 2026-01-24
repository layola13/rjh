/**
 * Context menu module for customized parametric stairs
 * Provides menu items for operations on parametric stair objects
 * @module NCustomizedParametricStairs
 */

import { HSCore } from './HSCore';
import { 
  getDuplicateItem, 
  getLockItem, 
  getHideItem, 
  getDeleteItem 
} from './menuItems';

/**
 * Represents a selectable entity in the 3D scene
 */
export interface SceneEntity {
  // Add specific properties based on your entity structure
}

/**
 * Represents a context menu item
 */
export interface MenuItem {
  label: string;
  action: () => void;
  icon?: string;
  enabled?: boolean;
}

/**
 * Context menu provider for customized parametric stairs
 */
export interface NCustomizedParametricStairsModule {
  /**
   * The name identifier of this menu module
   */
  readonly name: "NCustomizedParametricStairs";

  /**
   * Checks if this menu should be applied to the given selection
   * @param entities - Array of selected entities
   * @returns True if any entity is a customized parametric stairs instance
   */
  isApplied(entities: SceneEntity[]): boolean;

  /**
   * Gets the menu items to display for the selected entities
   * @param entities - Array of selected entities
   * @returns Array of menu items (duplicate, lock, hide, delete)
   */
  getItems(entities: SceneEntity[]): MenuItem[];
}

/**
 * Exported context menu module for NCustomizedParametricStairs
 */
export const NCustomizedParametricStairs: NCustomizedParametricStairsModule;