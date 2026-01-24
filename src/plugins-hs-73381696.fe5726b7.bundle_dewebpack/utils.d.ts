/**
 * Utility functions for entity manipulation, favorites, smart layout, and selection management
 */

import type { CustomizationContentType } from './CustomizationContentType';
import type { SmartLayoutUtil } from './SmartLayoutUtil';
import type { EN_SERIES_ID } from './SeriesId';

/**
 * Favorite information for an entity
 */
interface FavoriteInfo {
  /** Whether the entity's material has been changed */
  materialChanged: boolean;
  /** Whether the entity has a seek ID in favorites */
  hasSeekId: boolean;
  /** Whether the entity can be added to favorites */
  favAddFlag: boolean;
}

/**
 * Menu item configuration for smart layout
 */
interface SmartLayoutMenuItem {
  /** Display label for the menu item */
  label: string;
  /** Click handler for the menu item */
  onClick: () => void;
}

/**
 * Entity model interface
 */
interface Entity {
  /** Map of materials applied to the entity */
  materialsMap?: Map<string, unknown>;
  /** Customization content type */
  customizationContentType?: CustomizationContentType;
  /** Content type information */
  contentType?: {
    isTypeOf: (types: unknown[]) => boolean;
  };
  /** Metadata associated with the entity */
  metadata?: unknown;
  /** Model class identifier */
  Class?: string;
}

/**
 * Utility class providing helper functions for entity operations
 */
export declare const Utils: {
  /**
   * Check if an entity's material has been changed
   * @param entity - The entity to check
   * @returns True if the entity is a furnish item with modified materials
   */
  isEntityMaterialChanged(entity: Entity | null | undefined): boolean;

  /**
   * Get favorite information for an entity
   * @param entity - The entity to check
   * @param seekId - The seek ID to look up in favorites
   * @returns Favorite information including material change status and favorite flags
   */
  getFavoriteInfo(entity: Entity | null | undefined, seekId: string): FavoriteInfo;

  /**
   * Track soft cloth or curtain interaction events
   * @param modelId - The model ID to track
   * @param windSpeed - Optional wind speed parameter for curtain blow events
   */
  softClothTrack(modelId: string, windSpeed?: string): void;

  /**
   * Check if an entity or group can be added to favorites
   * @param entity - Single entity, group, or array of entities
   * @returns True if the entity can be favorited (not a molding or room door)
   */
  canFav(entity: Entity | Entity[] | HSCore.Model.Group): boolean;

  /**
   * Check if smart accessory layout is enabled for the given entities
   * @param entities - Array of entities to check
   * @returns True if smart layout can be applied to the selection
   */
  smartAccessoryLayoutEnable(entities: Entity[]): boolean;

  /**
   * Trigger smart accessory layout process
   * @param entities - Entities to apply smart layout to
   * @param seriesId - Optional series ID for layout style (default: empty string)
   */
  smartAccessoryLayout(entities: Entity[], seriesId?: string): void;

  /**
   * Generate smart layout menu items for entity selection
   * @param entities - Entities to generate menu items for
   * @returns Array of menu items with color scheme options (random, white, medium, dark)
   */
  smartLayoutChildItems(entities: Entity[]): SmartLayoutMenuItem[];

  /**
   * Check if all entities in the array are customized products
   * @param entities - Array of entities to check
   * @returns True if every entity is a top-level customized product
   */
  isAllCustomIzedProducts(entities: Entity[]): boolean;

  /**
   * Check if an entity is a customized product
   * @param entity - The entity to check
   * @returns True if the entity is a DAssembly, DContent, DExtruding, DSweep, DMolding, or Group containing customized products
   */
  isCustomizedProduct(entity: Entity): boolean;

  /**
   * Check if entities represent furniture items (not structural elements)
   * @param entities - Array of entities to check (only single-entity arrays are valid)
   * @returns True if the single entity is a furniture/light content item
   */
  isFurnish(entities: Entity[]): boolean;

  /**
   * Check if entities can be aligned (requires 2+ entities and valid types)
   * @param entities - Array of entities to check
   * @returns True if alignment operations are allowed for the selection
   */
  couldAlign(entities: Entity[]): boolean;

  /**
   * Check if the current selection contains a molding element
   * @returns True if at least one selected entity is a CustomizedModelMolding
   */
  isMoldingSelected(): boolean;

  /**
   * Check if the current selection contains a parametric opening
   * @returns True if at least one selected entity is a ParametricOpening
   */
  isParametricopeningSelected(): boolean;

  /**
   * Check if an entity is a molding type
   * @param entity - The entity to check
   * @returns True if the content type is BaseMolding, CrownMolding, Countertop, or LightMolding
   */
  isMolding(entity: Entity): boolean;

  /**
   * Show a tooltip/hint about duplication keyboard shortcuts
   * Displays different messages for 2D/3D views and Mac/Windows platforms
   * Only shown once per user (stored in local storage)
   */
  showDuplicateTip(): void;
};

export type { Entity, FavoriteInfo, SmartLayoutMenuItem };