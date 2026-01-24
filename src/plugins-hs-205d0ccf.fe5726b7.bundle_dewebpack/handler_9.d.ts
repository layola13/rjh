/**
 * Handler module for SparkPic image list management
 * Manages image browser lifecycle, user interface state, and plugin coordination
 */

import type React from 'react';

/**
 * Environment scope constants
 */
declare enum EnvScope {
  SparkPicImage = 'SparkPicImage'
}

/**
 * Environment type constants
 */
declare enum Environment {
  Default = 'default'
}

/**
 * Plugin type identifiers
 */
declare enum PluginType {
  Catalog = 'catalog',
  LeftMenu = 'leftMenu',
  UserInfo = 'userInfo',
  SparkPic = 'sparkPic'
}

/**
 * User tracking log group types
 */
declare enum LogGroupTypes {
  SparkPicAlbum = 'SparkPicAlbum'
}

/**
 * Log trigger type enumeration
 */
declare enum LogTriggerType {
  START = 'start',
  END = 'end'
}

/**
 * User tracking event parameters
 */
interface UserTrackEvent {
  /** Event description */
  description: string;
  /** Event group type */
  group: LogGroupTypes;
  /** Additional event parameters */
  param: {
    /** Current environment ID */
    env: string;
    [key: string]: unknown;
  };
}

/**
 * User tracking options
 */
interface UserTrackOptions {
  /** Type of trigger that initiated the event */
  triggerType: LogTriggerType;
}

/**
 * User information update payload
 */
interface UserInfoUpdate {
  [key: string]: unknown;
}

/**
 * Catalog plugin interface
 */
interface CatalogPlugin {
  /** Toggle catalog visibility */
  toggleCatalog(visible: boolean): void;
}

/**
 * Left menu plugin interface
 */
interface LeftMenuPlugin {
  /** Disable left menu interactions */
  disableLeftMenu(): void;
  /** Enable left menu interactions */
  enableLeftMenu(): void;
}

/**
 * User info plugin interface
 */
interface UserInfoPlugin {
  /** Set UI theme */
  setTheme(theme: 'light' | 'black'): void;
  /** Get signal for user info updates */
  getUpdateUserInfoSignal(): {
    dispatch(data: UserInfoUpdate): void;
  };
}

/**
 * SparkPic plugin interface
 */
interface SparkPicPlugin {
  /** Hide application container */
  hideAppContainer(): void;
  /** Show application container */
  showAppContainer(): void;
}

/**
 * Plugin manager interface
 */
interface PluginManager {
  /** Retrieve a plugin by type */
  getPlugin(pluginType: PluginType): SparkPicPlugin | null;
}

/**
 * Selection manager interface
 */
interface SelectionManager {
  /** Clear all selections */
  unselectAll(): void;
}

/**
 * Environment manager interface
 */
interface EnvironmentManager {
  /** Set the active environment scope */
  setActiveScope?(scope: string): void;
}

/**
 * User tracking logger interface
 */
interface UserTrackLogger {
  /** Push a tracking event */
  push(trackId: string, event: UserTrackEvent, options: UserTrackOptions): void;
}

/**
 * Main application interface
 */
interface App {
  /** Active environment identifier */
  activeEnvironmentId: string;
  /** Environment manager instance */
  environmentManager: EnvironmentManager;
  /** Plugin manager instance */
  pluginManager: PluginManager;
  /** Selection manager instance */
  selectionManager: SelectionManager;
  /** User tracking logger instance */
  userTrackLogger: UserTrackLogger;
}

/**
 * Global HSApp namespace
 */
declare namespace HSApp {
  class App {
    static getApp(): App;
  }
}

/**
 * Plugin initialization map
 */
interface PluginMap {
  [PluginType.Catalog]: CatalogPlugin;
  [PluginType.LeftMenu]: LeftMenuPlugin;
  [PluginType.UserInfo]: UserInfoPlugin;
  [key: string]: unknown;
}

/**
 * Image list component ref interface
 */
interface ImageListRef {
  /** Set default task for image list */
  setDefaultTask(task: unknown): void;
  /** Enable or disable view */
  disableView(disabled: boolean): void;
}

/**
 * Image list app component props
 */
interface AppProps {
  /** Callback to quit image list */
  quitImageList(): void;
  /** Component ref */
  ref: React.RefObject<ImageListRef>;
}

/**
 * Image browser lite component props
 */
interface ImageBrowserLiteProps {
  /** Click handler for opening image list */
  handleClick(task: unknown): void;
  [key: string]: unknown;
}

/**
 * Main handler class for SparkPic image list functionality
 * Coordinates plugins, manages UI state, and handles user tracking
 */
export declare class Handler {
  /** Main application instance */
  private _app: App;
  
  /** Catalog plugin reference */
  private _catalogPlugin: CatalogPlugin | undefined;
  
  /** Left menu plugin reference */
  private _menuPlugin: LeftMenuPlugin | undefined;
  
  /** User info plugin reference */
  private _userInfoPlugin: UserInfoPlugin | undefined;
  
  /** React ref for image list component */
  imageListRef: React.RefObject<ImageListRef> | undefined;

  constructor();

  /**
   * Initialize the handler with required plugins
   * @param plugins - Map of plugin instances
   */
  init(plugins: PluginMap): void;

  /**
   * Cleanup when handler is deactivated
   * Unmounts React components and removes DOM elements
   */
  onDeactive(): void;

  /**
   * Open the image list view
   * - Sets environment scope
   * - Hides/shows appropriate UI elements
   * - Logs user tracking event
   * @param task - Task data to pass to image list
   */
  openImageList(task: unknown): void;

  /**
   * Exit the image list view
   * - Restores previous UI state
   * - Re-enables menus
   * - Logs user tracking event
   */
  quitImageList(): void;

  /**
   * Create a lite version of the image browser component
   * @param props - Component props (excluding handleClick)
   * @returns React element for ImageBrowserLite
   */
  imageBrowserLite(props: Omit<ImageBrowserLiteProps, 'handleClick'>): React.ReactElement;
}