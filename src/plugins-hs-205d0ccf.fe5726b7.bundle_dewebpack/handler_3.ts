interface App {
  activeEnvironmentId: string;
  designMetadata: {
    get(key: string): boolean;
    set(key: string, value: boolean): void;
  };
  selectionManager: {
    unselectAll(): void;
  };
  userTrackLogger: {
    push(event: string, data: TrackingData, options?: Record<string, unknown>): void;
  };
}

interface Context {
  app: App;
}

interface InitParams {
  context: Context;
  dependencies: Record<string, ContextualToolsPlugin | undefined>;
}

interface ContextualToolsPlugin {
  signalPopulateStatusBar: {
    listen(callback: (event: PopulateStatusBarEvent) => void, context: unknown): void;
  };
}

interface PopulateStatusBarEvent {
  data: StatusBarData;
}

interface StatusBarData {
  rightItems: StatusBarItemCollection;
}

interface StatusBarItemCollection {
  xInsertCollection(index: number, items: StatusBarItem[]): void;
}

interface StatusBarItem {
  id: string;
  type: string;
  order: number;
  data: StatusBarItemData;
}

interface StatusBarItemData {
  id: string;
  className: string;
  position: string;
  getValue: () => boolean;
  getImgStr: () => string;
  getText: () => string;
  onClick: () => void;
}

interface TrackingData {
  activeSection: string;
  activeSectionName: string;
  description: string;
  argInfo: {
    isSizeLimitUnlock: boolean;
  };
}

declare const HSFPConstants: {
  PluginType: {
    ContextualTools: string;
  };
  Environment: {
    Default: string;
    NCustomizedBackgroundWall: string;
    NCustomizedCeilingModel: string;
    NCustomizedPlatform: string;
    AddRoofEnv: string;
  };
};

declare const StatusBarItemTypeEnum: {
  SizeLimitWidget: string;
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const HSApp: {
  Util: {
    EventGroupEnum: {
      Statusbar: string;
    };
  };
};

export class Handler {
  private app?: App;

  init(params: InitParams): void {
    this.app = params.context.app;
    const contextualTools = params.dependencies[HSFPConstants.PluginType.ContextualTools];
    
    if (contextualTools) {
      contextualTools.signalPopulateStatusBar.listen(this.onPopulateStatusBar, this);
    }
  }

  private onPopulateStatusBar(event: PopulateStatusBarEvent): void {
    const data = event.data;
    
    if (!this.app) {
      return;
    }

    const allowedEnvironments = [
      HSFPConstants.Environment.Default,
      HSFPConstants.Environment.NCustomizedBackgroundWall,
      HSFPConstants.Environment.NCustomizedCeilingModel,
      HSFPConstants.Environment.NCustomizedPlatform,
      HSFPConstants.Environment.AddRoofEnv
    ];

    if (allowedEnvironments.includes(this.app.activeEnvironmentId)) {
      const rightItems = data.rightItems;
      const statusBarItems = this.initStatusBarItems();
      rightItems.xInsertCollection(0, statusBarItems);
    }
  }

  private initStatusBarItems(): StatusBarItem[] {
    return [{
      id: "sizeLimitWidget",
      type: StatusBarItemTypeEnum.SizeLimitWidget,
      order: 10,
      data: {
        id: "sizeLimitButton",
        className: "size-limit-button",
        position: "rightFloat",
        getValue: (): boolean => {
          return this.app?.designMetadata.get("sizeLimitUnlock") ?? false;
        },
        getImgStr: (): string => {
          return this.app?.designMetadata.get("sizeLimitUnlock") 
            ? "hs_mian_jiesuo" 
            : "hs_mian_suoguanbi";
        },
        getText: (): string => {
          return this.app?.designMetadata.get("sizeLimitUnlock")
            ? ResourceManager.getString("size_limit_unlock")
            : ResourceManager.getString("size_limit_lock");
        },
        onClick: (): void => {
          if (!this.app) {
            return;
          }

          const currentUnlockState = this.app.designMetadata.get("sizeLimitUnlock");
          const newUnlockState = !currentUnlockState;
          
          this.app.designMetadata.set("sizeLimitUnlock", newUnlockState);
          this.app.selectionManager.unselectAll();
          this.app.userTrackLogger.push("size.limit.unlock", {
            activeSection: HSApp.Util.EventGroupEnum.Statusbar,
            activeSectionName: "状态栏",
            description: "属性栏-尺寸限制",
            argInfo: {
              isSizeLimitUnlock: newUnlockState
            }
          }, {});
        }
      }
    }];
  }
}