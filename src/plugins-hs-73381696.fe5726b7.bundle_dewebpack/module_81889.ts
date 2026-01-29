interface LoadingFeedbackConfig {
  name: string;
  description: string;
}

interface HideLoadingEvent {
  type: string;
}

interface LiveHintOptions {
  status?: string;
  canclose?: boolean;
}

interface DesignMetadata {
  get(key: string): string | null;
}

interface FloorplanSkybox {
  set(config: SkyboxConfig): void;
  initialSet: boolean;
}

interface SkyboxConfig {
  enabled: boolean;
}

interface LoadingTaskManager {
  instance(): LoadingTaskManager;
  getFailedTasks(): unknown[];
  signalFlushEnd: HSCore.Util.Signal;
}

interface PluginManager {
  getPlugin(pluginType: string): any;
}

interface AppParams {
  getParam(key: string): string | null;
}

interface Application {
  signalDocumentOpened: HSCore.Util.Signal;
  signalOpenDocumentResourceLoaded: HSCore.Util.Signal;
  pluginManager: PluginManager;
  designMetadata: DesignMetadata;
  floorplan: { skybox: FloorplanSkybox };
  appParams: AppParams;
}

interface AjaxResponse {
  data?: {
    item?: {
      thumbnail?: string;
    };
  };
}

const PLUGIN_NAME = "hsw.plugin.loadingfeedback";
const LOADING_COMPLETE_DURATION = 3000;
const OPENED_HINT_DURATION = 3000;
const READONLY_HINT_DURATION = 5000;

const SPECIAL_DESIGN_NAME_1 = "精选案例1-轻奢北欧风";
const SPECIAL_DESIGN_NAME_2 = "精选案例2-现代工业风";

const definePlugin = HSApp.Util.Core.define(PLUGIN_NAME);

class LoadingFeedbackPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "Loading Feeback Plugin",
      description: "Loading Feedback"
    });
  }

  onActive(event: { app: Application }): void {
    definePlugin.Handler.init(event.app);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }
}

HSApp.Plugin.registerPlugin(`${PLUGIN_NAME}.Plugin`, LoadingFeedbackPlugin);

