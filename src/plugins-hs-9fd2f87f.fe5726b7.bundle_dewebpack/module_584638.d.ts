/**
 * Customized Parametric Modeling Plugin
 * 
 * Provides support for customized parametric modeling functionality including:
 * - Creating, editing, and deleting customized parametric model instances
 * - Moving, copying, rotating, and importing instances
 * - Property bar integration and catalog management
 * - Environment management and user permission handling
 */

import type { IPlugin } from 'HSApp.Plugin';
import type { App } from 'HSApp';
import type { CommandManager } from 'HSApp.Command';
import type { TransactionManager } from 'HSApp.Transaction';
import type { CatalogPlugin } from 'HSApp.Plugin.Catalog';
import type { ContextualToolsPlugin } from 'HSApp.Plugin.ContextualTools';
import type { PropertyBarPlugin } from 'HSApp.Plugin.PropertyBar';
import type { FirstLoginPlugin } from 'hsw.brand.ezhome.firstlogin.Plugin';
import type { CustomizedPMInstanceModel } from 'HSCore.Model';
import type { SignalHook } from 'HSCore.Util';

/**
 * Plugin configuration options
 */
interface PluginConfig {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** Array of plugin type dependencies */
  dependencies: string[];
}

/**
 * Dependencies map for the plugin
 */
interface PluginDependencies {
  [HSFPConstants.PluginType.ContextualTools]: ContextualToolsPlugin;
  [HSFPConstants.PluginType.PropertyBar]: PropertyBarPlugin;
  [HSFPConstants.PluginType.Catalog]: CatalogPlugin;
  [key: string]: unknown;
}

/**
 * Context for plugin activation
 */
interface ActivationContext {
  /** Application instance */
  app: App;
}

/**
 * Result of permission check
 */
interface EnterRightsResult {
  /** Whether the operation was successful */
  success: boolean;
  /** Available amount/credits */
  amount: number;
  /** Whether user can enter the environment */
  canEnter: boolean;
}

/**
 * Catalog position data
 */
interface CatalogPosition {
  /** Width of the catalog panel */
  width?: number;
  /** Whether catalog is shown */
  isShow?: boolean;
}

/**
 * Catalog expand event data
 */
interface CatalogExpandEvent {
  data: {
    position?: CatalogPosition;
  };
}

/**
 * Message data for communication with modeling iframe
 */
interface ModelingMessage {
  /** Message name/identifier */
  name: string;
  /** Action to perform */
  action: string;
  /** Additional message data */
  data: Record<string, unknown>;
}

/**
 * Property bar item configuration
 */
interface PropertyBarItem {
  /** Unique identifier */
  id: string;
  /** Parent item ID for nesting */
  parentId: string;
  /** Item type (button, label, etc.) */
  type: string;
  /** Display order */
  order: number;
  /** Display label (optional) */
  label?: string;
  /** Item-specific data */
  data?: PropertyBarItemData;
  /** Child items (optional) */
  items?: PropertyBarItem[];
}

/**
 * Property bar item data
 */
interface PropertyBarItemData {
  /** Button text */
  text?: string;
  /** Item title */
  title?: string;
  /** Click event handler */
  onClick?: () => void;
}

/**
 * Property bar populate event
 */
interface PopulatePropertyBarEvent {
  /** Array of property bar items to populate */
  data: PropertyBarItem[];
}

/**
 * Web CAD document reference
 */
interface WebCADDocument {
  /** Document UUID */
  docUUID: string;
}

/**
 * Customized Parametric Modeling Plugin
 * 
 * Main plugin class that manages customized parametric modeling functionality
 * including commands, transactions, UI integration, and environment management.
 */
declare class CustomizedPmPlugin extends IPlugin {
  /** Application instance */
  private app: App;
  
  /** Command manager instance */
  private cmdMgr: CommandManager;
  
  /** Transaction manager instance */
  private transMgr: TransactionManager;
  
  /** Plugin dependencies map */
  private dependencies: PluginDependencies;
  
  /** Catalog signal manager */
  private catalogSignalManager: HSApp.Catalog.CatalogSignalManager;
  
