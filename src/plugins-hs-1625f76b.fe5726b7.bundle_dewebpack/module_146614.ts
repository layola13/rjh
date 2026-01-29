interface PluginContext {
  app: any;
  context: any;
  dependencies: Record<string, any>;
}

interface LeftMenuItem {
  label: string;
  id: string;
  disable: boolean;
  src: string;
  order: number;
  onClick: () => void;
}

interface MaterialSearchParams {
  text?: string;
  offset?: number;
  folderId?: string;
  isInFolder?: boolean;
}

interface MaterialListResult {
  items: any[];
  total: number;
}

interface ModelPartMaterial {
  modelPartId: string;
  materialList: any[];
}

interface ProductOrderResult {
  modelId: string;
  modelPartMaterialList: ModelPartMaterial[];
}

interface DocumentOpeningData {
  productsMap?: Map<string, any>;
}

interface CatalogItemClickData {
  meta?: any;
  data?: any;
}

interface CommandData {
  cmd?: {
    type: string;
  };
}

export default class ContentPartMaterialReplaceHandler {
  app: any = undefined;
  singleRoom: any = undefined;
  selectedEntity: any = undefined;
  signalHook: any = undefined;
  fromEnvironmentId: string | undefined = undefined;
  menuPlugin: any = undefined;
  catalogPlugin: any = undefined;
  toolBarPlugin: any = undefined;
  singleRoomPlugin: any = undefined;
  initContentPartMaterialMap: Map<string, ModelPartMaterial[]> = new Map();
  selectedMeshName: string | undefined = undefined;
  currentMaterialList: MaterialListResult | undefined = undefined;
  folderTreeList: any[] = [];

  constructor() {
    this.signalHook = new HSCore.Util.SignalHook(this);
  }

  init(pluginContext: PluginContext): void {
    this.app = pluginContext.context.app;
    this.singleRoom = undefined;
    this.fromEnvironmentId = undefined;

    const dependencies = pluginContext.dependencies;
    this.menuPlugin = dependencies[HSFPConstants.PluginType.LeftMenu];
    this.singleRoomPlugin = dependencies[HSFPConstants.PluginType.SingleRoom];
    this.catalogPlugin = dependencies[HSFPConstants.PluginType.Catalog];
    this.toolBarPlugin = dependencies[HSFPConstants.PluginType.Toolbar];

    this.registerEnvironments(pluginContext);
    this.listenSignalHook();
  }

  listenSignalHook(): void {
    this.signalHook
      .listen(this.menuPlugin.signalPopulateCustomizedItems, this.onPopulateLeftMenu)
      .listen(this.catalogPlugin.signalItemClicked, this.onCatalogItemClick)
      .listen(this.catalogPlugin.signalIndependentHidden, this.onCatalogItemClick)
      .listen(this.app.signalDocumentOpening, this.onDocumentOpening)
      .listen(this.app.signalDocumentOpened, this.changeMirrorFloorplanStatus)
      .listen(this.app.cmdManager.signalCommandTerminated, this.commandTerminated)
      .listen(this.app.transManager.signalUndone, this.changeMirrorFloorplanStatus)
      .listen(this.app.transManager.signalRedone, this.changeMirrorFloorplanStatus);
  }

  registerEnvironments(pluginContext: PluginContext): void {
    const { context, dependencies } = pluginContext;
    const contextualToolsPlugin = dependencies[HSFPConstants.PluginType.ContextualTools];
    const toolbarPlugin = dependencies[HSFPConstants.PluginType.Toolbar];
    const resizeWidgetPlugin = dependencies[HSFPConstants.PluginType.ResizeWidget];
    const viewSwitchPlugin = dependencies[HSFPConstants.PluginType.ViewSwitch];
    const pageheaderPlugin = dependencies[HSFPConstants.PluginType.PageHeader];
    const rightPropertyBarPlugin = dependencies[HSFPConstants.PluginType.PropertyBar];

    const environment = new ContentPartMaterialReplaceEnvironment({
      contextualToolsPlugin,
      toolbarPlugin,
      resizeWidgetPlugin,
      rightPropertyBarPlugin,
      viewSwitchPlugin,
      pageheaderPlugin,
      menuPlugin: this.menuPlugin,
      catalogPlugin: this.catalogPlugin,
      handler: this,
      app: this.app,
      context
    });

    this.app.registerEnvironment(HSFPConstants.Environment.ContentPartMaterialReplace, environment);
  }

  onPopulateLeftMenu(event: any): void {
    const eventData = event.data;
    const selectedEntity = this.app.selectionManager.selected()[0];

    if (this.isCustomizedProduct(selectedEntity)) {
      const menuItems = this.initLeftMenuItems(selectedEntity);
      const defaultItems = eventData.defaultItems;

      if (this.menuPlugin.enable && menuItems) {
        defaultItems.push(...menuItems);
      }
    }
  }

