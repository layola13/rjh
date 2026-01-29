interface App {
  cmdManager: {
    signalCommandStarted: any;
  };
  activeView: {
    name: string;
  };
  getActive3DView(): {
    renderingMgr: {
      getRenderTime(): number;
    };
  } | null;
  floorplan: {
    designMetadata: Map<string, string>;
  };
  designMetadata: Map<string, string>;
  selectionManager: {
    selected(): Array<{ ID: string }>;
  };
  activeEnvironmentId: string;
  getWebglInfo(): {
    graphicsCard: string;
    webglName: string;
  };
}

interface Logger {
  info(message: string, flag: boolean): void;
  silence: boolean;
}

interface CommandData {
  cmd: string;
  startTime: string;
}

interface ClientData {
  [key: string]: any;
}

interface GraphicsConfig {
  webglName: string;
  graphicsCardName: string;
}

interface MachineInfo {
  [key: string]: any;
}

interface MetricsInfo {
  memory(): any;
  graphics(): any;
}

declare global {
  interface Window {
    electron?: {
      ipcRenderer: {
        on(channel: string, callback: (event: any, data: any) => void): void;
      };
    };
    publishVersion?: string;
    publishVersionByType?: any;
  }
  const log: {
    logger(name: string): Logger;
  };
  const HSCore: {
    Util: {
      SignalHook: new (context: any) => {
        listen(signal: any, handler: Function): void;
      };
    };
  };
  const adskUser: {
    uid: string;
    sid: string;
  };
}

class MetricsInfoClass implements MetricsInfo {
  constructor(app: App) {}
  
  memory(): any {
    return {};
  }
  
  graphics(): any {
    return {};
  }
}

export default class PerformanceMetrics {
  private _app: App;
  private logger: Logger;
  private eventLogger: Logger;
  private metricsInfo: MetricsInfo;
  private _cmdArray: CommandData[];
  private _graphicsConfig: GraphicsConfig | null;
  private _clientData: ClientData | null;
  private _machineInfo: string;

  constructor(app: App) {
    this._app = app;
    this.logger = log.logger("hsw.metrics.performance");
    this.logger.silence = true;
    this.eventLogger = log.logger("hsw.metrics.behavior");
    this.eventLogger.silence = true;
    this.metricsInfo = new MetricsInfoClass(app);

    const signalHook = new HSCore.Util.SignalHook(this);
    this._cmdArray = [];
    this._graphicsConfig = null;
    this._clientData = null;
    this._machineInfo = this._getMachineInfo();
    this._getGraphicsConfig();
    
    signalHook.listen(
      this._app.cmdManager.signalCommandStarted,
      this._onCommandRunning
    );

    if (window.electron) {
      const ipcRenderer = window.electron.ipcRenderer;
      const channel = `${window.location.origin}/fpsCpuData`;
      ipcRenderer.on(channel, (_event: any, data: ClientData) => {
        this._clientData = data;
      });
    }
  }

  log(fps: number): void {
    const viewName = this._app.activeView.name;
    const activeView = this._app.getActive3DView();
    const renderTime = activeView?.renderingMgr.getRenderTime();

    const logData = {
      cmd: this._cmdArray,
      userId: adskUser.uid,
      assetId: this._app.floorplan.designMetadata.get("designId"),
      browsersInfo: navigator.userAgent,
      machineInfo: this._machineInfo,
      graphicsConfig: this._graphicsConfig,
      fps: fps,
      renderTime: renderTime,
      view: viewName,
      memory: this.metricsInfo.memory(),
      graphics: this.metricsInfo.graphics(),
      selected: this._app.selectionManager.selected().map((item) => item.ID),
      publishVersion: window.publishVersion,
      publishVersionByType: window.publishVersionByType,
      environmentId: this._app.activeEnvironmentId,
      clientData: {} as ClientData,
    };

    if (this._clientData) {
      logData.clientData = this._clientData;
    }

    this.logger.info(JSON.stringify(logData), true);
  }

  logCommand(commandList: string[]): void {
    const eventData = {
      commandlist: commandList,
      timestamp: new Date(Date.now()),
      sessionId: adskUser.sid,
      userId: adskUser.uid,
      designId: this._app.designMetadata.get("designId"),
    };

    this.eventLogger.info(JSON.stringify(eventData), true);
  }

  private _onCommandRunning(eventData: { data: { cmd: { type: string } } }): void {
    this._cmdArray.unshift({
      cmd: eventData.data.cmd.type,
      startTime: new Date().toISOString(),
    });

    const MAX_COMMAND_HISTORY = 5;
    if (this._cmdArray.length > MAX_COMMAND_HISTORY) {
      this._cmdArray.length = MAX_COMMAND_HISTORY;
    }
  }

  private _getGraphicsConfig(): void {
    try {
      if (!this._graphicsConfig) {
        const webglInfo = this._app.getWebglInfo();
        this._graphicsConfig = {
          webglName: webglInfo.graphicsCard,
          graphicsCardName: webglInfo.webglName,
        };
      }
    } catch (error) {
      // Silently handle error
    }
  }

  private _getMachineInfo(): string {
    const match = /\(([^()]+)\)/g.exec(navigator.userAgent);
    let machineInfo = match?.[0] ?? "";
    machineInfo = machineInfo.substr(1, machineInfo.length - 2);
    return machineInfo;
  }
}