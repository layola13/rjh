import { HSApp } from './HSApp';
import { Handler } from './Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginDependencies {
  [key: string]: unknown;
}

interface PluginActivationContext {
  app: HSApp;
}

interface HandlerInitConfig {
  app: HSApp;
  dependencies: PluginDependencies;
}

interface MarkingHistoryEntry {
  timestamp: Date;
  [key: string]: unknown;
}

const PLUGIN_NAME = "MarkingSystem Plugin";
const PLUGIN_DESCRIPTION = "marking system for toolbar";

class MarkingSystemPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;
  private _signalHook: HSCore.Util.SignalHook;
  private _app: HSApp;
  public signalMarkingToLog: unknown;

  constructor() {
    const config: PluginConfig = {
      name: PLUGIN_NAME,
      description: PLUGIN_DESCRIPTION,
      dependencies: [HSFPConstants.PluginType.Persistence]
    };

    super(config);

    this._handler = new Handler();
    this.signalMarkingToLog = this._handler.signalMarkingToLog;
    this._signalHook = new HSCore.Util.SignalHook(this);
  }

  private handleSaveSuccess = (): void => {
    const activeEnvironmentId = this._app.environmentManager.activeEnvironmentId;
    const storage = new HSApp.Util.Storage(HSFPConstants.PluginType.MarkingSystem);
    const lastMarkingTime = storage.get("Last_Marking_Time");
    const lastMarkingDate = lastMarkingTime ? new Date(lastMarkingTime) : null;
    const currentDate = new Date(Date.now());

    const shouldOpenPanel = 
      (!lastMarkingDate || currentDate > lastMarkingDate) &&
      (activeEnvironmentId === HSFPConstants.Environment.TPZZ || 
       activeEnvironmentId === HSFPConstants.Environment.TPZZCabinet);

    if (shouldOpenPanel) {
      this.openMarkingSystemPanel();
    }
  };

  public onActive(context: PluginActivationContext, dependencies: PluginDependencies): void {
    super.onActive(context, dependencies);

    this._app = context.app;
    this._handler.init({
      app: this._app,
      dependencies: dependencies
    });

    const persistencePlugin = context.app.pluginManager.getPlugin(
      HSFPConstants.PluginType.Persistence
    );

    this._signalHook.listen(
      persistencePlugin.signalSaveSucceeded,
      this.handleSaveSuccess
    );
  }

  public onDeactive(): void {
    // Cleanup logic can be added here
  }

  public addMarkingHistory(entry: MarkingHistoryEntry): void {
    this._handler.addMarkingHistory(entry);
  }

  public getMarkingHistory(): MarkingHistoryEntry[] {
    return this._handler.getMarkingHistory();
  }

  public openMarkingSystemPanel(): void {
    this._handler.renderCaseEntry();
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.MarkingSystem,
  MarkingSystemPlugin,
  () => {}
);