  onDocumentOpening(event: any): void {
    const data: DocumentOpeningData = event.data;
    const productsMap = data?.productsMap ?? new Map();
    const products = Array.from(productsMap.values());
    const customizedProductIds: string[] = [];

    products.forEach((product) => {
      if (HSApp.Util.Entity.getEntityCustomizeSize(product)) {
        customizedProductIds.push(product.seekId);
      }
    });

    if (customizedProductIds.length > 0) {
      this.getProductOrderList(customizedProductIds);
    }
  }

  onCatalogItemClick(event: any): void {
    const isSmartReplaceCommand = this.app.cmdManager.current?.type === HSFPConstants.CommandType.SmartReplaceContent;
    const metadata = isSmartReplaceCommand ? event?.data?.meta : event?.data;

    if (HSApp.Util.Entity.getEntityCustomizeSize(metadata)) {
      this.getProductOrderList([metadata.seekId]);
    }

    if (isSmartReplaceCommand) {
      this.changeMirrorFloorplanStatus();
    }
  }

  async getProductMetaByIds(modelIds: string[]): Promise<MaterialListResult> {
    let result: MaterialListResult = {
      items: [],
      total: 0
    };

    try {
      const dataManager = this.catalogPlugin.BaseApiManager.dataManager;
      result = await dataManager.getContentsInfoByIds({ modelIdList: modelIds });

      if (result.total > 0) {
        const baseDataManager = HSApp.Catalog.BaseApiManager.getInstance().dataManager;
        const products: any[] = [];

        result.items.forEach((item) => {
          products.push(baseDataManager.productBuilder(item));
        });

        result.items = products;
        result.total = products.length;
      }
    } catch (error) {
      // Error handled, return empty result
    }

    return result;
  }

  async getMaterialList(params: MaterialSearchParams): Promise<MaterialListResult> {
    const {
      text = "",
      offset = 0,
      folderId = "",
      isInFolder = false
    } = params;

    const entityId = this.selectedEntity?.seekId;
    const searchParams = {
      id: entityId,
      partId: this.selectedMeshName,
      keyword: text,
      folderId,
      isInFolder: isInFolder === true || text !== "" || (folderId === "" && text === ""),
      offset,
      limit: 30
    };

    return NWTK.mtop.Catalog.productOrderSearch({ data: searchParams }).then((response) => {
      const responseData = response?.data;
      let materials: any[] = [];
      let totalCount = 0;

      if (response?.ret?.[0]?.includes("SUCCESS") && responseData?.result) {
        const resultData = responseData.result;
        const materialList = resultData.materialList ?? [];
        const folderTreeList = resultData.folderTreeList ?? [];
        const total = resultData.total ?? 0;

        if (materialList.length === 0) {
          return;
        }

        const dataManager = this.catalogPlugin.BaseApiManager.dataManager;
        materialList.forEach((material: any) => {
          const materialMetaInfo = material.materialMetaInfo ?? {};
          materials.push(dataManager.productBuilder(materialMetaInfo));
        });

        this.folderTreeList = folderTreeList;
        totalCount = total;
      }

      const result: MaterialListResult = {
        items: materials,
        total: totalCount
      };

      this.currentMaterialList = result;

      const partMaterial = this.initContentPartMaterialMap.get(entityId).find((item) => {
        return item.modelPartId === this.selectedMeshName;
      });

      if (partMaterial) {
        partMaterial.materialList = materials;
      }

      return result;
    });
  }

  getProductOrderList(productIds: string[] = [this.selectedEntity.seekId]): Promise<Map<string, ModelPartMaterial[]>> {
    return NWTK.mtop.Catalog.getProductOrderList({
      data: { ids: productIds }
    }).then((response) => {
      const responseData = response?.data;

      if (response?.ret?.[0]?.includes("SUCCESS") && responseData?.result) {
        responseData.result.forEach((product: ProductOrderResult) => {
          this.initContentPartMaterialMap.set(product.modelId, product.modelPartMaterialList);
        });
      }

      return this.initContentPartMaterialMap;
    }).catch(() => {
      return Promise.resolve(this.initContentPartMaterialMap);
    });
  }

  initLeftMenuItems(entity: any): LeftMenuItem[] {
    return [{
      label: ResourceManager.getString("content_contextmenu_material_replace"),
      id: "contentpartmaterialreplace",
      disable: false,
      src: "edit_material",
      order: 105,
      onClick: () => {
        const partMaterialList = this.initContentPartMaterialMap.get(entity.seekId);

        if (partMaterialList?.length > 0) {
          this.startStyler(entity);
        } else {
          LiveHint.show(
            ResourceManager.getString("plugin_customized_product_replace_material_tips"),
            2500,
            undefined,
            { canclose: true }
          );
        }
      }
    }];
  }

