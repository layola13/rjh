interface App {
  userTrackLogger: UserTrackLogger;
  appParams: AppParams;
  errorLogger: ErrorLogger;
}

interface UserTrackLogger {
  getStoreLog(limit: number): unknown[];
}

interface AppParams {
  pageId: string;
}

interface ErrorLogger {
  push(message: string, details: ErrorDetails): void;
}

interface ErrorDetails {
  errorStack: Error;
  description: string;
  errorInfo: {
    info: unknown;
    path: {
      file: string;
      functionName: string;
    };
  };
}

interface MonitorHeartbeatPayload {
  type: string;
  pageId: string;
  logServer: string;
  userTrackLogs: unknown[];
}

interface MonitorPagePayload {
  pageId: string;
  hidden?: boolean;
}

interface IpcRenderer {
  send(channel: string, payload: MonitorHeartbeatPayload | MonitorPagePayload): void;
}

interface MonitorCrashConfig {
  app: App;
}

declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRenderer;
    };
  }
  
  const HSApp: {
    Config: {
      LOG_SERVICE_API_SERVER: string;
    };
  };

  interface Document {
    msHidden?: boolean;
    webkitHidden?: boolean;
  }
}

const HEARTBEAT_INTERVAL = 5000;
const LOG_LIMIT = 30;

class MonitorCrash {
  private _userTrackLogger: UserTrackLogger;
  private _pageId: string;
  private _ipcRenderer: IpcRenderer;
  private _app: App;

  constructor(config: MonitorCrashConfig) {
    const { app } = config;
    this._app = app;
    this._userTrackLogger = app.userTrackLogger;
    this._pageId = app.appParams.pageId;
    this._ipcRenderer = window.electron.ipcRenderer;
  }

  public monitor(): void {
    const logServer = HSApp.Config.LOG_SERVICE_API_SERVER;

    const sendHeartbeat = (): void => {
      try {
        const userTrackLogs = this._userTrackLogger.getStoreLog(LOG_LIMIT);
        this._ipcRenderer.send("monitor:heartbeat", {
          type: "monitor",
          pageId: this._pageId,
          logServer,
          userTrackLogs: JSON.parse(JSON.stringify(userTrackLogs))
        });
      } catch (error) {
        this.handleHeartbeatError(error);
      }
    };

    window.addEventListener("beforeunload", () => {
      this._ipcRenderer.send("monitor:beforeunload", {
        pageId: this._pageId
      });
    });

    document.addEventListener("visibilitychange", () => {
      this._ipcRenderer.send("monitor:visibilitychange", {
        pageId: this._pageId,
        hidden: document.hidden || document.msHidden || document.webkitHidden
      });
    });

    setInterval(() => {
      sendHeartbeat();
    }, HEARTBEAT_INTERVAL);
  }

  private handleHeartbeatError(error: unknown): void {
    const errorMessage = "plugin client api send heartbeat error";
    this._app.errorLogger.push(errorMessage, {
      errorStack: new Error(errorMessage),
      description: errorMessage,
      errorInfo: {
        info: error,
        path: {
          file: "homestyler-tools-web/web/plugin/client/monitorCrash.ts",
          functionName: "monitor()"
        }
      }
    });
  }
}

export default MonitorCrash;