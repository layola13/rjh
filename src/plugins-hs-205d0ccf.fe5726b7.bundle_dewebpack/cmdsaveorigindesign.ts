export const CmdSaveOriginDesignName = "hsw.plugin.spacerebuild.cmdsavedesign";

interface DesignJSON {
  ignoreMixPaintTextureURI: boolean;
  ignoreUnderlay: boolean;
  encrypt: boolean;
}

interface SaveOptions {
  ignoreMixPaintTextureURI: boolean;
  ignoreUnderlay: boolean;
  encrypt: boolean;
}

interface ErrorInfo {
  info: unknown;
  path: {
    file: string;
    functionName: string;
  };
}

interface ErrorLoggerOptions {
  errorStack: Error;
  description: string;
  errorInfo: ErrorInfo;
}

interface APIError {
  error?: {
    error?: string;
  };
}

interface LiveHintOptions {
  status: string;
}

declare const HSApp: {
  App: {
    getApp(): {
      floorplan: {
        saveToJSON(options: SaveOptions): unknown;
        designMetadata: {
          get(key: string): string;
        };
      };
      errorLogger: {
        push(message: string, options: ErrorLoggerOptions): void;
      };
    };
  };
  Cmd: {
    Command: new () => {
      mgr: {
        complete(cmd: unknown): void;
      };
    };
  };
  Util: {
    EventTrack: {
      instance(): {
        track(group: string, action: string, params: Record<string, unknown>): void;
      };
    };
    EventGroupEnum: {
      Toolbar: string;
    };
  };
};

declare const LiveHint: {
  statusEnum: {
    loading: string;
    completed: string;
    warning: string;
  };
  show(message: string, duration?: number, extra?: unknown, options?: LiveHintOptions): void;
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare namespace DesignSaver {
  function save(accessoryAssetId: string): Promise<void>;
}

export class CmdSaveOriginDesign extends HSApp.Cmd.Command {
  private _app: ReturnType<typeof HSApp.App.getApp>;

  constructor() {
    super();
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
      const errorMessage = "[Plugin spacerebuild]: dump current design error";
      
      this._app.errorLogger.push(errorMessage, {
        errorStack: new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: error,
          path: {
            file: "homestyler-tools-web/web/plugin/spacerebuild/command/cmdsaveorigindesign.js",
            functionName: "_dumpCurrentDesign()"
          }
        }
      });
    }
    
    return designData;
  }

  async onExecute(): Promise<void> {
    const { floorplan } = this._app;
    const { designMetadata } = floorplan;
    const originalAccessoryAssetId = designMetadata.get("originalAccessoryAssetId");
    
    this._showLiveHint(LiveHint.statusEnum.loading);
    
    DesignSaver.save(originalAccessoryAssetId)
      .then(() => {
        this._showLiveHint(LiveHint.statusEnum.completed);
      })
      .catch((error: APIError) => {
        if (error?.error?.error === "FAIL_BIZ_PERMISSION_DENIED") {
          this._showLiveHint("FAIL_BIZ_PERMISSION_DENIED");
          return;
        }
        this._showLiveHint(LiveHint.statusEnum.warning);
      });
    
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Toolbar,
      "toolbar_save_origin_layout",
      {
        designId: designMetadata.get("designId")
      }
    );
    
    this.mgr.complete(this);
  }

  private _showLiveHint(status: string): void {
    const MSG_IN_PROGRESS = ResourceManager.getString("plugin_spacerebuild_save_origin_design_inprogress");
    const MSG_SUCCESS = ResourceManager.getString("plugin_spacerebuild_save_origin_design_success");
    const MSG_FAIL = ResourceManager.getString("plugin_spacerebuild_save_origin_design_fail");
    const MSG_PERMISSION_DENIED = ResourceManager.getString("load_design_notAllow");
    
    const DURATION_SUCCESS = 3000;
    const DURATION_ERROR = 5000;
    
    switch (status) {
      case LiveHint.statusEnum.loading:
        LiveHint.show(MSG_IN_PROGRESS, undefined, undefined, { status });
        break;
      
      case LiveHint.statusEnum.completed:
        LiveHint.show(MSG_SUCCESS, DURATION_SUCCESS, undefined, { status });
        break;
      
      case LiveHint.statusEnum.warning:
        LiveHint.show(MSG_FAIL, DURATION_ERROR, undefined, { status });
        break;
      
      case "FAIL_BIZ_PERMISSION_DENIED":
        LiveHint.show(MSG_PERMISSION_DENIED, DURATION_ERROR, undefined, {
          status: LiveHint.statusEnum.warning
        });
        break;
    }
  }

  getDescription(): string {
    return "保存为原始户型";
  }
}