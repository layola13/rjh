/**
 * Parametric Stair Plugin Module
 * Manages parametric stair operations including property editing, material replacement, and type switching
 */

import { PropertyBarHandler } from './PropertyBarHandler';
import { HSCore } from './HSCore';
import { ChangeParametricStairPropertyCmd } from './commands/ChangeParametricStairProperty';
import { changeParameticStairMaterialAdapter } from './adapters/MaterialAdapter';
import { CmdReplaceParametricStair } from './commands/ReplaceParametricStair';
import { ChangeParametricStairPropertyRequest } from './requests/ChangeParametricStairProperty';
import { ReplaceParametricStairRequest } from './requests/ReplaceParametricStair';

/**
 * Application instance interface
 */
export interface IApplication {
  /** Selection manager for tracking selected objects */
  selectionManager: ISelectionManager;
  /** Command manager for executing operations */
  cmdManager: ICommandManager;
  /** Transaction/Request manager */
  transManager: ITransactionManager;
  /** Signal dispatched when property bar needs refresh */
  signalPropertyBarRefresh: ISignal<void>;
}

/**
 * Selection manager interface
 */
export interface ISelectionManager {
  /** Returns array of currently selected objects */
  selected(): unknown[];
}

/**
 * Command manager interface
 */
export interface ICommandManager {
  /** Register command handlers */
  register(commands: Array<[string, unknown]>): void;
  /** Create a command instance */
  createCommand(type: string, args: unknown[], options: Record<string, unknown>): ICommand;
  /** Execute a command */
  execute(command: ICommand): void;
}

/**
 * Transaction manager interface
 */
export interface ITransactionManager {
  /** Register request handlers */
  register(requests: Array<[string, unknown]>): void;
}

/**
 * Command instance interface
 */
export interface ICommand {
  execute(): void;
  undo(): void;
}

/**
 * Signal interface for event dispatching
 */
export interface ISignal<T> {
  dispatch(data?: T): void;
}

/**
 * Plugin context provided during initialization
 */
export interface IPluginContext {
  /** The main application instance */
  app: IApplication;
}

/**
 * Collection of all registered plugins
 */
export interface IPluginRegistry {
  /** Property bar plugin for UI property editing */
  [HSFPConstants.PluginType.PropertyBar]?: IPropertyBarPlugin;
  /** Catalog plugin for product management */
  [HSFPConstants.PluginType.Catalog]?: ICatalogPlugin;
  /** First login plugin for permission checks */
  ['hsw.brand.ezhome.firstlogin.Plugin']?: IFirstLoginPlugin;
}

/**
 * Property bar plugin interface
 */
export interface IPropertyBarPlugin {
  /** Signal emitted when property bar needs to be populated */
  signalPopulatePropertyBar: ISignal<IPropertyBarEvent>;
}

/**
 * First login plugin interface
 */
export interface IFirstLoginPlugin {
  /** Signal emitted when user rights check is completed */
  signalUserRightsCompleted: ISignal<void>;
}

/**
 * Catalog plugin interface
 */
export interface ICatalogPlugin {
  // Add catalog plugin methods as needed
}

/**
 * Property bar event data
 */
export interface IPropertyBarEvent {
  /** Type of property being edited */
  propertyType?: string;
  /** Target object for property editing */
  target?: unknown;
}

/**
 * Product search parameters
 */
export interface IProductSearchParams {
  /** Comma-separated category IDs to search within */
  categoriesIds: string;
  /** Maximum number of results to return */
  limit: number;
  /** Sort order (asc/desc) */
  order: 'asc' | 'desc';
  /** Sort field */
  sort: string;
  /** Branch identifier */
  branch: string;
  /** Tree ID for hierarchical navigation */
  treeId: string;
}

/**
 * Product search response
 */
export interface IProductSearchResponse {
  data: {
    /** Array of product items */
    items: IStairTypeProduct[];
  };
}

/**
 * Stair type product data
 */
export interface IStairTypeProduct {
  /** Unique product identifier (seekId) */
  id: string;
  /** Product display name */
  name: string;
  /** Product category */
  category?: string;
  /** Additional product metadata */
  [key: string]: unknown;
}

/**
 * Main Parametric Stair Plugin Class
 * Handles parametric stair functionality including property editing, replacement, and material changes
 */
export default class ParametricStairPlugin {
  /** Signal hook manager for plugin event subscriptions */
  signalHook: HSCore.Util.SignalHook | undefined;
  
  /** Handler for property bar interactions */
  propertyBarHandler: PropertyBarHandler;
  
  /** Reference to main application instance */
  app: IApplication | undefined;
  
  /** Reference to catalog plugin */
  catalogPlugin: ICatalogPlugin | undefined;
  
  /** Cached array of available stair types */
  stairTypes: IStairTypeProduct[] | undefined;

  constructor() {
    this.propertyBarHandler = new PropertyBarHandler();
  }

