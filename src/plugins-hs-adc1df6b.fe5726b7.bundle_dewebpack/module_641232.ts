interface App {
  pluginManager: {
    getPlugin(pluginType: string): any;
  };
  selectionManager: {
    selected(): any[];
  };
  userTrackLogger: {
    push(action: string, data: any): void;
  };
}

interface PluginDependencies {
  [HSFPConstants.PluginType.ContextualTools]: any;
  [HSFPConstants.PluginType.PropertyBar]: any;
  [HSFPConstants.PluginType.Catalog]: any;
}

interface InitOptions {
  app: App;
  dependencies: PluginDependencies;
}

interface GroupMeta {
  id?: string;
  displayName?: string;
  [key: string]: any;
}

interface SaveResult {
  status: string;
  data?: GroupMeta;
}

interface PopupWindowOptions {
  windowname: string;
  title: string;
  contents: React.ReactElement;
  width: number;
  submitcall: () => void;
  cancelcall: () => void;
}

interface MetaProcessorOptions {
  catalogPlugin: any;
  onClickEdit: (meta: GroupMeta, title: string) => void;
  onClickDelete?: (meta: GroupMeta) => void;
}

enum DomNodeName {
  EDIT_GROUP_PANEL = "editGroupPanelNode"
}

class MyGroupPlugin {
  private _editGroupPanel?: React.Component;
  private _currentMeta?: GroupMeta;
  private _app!: App;
  private _contexualToolsPlugin: any;
  private _catalogPlugin: any;
  private _editGroupPanelDomNode!: HTMLElement;
  private _metaProces!: MyGroupMetaProcessor;
  private _enumDomNodeName!: Record<string, string>;
  private _pluginContainerDomNode!: HTMLElement;
  private _rootDomNode!: HTMLDivElement;

  init(options: InitOptions): void {
    this._createHtmlDoms();
    this._app = options.app;

    const contextualToolsPlugin = options.dependencies[HSFPConstants.PluginType.ContextualTools];
    options.dependencies[HSFPConstants.PluginType.PropertyBar];
    
    this._contexualToolsPlugin = contextualToolsPlugin;
    this._catalogPlugin = options.dependencies[HSFPConstants.PluginType.Catalog];
    
    this.showEditGroupPanel = this.showEditGroupPanel.bind(this);
    this.hideEditGroupPanel = this.hideEditGroupPanel.bind(this);
    this.saveGroupMeta = this.saveGroupMeta.bind(this);
    this.showProductRename = this.showProductRename.bind(this);
    
    this._registerMetaProcessor();
  }

  uninit(): void {
    this._destroyHtmlDoms();
  }

