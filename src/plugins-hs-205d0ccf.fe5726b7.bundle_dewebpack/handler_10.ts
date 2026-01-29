interface RoomAttribute {
  area: number;
  roomId: string;
  roomType: string;
  isCurrent: boolean;
  modelIds: string[];
}

interface SearchParams {
  designId: string;
  selectedModelId: string;
  roomsAttribute: RoomAttribute[];
  otherModelIds: string[];
}

interface AutoRecommendData {
  isShowAutoRecommendItem: boolean;
  floor: Record<string, unknown>;
  entity: Record<string, unknown>;
}

interface RecommendDecorationsData {
  isShowRecommendDecorationsItem: boolean;
  entity: Record<string, unknown>;
}

interface DialogData {
  entity: HSCore.Model.Entity;
  autoRecommendData: AutoRecommendData;
  recommendDecorationsData: RecommendDecorationsData;
  searchParams?: SearchParams;
  modelData?: ModelData;
  hideDialogCallback?: () => void;
}

interface ModelData {
  total: number;
  [key: string]: unknown;
}

interface SignalData {
  data?: {
    newEntities?: unknown[];
    oldEntities?: unknown[];
    cmd?: {
      type: string;
    };
    isShow?: boolean;
  };
}

interface QueryStrings {
  env?: string;
  [key: string]: unknown;
}

export class Handler {
  private _app: HSApp.Application;
  private _catalogPlugin: HSFPConstants.Plugin;
  private _signalHook: HSCore.Util.SignalHook;
  private _selectedContent?: HSCore.Model.Entity;
  private _needShowDialog: boolean;
  private _recommendation: Recommendation;
  private _noShowDialog: boolean;
  private _throttleSelectionChanged?: (signal: SignalData, force: boolean) => void;
  private _hideRecommendEntry: boolean = false;
  private dialogComp?: React.Component;

  public searchParams?: SearchParams;
  public entityCategoryIdsMap?: Map<string, unknown>;
  public currentEnv: string;
  public canRecommend: boolean = true;

  constructor(app: HSApp.Application, plugins: Record<string, HSFPConstants.Plugin>) {
    this._app = app;
    this.searchParams = undefined;
    this.entityCategoryIdsMap = undefined;
    this.currentEnv = this._getCurrentEnv();
    this._catalogPlugin = plugins[HSFPConstants.PluginType.Catalog];
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._selectedContent = undefined;
    this._needShowDialog = false;
    this._recommendation = new Recommendation();
    this._noShowDialog = false;
  }

  public init(): void {
    const selectionManager = this._app.selectionManager;
    const cmdManager = this._app.cmdManager;

    this._signalHook
      .listen(selectionManager.signalSelectionChanged, this._onSelectionChange)
      .listen(this._app.environmentManager.signalEnvironmentActivating, this._hideDialog)
      .listen(this._catalogPlugin.signalMenuItemClick, this._hideDialog)
      .listen(this._catalogPlugin.signalShowCatalog, this.signalShowCatalog)
      .listen(cmdManager.signalCommandTerminated, this.commandTerminated)
      .listen(cmdManager.signalCommandStarting, this.commandStarting)
      .listen(this._app.signalDocumentOpened, this._onDocumentOpened);

    this._throttleSelectionChanged = _.throttle(this.updateRecommend.bind(this), 50, {
      leading: false,
      trailing: true
    });

    this.canRecommend = true;

    const queryStrings: QueryStrings = HSApp.Util.Url.getQueryStrings();
    this._hideRecommendEntry = 
      (typeof queryStrings.env === "string" && queryStrings.env === "icbu") ||
      HSApp.Config.TENANT === "fp";
  }

  public signalShowCatalog(signal: SignalData): void {
    const isShow = signal?.data?.isShow;
    this.canRecommend = isShow ?? true;
  }

  private _onDocumentOpened(signal: SignalData): void {
    this.setNoShowDialog(false);
  }

  public setNoShowDialog(value: boolean): void {
    this._noShowDialog = value;
  }

  public getNoShowDialog(): boolean {
    return this._noShowDialog;
  }

  public commandStarting(signal: SignalData): void {
    if (this.isCurrCmdIncludes(signal)) {
      this.canRecommend = false;
    }
  }

  public commandTerminated(signal: SignalData): void {
    if (this.isCurrCmdIncludes(signal)) {
      this.canRecommend = true;
    }
  }

  public isCurrCmdIncludes(signal: SignalData): boolean {
    const cmdType = signal?.data?.cmd?.type;
    return [
      HSFPConstants.CommandType.SmartReplaceContent,
      HSFPConstants.CommandType.PlaceProduct
    ].includes(cmdType);
  }

