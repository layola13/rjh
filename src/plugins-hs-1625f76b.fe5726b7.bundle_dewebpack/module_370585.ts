import { HSCore } from '635589';
import CrashMonitor from '128513';
import DownloadEntryComponent from '349515';

interface App {
  pluginManager: PluginManager;
  signalAppReady: Signal;
  activeEnvironmentId: string;
  appParams: AppParams;
  errorLogger: ErrorLogger;
}

interface PluginManager {
  getPlugin(type: string): Plugin;
}

interface Plugin {
  signals: {
    signalSigninSucceeded: Signal;
  };
}

interface Signal {}

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

interface ElectronAPI {
  ipcRenderer: {
    send(channel: string, data: unknown): void;
  };
  remote: {
    getCurrentWebContents(): {
      id: number;
    };
  };
}

interface InitOptions {
  app: App;
}

declare global {
  interface Window {
    electron?: ElectronAPI;
    ReactDOM: {
      render(element: unknown, container: Element): void;
    };
    React: {
      createElement(component: unknown): unknown;
    };
    HSApp: {
      App: {
        getApp(): App;
      };
      Config: {
        TENANT: string;
      };
    };
    adskUser: {
      showClientDownloadEntry: boolean;
      isEnterprise: boolean;
    };
    HSFPConstants: {
      PluginType: {
        SignIn: string;
      };
      Environment: {
        Default: string;
      };
    };
  }
}

const CONTAINER_ID = 'client-download-container';
const UI_CONTAINER_SELECTOR = '#ui-container';
const ERROR_FILE_PATH = 'homestyler-tools-web/web/plugin/client/handler.ts';

export default class ClientHandler {
  private app?: App;
  private isDownloadEntryShown = false;

  public init(options: InitOptions): void {
    this.app = options.app;

    if (!this.isDesktopClient()) {
      return;
    }

    const signalHook = new HSCore.Util.SignalHook(this);
    const signInPlugin = this.app.pluginManager.getPlugin(
      window.HSFPConstants.PluginType.SignIn
    );

    signalHook
      .listen(options.app.signalAppReady, this._onSignalWebAppReady)
      .listen(signInPlugin.signals.signalSigninSucceeded, this._onSignInStatusChanged);

    this._monitorCrash(this.app);
  }

  public showDownloadEntry(): void {
    let container = document.querySelector<HTMLDivElement>(`#${CONTAINER_ID}`);

    if (!container) {
      container = document.createElement('div');
      container.id = CONTAINER_ID;
      const uiContainer = document.querySelector(UI_CONTAINER_SELECTOR);
      uiContainer?.append(container);
      window.ReactDOM.render(window.React.createElement(DownloadEntryComponent), container);
    }

    if (!this.isDownloadEntryShown) {
      container.hidden = false;
      this.isDownloadEntryShown = true;
    }
  }

  public hideDownloadEntry(): void {
    const container = document.querySelector<HTMLDivElement>(`#${CONTAINER_ID}`);

    if (container && this.isDownloadEntryShown) {
      container.hidden = true;
      this.isDownloadEntryShown = false;
    }
  }

  public checkDownloadDisplay(): void {
    const app = window.HSApp.App.getApp();
    const isDefaultEnvironment = app.activeEnvironmentId === window.HSFPConstants.Environment.Default;
    const isFPTenant = window.HSApp.Config.TENANT === 'fp';
    const shouldShowEntry = window.adskUser.showClientDownloadEntry;
    const isNotEnterprise = !window.adskUser.isEnterprise;
    const isNotElectron = !window.electron;

    if (isDefaultEnvironment && isFPTenant && shouldShowEntry && isNotEnterprise && isNotElectron) {
      this.showDownloadEntry();
    } else {
      this.hideDownloadEntry();
    }
  }

  private _onSignInStatusChanged(): void {
    try {
      if (this.isDesktopClient()) {
        window.electron!.ipcRenderer.send('SignInSucceed', {
          SignInSucceed: true
        });
      }
    } catch (error) {
      const errorMessage = 'plugin client api send SignInSucceed error';
      this.app?.errorLogger.push(errorMessage, {
        errorStack: new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: error,
          path: {
            file: ERROR_FILE_PATH,
            functionName: '_onSignInStatusChanged()'
          }
        }
      });
    }
  }

  private _onSignalWebAppReady(): void {
    try {
      if (this.isDesktopClient()) {
        const electron = window.electron!;
        const pageId = this.app!.appParams.pageId;
        const webContentId = electron.remote.getCurrentWebContents().id;

        electron.ipcRenderer.send('SignalWebAppReady', {
          SignalWebAppReady: true,
          idObj: {
            pageId,
            webContentId
          }
        });
      }
    } catch (error) {
      const errorMessage = 'plugin client api send SignalWebAppReady error';
      this.app?.errorLogger.push(errorMessage, {
        errorStack: new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: error,
          path: {
            file: ERROR_FILE_PATH,
            functionName: '_onSignalWebAppReady()'
          }
        }
      });
    }
  }

  private isDesktopClient(): boolean {
    return !!window.electron;
  }

  private _monitorCrash(app: App): void {
    new CrashMonitor({ app }).monitor();
  }
}