  startStyler(entity: any): void {
    this.selectedEntity = entity;
    this.selectedMeshName = undefined;
    this.fromEnvironmentId = this.app.activeEnvironmentId;

    if (this.app.environmentManager.isWallCeilingPlatformEnv(this.fromEnvironmentId)) {
      this.app.suspendActiveEnvironment();
    }

    this.app.getActive3DView().gizmoManager.endShowSelectionGizmo();

    if (this.singleRoomPlugin && this.app.appSettings.isSingleRoomMode) {
      this.singleRoom = this.singleRoomPlugin.getTargetRoom();
      this.singleRoomPlugin.cancelSingleRoom();
    }

    this.app.activateEnvironment(HSFPConstants.Environment.ContentPartMaterialReplace);
    this.app.getAux3DView().unfreeze();
  }

  exitStyler(): void {
    if (this.app.getPendingSuspendedEnvironment()) {
      this.app.resumeSuspendedEnvironment();
    } else {
      this.app.activateEnvironment(this.fromEnvironmentId, { keepCamera: true });
    }

    this.fromEnvironmentId = undefined;

    if (this.singleRoomPlugin && this.singleRoom) {
      this.singleRoomPlugin.cmdSetTargetRoom(this.singleRoom, false, "contentpartmaterialreplace");
      this.singleRoom = undefined;
      this.app.selectionManager.unselectAll();
      this.app.selectionManager.select(this.selectedEntity);
    }
  }

  isCustomizedProduct(entity: any): boolean {
    return !!(entity && HSApp.Util.Entity.getEntityCustomizeSize(entity.metadata));
  }

  getSelectedEntity(): any {
    return this.selectedEntity;
  }

  getSelectMeshName(): string | undefined {
    return this.selectedMeshName;
  }

  setSelectMeshName(meshName: string | undefined): void {
    this.selectedMeshName = meshName;
  }

  getCurrMaterialList(): MaterialListResult {
    return this.currentMaterialList ?? { items: [], total: 0 };
  }

  getFolderTreeList(): any[] {
    return this.folderTreeList ?? [];
  }

  getContentPartsData(entity?: any): ModelPartMaterial[] {
    const targetEntity = entity ?? this.selectedEntity;
    return this.initContentPartMaterialMap.get(targetEntity.seekId) ?? [];
  }

  getPartMaterialList(entity: any, partId: string): any[] | undefined {
    const partMaterial = this.getContentPartsData(entity).find((item) => {
      return item.modelPartId === partId;
    });

    this.setSelectMeshName(partMaterial?.modelPartId);
    return partMaterial?.materialList;
  }

  changeSelectPart(partId: string, shouldRefresh: boolean = true): void {
    this.app.selectionManager.unselectAll();
    this.setSelectMeshName(partId);

    const displayItem = HSApp.App.getApp().getActive3DView().displayList[this.selectedEntity.id];
    displayItem.highlightMesh(partId);

    if (shouldRefresh) {
      this.app.signalPropertyBarRefresh.dispatch();
    }

    this.getMaterialList({});
  }

  designHasCustomizedProducts(): boolean {
    const floorplan = this.app.floorplan;
    const customizedProducts: any[] = [];

    floorplan.forEachContent((content: any) => {
      if (this.isCustomizedProduct(content)) {
        customizedProducts.push(content);
      }
    });

    return customizedProducts.length > 0;
  }

  commandTerminated(event: any): void {
    const commandData: CommandData = event.data;
    const commandType = commandData?.cmd?.type;

    const relevantCommands = [
      HSFPConstants.CommandType.DuplicateSequence,
      HSFPConstants.CommandType.DeleteSelection,
      HSFPConstants.CommandType.PlaceProduct
    ];

    if (relevantCommands.includes(commandType)) {
      this.changeMirrorFloorplanStatus();
    }
  }

  changeMirrorFloorplanStatus(): void {
    const hasCustomizedProducts = this.designHasCustomizedProducts();
    this.setMirrorFloorplanStatus(hasCustomizedProducts);
  }

  setMirrorFloorplanStatus(shouldHide: boolean): void {
    const mirrorButtons = [
      this.toolBarPlugin.getItem("toolBar_construction/toolBar_floorplan_mirrorHorizontal"),
      this.toolBarPlugin.getItem("toolBar_construction/toolBar_floorplan_mirrorVertical")
    ];

    mirrorButtons.forEach((button) => {
      if (shouldHide) {
        button?.hide();
      } else {
        button?.show();
      }
    });
  }

  getContentPartIds(): string[] {
    const partsData = this.getContentPartsData(this.selectedEntity);
    const partIds: string[] = [];

    partsData.forEach((part) => {
      partIds.push(part.modelPartId);
    });

    return partIds;
  }
}