  /**
   * Initialize the plugin
   * @param context - Plugin initialization context containing app instance
   * @param plugins - Registry of all available plugins
   */
  init(context: IPluginContext, plugins: IPluginRegistry): void {
    this.app = context.app;
    this.catalogPlugin = plugins[HSFPConstants.PluginType.Catalog];
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.registerCommands();
    this.registerRequests();
    this.bindHooks(plugins);
  }

  /**
   * Cleanup plugin resources and unbind event listeners
   */
  uninit(): void {
    this.unbindHooks();
  }

  /**
   * Bind event listeners to other plugins
   * @param plugins - Registry of all available plugins
   */
  bindHooks(plugins: IPluginRegistry): void {
    const propertyBarPlugin = plugins[HSFPConstants.PluginType.PropertyBar];
    const firstLoginPlugin = plugins['hsw.brand.ezhome.firstlogin.Plugin'];
    
    this.signalHook
      ?.listen(propertyBarPlugin?.signalPopulatePropertyBar, this.onPopulatePropertyBar)
      .listen(firstLoginPlugin?.signalUserRightsCompleted, this.onCheckPermissionsCompleted);
  }

  /**
   * Handle completion of user permissions check
   * Refreshes property bar if objects are selected
   */
  onCheckPermissionsCompleted(): void {
    const selected = this.app?.selectionManager.selected();
    if ((selected?.length ?? 0) > 0) {
      this.app?.signalPropertyBarRefresh.dispatch();
    }
  }

  /**
   * Handle property bar population event
   * @param event - Property bar event data
   */
  onPopulatePropertyBar(event: IPropertyBarEvent): void {
    this.propertyBarHandler.getProperty(event);
  }

  /**
   * Unbind all event listeners
   */
  unbindHooks(): void {
    this.signalHook?.unlistenAll();
  }

  /**
   * Register command handlers with the command manager
   */
  registerCommands(): void {
    const commandTypes = HSFPConstants.CommandType;
    this.app?.cmdManager.register([
      [commandTypes.ChangeParametricStairProperty, ChangeParametricStairPropertyCmd],
      [commandTypes.ReplaceParametricStairMaterial, commandTypes.OpenIndependentPanel, changeParameticStairMaterialAdapter],
      [commandTypes.ReplaceParametricStair, CmdReplaceParametricStair]
    ]);
  }

  /**
   * Register request handlers with the transaction manager
   */
  registerRequests(): void {
    this.app?.transManager.register([
      [HSFPConstants.RequestType.ChangeParametricStairProperty, ChangeParametricStairPropertyRequest],
      [HSFPConstants.RequestType.ReplaceParametricStair, ReplaceParametricStairRequest]
    ]);
  }

  /**
   * Fetch available stair types from catalog
   * Retrieves products based on tenant-specific category and tree IDs
   */
  fetchStairTypes(): void {
    this.stairTypes = [];
    
    const isFpTenant = HSApp.Config.TENANT === 'fp';
    const searchParams: IProductSearchParams = {
      categoriesIds: isFpTenant 
        ? '9f6cd653-c1e0-434b-b10a-97076baf1c05' 
        : 'cf42e541-46e6-4612-ac85-854d3f09f1fc',
      limit: 100,
      order: 'desc',
      sort: 'default',
      branch: '',
      treeId: isFpTenant 
        ? '140841be-6e42-511a-b336-d9f6a17a5a3e' 
        : 'f5a8155d-3340-35e4-9f57-68572d392bbd'
    };

    // Assuming v.default is a product search service
    const productSearchService = v.default;
    productSearchService.searchProducts(searchParams).then((response: IProductSearchResponse) => {
      const items = response?.data?.items;
      if ((items?.length ?? 0) > 0) {
        this.stairTypes?.push(...items);
      }
    });
  }

  /**
   * Get cached stair types
   * @returns Array of available stair type products
   */
  getStairTypes(): IStairTypeProduct[] | undefined {
    return this.stairTypes;
  }

  /**
   * Replace existing stair with a new type
   * @param targetStair - The stair object to be replaced
   * @param seekId - Unique identifier of the new stair type product
   */
  replaceStair(targetStair: unknown, seekId: string): void {
    // Track analytics event
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Propertybar,
      'change_parametric_stair_type_event',
      { seekId }
    );

    // Show loading indicator
    LiveHint.show(
      ResourceManager.getString('carousel_panel_viewer_pick_all_loading'),
      undefined,
      null,
      { status: LiveHint.statusEnum.loading }
    );

    // Delay execution to allow UI update
    const LOADING_DELAY_MS = 200;
    setTimeout(() => {
      HSCatalog.Manager.instance()
        .getProductBySeekId(seekId)
        .then(async (product: unknown) => {
          const commandManager = this.app?.cmdManager;
          const replaceCommand = commandManager?.createCommand(
            HSFPConstants.CommandType.ReplaceParametricStair,
            [targetStair, product],
            {}
          );
          
          if (replaceCommand) {
            this.app?.cmdManager.execute(replaceCommand);
          }
          
          LiveHint.hide();
        });
    }, LOADING_DELAY_MS);
  }
}