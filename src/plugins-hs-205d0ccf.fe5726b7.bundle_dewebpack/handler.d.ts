/**
 * Handler module for managing share case functionality
 * Original Module ID: 992972
 */

/**
 * Interface for the Persistence plugin
 */
interface PersistencePlugin {
  /**
   * Execute an action after checking the saving status
   * @param callback - Callback function that receives the save status
   */
  execteActionWithCheckSavingStatus(callback: (status: boolean) => void): void;
  
  /**
   * Save the current state
   * @returns Promise that resolves with the save status
   */
  save(): Promise<boolean>;
}

/**
 * Interface for the ShareCase plugin
 */
interface ShareCasePlugin {
  /**
   * Display the share case dialog
   */
  showShareCaseDialog(): void;
}

/**
 * Interface for the PageHeader plugin
 */
interface PageHeaderPlugin {
  /**
   * Update the state of a specific property
   * @param property - The property to update
   * @param state - The new state object
   */
  updateState(property: string, state: Record<string, unknown>): void;
}

/**
 * Interface for the Plugin Manager
 */
interface PluginManager {
  /**
   * Get a plugin instance by type
   * @param pluginType - The type of plugin to retrieve
   */
  getPlugin(pluginType: string): PersistencePlugin | ShareCasePlugin | PageHeaderPlugin;
}

/**
 * Interface for Application Parameters
 */
interface AppParams {
  /**
   * The current asset ID, if any
   */
  assetId?: string;
}

/**
 * Interface for the HSApp Application instance
 */
interface HSAppInstance {
  /**
   * Plugin manager for accessing various plugins
   */
  pluginManager: PluginManager;
  
  /**
   * Application parameters
   */
  appParams: AppParams;
}

/**
 * Handler class for managing share case views and operations
 */
export declare class Handler {
  /**
   * Create a new Handler instance
   */
  constructor();

  /**
   * Hide the share case view by unmounting the React component
   * Safely handles errors if the component is not mounted
   */
  hideShareCaseView(): void;

  /**
   * Show the share case view by rendering the React component
   * into the popup container element
   */
  showShareCaseView(): void;

  /**
   * Initiate the share case workflow
   * 
   * Behavior depends on the tenant configuration:
   * - For "fp" tenant: Updates the PageHeader plugin state
   * - For other tenants: Checks save status and shows share dialog
   * 
   * If an assetId exists, checks saving status before sharing.
   * If no assetId, saves first then shows the share dialog.
   */
  shareCase(): void;
}