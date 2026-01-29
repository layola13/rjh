import { HSCore } from './path-to-hscore';
import { HomeGPTEntry } from './home-gpt-entry';
import { Storage } from './storage';
import { CmdHomeGptSmartLayout, ApplyTypeEnum } from './cmd-home-gpt-smart-layout';

interface AppInstance {
  pluginManager: PluginManager;
  environmentManager: EnvironmentManager;
  cmdManager: CommandManager;
}

interface PluginManager {
  getPlugin(name: string): Plugin;
}

interface EnvironmentManager {
  signalEnvironmentActivated: Signal;
}

interface CommandManager {
  register(commands: Array<[string, unknown]>): void;
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  complete(command: Command): void;
}

interface Plugin {
  signalCheckPermissionsCompleted?: Signal;
  getHandler(): RenderHandler | null;
  getImageType(): string;
}

interface RenderHandler {
  onRenderTypeChangeSignal: Signal;
}

interface Signal {
  // Signal interface placeholder
}

interface Command {
  // Command interface placeholder
}

interface EnvironmentActivatedData {
  data: {
    newEnvironmentId: string;
  };
}

interface RenderTypeChangedData {
  data: {
    renderType: string;
  };
}

interface Room {
  // Room interface placeholder
}

interface UndoData {
  // UndoData interface placeholder
}

interface ProxyObjectsMap {
  // ProxyObjectsMap interface placeholder
}

declare const HSApp: {
  Config: {
    TENANT: string;
  };
  ABManager: {
    register(config: ABTestConfig): void;
  };
  Util: {
    ImportUtil: {
      collectRestoreData(data: unknown[]): UndoData;
    };
  };
};

declare const HSFPConstants: {
  Environment: {
    Render: string;
    Default: string;
  };
  CommandType: {
    HomeGptSmartLayout: string;
    CmdRestoreTemplate: string;
  };
};

declare const adskUser: {
  agentId: string | null;
  isEnterpriseAgent: boolean;
};

declare const ReactDOM: {
  render(element: unknown, container: HTMLElement): void;
};

declare const React: {
  createElement(component: unknown, props: unknown): unknown;
};

interface ABTestConfig {
  scene: string;
  buckets: string[];
  notFetch: boolean;
  describe: string;
  default: string;
  onLoad: (result: { bucket: string } | null) => void;
}

interface InitConfig {
  app: AppInstance;
}

export default class HomeGPTPlugin {
  signalHook?: HSCore.Util.SignalHook;
  queryTerminateSignal?: HSCore.Util.Signal;
  app?: AppInstance;
  _storage?: Storage;
  bucket: string = "B";
  loginLoaded: boolean = false;

  init(config: InitConfig): void {
    this.app = config.app;
    this.queryTerminateSignal = new HSCore.Util.Signal(this);

    const firstLoginPlugin = this.app.pluginManager.getPlugin("hsw.brand.ezhome.firstlogin.Plugin");
    this.signalHook = new HSCore.Util.SignalHook(this);
    
    this.signalHook
      .listen(firstLoginPlugin.signalCheckPermissionsCompleted, () => {
        this.loginLoaded = true;
        this.createEntry();
      })
      .listen(this.app.environmentManager.signalEnvironmentActivated, this.onEnvironmentActivated);

    this._storage = new Storage();
    this.registerCmd();

    if (HSApp.Config.TENANT === "ezhome") {
      this.createEntry();
    } else {
      this.getAICopilotABTest();
    }
  }

  getAICopilotABTest(): void {
    HSApp.ABManager.register({
      scene: "abRAICopilotCountry",
      buckets: ["A", "B"],
      notFetch: HSApp.Config.TENANT !== "fp",
      describe: "AI Desgin Copilot",
      default: "B",
      onLoad: (result) => {
        if (result?.bucket === "A") {
          this.bucket = "A";
          this.createEntry();
        }
      }
    });
  }

