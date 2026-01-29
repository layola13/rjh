import HSCore from '@/core';
import HSFPConstants from '@/constants';
import HSCatalog from '@/catalog';
import HSApp from '@/app';

const { RequestType } = HSFPConstants;
const { PluginType } = HSFPConstants;

interface IApp {
  cmdManager: any;
  selectionManager: ISelectionManager;
  transManager: ITransactionManager;
  catalogManager: any;
  signalContextualtoolRefresh: ISignal;
  signalPropertyBarRefresh: ISignal;
  switchTo3DView(): void;
  getActive3DView(): any;
  activeView: any;
}

interface ISelectionManager {
  selected(includeMetadata?: boolean): any[];
  unselect(entity: any): void;
  select(entity: any): void;
  signalSelectionChanged: ISignal;
}

interface ITransactionManager {
  register(requestType: string, handler: any): void;
  createRequest(requestType: string, args: any[]): any;
  commit(request: any): void;
}

interface ISignal {
  dispatch(...args: any[]): void;
  listen(callback: Function, context?: any): ISignal;
  unlisten(callback: Function, context?: any): void;
}

interface IPlugin {
  signalPopulatePropertyBar?: ISignal;
  signalRetiringStatusBar?: ISignal;
  signalItemClicked?: ISignal;
  signalPopulateCustomizedItems?: ISignal;
  signalIndependentHidden?: ISignal;
  openIndependentPanel(config: any): void;
  getStatusBarControlById(id: string): any;
}

interface IPluginMap {
  [PluginType.ContextualTools]: IPlugin;
  [PluginType.PropertyBar]: IPlugin;
  [PluginType.MaterialImage]: IMaterialImagePlugin;
  [PluginType.Catalog]: IPlugin;
  [PluginType.LeftMenu]: IPlugin;
}

interface IMaterialImagePlugin extends IPlugin {
  getMaterialUrlWithSeamFiller(
    textureURI: string,
    seamWidth: number,
    seamColor: string,
    aspectRatio: number
  ): Promise<string>;
}

interface IMaterialData {
  seekId: string;
  seamFillerSupported?: boolean;
  tileSize_x?: number;
  tileSize_y?: number;
  defaultTextureURI?: string;
  textureURI?: string;
  seamWidth?: number;
  seamColor?: string;
}

interface ICatalogItem {
  productType: string;
  seekId?: string;
  categories?: string[];
}

interface IPropertyBarEvent {
  data: {
    xInsertCollection(index: number, items: any[]): void;
  };
}

interface IRightMenuEvent {
  data: {
    customizedItems: any[];
  };
}

interface ICatalogClickEvent {
  data: ICatalogItem;
}

interface IApplyMaterialRequest {
  // Define request structure
}

class RoofObstaclePlugin {
  private _signalHook: any;
  private _app!: IApp;
  private _cmdManager: any;
  private _selectionManager!: ISelectionManager;
  private _transManager!: ITransactionManager;
  private _catalogManager: any;
  private _contextToolsPlugin!: IPlugin;
  private _propertyBarPlugin!: IPlugin;
  private _materialImagePlugin!: IMaterialImagePlugin;
  private _catalogPlugin!: IPlugin;
  private _menuPlugin!: IPlugin;
  private _ui: any;
  private _entities: HSCore.Model.Beam[];
  private _commands: Map<string, any>;
  private _originalMateriapMaps: Map<string, any>;
  private _catalogItemClickHandler: ((item: ICatalogItem) => void) | undefined;
  private _temphandler: ((item: ICatalogItem) => void) | undefined;

  constructor() {
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._entities = [];
    this._commands = new Map();
    this._originalMateriapMaps = new Map();
    this._catalogItemClickHandler = undefined;
  }