  /** Catalog manager */
  private catalogManager: HSApp.Catalog.Manager;
  
  /** Contextual tools plugin reference */
  private contextualToolsPlugin: ContextualToolsPlugin;
  
  /** Property bar plugin reference */
  private propertyBarPlugin: PropertyBarPlugin;
  
  /** First login plugin reference */
  private firstLoginPlugin: FirstLoginPlugin | null;

  /**
   * Creates a new CustomizedPmPlugin instance
   */
  constructor();

  /**
   * Called when plugin is activated
   * Registers commands, transactions, and sets up event listeners
   * 
   * @param context - Activation context containing app instance
   * @param dependencies - Map of plugin dependencies
   */
  onActive(context: ActivationContext, dependencies: PluginDependencies): void;

  /**
   * Called when plugin is deactivated
   * Cleanup resources and unregister listeners
   */
  onDeactive(): void;

  /**
   * Signal for DIY picking events
   */
  get signalPick(): Signal;

  /**
   * Highlights meshes in the 3D view
   * 
   * @param meshIds - Array of mesh IDs to highlight
   * @param highlightOptions - Highlight configuration options
   * @returns Highlight result or undefined
   */
  highlightMeshs(meshIds: string[], highlightOptions: unknown): unknown;

  /**
   * Initializes the plugin
   * Sets up message handler and DIY SDK
   */
  init(): void;

  /**
   * Uninitializes the plugin
   * Cleans up message handler
   */
  uninit(): void;

  /**
   * Uploads customized content to server
   */
  uploadCustomizedContent(): void;

  /**
   * Modifies the model type
   * @deprecated TODO: Implementation pending
   */
  modifyModelType(): void;

  /**
   * Called when a request is committed
   * @deprecated TODO: Implementation pending
   */
  onReqCommitted(): void;

  /**
   * Enters customized modeling mode
   * Checks permissions and creates command if allowed
   */
  enterCustomizedModel(): Promise<void>;

  /**
   * Checks if benefit checking is needed
   * 
   * @returns True if benefit check is required
   */
  needCheckBenefit(): boolean;

  /**
   * Gets the benefit amount for current user
   * 
   * @returns Benefit amount or -1 if not applicable
   */
  getBenefitAmount(): number;

  /**
   * Checks if user has rights to enter customized modeling
   * 
   * @returns Result object with permission status
   */
  checkEnterRights(): EnterRightsResult | Promise<EnterRightsResult>;

  /**
   * Pays the trial cost for using customized modeling
   * 
   * @returns Payment result
   */
  payTrialCost(): unknown;

  /**
   * Shows marketing modal dialog
   * 
   * @param modalType - Type of modal to show
   */
  showMarketModal(modalType: string): void;

  /**
   * Handles UI edit button click
   * Checks permissions and enters edit mode for selected model
   */
  onUIEditBtnClk(): Promise<void>;

  /**
   * Saves DIY content in pave mode
   */
  saveDIYInPave(): void;

  /**
   * Sets math test in DIY environment
   * 
   * @param param1 - First parameter
   * @param param2 - Second parameter
   * @param param3 - Third parameter
   */
  setMathTestInDIY(param1: unknown, param2: unknown, param3: unknown): void;

  /**
   * Handler for property bar population event
   * Adds customized modeling specific items to property bar
   * 
   * @param event - Property bar populate event
   */
  private _onPopulatePropertyBar(event: PopulatePropertyBarEvent): void;

  /**
   * Initializes save button item for property bar
   * 
   * @returns Property bar item configuration for save button
   */
  private _initPropertyBarSaveItemV2(): PropertyBarItem;

  /**
   * Initializes edit type property bar items
   * 
   * @param model - Customized PM instance model
   * @returns Array of property bar items
   */
  private _initEditTypeBarItemsV2(model: CustomizedPMInstanceModel): PropertyBarItem[];
}

/**
 * Plugin registration
 * Registers the CustomizedPmPlugin with the plugin manager
 */
export function registerPlugin(): void;

export default CustomizedPmPlugin;