  private _uninit(): void {
    this._signalHook.unlistenAll();
  }

  private _onSelectionChange(signal: SignalData): void {
    this._throttleSelectionChanged?.(signal, false);
  }

  private _getAutoRecommendData(entity: HSCore.Model.Entity): AutoRecommendData {
    const result: AutoRecommendData = {
      isShowAutoRecommendItem: false,
      floor: {},
      entity: {}
    };

    if (entity instanceof HSCore.Model.Content) {
      const targetSpace = HSApp.Util.Recommend.getTargetSpace(entity);
      const needRecommend = HSApp.Util.Recommend.isNeedToRecommend(targetSpace, entity);

      Object.assign(result, {
        isShowAutoRecommendItem: needRecommend,
        floor: needRecommend ? targetSpace : {},
        entity: needRecommend ? entity : {}
      });
    }

    return result;
  }

  public async updateRecommend(signal: SignalData, forceUpdate: boolean = false): Promise<void> {
    this._hideDialog();

    if (!adskUser.merchentCustomizedConfig.enableAutoRecommend) {
      return;
    }

    if (this._hideRecommendEntry) {
      return;
    }

    if (!this.canRecommend) {
      return;
    }

    const guidePlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
    if (guidePlugin?.showGuide()) {
      return;
    }

    const selectedEntities = this._app.selectionManager.selected();
    const signalData = signal?.data;

    if (!((signalData?.newEntities && selectedEntities.length === 1) || (forceUpdate && selectedEntities.length === 1))) {
      if (this.dialogComp && (signalData?.oldEntities || selectedEntities.length >= 1)) {
        this._hideDialog();
      }
      return;
    }

    const selectedEntity = selectedEntities[0];

    if (selectedEntity.getProxyObject?.call(selectedEntity)) {
      return;
    }

    if (!this._viewEnvEnable()) {
      return;
    }

    if (this._selectedContent && this._selectedContent.id === selectedEntity.id && !forceUpdate) {
      return;
    }

    this._selectedContent = selectedEntity;
    this._needShowDialog = true;

    const autoRecommendData = this._getAutoRecommendData(selectedEntity);
    const dialogData: DialogData = {
      entity: selectedEntity,
      autoRecommendData,
      recommendDecorationsData: {
        isShowRecommendDecorationsItem: false,
        entity: {}
      }
    };

    let modelData: ModelData | undefined;

    if (
      selectedEntity instanceof HSCore.Model.Content &&
      !(selectedEntity instanceof HSCore.Model.CustomizedModel) &&
      !(selectedEntity instanceof HSCore.Model.PAssembly)
    ) {
      const searchParams = this._searchFieldBuildV2(selectedEntity);
      dialogData.searchParams = searchParams;
      this.searchParams = searchParams;
      modelData = await this._recommendation.getProductData(this.searchParams);
    }

    dialogData.modelData = modelData;
    this._showDialog(dialogData);
  }

  private _hideDialog(): void {
    if (!this._viewEnvEnable()) {
      return;
    }

    const guidePlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
    if (guidePlugin?.showGuide()) {
      return;
    }

    if (this.dialogComp) {
      this.dialogComp.hideDialog();
    }
    this._needShowDialog = false;
  }

  public getRecommendationProducts(params: SearchParams): Promise<ModelData> {
    return this._recommendation.getProductData(params);
  }

  private _showDialog(data: DialogData): void {
    if (!data?.modelData?.total) {
      this._hideDialog();
      return;
    }

    const pluginContainer = document.querySelector("#plugin-container");
    const positionClass = HSApp.Config.TENANT === "fp" 
      ? "recommend-position-global" 
      : "recommend-position-ezhome";

    let dialogContainer = pluginContainer?.querySelector(".recommend-collocations-dialog-container");

    if (!dialogContainer) {
      const containerElement = document.createElement("div");
      containerElement.className = `recommend-collocations-dialog-container ${positionClass}`;
      dialogContainer = pluginContainer?.appendChild(containerElement);
    }

    data.hideDialogCallback = () => {
      this._selectedContent = undefined;
    };

    if (this._needShowDialog && dialogContainer) {
      this.dialogComp = ReactDOM.render(
        React.createElement(RecommendDialog, { data }),
        dialogContainer
      );
    }

    HSApp.App.getApp().userTrackLogger.push("recommend.collocations.dialog", {
      activeSection: "recommend",
      activeSectionName: "智能推荐",
      description: "智能推荐-弹框显示",
      clicksRatio: {
        id: "dialogShow",
        name: "智能推荐弹框显示"
      }
    });
  }