definePlugin.Handler = {
  _openDesignFromFloorplanLib: false,
  _signalHook: null as HSCore.Util.SignalHook | null,
  signalHideLoading: null as HSCore.Util.Signal | null,

  init(app: Application): void {
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook.listen(app.signalDocumentOpened, this.onDocumentOpened);
    this._signalHook.listen(app.signalOpenDocumentResourceLoaded, this.onDocumentResourceLoaded);

    const taskManager = HSApp.View.Base.LoadingTaskManager.instance();
    this._signalHook.listen(taskManager.signalFlushEnd, this.onTaskFlushed);
    
    this.signalHideLoading = new HSCore.Util.Signal(this);
  },

  onTaskFlushed(): void {
    const failedTasks = HSApp.View.Base.LoadingTaskManager.instance().getFailedTasks();
    if (failedTasks.length > 0) {
      this.designloading(true, "contenterror");
    }
  },

  designloading(shouldShow: boolean, loadingType?: string, customMessage?: string): void {
    if (shouldShow) {
      const persistencePlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Persistence);
      
      if (loadingType !== "start" && persistencePlugin.OpenDesignHandler.migrateParams.stage === 0) {
        HSApp.UI.FullScreenLoading.hide();
        this.signalHideLoading?.dispatch({ type: loadingType });
      }

      switch (loadingType) {
        case "start":
          HSApp.UI.FullScreenLoading.show(ResourceManager.getString("load_product_start"));
          break;

        case "completed":
          const completeMessage = ResourceManager.getString("load_product_complete");
          LiveHint.show(completeMessage, LOADING_COMPLETE_DURATION, undefined, {
            status: LiveHint.statusEnum.completed
          });
          break;

        case "contenterror":
          const contentErrorMessage = ResourceManager.getString("load_contents_error");
          LiveHint.show(contentErrorMessage, undefined, () => {
            LiveHint.hide();
          }, {
            canclose: true
          });
          break;

        case "designerror":
          const designErrorMessage = customMessage || ResourceManager.getString("load_design_error");
          LiveHint.show(designErrorMessage, undefined, undefined, {
            status: LiveHint.statusEnum.warning,
            canclose: true
          });
          break;

        case "designerror_deleted":
          const deletedErrorMessage = ResourceManager.getString("load_design_error_deleted");
          LiveHint.show(deletedErrorMessage, undefined, undefined, {
            status: LiveHint.statusEnum.warning,
            canclose: true
          });
          break;

        case "opened":
          const openedMessage = ResourceManager.getString("load_opened");
          LiveHint.show(openedMessage, OPENED_HINT_DURATION, undefined, {
            status: LiveHint.statusEnum.completed
          });

          const currentAssetId = HSApp.Util.Url.getQueryStrings().assetId;
          const storedAssetId = this.getFromStorage("currentAssetId", true);

          if (!currentAssetId || (storedAssetId && storedAssetId !== currentAssetId)) {
            this.setToStorage("currentSelectedHdr", null, true);
            this.setToStorage("beforeSelectedHdr", null, true);
          }

          const currentSelectedHdr = this.getFromStorage("currentSelectedHdr", true);
          const skybox = HSApp.App.getApp().floorplan.skybox;

          if (currentSelectedHdr) {
            currentSelectedHdr.enabled = false;
            skybox.set(currentSelectedHdr);
          }

          skybox.initialSet = true;
          this.setToStorage("currentAssetId", currentAssetId, true);
          break;

        case "openreadonly":
          const readonlyMessage = ResourceManager.getString("open_readonly_design_livehint");
          LiveHint.show(readonlyMessage, READONLY_HINT_DURATION, undefined, {
            canclose: true
          });
          break;
      }
    } else {
      LiveHint.hide();
      HSApp.UI.FullScreenLoading.hide();
    }
  },

  getFromStorage(key: string, isTemp?: boolean): any {
    if (!key) return null;
    
    const storage = new HSApp.Util.Storage("render-plugins-common", {
      temp: isTemp ?? false
    });
    return storage.get(key);
  },

  setToStorage(key: string, value: any, isTemp?: boolean): void {
    if (!key) return;

    const storage = new HSApp.Util.Storage("render-plugins-common", {
      temp: isTemp ?? false
    });

    if (value) {
      const stringValue = typeof value === "string" ? value : JSON.stringify(value);
      storage.set(key, stringValue);
    } else {
      storage.clear(key);
    }
  },

  onDocumentOpened(): void {
    const app = HSApp.App.getApp();
    const designId = app.designMetadata.get("designId");

    if (!designId) return;

    if (HSApp.Util.Design.isReadOnly()) {
      this.designloading(true, "openreadonly");
    } else {
      const designName = app.designMetadata.get("designName");
      const eventTracker = HSApp.Util.EventTrack.instance();

      if (designName === SPECIAL_DESIGN_NAME_1) {
        eventTracker.track(HSApp.Util.EventGroupEnum.NewUserGuide, "special_design_1_for_user_event");
      } else if (designName === SPECIAL_DESIGN_NAME_2) {
        eventTracker.track(HSApp.Util.EventGroupEnum.NewUserGuide, "special_design_2_for_user_event");
      }
    }

    const hasImportParam = app.appParams.getParam("import");
    if (hasImportParam && !this._openDesignFromFloorplanLib) {
      this._openDesignFromFloorplanLib = true;
      this.showUnderlayImage(designId);
    }
  },

  onDocumentResourceLoaded(): void {
    const app = HSApp.App.getApp();
    const persistencePlugin = app?.pluginManager?.getPlugin("hsw.plugin.persistence.Plugin");
    const isLoading = persistencePlugin?.OpenDesignHandler?.loading;

    if (!isLoading) {
      this.designloading(true, "opened");
    }
  },

  showUnderlayImage(designId: string): Promise<void> {
    const apiUrl = `${HSApp.PartnerConfig.EZHOME_SSJ_API_SERVER}roommgr/api/rest/v1.0/design/${designId}`;

    return NWTK.ajax.get(apiUrl, {
      xhrFields: {
        withCredentials: true
      }
    })
    .then((response: AjaxResponse) => {
      const thumbnail = response.data?.item?.thumbnail;
      if (thumbnail) {
        const underlayPlugin = HSApp.App.getApp().pluginManager.getPlugin("hsw.plugin.underlayimg.Plugin");
        underlayPlugin.LoadWebImage(thumbnail);
      }
    })
    .catch((error: unknown) => {
      // Error handling if needed
    });
  }
};