export interface HandlerOptions {
  pageHeaderOptions?: unknown;
}

export class Handler {
  private _app: any;
  private _handleMap: Record<string, Array<() => void | Promise<void>>>;
  private _editStatusManager: any;
  private _catalogPlugin: any;
  private _toolbarPlugin: any;
  private _propertyBarPlugin: any;
  private _layerEditPlugin: any;
  private _userInfoPlugin: any;
  private _pageheaderPlugin: any;
  private _leftMenuPlugin: any;
  private _cameraPositionPlugin: any;
  private _options: HandlerOptions;
  private _onDesignLoadedHandle?: () => void;

  constructor() {
    this._app = undefined;
    this._handleMap = {};
    this._editStatusManager = undefined;
    this._catalogPlugin = undefined;
    this._toolbarPlugin = undefined;
    this._propertyBarPlugin = undefined;
    this._layerEditPlugin = undefined;
    this._userInfoPlugin = undefined;
    this._pageheaderPlugin = undefined;
    this._leftMenuPlugin = undefined;
    this._cameraPositionPlugin = undefined;
    this._options = {};
    this._onDesignLoadedHandle = undefined;
  }

  init(app: any, editStatusManager: any, plugins: Record<string, any>): void {
    this._app = app;
    this._handleMap = {};
    this._editStatusManager = editStatusManager;

    const pluginType = HSFPConstants.PluginType;
    this._pageheaderPlugin = plugins[pluginType.PageHeader];
    this._toolbarPlugin = plugins[pluginType.Toolbar];
    this._catalogPlugin = plugins[pluginType.Catalog];
    this._leftMenuPlugin = plugins[pluginType.LeftMenu];
    this._propertyBarPlugin = plugins[pluginType.PropertyBar];
    this._layerEditPlugin = plugins[pluginType.LayerEdit];
    this._userInfoPlugin = plugins[pluginType.UserInfo];
    this._cameraPositionPlugin = plugins["hsw.plugin.cameraposition.Plugin"];

    this._app.signalDocumentOpened.listen(this.onDesignLoaded, this);
  }

  onDesignLoaded(): void {
    this._onDesignLoadedHandle?.call(this);
  }

  registerHandle(handle: () => void | Promise<void>, category: string = "common"): void {
    if (!this._handleMap[category]) {
      this._handleMap[category] = [];
    }
    this._handleMap[category].push(handle);
  }

  switchModel(editStatus?: any): void {
    this._app.selectionManager.unselectAll();

    const editModelEnum = HSApp.EditStatus.ENUM_EDIT_MODEL;
    const currentStatus = editStatus ?? this._editStatusManager.status;

    switch (currentStatus) {
      case editModelEnum.READONLY:
        this.readonlyModel();
        break;
      case editModelEnum.VIEWER:
        this.viewerModel();
        break;
      case editModelEnum.EDIT:
      default:
        this.editModel();
    }

    const activeEnvironmentId = this._app.activeEnvironmentId;
    const handles: Array<() => void | Promise<void>> = [];

    if (this._handleMap[activeEnvironmentId]) {
      handles.push(...this._handleMap[activeEnvironmentId]);
    }
    if (this._handleMap["common"]) {
      handles.push(...this._handleMap["common"]);
    }

    handles.forEach((handle) =>
      Promise.resolve()
        .then(handle)
        .catch((error) => console.log(handle.name, error))
    );
  }

  readonlyModel(): void {
    this._catalogPlugin.setCatalogReadonly();
    this._toolbarPlugin.setToolbarReadonlyModel();
    this._layerEditPlugin.setLayerEditReadonlyMode();
    this._propertyBarPlugin.setPropertyBarReadonlyMode();
    this._userInfoPlugin.setUserInfoReadonlyMode();
    this._pageheaderPlugin.setPageHeaderReadonlyMode(this._options.pageHeaderOptions);
    this._leftMenuPlugin.setLeftMenuReadonlyMode();
    this._cameraPositionPlugin.setCameraPositionReadonlyMode();
    this.enableHotKey(false);
  }

  viewerModel(): void {
    this._catalogPlugin.setCatalogReadonly();
    this._toolbarPlugin.setToolbarViewerModel();
    this._layerEditPlugin.setLayerEditReadonlyMode();
    this._propertyBarPlugin.setPropertyBarReadonlyMode();
    this._userInfoPlugin.setUserInfoReadonlyMode();
    this._pageheaderPlugin.setPageHeaderReadonlyMode(this._options.pageHeaderOptions);
    this._leftMenuPlugin.setLeftMenuReadonlyMode();
    this._cameraPositionPlugin.setCameraPositionReadonlyMode();
    this.enableHotKey(false);
  }

  editModel(): void {
    this._toolbarPlugin.setToolbarEditModel();
    this._catalogPlugin.setCatalogEdit();
    this._layerEditPlugin.setLayerEditEditMode();
    this._propertyBarPlugin.setPropertyBarEditMode();
    this._userInfoPlugin.setUserInfoEditMode();
    this._pageheaderPlugin.setPageHeaderEditMode();
    this._leftMenuPlugin.setLeftMenuEditMode();
    this._cameraPositionPlugin.setCameraPositionEditMode();
    this.enableHotKey(true);
  }

  enableHotKey(enabled: boolean): void {
    const app = HSApp.App.getApp();
    const hotkeyMap = this._app.hotkey.hotkeyMap;

    Object.keys(hotkeyMap).forEach((key) => {
      if (enabled) {
        app.hotkey.enable(key);
      } else {
        app.hotkey.disable(key);
      }
    });
  }

  setOptions(options: HandlerOptions): void {
    this._options = options;
  }
}