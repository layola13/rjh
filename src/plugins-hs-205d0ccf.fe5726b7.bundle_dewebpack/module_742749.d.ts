import { RemindSignalHandle } from './RemindSignalHandle';

/**
 * Signal data structure for catalog operations
 */
interface SignalData {
  /** Type of the operation (e.g., 'search', 'upload') */
  type?: string;
  /** Log type for analytics */
  logType?: string;
  /** Type of search performed */
  searchType?: string;
  /** Target type for the operation */
  targetType?: string;
  /** Submenu information */
  subMenu?: {
    /** Unique identifier for the submenu */
    id: string;
  };
  /** Selected category information */
  selectCategory?: {
    /** Unique identifier for the category */
    id: string;
  };
}

/**
 * Signal event structure
 */
interface SignalEvent<T = SignalData> {
  /** Event data payload */
  data?: T;
}

/**
 * Signal object returned by getSignal methods
 */
interface Signal<T = SignalData> {
  /** Signal trigger or observable */
  (...args: any[]): void;
}

/**
 * Remind action result
 */
interface RemindAction {
  /** Unique key identifying the remind action */
  key: string;
}

/**
 * Signal list item configuration
 */
interface SignalListItem<T = SignalData> {
  /**
   * Gets the signal to listen to
   * @returns The signal object or undefined if unavailable
   */
  getSignal(): Signal<T> | undefined;

  /**
   * Listens to signal events and returns appropriate remind action
   * @param event - The signal event to process
   * @returns Remind action object or undefined if no action needed
   */
  listen(event?: SignalEvent<T>): RemindAction | undefined;
}

/**
 * Plugin interface for catalog operations
 */
interface CatalogPlugin {
  /** Signal emitted when upload model is clicked */
  signalUploadModelClick?: Signal;
}

/**
 * Plugin manager interface
 */
interface PluginManager {
  /**
   * Retrieves a plugin by type
   * @param pluginType - Type identifier for the plugin
   * @returns The requested plugin or undefined
   */
  getPlugin(pluginType: string): CatalogPlugin | undefined;
}

/**
 * Application instance interface
 */
interface AppInstance {
  /** Plugin manager for the application */
  pluginManager?: PluginManager;
}

/**
 * Catalog signal manager singleton
 */
interface CatalogSignalManager {
  /** Signal emitted when catalog logs an event */
  signalCatalogToLog?: Signal;
  /** Signal emitted when a menu item is clicked */
  signalMenuItemClick?: Signal;
}

/**
 * Catalog module interface
 */
interface CatalogModule {
  CatalogSignalManager: {
    /**
     * Gets the singleton instance of catalog signal manager
     * @returns The catalog signal manager instance
     */
    getInstance(): CatalogSignalManager;
  };
}

/**
 * Global HSApp namespace
 */
declare global {
  const HSApp: {
    App: {
      /**
       * Gets the current application instance
       * @returns The app instance or undefined
       */
      getApp(): AppInstance | undefined;
    };
    Catalog?: CatalogModule;
  };

  const HSFPConstants: {
    PluginType: {
      /** Catalog plugin type identifier */
      Catalog: string;
    };
  };
}

/**
 * Extended RemindSignalHandle class for catalog-specific signal handling
 * 
 * This class manages various catalog-related signals including:
 * - Model upload actions
 * - Model search operations
 * - Menu item interactions
 * - Category selections
 */
export default class CatalogRemindSignalHandle extends RemindSignalHandle {
  /**
   * Returns the list of signal configurations to monitor
   * 
   * @returns Array of signal list items with their listeners
   */
  getRemindSignalList(): SignalListItem[];
}