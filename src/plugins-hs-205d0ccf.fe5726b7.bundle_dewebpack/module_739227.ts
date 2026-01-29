interface DesignJSON {
  ignoreMixPaintTextureURI?: boolean;
  ignoreUnderlay?: boolean;
  encrypt?: boolean;
}

interface DesignMetadata {
  get(key: string): string | undefined;
  set(key: string, value: string): void;
  setValue(key: string, value: string): void;
  flush(): void;
}

interface Floorplan {
  saveToJSON(options: DesignJSON): unknown;
  designMetadata: DesignMetadata;
}

interface ErrorInfo {
  info: unknown;
  path: {
    file: string;
    functionName: string;
  };
}

interface ErrorLogger {
  push(message: string, details: {
    errorStack: Error;
    description: string;
    errorInfo: ErrorInfo;
  }): void;
}

interface Signal {
  dispatch(payload: { isSave: boolean }): void;
}

interface SpaceRebuildPlugin {
  signalSaveOriginDesign?: Signal;
}

interface PluginManager {
  getPlugin(pluginType: string): SpaceRebuildPlugin;
}

interface PersistencePlugin {
  saveFloorplan(floorplan: Floorplan, sync: boolean): Promise<boolean>;
}

interface DocumentResult {
  floorplan: Floorplan;
}

interface DocumentManager {
  newDocument(
    designData: unknown,
    metadata: DocumentMetadata,
    designId: string,
    sync: boolean
  ): Promise<DocumentResult>;
}

interface DocumentMetadata {
  designId: string;
  mainAssetId: string | undefined;
  assetType: number;
  userId: string | undefined;
  designName: string | undefined;
}

interface App {
  floorplan: Floorplan;
  errorLogger: ErrorLogger;
  pluginManager: PluginManager;
  docManager: DocumentManager;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  PluginType: {
    SpaceRebuild: string;
    Persistence: string;
  };
};

interface SaveResult {
  isSave: boolean;
  error?: unknown;
}

class SpaceRebuildSave {
  private readonly _app: App;

  constructor() {
    this._app = HSApp.App.getApp();
  }

  private _dumpCurrentDesign(): unknown | undefined {
    let designData: unknown | undefined;
    try {
      designData = this._app.floorplan.saveToJSON({
        ignoreMixPaintTextureURI: true,
        ignoreUnderlay: true,
        encrypt: false
      });
    } catch (error) {
      console.error(error);
      const errorMessage = "[Plugin spacerebuild] - floorplan: save to json error ";
      this._app.errorLogger.push(errorMessage, {
        errorStack: new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: error,
          path: {
            file: "homestyler-tools-web/web/plugin/spacerebuild/core/save.origin.js",
            functionName: "_dumpCurrentDesign()"
          }
        }
      });
    }
    return designData;
  }

  async save(designId: string): Promise<SaveResult | void> {
    const currentDesignData = this._dumpCurrentDesign();
    if (!currentDesignData) {
      return Promise.resolve();
    }

    const signal = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.SpaceRebuild).signalSaveOriginDesign;

    return new Promise<SaveResult>((resolve, reject) => {
      const currentFloorplan = this._app.floorplan;
      const currentMetadata = currentFloorplan.designMetadata;
      
      const documentMetadata: DocumentMetadata = {
        designId,
        mainAssetId: currentMetadata.get("designId"),
        assetType: 7,
        userId: currentMetadata.get("userId"),
        designName: currentMetadata.get("designName")
      };

      this._app.docManager.newDocument(currentDesignData, documentMetadata, designId, false)
        .then((result) => {
          const newFloorplan = result.floorplan;
          const threeDThumbnail = currentMetadata.get("threeDThumbnail") ?? currentMetadata.get("image3d");
          
          if (threeDThumbnail) {
            newFloorplan.designMetadata.set("threeDThumbnail", threeDThumbnail);
          }

          const persistencePlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence) as unknown as PersistencePlugin;
          
          persistencePlugin.saveFloorplan(newFloorplan, false)
            .then((isSaved) => {
              const success = !!isSaved;
              
              if (success) {
                const newDesignId = newFloorplan.designMetadata.get("designId");
                if (newDesignId) {
                  currentFloorplan.designMetadata.setValue("originalAccessoryAssetId", newDesignId);
                  currentFloorplan.designMetadata.flush();
                }
                resolve({ isSave: success });
              }

              signal?.dispatch({ isSave: success });
              reject({ isSave: success });
            })
            .catch((error) => {
              console.error(error);
              signal?.dispatch({ isSave: false });
              reject({ error });
            });
        });
    });
  }
}

export default new SpaceRebuildSave();