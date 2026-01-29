interface ToolbarConfig {
  [key: string]: unknown;
}

interface PluginConfig {
  [HSFPConstants.PluginType.Toolbar]: ToolbarConfig;
}

interface SaveOriginExtendResponse {
  responseStatus: HSApp.Interface.ServiceExtend.ResponseStatus;
  dataList: Array<{
    callback?: () => void;
  }>;
}

interface EnvironmentParams {
  originalAccessoryAssetId: string;
  preAssetId: string;
  preEnvironmentId: string;
  escEnvironment: () => void;
  executeSaveOriginExtend: (assetId: string, onSuccess: () => void, onCancel?: () => void) => void;
}

interface DesignLoadResponse {
  data: string;
  [key: string]: unknown;
}

interface DocumentResult {
  floorplan: unknown;
}

class EditOriginDesignPlugin {
  private _app: HSApp.App;
  private toolbar: Toolbar;
  private _signalHook: HSCore.Util.SignalHook;

  constructor(config: PluginConfig) {
    this._app = HSApp.App.getApp();
    const toolbarConfig = config[HSFPConstants.PluginType.Toolbar];
    this.toolbar = new Toolbar(this, toolbarConfig);
    this._app.registerEnvironment(
      HSFPConstants.Environment.EditOriginDesign,
      new EditOriginDesignEnvironment(this._app, config)
    );
    this._signalHook = new HSCore.Util.SignalHook(this);
  }

  init(): void {
    this.registerCommands();
    this.toolbar.injectDefaultToolbar();
  }

  registerCommands(): void {
    this._app.cmdManager.register(CmdSaveOriginDesignName, CmdSaveOriginDesign);
  }

  async onSaveOriginDesignItemClicked(): Promise<void> {
    const assetId = this.getOriginalAccessoryAssetId();
    if (!assetId) {
      return this.saveOriginDesign();
    }
    this.executeSaveOriginExtend(assetId, this.saveOriginDesign.bind(this));
  }

  executeSaveOriginExtend(
    assetId: string,
    onSuccess: () => void,
    onCancel?: () => void
  ): void {
    executeSaveOriginExtend(assetId).then((response: SaveOriginExtendResponse) => {
      const { responseStatus, dataList } = response;

      if (responseStatus === HSApp.Interface.ServiceExtend.ResponseStatus.Cancel) {
        onCancel?.();
        return;
      }

      if (responseStatus !== HSApp.Interface.ServiceExtend.ResponseStatus.None) {
        onSuccess();
        dataList.forEach((item) => {
          item?.callback?.();
        });
      } else {
        const cancelText = ResourceManager.getString("plugin_spacerebuild_reSaved_msgbox_cancel");
        const confirmText = ResourceManager.getString("plugin_spacerebuild_reSaved_msgbox_sure");
        const titleText = ResourceManager.getString("plugin_spacerebuild_reSaved_msgbox_title");

        const messageBox = MessageBox.create("", [cancelText, confirmText], 1, {
          title: titleText,
          disablemask: true
        });

        messageBox.show((buttonIndex: number) => {
          if (buttonIndex !== 0) {
            onCancel?.();
            return;
          }
          messageBox.close().then(() => {
            onSuccess();
          });
        }, {
          closeByOkButton: false
        });
      }
    });
  }

  saveOriginDesign(): void {
    this._app.cmdManager.cancel();

    if (this._app.designMetadata.get("designId")) {
      this._doSave();
      return;
    }

    const contentText = ResourceManager.getString("plugin_spacerebuild_ensureSaved_msgbox_content");
    const okText = ResourceManager.getString("plugin_spacerebuild_ensureSaved_msgbox_btn_ok");
    const titleText = ResourceManager.getString("plugin_spacerebuild_ensureSaved_msgbox_title");

    const messageBox = MessageBox.create(contentText, [okText], 0, {
      title: titleText,
      disablemask: true
    });

    const persistencePlugin = this._app.pluginManager.getPlugin("hsw.plugin.persistence.Plugin");

    persistencePlugin.ensureSaved(messageBox).then((shouldSave: boolean) => {
      if (shouldSave) {
        persistencePlugin.execteActionWithCheckSavingStatus(() => {
          this._doSave();
        });
      }
    });
  }

