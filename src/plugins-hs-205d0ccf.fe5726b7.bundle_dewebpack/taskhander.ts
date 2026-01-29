import { TaskConfig } from './TaskConfig';
import { TaskTemplate } from './TaskTemplate';
import { getConfig, isTaskLegal } from './TaskUtils';

interface QueryStrings {
  taskcode?: string;
  [key: string]: string | undefined;
}

interface WelcomePlugin {
  setShowWelcome(show: boolean): void;
  showWelcome(): void;
  disableWalkthrough(): void;
}

interface GuidePlugin {
  handler: {
    setDisableGuide(disable: boolean): void;
  };
}

interface PluginManager {
  getPlugin(type: string): any;
}

interface App {
  pluginManager: PluginManager;
  signalDocumentOpened: {
    listen(callback: () => void): void;
  };
}

declare const HSCore: any;
declare const HSApp: {
  Config: {
    TENANT: string;
  };
  Util: {
    Url: {
      getQueryStrings(): QueryStrings;
    };
  };
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  PluginType: {
    Welcome: string;
    Guide: string;
  };
};

interface Task {
  taskCode: string;
  showWelcome?: boolean;
  preLoad?(): void;
  loadTask?(): void;
  showHint?(): void;
  nextStep?(step: any): void;
}

export class TaskHander {
  private _config: Map<string, TaskConfig>;
  public configReadySignal: any;
  private _documentOpened: boolean;
  private _configReady: boolean;

  constructor() {
    this._config = new Map();
    this.configReadySignal = new HSCore.Util.Signal();
    this._documentOpened = false;
    this._configReady = false;

    if (HSApp.Config.TENANT === 'fp') {
      getConfig().then((configData) => {
        if (configData) {
          Object.keys(configData).forEach((key) => {
            const taskConfig = TaskConfig.load(configData[key]);
            this._config.set(key, taskConfig);
          });
          this._configReady = true;
          this._handleDom();
          this.configReadySignal.dispatch();
        }
      });
    }
  }

  get config(): Map<string, TaskConfig> {
    return this._config;
  }

  public getDefaultTaskConfig(): TaskConfig | null {
    const taskCode = HSApp.Util.Url.getQueryStrings().taskcode;
    return taskCode ? this.getTaskConfig(taskCode) : null;
  }

  public getTaskConfig(taskCode: string): TaskConfig | undefined {
    return this._config.get(taskCode);
  }

  public init(): void {
    if (isTaskLegal()) {
      let initialized = false;
      this._disableWelcome();
      HSApp.App.getApp().signalDocumentOpened.listen(() => {
        if (!initialized) {
          initialized = true;
          this._documentOpened = true;
          this._handleDom();
        }
      });
    }
  }

  private _disableWelcome(): void {
    if (HSApp.Util.Url.getQueryStrings().taskcode) {
      const welcomePlugin: WelcomePlugin = HSApp.App.getApp().pluginManager.getPlugin(
        HSFPConstants.PluginType.Welcome
      );
      welcomePlugin.setShowWelcome(false);

      let container = document.getElementsByClassName('welcomecontainer')[0] as HTMLElement;
      welcomePlugin.disableWalkthrough();

      container = document.getElementsByClassName('walkthrough-container')[0] as HTMLElement;
      if (container) {
        container.style.display = 'none';
      }

      const guidePlugin: GuidePlugin = HSApp.App.getApp().pluginManager.getPlugin(
        HSFPConstants.PluginType.Guide
      );
      guidePlugin.handler.setDisableGuide(true);

      const guideContainer = document.getElementsByClassName('guideSystem')[0] as HTMLElement;
      if (guideContainer) {
        guideContainer.style.display = 'none';
      }
    }
  }

  private _handleDom(): void {
    const taskCode = HSApp.Util.Url.getQueryStrings().taskcode;
    if (taskCode && this._configReady && this._documentOpened) {
      const app = HSApp.App.getApp();
      const taskConfig = this.getTaskConfig(taskCode);

      if (taskConfig) {
        const welcomePlugin: WelcomePlugin = app.pluginManager.getPlugin(
          HSFPConstants.PluginType.Welcome
        );
        if (taskConfig.showWelcome) {
          welcomePlugin.showWelcome();
        }
      }
    }
  }

  private _getTargetTask(): Task | undefined {
    const taskCode = HSApp.Util.Url.getQueryStrings().taskcode;
    if (taskCode) {
      return TaskTemplate.find((task: Task) => task.taskCode === taskCode);
    }
    return undefined;
  }

  public loadTaskCenter(): void {
    const task = this._getTargetTask();
    if (task) {
      task.preLoad?.();
      task.loadTask?.();
      task.showHint?.();
    }
  }

  public nextStep(step: any): void {
    const task = this._getTargetTask();
    if (task) {
      task.nextStep?.(step);
    }
  }
}