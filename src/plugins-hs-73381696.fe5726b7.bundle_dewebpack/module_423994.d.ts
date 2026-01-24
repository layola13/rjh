/**
 * Context menu configurations for different entity types in the design application.
 * Provides menu items for soft cloth, groups, and content entities.
 */

/**
 * Represents a menu item in the context menu.
 */
export interface MenuItem {
  /** Display label for the menu item */
  label: string;
  /** Unique identifier for the menu item */
  id?: string;
  /** Icon source path or reference */
  src?: string;
  /** Display order in the menu */
  order?: number;
  /** UI modes where this item is available */
  uiMode?: string[];
  /** Click handler for the menu item */
  onClick?: () => void;
  /** Nested menu items */
  children?: MenuItem[];
}

/**
 * Context for menu item generation.
 */
export interface MenuContext {
  /** Selected entities */
  entities: any[];
  /** Application instance */
  app?: any;
  /** Whether the view is in 3D mode */
  is3D?: boolean;
}

/**
 * Menu configuration for a specific entity type.
 */
export interface MenuConfig {
  /** Unique name identifier for the menu configuration */
  name: string;
  
  /**
   * Determines if this menu configuration applies to the given entities.
   * @param entities - Array of entities to check
   * @returns True if this configuration should be used
   */
  isApplied: (entities: any[]) => boolean;
  
  /**
   * Generates menu items for the given context.
   * @param context - Menu generation context
   * @returns Array of menu items to display
   */
  getItems: (context: MenuContext) => MenuItem[];
}

/**
 * Menu configuration for soft cloth entities (curtains, drapes, etc.).
 * Provides options for cloth simulation with different wind intensities.
 */
export declare const softCloth: MenuConfig;

/**
 * Menu configuration for grouped entities.
 * Provides options for group manipulation, alignment, and ungrouping.
 */
export declare const group: MenuConfig;

/**
 * Menu configuration for content entities.
 * Provides options for duplication, replacement, flipping, and smart layout.
 */
export declare const content: MenuConfig;