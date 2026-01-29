/**
 * Favorite Plugin Module
 * Provides favorite management functionality for floorplan applications
 * @module FavoritePlugin
 */

import { IPlugin } from 'HSApp.Plugin';

/**
 * Application instance interface
 */
interface App {
  // Add specific app properties as needed
  [key: string]: unknown;
}

/**
 * Plugin activation event data
 */
interface ActivationEvent {
  /** The main application instance */
  app: App;
}

/**
 * Plugin dependencies container
 */
interface PluginDependencies {
  [key: string]: unknown;
}

/**
 * Favorite item data structure
 */
interface FavoriteItem {
  /** Unique identifier for the favorite */
  id: string;
  /** Additional favorite properties */
  [key: string]: unknown;
}

/**
 * Favorite topic data structure
 */
interface FavoriteTopicData {
  /** Topic identifier */
  id: string;
  /** Topic name */
  name?: string;
  /** Additional topic properties */
  [key: string]: unknown;
}

/**
 * Favorites data collection
 */
interface FavoritesData {
  [key: string]: FavoriteItem;
}

/**
 * Favorites topic data collection
 */
interface FavoritesTopicDataCollection {
  [key: string]: FavoriteTopicData;
}

/**
 * Store interface for managing favorites state
 */
interface FavoriteStore {
  /** Store state and methods */
  [key: string]: unknown;
}

/**
 * Group panel component interface
 */
interface GroupPanel {
  /** Panel methods and properties */
  [key: string]: unknown;
}

/**
 * Group list panel component interface
 */
interface GroupListPanel {
  /** Panel methods and properties */
  [key: string]: unknown;
}

/**
 * Signal for hiding group panel
 */
interface HiddenGroupPanelSignal {
  /** Signal subscription/emission methods */
  [key: string]: unknown;
}

/**
 * Group item data structure
 */
interface GroupItem {
  /** Item identifier */
  id: string;
  /** Additional item properties */
  [key: string]: unknown;
}

/**
 * Batch move operation parameters
 */
interface TopicFavBatchMoveParams {
  /** Source topic ID */
  sourceTopicId?: string;
  /** Target topic ID */
  targetTopicId?: string;
  /** Item IDs to move */
  itemIds?: string[];
  [key: string]: unknown;
}

/**
 * Template favorite status parameters
 */
interface TemplateFavoriteStatusParams {
  /** Template identifier */
  templateId: string;
  /** Favorite status */
  isFavorite: boolean;
  [key: string]: unknown;
}

/**
 * Custom favorite data structure
 */
interface CustomFavData {
  [key: string]: unknown;
}

/**
 * Model uploader parameters
 */
interface ModelUploaderParams {
  /** Model data */
  model?: unknown;
  /** Material data */
  material?: unknown;
  [key: string]: unknown;
}

/**
 * Favorite container interface
 */
interface FavoriteContainer {
  [key: string]: unknown;
}

/**
 * Favorite topic container interface
 */
interface FavoriteTopicContainer {
  [key: string]: unknown;
}

/**
 * Favorite group container interface
 */
interface FavoriteGroupContainer {
  [key: string]: unknown;
}

/**
 * Handler for favorite operations
 */
declare class FavoriteHandler {
  /**
   * Initialize the favorite handler
   * @param config - Configuration object
   */
  init(config: { app: App; dependencies: PluginDependencies }): void;

  /**
   * Cleanup resources
   */
  cleanup(): void;

  /**
   * Show popup group panel
   * @param param1 - First parameter
   * @param param2 - Second parameter
   * @param param3 - Third parameter
   * @param param4 - Fourth parameter
   * @returns Panel result
   */
  showPopupGroupPanel(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): unknown;

  /**
   * Get favorites by current user
   * @returns User's favorites
   */
  getFavoritesByUser(): Promise<FavoriteItem[]> | FavoriteItem[];

  /**
   * Favorites data collection
   */
  favoritesData: FavoritesData;

  /**
   * Favorites topic data collection
   */
  favoritesTopicData: FavoritesTopicDataCollection;

  /**
   * Get all favorite IDs
   * @returns Array of favorite IDs
   */
  getFavoriteIds(): string[];

  /**
   * Get all favorite topic IDs
   * @returns Array of topic IDs
   */
  getFavoriteTopicIds(): string[];

  /**
   * Get the favorites store
   * @returns Store instance
   */
  getStore(): FavoriteStore;

  /**
   * Add a new favorite
   * @param param1 - First parameter
   * @param param2 - Second parameter
   * @param param3 - Third parameter
   * @param param4 - Fourth parameter
   * @returns Operation result
   */
  addFavorite(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): Promise<unknown> | unknown;