  private _viewEnvEnable(): boolean {
    const app = this._app;
    const activeEnvId = app.activeEnvironmentId;
    const viewMode2D = app.viewMode2D;

    const disabledEnvironments = [
      HSFPConstants.Environment.CustomizedCeilingModel,
      HSFPConstants.Environment.CustomizedBackgroundWall,
      HSFPConstants.Environment.CustomizedPlatform,
      HSFPConstants.Environment.NCustomizedCeilingModel,
      HSFPConstants.Environment.NCustomizedBackgroundWall,
      HSFPConstants.Environment.NCustomizedPlatform,
      HSFPConstants.Environment.ContentMaterialReplace,
      HSFPConstants.Environment.ContentPartMaterialReplace,
      HSFPConstants.Environment.Render,
      HSFPConstants.Environment.ManualLighting,
      HSFPConstants.Environment.Bom
    ];

    return (
      !disabledEnvironments.includes(activeEnvId) &&
      (app.is3DViewActive() || 
        (activeEnvId === app.defaultEnvironmentId && viewMode2D === HSApp.View.ViewModeEnum.Plane))
    );
  }

  private _updateDataEnable(entity: HSCore.Model.Entity): boolean {
    return (
      (entity instanceof HSCore.Model.Content && !(entity instanceof HSCore.Model.CustomizedModel)) ||
      entity instanceof HSCore.Model.Floor ||
      entity instanceof HSCore.Model.Face ||
      (entity instanceof HSCore.Model.CustomizedModel &&
        entity.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot)) ||
      entity.instanceOf(HSConstants.ModelClass.NgWall)
    );
  }

  private _searchFieldBuildV2(entity: HSCore.Model.Content): SearchParams {
    const app = this._app;
    const allModelIds: string[] = [];

    const searchParams: SearchParams = {
      designId: app.designMetadata.get("designId"),
      selectedModelId: entity.seekId,
      roomsAttribute: [],
      otherModelIds: []
    };

    const entityRoom = HSCore.Util.Room.getRoomContentIn(entity);

    app.floorplan.forEachFloor((floor: HSCore.Model.Floor) => {
      const roomAttr: RoomAttribute = {
        area: 0,
        roomId: "",
        roomType: "",
        isCurrent: false,
        modelIds: []
      };

      let geometry = app.geometryManager.getGeometry(floor);
      if (!geometry) {
        return;
      }

      geometry = geometry.slice();
      const massProperties = HSCore.Util.Geometry.getMassProperties(geometry);
      roomAttr.area = Math.abs(massProperties[0]);
      roomAttr.roomId = floor.id;
      roomAttr.roomType = floor.roomType || "none";
      roomAttr.isCurrent = !!(entityRoom && entityRoom.id === floor.id);
      roomAttr.modelIds = [];

      const contentsInRoom = this._getContentsInRoom(floor, app.floorplan);
      Object.values(contentsInRoom).forEach((content: HSCore.Model.Content) => {
        roomAttr.modelIds.push(content.seekId);
        allModelIds.push(content.ID);
      });

      searchParams.roomsAttribute.push(roomAttr);
    });

    app.floorplan.forEachContent((content: HSCore.Model.Content) => {
      if (!allModelIds.includes(content.ID)) {
        searchParams.otherModelIds.push(content.seekId);
      }
    });

    return searchParams;
  }

  private _getContentsInRoom(room: HSCore.Model.Floor, floorplan: HSCore.Model.Floorplan): HSCore.Model.Content[] {
    const contents: HSCore.Model.Content[] = [];

    const isContentInRoom = (content: HSCore.Model.Content): boolean => {
      if (!room) return true;
      if (!content) return false;

      if (content.isContentInRoom) {
        return content.isContentInRoom(room);
      }

      const contentRoom = HSCore.Util.Room.getRoomContentIn(content);
      return !!(contentRoom && contentRoom.ID === room.ID);
    };

    floorplan.forEachContent((content: HSCore.Model.Content) => {
      if (
        content instanceof HSCore.Model.Content &&
        !content.instanceOf(HSConstants.ModelClass.NgOpening) &&
        !content.group &&
        !content.instanceOf(HSConstants.ModelClass.NgCornerWindow) &&
        isContentInRoom(content)
      ) {
        contents.push(content);
      }
    });

    floorplan.forEachGroup((group: HSCore.Model.Group) => {
      if (isContentInRoom(group) && !group.group) {
        contents.push(group);
      }
    });

    return contents;
  }

  private _getCurrentEnv(): string {
    const queryStrings: QueryStrings = HSApp.Util.Url.getQueryStrings();
    return queryStrings.env ?? "shejijia";
  }
}