  createEntry(): void {
    if (document.getElementById("homegpt-container")) {
      return;
    }

    if (HSApp.Config.TENANT !== "fp" || 
        (this.bucket === "A" && this.loginLoaded && !adskUser.agentId && !adskUser.isEnterpriseAgent)) {
      const pluginContainer = document.querySelector("#plugin-container");
      const container = document.createElement("div");
      container.id = "homegpt-container";
      pluginContainer?.appendChild(container);
      ReactDOM.render(React.createElement(HomeGPTEntry, null), container);
    }
  }

  onEnvironmentActivated = (event: EnvironmentActivatedData): void => {
    const newEnvironmentId = event.data.newEnvironmentId;
    this.setVisibility(
      newEnvironmentId && 
      [HSFPConstants.Environment.Render, HSFPConstants.Environment.Default].includes(newEnvironmentId)
    );

    const renderPlugin = this.app?.pluginManager.getPlugin("hsw.plugin.render.Plugin");
    const renderHandler = renderPlugin?.getHandler();
    const onRenderTypeChangeSignal = renderHandler?.onRenderTypeChangeSignal;

    if (onRenderTypeChangeSignal) {
      if (newEnvironmentId === HSFPConstants.Environment.Render) {
        this.signalHook?.listen(onRenderTypeChangeSignal, this.onRenderTypeChanged);
        this.setVisibility(renderPlugin.getImageType() !== "4");
      } else {
        this.signalHook?.unlisten(onRenderTypeChangeSignal, this.onRenderTypeChanged);
      }
    }
  }

  onRenderTypeChanged = (event: RenderTypeChangedData): void => {
    this.setVisibility(event.data.renderType !== "video");
  }

  setVisibility(visible: boolean): void {
    const container = document.getElementById("homegpt-container");
    
    if (!container) {
      return;
    }

    if (visible) {
      if (container.style.display !== "block") {
        container.style.display = "block";
      }
    } else {
      if (container.style.display !== "none") {
        container.style.display = "none";
      }
    }
  }

  getSignalHook(): HSCore.Util.SignalHook | undefined {
    return this.signalHook;
  }

  uninit(): void {
    this.signalHook?.unlistenAll();
  }

  registerCmd(): void {
    this.app?.cmdManager.register([
      [HSFPConstants.CommandType.HomeGptSmartLayout, CmdHomeGptSmartLayout]
    ]);
  }

  collectRestoreData(rooms: Room[]): void {
    if (!this._storage) {
      return;
    }
    
    this._storage.rooms = rooms;
    this._storage.undoData = HSApp.Util.ImportUtil.collectRestoreData([]);
  }

  onSmartLayout(layoutData: unknown): void {
    if (!this.app || !this._storage) {
      return;
    }

    const command = this.app.cmdManager.createCommand(
      HSFPConstants.CommandType.HomeGptSmartLayout,
      [this.app, ApplyTypeEnum.All, this._storage, layoutData]
    );
    this.app.cmdManager.execute(command);
  }

  restoreLayout(): void {
    if (!this.app || !this._storage) {
      return;
    }

    if (this._storage.rooms && this._storage.rooms.length > 0) {
      this._storage.rooms.forEach((room) => {
        const command = this.app!.cmdManager.createCommand(
          HSFPConstants.CommandType.CmdRestoreTemplate,
          [this.app, this._storage!.undoData, room, this._storage!.proxyObjectsMap]
        );
        this.app!.cmdManager.execute(command);
        this.app!.cmdManager.complete(command);
      });
    } else {
      const command = this.app.cmdManager.createCommand(
        HSFPConstants.CommandType.CmdRestoreTemplate,
        [this.app, this._storage.undoData, undefined, this._storage.proxyObjectsMap]
      );
      this.app.cmdManager.execute(command);
      this.app.cmdManager.complete(command);
    }
  }

  queryTerminate(): HSCore.Util.Signal | undefined {
    return this.queryTerminateSignal;
  }
}