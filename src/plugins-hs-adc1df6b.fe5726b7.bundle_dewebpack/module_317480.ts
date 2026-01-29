import { HSCore } from './635589';
import { PropertyBarHandler } from './186005';
import { ChangeParametricStairPropertyRequest } from './693131';
import { ReplaceParametricStairRequest } from './902064';
import { ChangeParametricStairPropertyCmd } from './980820';
import { changeParameticStairMaterialAdapter } from './911026';
import { CmdReplaceParametricStair } from './686774';
import { searchProducts } from './756379';

interface App {
  cmdManager: CommandManager;
  transManager: TransactionManager;
  selectionManager: SelectionManager;
  signalPropertyBarRefresh: Signal;
}

interface CommandManager {
  register(commands: Array<[string, any]>): void;
  createCommand(type: string, args: any[], options: Record<string, any>): Command;
  execute(command: Command): void;
}

interface TransactionManager {
  register(requests: Array<[string, any]>): void;
}

interface SelectionManager {
  selected(): any[] | undefined;
}

interface Signal {
  dispatch(): void;
}

interface Command {}

interface PluginMap {
  [key: string]: Plugin;
}

interface Plugin {
  signalPopulatePropertyBar?: Signal;
  signalUserRightsCompleted?: Signal;
}

interface CatalogPlugin extends Plugin {}

interface PropertyBarEvent {
  // Add specific properties based on actual usage
}

interface SearchProductsParams {
  categoriesIds: string;
  limit: number;
  order: string;
  sort: string;
  branch: string;
  treeId: string;
}

interface ProductItem {
  // Add specific product properties
}

interface SearchProductsResponse {
  data: {
    items: ProductItem[];
  };
}

interface StairEntity {
  // Add specific stair entity properties
}

declare const HSFPConstants: {
  PluginType: {
    Catalog: string;
    PropertyBar: string;
  };
  CommandType: {
    ChangeParametricStairProperty: string;
    ReplaceParametricStairMaterial: string;
    OpenIndependentPanel: string;
    ReplaceParametricStair: string;
  };
  RequestType: {
    ChangeParametricStairProperty: string;
    ReplaceParametricStair: string;
  };
};

declare const HSApp: {
  Config: {
    TENANT: string;
  };
  Util: {
    EventTrack: {
      instance(): EventTracker;
    };
    EventGroupEnum: {
      Propertybar: string;
    };
  };
};

interface EventTracker {
  track(group: string, eventName: string, data: Record<string, any>): void;
}