  /**
   * Remove a favorite by ID
   * @param id - Favorite ID to remove
   * @returns Operation result
   */
  removeFavorite(id: string): Promise<boolean> | boolean;

  /**
   * Update an existing favorite
   * @param favorite - Favorite data to update
   * @returns Operation result
   */
  updateFavorite(favorite: FavoriteItem): Promise<unknown> | unknown;

  /**
   * Batch move favorites between topics
   * @param params - Move operation parameters
   * @returns Operation result
   */
  topicFavBatchMove(params: TopicFavBatchMoveParams): Promise<unknown> | unknown;

  /**
   * Add a new favorites topic
   * @param topic - Topic data to add
   * @returns Operation result
   */
  addFavoritesTopic(topic: FavoriteTopicData): Promise<unknown> | unknown;

  /**
   * Delete a favorites topic
   * @param topicId - Topic ID to delete
   * @returns Operation result
   */
  deleteFavoritesTopic(topicId: string): Promise<boolean> | boolean;

  /**
   * Get group panel component
   * @returns Group panel instance
   */
  getGroupPanel(): GroupPanel;

  /**
   * Favorite container instance
   */
  favContainer: FavoriteContainer;

  /**
   * Favorite topic container instance
   */
  favTopicContainer: FavoriteTopicContainer;

  /**
   * Favorite group container instance
   */
  favGroupContainer: FavoriteGroupContainer;

  /**
   * Get group list panel component
   * @returns Group list panel instance
   */
  getGroupListPanel(): GroupListPanel;

  /**
   * Change template favorite status
   * @param params - Template favorite status parameters
   * @returns Operation result
   */
  changeTemplateFavoriteStatus(
    params: TemplateFavoriteStatusParams
  ): Promise<unknown> | unknown;

  /**
   * Get template favorite ID
   * @param templateId - Template identifier
   * @returns Favorite ID if exists
   */
  getTemplateFavoriteId(templateId: string): string | null;

  /**
   * Initialize merchant favorite IDs
   * @returns Operation result
   */
  initMerchantFavIds(): Promise<void> | void;

  /**
   * Handle merchant favorite operations
   * @param param1 - First parameter
   * @param param2 - Second parameter
   * @param param3 - Third parameter
   * @returns Operation result
   */
  handleMerchantFav(
    param1: unknown,
    param2: unknown,
    param3: unknown
  ): Promise<unknown> | unknown;

  /**
   * All merchant favorite IDs
   */
  allMerchantFavIds: string[];

  /**
   * Set custom favorite data
   * @param data - Custom favorite data
   */
  setCustomFavData(data: CustomFavData): void;

  /**
   * Custom favorite data
   */
  customFavData: CustomFavData;

  /**
   * Request all group items
   * @param groupId - Group identifier
   * @returns Group items
   */
  requestAllGroupItems(groupId: string): Promise<GroupItem[]> | GroupItem[];

  /**
   * Upload model with material
   * @param params - Uploader parameters
   */
  uploaderModelWithMaterial(params: ModelUploaderParams): void;
}

/**
 * Constants utility for signals
 */
declare class SignalConstants {
  /**
   * Signal for hiding group panel
   */
  static signalHiddenGroupPanel: HiddenGroupPanelSignal;

  /**
   * Request all group items
   * @param groupId - Group identifier
   * @returns Group items
   */
  static requestAllGroupItems(groupId: string): Promise<GroupItem[]> | GroupItem[];
}

/**
 * Favorite Plugin Class
 * Provides comprehensive favorite management functionality for floorplan applications
 * @extends IPlugin
 */
export declare class FavoritePlugin extends IPlugin {
  /**
   * Internal handler for favorite operations
   * @private
   */
  private _handler: FavoriteHandler;

  /**
   * Plugin constructor
   * Initializes the plugin with metadata and dependencies
   */
  constructor();

  /**
   * Called when the plugin is activated
   * @param event - Activation event containing app instance
   * @param dependencies - Injected plugin dependencies
   */
  onActive(event: ActivationEvent, dependencies: PluginDependencies): void;

  /**
   * Called when the plugin is deactivated
   * Performs cleanup operations
   */
  onDeactive(): void;

  /**
   * Show popup group panel
   * @param param1 - First parameter
   * @param param2 - Second parameter
   * @param param3 - Third parameter
   * @param param4 - Fourth parameter
   * @returns Panel result
   */
  showPopupGroupPanel(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): unknown;