  private _showGroupPanel(meta: GroupMeta, title: string, imgData?: string): Promise<SaveResult> {
    this._currentMeta = meta;
    
    return new Promise((resolve, reject) => {
      this._editGroupPanelDomNode = document.querySelector(".popupcontainer") as HTMLElement;
      const commonUIPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.CommonUI);
      
      if (!this._editGroupPanelDomNode) {
        return reject("cannot find dom .popupcontainer to show save dialog");
      }

      const handleCancel = (): void => {
        this.hideEditGroupPanel();
      };

      const handleSave = (data: GroupMeta): void => {
        this.hideEditGroupPanel();
        resolve({
          status: "success",
          data
        });
      };

      const popupOptions: PopupWindowOptions = {
        windowname: "mygroup-dialog",
        title,
        contents: React.createElement(EditGroupPanel, {
          imgData,
          onCancel: handleCancel,
          onSave: handleSave,
          meta
        }),
        width: 500,
        submitcall: () => {},
        cancelcall: handleCancel
      };

      const popupWindow = commonUIPlugin.createPopupwindow(popupOptions);
      this._editGroupPanel = ReactDOM.render(popupWindow, this._editGroupPanelDomNode);
    });
  }

  showEditGroupPanel(meta: GroupMeta, title: string): void {
    this._showGroupPanel(meta, title).then((result: SaveResult) => {
      if (result.data) {
        this.saveGroupMeta(result.data);
      }
    });
  }

  showSaveGroupPanel(meta: GroupMeta, title: string, imgData: string): Promise<SaveResult> {
    return this._showGroupPanel(meta, title, imgData);
  }

  showProductRename(productId: string): void {
    HSApp.Catalog.Manager.signalToCatalog(
      EventBusType.showProductRename,
      productId
    );
  }

  hideEditGroupPanel(): void {
    ReactDOM.unmountComponentAtNode(this._editGroupPanelDomNode);
    this._editGroupPanel = undefined;
  }

  saveGroupMeta(meta: GroupMeta): void {
    new MyGroupAPI().updateMyGroup(meta);
  }

  private _getSelectedGroup(): any | undefined {
    const selected = this._app.selectionManager.selected();
    
    if (selected.length === 1) {
      const item = selected[0];
      if (item.instanceOf(HSConstants.ModelClass.NgGroup)) {
        return item;
      }
    }
    
    return undefined;
  }

  private _onAddMyGroupBtnClk(): void {
    const group = this._getSelectedGroup();
    
    if (group) {
      this._app.userTrackLogger.push("addMyGroup", {
        description: "收藏到素材库",
        group: HSFPConstants.LogGroupTypes.ContentOperation,
        argInfo: {
          id: group.id
        }
      });
      
      this.uploadGroup(group);
    }
  }

  uploadGroup(group: any): void {
    const api = new MyGroupAPI();
    const loadingTimeout = 30000;
    
    LiveHint.show(
      ResourceManager.getString("plugin_mygroup_adding_to_mygroup"),
      loadingTimeout,
      null,
      { status: "loading" }
    );

    api.addToMyGroup(group)
      .then((guid: string) => {
        HSApp.Util.EventTrack.instance().track(
          HSApp.Util.EventGroupEnum.Catalog,
          "add_customized_product_to_catalog_event",
          {
            GUID: guid,
            sModelType: ResourceManager.getString("myGroup_model")
          }
        );
        return guid;
      })
      .then((guid: string) => {
        LiveHint.hide();
        this.addFavorite(guid);
        return true;
      })
      .then(() => {
        const refreshDelay = 400;
        setTimeout(() => {
          HSApp.Catalog.Manager.signalToCatalog(
            EventBusType.refreshMaterialProductPage
          );
        }, refreshDelay);
      });
  }

  addFavorite(guid: string): void {
    const favoritePlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.Favorite);
    let displayName = ResourceManager.getString("productDetailsTab_freegroup_name");
    
    const group = this._getSelectedGroup();
    if (group?.displayName) {
      displayName = group.displayName;
    }
    
    favoritePlugin.showPopupGroupPanel(guid, true, displayName);
  }

  private _registerMetaProcessor(): void {
    const options: MetaProcessorOptions = {
      catalogPlugin: this._catalogPlugin,
      onClickEdit: this.showEditGroupPanel,
      onClickDelete: undefined
    };
    
    const processor = new MyGroupMetaProcessor(options);
    this._metaProces = processor;
    
    HSCatalog.Builder.addMetaProcessor((meta: GroupMeta, context: any) => {
      return processor.process(meta, context);
    });
    
    this._catalogPlugin.addMiniMetaProcessor(processor.miniProcess.bind(processor));
  }

  private _createHtmlDoms(): void {
    this._enumDomNodeName = {
      EDIT_GROUP_PANEL: DomNodeName.EDIT_GROUP_PANEL
    };
    
    this._pluginContainerDomNode = document.querySelector("#plugin-container") as HTMLElement;
    this._rootDomNode = document.createElement("div");
    this._rootDomNode.className = "mygroupplugin";
    this._pluginContainerDomNode.appendChild(this._rootDomNode);
    
    this._editGroupPanelDomNode = document.createElement("div");
    this._editGroupPanelDomNode.setAttribute("data-panelName", this._enumDomNodeName.EDIT_GROUP_PANEL);
    this._rootDomNode.appendChild(this._editGroupPanelDomNode);
  }

  private _destroyHtmlDoms(): void {
    this._pluginContainerDomNode.removeChild(this._rootDomNode);
  }
}

export default MyGroupPlugin;