  public init(context: { app: IApp }, plugins: IPluginMap): void {
    this._app = context.app;
    this._cmdManager = this._app.cmdManager;
    this._selectionManager = this._app.selectionManager;
    this._transManager = this._app.transManager;
    this._catalogManager = this._app.catalogManager;

    this._transManager.register(
      RequestType.ApplyMaterialToRoofObstacleRequest,
      this.createApplyMaterialHandler()
    );

    this._contextToolsPlugin = plugins[PluginType.ContextualTools];
    this._propertyBarPlugin = plugins[PluginType.PropertyBar];
    this._materialImagePlugin = plugins[PluginType.MaterialImage];
    this._catalogPlugin = plugins[PluginType.Catalog];
    this._menuPlugin = plugins[PluginType.LeftMenu];

    this._signalHook
      .listen(
        this._propertyBarPlugin.signalPopulatePropertyBar,
        this._onPopulatePropertyBarV2
      )
      .listen(
        this._contextToolsPlugin.signalRetiringStatusBar,
        this._onRetiringStatusBar
      )
      .listen(
        this._selectionManager.signalSelectionChanged,
        this._onSelectionChanged
      )
      .listen(
        this._catalogPlugin.signalItemClicked,
        this._onCatalogItemClick
      )
      .listen(
        this._menuPlugin.signalPopulateCustomizedItems,
        this._onPopulateRightmenuCustomized
      );

    this._ui = this.createUI();
  }

  public uninit(): void {
    this._signalHook.unlistenAll();
  }

  public refreshStatusBar(): void {
    this._app.signalContextualtoolRefresh.dispatch();
  }

  public refreshPropertyBarV2(): void {
    this._app.signalPropertyBarRefresh.dispatch();
  }

  public getMaterialSeekId(): string {
    if (
      this._entities?.length &&
      this._entities[0] instanceof HSCore.Model.Beam
    ) {
      const materialDataMap = this._entities[0].getMaterialData();
      const materialDataArray: IMaterialData[] = [];

      materialDataMap.forEach((data: IMaterialData) => {
        materialDataArray.push(data);
      });

      return materialDataArray[0]?.seekId ?? '';
    }

    return '';
  }

  public onObstacleMaterialClicked(): void {
    const categoryType = HSCatalog.CategoryTypeEnum.ext_material;
    this._catalogItemClickHandler = this.onObstacleMaterialSelected;

    if (
      this._entities?.length &&
      this._entities[0] instanceof HSCore.Model.Beam
    ) {
      const materialDataMap = this._entities[0].getMaterialData();
      const materialDataArray: IMaterialData[] = [];

      materialDataMap.forEach((data: IMaterialData) => {
        materialDataArray.push(data);
      });

      const firstMaterial = materialDataArray[0];

      this._app.catalogManager
        .getProductBySeekId(firstMaterial.seekId)
        .then((product: ICatalogItem) => {
          this._catalogPlugin.openIndependentPanel({
            types: categoryType,
            undefined: undefined,
            query: {
              seekId: firstMaterial.seekId,
              categoryId:
                product?.categories?.length ? product.categories[0] : '',
            },
          });
        })
        .catch(() => {
          this._catalogPlugin.openIndependentPanel({
            types: categoryType,
          });
        });
    }

    this._catalogPlugin.signalIndependentHidden?.listen(
      this._onIndependentHidden,
      this
    );
  }

  private _onCatalogItemClick(event: ICatalogClickEvent): void {
    const catalogItem = event.data;

    if (!this._catalogItemClickHandler) {
      return;
    }

    this._temphandler = this._catalogItemClickHandler;
    this._entities = this._app.selectionManager
      .selected()
      .filter((entity: any) => entity instanceof HSCore.Model.Beam);

    if (this._entities.length > 0) {
      this._temphandler(catalogItem);
    }

    this._entities.forEach((entity: HSCore.Model.Beam) => {
      this._app.selectionManager.unselect(entity);
      this._app.selectionManager.select(entity);
    });

    this.refreshStatusBar();
  }