  onEditOriginDesignItemClicked(): void {
    const assetId = this.getOriginalAccessoryAssetId();

    if (!assetId) {
      const warningMessage = ResourceManager.getString("plugin_spacerebuild_menuitem_edit_origin_design_neadSaved");
      LiveHint.show(warningMessage, 2000, null, {
        status: LiveHint.statusEnum.warning
      });
      return;
    }

    this.intoEditOriginDesign(assetId);
  }

  exitEditOriginDesign(floorplan: unknown): void {
    this._app.setActiveFloorplan(floorplan, false);
  }

  async intoEditOriginDesign(originalAccessoryAssetId: string): Promise<void> {
    if (this._app.isFloorplanDirty) {
      const persistencePlugin = this._app.pluginManager.getPlugin("hsw.plugin.persistence.Plugin");
      await persistencePlugin.save();
    }

    const preAssetId = this._app.appParams.assetId;
    const preEnvironmentId = this._app.activeEnvironmentId;
    const currentFloorplan = this._app.floorplan;
    let transactionSession: unknown;

    const activateEditEnvironment = (): void => {
      const params: EnvironmentParams = {
        originalAccessoryAssetId,
        preAssetId,
        preEnvironmentId,
        escEnvironment: () => {
          this.exitEditOriginDesign(currentFloorplan);
          transactionSession?.end();
        },
        executeSaveOriginExtend: this.executeSaveOriginExtend
      };

      this._app.activateEnvironment(HSFPConstants.Environment.EditOriginDesign, params);
      this._app.pluginManager.getPlugin("hsw.plugin.persistence.Plugin").setAutoSaveOn(false);
    };

    const loadingMessage = ResourceManager.getString("load_product_start");
    LiveHint.show(loadingMessage, undefined, undefined, {
      status: LiveHint.statusEnum.loading
    });

    transactionSession = this._app.transManager.startSession();

    this.openOriginalAccessory(originalAccessoryAssetId)
      .then(() => {
        window.setTimeout(() => {
          activateEditEnvironment();
          LiveHint.hide();
        });
      })
      .catch((error: { ret?: Array<string> }) => {
        const hasPermissionDenied = error?.ret?.some?.((message: string) =>
          message?.includes("FAIL_BIZ_PERMISSION_DENIED")
        );

        if (hasPermissionDenied) {
          const permissionMessage = ResourceManager.getString("load_design_notAllow");
          LiveHint.show(permissionMessage, 5000, undefined, {
            status: LiveHint.statusEnum.warning
          });
          return;
        }

        const errorMessage = ResourceManager.getString("load_product_error");
        LiveHint.show(errorMessage, 5000, undefined, {
          status: LiveHint.statusEnum.warning
        });
      });
  }

  openOriginalAccessory(assetId: string): Promise<unknown> {
    return this.loadDesignFromServer(assetId, adskUser.sid);
  }

  loadDesignFromServer(assetId: string, sessionId: string): Promise<unknown> {
    return HSApp.Io.Request.Design.loadDesign(assetId, sessionId)
      .then((response: DesignLoadResponse) => {
        const metadata = new HSCore.Doc.Metadata();
        metadata.fromObject(HSCore.Doc.Metadata.getDesignMeta(assetId, response));

        const designData = JSON.parse(response.data);
        return this._app.docManager.newDocument(designData, metadata.toObject(), assetId, false);
      })
      .then((result: DocumentResult) => {
        const { floorplan } = result;
        return this._app.setActiveFloorplan(floorplan, false);
      });
  }

  getOriginalAccessoryAssetId(): string | undefined {
    return this._app.floorplan.designMetadata.get("originalAccessoryAssetId");
  }

  private _doSave(): void {
    if (this._app.designMetadata.get("designId")) {
      const cmdManager = this._app.cmdManager;
      const command = cmdManager.createCommand(CmdSaveOriginDesignName);
      cmdManager.execute(command);
    }
  }
}

export default EditOriginDesignPlugin;