  /**
   * Get favorites for the current user
   * @returns User's favorites
   */
  getUserFavorites(): Promise<FavoriteItem[]> | FavoriteItem[];

  /**
   * Get all favorites data
   * @returns Favorites data collection
   */
  getFavoritesData(): FavoritesData;

  /**
   * Get favorites topic data
   * @returns Favorites topic data collection
   */
  getFavoritesTopicData(): FavoritesTopicDataCollection;

  /**
   * Get all favorite IDs
   * @returns Array of favorite IDs
   */
  getFavoriteIds(): string[];

  /**
   * Get all favorite topic IDs
   * @returns Array of topic IDs
   */
  getFavoriteTopicIds(): string[];

  /**
   * Get the favorites store
   * @returns Store instance
   */
  getStore(): FavoriteStore;

  /**
   * Add a new favorite
   * @param param1 - First parameter
   * @param param2 - Second parameter
   * @param param3 - Third parameter
   * @param param4 - Fourth parameter
   * @returns Operation result
   */
  addFavorite(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): Promise<unknown> | unknown;

  /**
   * Remove a favorite by ID
   * @param id - Favorite ID to remove
   * @returns Operation result
   */
  removeFavorite(id: string): Promise<boolean> | boolean;

  /**
   * Update an existing favorite
   * @param favorite - Favorite data to update
   * @returns Operation result
   */
  updateFavorite(favorite: FavoriteItem): Promise<unknown> | unknown;

  /**
   * Batch move favorites between topics
   * @param params - Move operation parameters
   * @returns Operation result
   */
  topicFavBatchMove(params: TopicFavBatchMoveParams): Promise<unknown> | unknown;

  /**
   * Add a new favorites topic
   * @param topic - Topic data to add
   * @returns Operation result
   */
  addFavoritesTopic(topic: FavoriteTopicData): Promise<unknown> | unknown;

  /**
   * Delete a favorites topic
   * @param topicId - Topic ID to delete
   * @returns Operation result
   */
  deleteFavoritesTopic(topicId: string): Promise<boolean> | boolean;

  /**
   * Get signal for hiding group panel
   * @returns Hidden group panel signal
   */
  hiddenGroupPanelSinal(): HiddenGroupPanelSignal;

  /**
   * Get currently selected item
   * @param groupId - Group identifier
   * @returns Selected group items
   */
  getCurrentSelectedItem(groupId: string): Promise<GroupItem[]> | GroupItem[];

  /**
   * Get group panel component
   * @returns Group panel instance
   */
  getGroupPanel(): GroupPanel;

  /**
   * Get favorite container
   * @readonly
   */
  get favContainer(): FavoriteContainer;

  /**
   * Get favorite topic container
   * @readonly
   */
  get favTopicContainer(): FavoriteTopicContainer;

  /**
   * Get favorite group container
   * @readonly
   */
  get favGroupContainer(): FavoriteGroupContainer;

  /**
   * Get group list panel component
   * @returns Group list panel instance
   */
  getGroupListPanel(): GroupListPanel;

  /**
   * Change template favorite status
   * @param params - Template favorite status parameters
   * @returns Operation result
   */
  changeTemplateFavoriteStatus(
    params: TemplateFavoriteStatusParams
  ): Promise<unknown> | unknown;

  /**
   * Get template favorite ID
   * @param templateId - Template identifier
   * @returns Favorite ID if exists
   */
  getTemplateFavoriteId(templateId: string): string | null;

  /**
   * Initialize merchant favorite IDs
   * @returns Operation result
   */
  initMerchantFavIds(): Promise<void> | void;

  /**
   * Handle merchant favorite operations
   * @param param1 - First parameter
   * @param param2 - Second parameter
   * @param param3 - Third parameter
   * @returns Operation result
   */
  handleMerchantFav(
    param1: unknown,
    param2: unknown,
    param3: unknown
  ): Promise<unknown> | unknown;

  /**
   * Get all merchant favorite IDs
   * @returns Array of merchant favorite IDs
   */
  getAllMerchantFavIds(): string[];

  /**
   * Set custom favorite data
   * @param data - Custom favorite data
   */
  setCustomFavData(data: CustomFavData): void;

  /**
   * Get custom favorite data
   * @returns Custom favorite data
   */
  getCustomFavData(): CustomFavData;

  /**
   * Request all group items
   * @param groupId - Group identifier
   * @returns Group items
   */
  requestAllGroupItems(groupId: string): Promise<GroupItem[]> | GroupItem[];

  /**
   * Upload model with material
   * @param params - Uploader parameters
   */
  uploaderModelWithMaterial(params: ModelUploaderParams): void;
}

export default FavoritePlugin;