declare const LiveHint: {
  show(message: string, duration?: any, callback?: any, options?: { status: string }): void;
  hide(): void;
  statusEnum: {
    loading: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const u: {
  HSCatalog: {
    Manager: {
      instance(): CatalogManager;
    };
  };
};

interface CatalogManager {
  getProductBySeekId(seekId: string): Promise<any>;
}

export default class ParametricStairPlugin {
  signalHook: HSCore.Util.SignalHook | undefined;
  propertyBarHandler: PropertyBarHandler;
  app: App | undefined;
  catalogPlugin: CatalogPlugin | undefined;
  stairTypes: ProductItem[] | undefined;

  constructor() {
    this.propertyBarHandler = new PropertyBarHandler();
  }

  /**
   * Initialize the parametric stair plugin
   * @param context - Context object containing the app instance
   * @param plugins - Map of available plugins
   */
  init(context: { app: App }, plugins: PluginMap): void {
    this.app = context.app;
    this.catalogPlugin = plugins[HSFPConstants.PluginType.Catalog] as CatalogPlugin;
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.registerCommands();
    this.registerRequests();
    this.bindHooks(plugins);
  }

  /**
   * Uninitialize the plugin and cleanup resources
   */
  uninit(): void {
    this.unbindHooks();
  }

  /**
   * Bind signal hooks to other plugins
   * @param plugins - Map of available plugins
   */
  bindHooks(plugins: PluginMap): void {
    const propertyBarPlugin = plugins[HSFPConstants.PluginType.PropertyBar];
    const firstLoginPlugin = plugins['hsw.brand.ezhome.firstlogin.Plugin'];

    this.signalHook
      ?.listen(propertyBarPlugin.signalPopulatePropertyBar, this.onPopulatePropertyBar)
      .listen(firstLoginPlugin.signalUserRightsCompleted, this.onCheckPermissionsCompleted);
  }

  /**
   * Handle completion of permissions check
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
  onPopulatePropertyBar(event: PropertyBarEvent): void {
    this.propertyBarHandler.getProperty(event);
  }

  /**
   * Unbind all signal hooks
   */
  unbindHooks(): void {
    this.signalHook?.unlistenAll();
  }

  /**
   * Register plugin commands with the command manager
   */
  registerCommands(): void {
    const commandType = HSFPConstants.CommandType;
    this.app?.cmdManager.register([
      [commandType.ChangeParametricStairProperty, ChangeParametricStairPropertyCmd],
      [commandType.ReplaceParametricStairMaterial, commandType.OpenIndependentPanel, changeParameticStairMaterialAdapter],
      [commandType.ReplaceParametricStair, CmdReplaceParametricStair]
    ]);
  }

  /**
   * Register plugin requests with the transaction manager
   */
  registerRequests(): void {
    this.app?.transManager.register([
      [HSFPConstants.RequestType.ChangeParametricStairProperty, ChangeParametricStairPropertyRequest],
      [HSFPConstants.RequestType.ReplaceParametricStair, ReplaceParametricStairRequest]
    ]);
  }

  /**
   * Fetch available stair types from the catalog
   */
  fetchStairTypes(): void {
    this.stairTypes = [];

    const CATEGORY_ID_FP = '9f6cd653-c1e0-434b-b10a-97076baf1c05';
    const CATEGORY_ID_DEFAULT = 'cf42e541-46e6-4612-ac85-854d3f09f1fc';
    const TREE_ID_FP = '140841be-6e42-511a-b336-d9f6a17a5a3e';
    const TREE_ID_DEFAULT = 'f5a8155d-3340-35e4-9f57-68572d392bbd';
    const PRODUCT_LIMIT = 100;

    const isFpTenant = HSApp.Config.TENANT === 'fp';

    const searchParams: SearchProductsParams = {
      categoriesIds: isFpTenant ? CATEGORY_ID_FP : CATEGORY_ID_DEFAULT,
      limit: PRODUCT_LIMIT,
      order: 'desc',
      sort: 'default',
      branch: '',
      treeId: isFpTenant ? TREE_ID_FP : TREE_ID_DEFAULT
    };

    searchProducts(searchParams).then((response: SearchProductsResponse) => {
      const itemsLength = response?.data?.items?.length ?? 0;
      if (itemsLength > 0) {
        this.stairTypes?.push(...response.data.items);
      }
    });
  }

  /**
   * Get the list of available stair types
   * @returns Array of stair type product items
   */
  getStairTypes(): ProductItem[] | undefined {
    return this.stairTypes;
  }

  /**
   * Replace a stair entity with a new type
   * @param stairEntity - The stair entity to replace
   * @param seekId - The product seek ID to replace with
   */
  replaceStair(stairEntity: StairEntity, seekId: string): void {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Propertybar,
      'change_parametric_stair_type_event',
      { seekId }
    );

    LiveHint.show(
      ResourceManager.getString('carousel_panel_viewer_pick_all_loading'),
      undefined,
      null,
      { status: LiveHint.statusEnum.loading }
    );

    const LOADING_DELAY_MS = 200;

    setTimeout(() => {
      HSCore.Catalog.Manager.instance()
        .getProductBySeekId(seekId)
        .then(async (product: any) => {
          const cmdManager = this.app?.cmdManager;
          if (!cmdManager) return;

          const command = cmdManager.createCommand(
            HSFPConstants.CommandType.ReplaceParametricStair,
            [stairEntity, product],
            {}
          );
          cmdManager.execute(command);
          LiveHint.hide();
        });
    }, LOADING_DELAY_MS);
  }
}