  private onObstacleMaterialSelected = (catalogItem: ICatalogItem): void => {
    if (catalogItem.productType !== HSCatalog.ProductTypeEnum.Material) {
      return;
    }

    this._app.switchTo3DView();

    if (!this._app.getActive3DView()) {
      return;
    }

    this._entities.forEach((beam: HSCore.Model.Beam) => {
      const newMaterialMap = new Map();
      const defaultMaterialData = HSCore.Material.Util.getDefaultCustomizedModelMaterialData();
      const materialData = HSCore.Material.Util.getMaterialDataObjectFromCatalogMeta(catalogItem);

      const applyMaterial = (): void => {
        defaultMaterialData.setMaterialData(materialData);

        beam.getGraphicsData().faces.forEach((face: any) => {
          if (!beam.isMoldingData(face)) {
            newMaterialMap.set(face.meshKey, defaultMaterialData);
          }
        });

        const currentMaterialMap = beam.getMaterialData();

        if (
          !HSCore.Util.Object.isSameMap(
            currentMaterialMap,
            newMaterialMap,
            (a: any, b: any) => {
              if (!a || !b) {
                return a === b;
              }

              if (typeof a.equals === 'function' || typeof b.equals === 'function') {
                return a.equals(b);
              }

              return JSON.stringify(a) === JSON.stringify(b);
            }
          )
        ) {
          const request = this._transManager.createRequest(
            RequestType.ApplyMaterialToRoofObstacleRequest,
            [beam, currentMaterialMap, newMaterialMap]
          );
          this._transManager.commit(request);
        }

        this.refreshStatusBar();
      };

      if (materialData.seamFillerSupported) {
        const aspectRatio = (materialData.tileSize_x ?? 1) / (materialData.tileSize_y ?? 1);

        this._materialImagePlugin
          .getMaterialUrlWithSeamFiller(
            materialData.defaultTextureURI ?? materialData.textureURI ?? '',
            materialData.seamWidth ?? 0,
            materialData.seamColor ?? '',
            aspectRatio
          )
          .then((textureUrl: string) => {
            if (materialData.defaultTextureURI === undefined) {
              materialData.defaultTextureURI = materialData.textureURI;
            }
            materialData.textureURI = textureUrl;
            applyMaterial();
          });
      } else {
        applyMaterial();
      }
    });
  };

  private _onSelectionChanged = (): void => {
    const selectedBeamIds = this._selectionManager
      .selected()
      .filter((entity: any) => entity instanceof HSCore.Model.Beam)
      .map((beam: HSCore.Model.Beam) => beam.ID);

    this._commands.forEach((command: any, entityId: string) => {
      if (!selectedBeamIds.includes(entityId)) {
        this._cmdManager.complete(command);
        this._commands.delete(entityId);
      }
    });
  };

  private _onIndependentHidden = (): void => {
    const materialButton = this._contextToolsPlugin.getStatusBarControlById(
      'obstacleMaterialButton'
    );

    if (materialButton) {
      materialButton.update({
        isActive: false,
      });
    }

    this._catalogPlugin.signalIndependentHidden?.unlisten(
      this._onIndependentHidden,
      this
    );
  };

  private _onRetiringStatusBar = (): void => {
    this._signalHook.unlisten(
      this._contextToolsPlugin.signalRetiringStatusBar
    );
  };

  private _onPopulatePropertyBarV2 = (event: IPropertyBarEvent): void => {
    const propertyBarData = event.data;
    const app = HSApp.App.getApp();
    const selectedItems = app.selectionManager.selected(false);

    this._entities = (selectedItems ?? [])
      .map((item: any) => item.entity)
      .filter((entity: any) => entity instanceof HSCore.Model.Beam);

    if (this._entities.length === 0) {
      return;
    }

    const activeView = app.activeView;
    const propertyBarItems = this._ui.initPropertyBarItemsV2(
      this._entities[0],
      activeView
    );

    propertyBarData.xInsertCollection(1, propertyBarItems);
  };

  private _onPopulateRightmenuCustomized = (event: IRightMenuEvent): void => {
    const customizedItems = event.data.customizedItems;
    const roofObstacles = this._app.selectionManager
      .selected()
      .filter((entity: any) => HSCore.Util.Content.isRoofObstacle(entity));

    if (!roofObstacles || roofObstacles.length < 1) {
      return;
    }

    const rightMenuItems = this._ui.initRightMenuItems(roofObstacles[0]);
    customizedItems.push(...rightMenuItems);
  };

  private createApplyMaterialHandler(): any {
    // Implementation depends on imported module
    return undefined;
  }

  private createUI(): any {
    // Implementation depends on imported UI class
    return undefined;
  }
}

export default RoofObstaclePlugin;