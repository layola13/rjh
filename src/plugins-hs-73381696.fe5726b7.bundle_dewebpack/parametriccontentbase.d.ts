/**
 * ParametricContentBase Module
 * Provides context menu items and utilities for parametric content entities
 */

import { HSCore } from './HSCore';
import { CommandManager, Command } from './CommandManager';

/**
 * Entity metadata structure for parametric content
 */
export interface EntityMetadata {
  /** Ali model identifier */
  aliModelId: string;
  /** Category identifiers */
  categories: string[];
  [key: string]: unknown;
}

/**
 * Entity representation in the scene
 */
export interface Entity {
  /** Entity identifier */
  eId: string;
  /** Entity metadata */
  metadata: EntityMetadata;
  [key: string]: unknown;
}

/**
 * Application instance with command manager
 */
export interface App {
  /** Command manager for executing operations */
  cmdManager: CommandManager;
  [key: string]: unknown;
}

/**
 * Context for generating menu items
 */
export interface MenuItemContext {
  /** Selected entities */
  entities: Entity[];
  /** Whether the scene is 3D */
  is3D: boolean;
  /** Application instance */
  app: App;
  [key: string]: unknown;
}

/**
 * Menu item definition
 */
export interface MenuItem {
  /** Item label or identifier */
  [key: string]: unknown;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Smart replace content parameters
 */
export interface SmartReplaceParams {
  /** Parent model identifier */
  parentModelId: string;
  /** Entity identifier */
  eId: string;
  /** Scene type identifier */
  sceneType: string;
  /** Category identifiers for filtering */
  categoryIds: string[];
}

/**
 * ParametricContentBase configuration object
 * Handles context menu generation for parametric content entities
 */
export interface ParametricContentBase {
  /** Module name identifier */
  readonly name: 'ParametricContentBase';

  /**
   * Check if this module applies to the given entities
   * @param entities - Array of entities to check
   * @returns True if any entity is a ParametricContentBase instance
   */
  isApplied(entities: unknown[]): boolean;

  /**
   * Generate context menu items for parametric content
   * @param context - Context containing entities, 3D flag, and app instance
   * @returns Array of menu items including replace, duplicate, lock, hide, favorite, delete, and optionally scale
   */
  getItems(context: MenuItemContext): MenuItem[];
}

/**
 * Exported ParametricContentBase instance
 */
export const ParametricContentBase: ParametricContentBase;

/**
 * Utility function: Get replace menu item
 * @param context - Menu item context
 * @returns Replace menu item with smart replace functionality
 */
export function getReplaceItem(context: MenuItemContext): MenuItem;

/**
 * Utility function: Get duplicate menu item
 * @param context - Menu item context
 * @returns Duplicate menu item
 */
export function getDuplicateItem(context: MenuItemContext): MenuItem;

/**
 * Utility function: Get lock menu item
 * @param context - Menu item context
 * @returns Lock menu item
 */
export function getLockItem(context: MenuItemContext): MenuItem;

/**
 * Utility function: Get hide menu item
 * @param context - Menu item context
 * @returns Hide menu item
 */
export function getHideItem(context: MenuItemContext): MenuItem;

/**
 * Utility function: Get favorite menu item
 * @param context - Menu item context
 * @returns Favorite menu item
 */
export function getFavoriteItem(context: MenuItemContext): MenuItem;

/**
 * Utility function: Get delete menu item
 * @param context - Menu item context
 * @returns Delete menu item
 */
export function getDeleteItem(context: MenuItemContext): MenuItem;

/**
 * Utility function: Get scale menu item (3D only)
 * @param context - Menu item context
 * @returns Scale menu item
 */
export function getScaleItem(context: MenuItemContext): MenuItem;