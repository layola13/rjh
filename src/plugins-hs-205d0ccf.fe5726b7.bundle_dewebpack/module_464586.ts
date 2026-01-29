import { IPlugin } from 'HSApp.Plugin';
import { CmdAddRecommendAccessories } from './commands/CmdAddRecommendAccessories';
import { RecommendAccessoriesHandler } from './handlers/RecommendAccessoriesHandler';

interface PluginContext {
  app: {
    cmdManager: {
      register(commands: Array<[string, any]>): void;
    };
  };
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface RecommendProcessOptions {
  // Define specific properties based on your use case
  [key: string]: unknown;
}

class RecommendAccessoriesPlugin extends IPlugin {
  private _handler!: RecommendAccessoriesHandler;
  public signalRecommendAccessoriesToLog?: (...args: unknown[]) => void;

  constructor() {
    const config: PluginConfig = {
      name: 'ai recommend accessories model plugin',
      description: 'Choose anchor content to recommend correlation accessories',
      dependencies: []
    };
    super(config);
  }

  public onActive(context: PluginContext, options: unknown): void {
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.CmdAddRecommendAccessories, CmdAddRecommendAccessories]
    ]);

    this._handler = new RecommendAccessoriesHandler(context.app, options);
    this.signalRecommendAccessoriesToLog = this._handler.signalRecommendAccessoriesToLog;
    this._handler.init();
  }

  public startRecommendProcess(options: RecommendProcessOptions): void {
    this._handler.startRecommendProcess(options);
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.RecommendAccessories,
  RecommendAccessoriesPlugin
);

export { RecommendAccessoriesPlugin };