import { Plugin as IPlugin } from 'HSApp/Plugin';
import AddRecommendContentsCommand from './commands/AddRecommendContentsCommand';
import CmdSelectRoomForAutoRecommendCommand from './commands/CmdSelectRoomForAutoRecommendCommand';
import AutoRecommendHandler from './handlers/AutoRecommendHandler';

interface PluginActivationContext {
  app: HSApp.Application;
}

interface PluginDependencies {
  [key: string]: IPlugin;
}

export class AutoRecommendPlugin extends IPlugin {
  private _handler: AutoRecommendHandler;
  public signalRecommendModelToLog?: (...args: unknown[]) => void;

  constructor() {
    super({
      name: 'AutoRecommend plugin',
      description: 'recommend contents for user',
      dependencies: [
        HSFPConstants.PluginType.Catalog,
        'hsw.plugin.loadingfeedback.Plugin'
      ]
    });
    this._handler = new AutoRecommendHandler();
  }

  onActive(context: PluginActivationContext, dependencies: PluginDependencies): void {
    this._handler.init({
      app: context.app,
      dependencies
    });

    this.signalRecommendModelToLog = this._handler.signalRecommendModelToLog;

    context.app.cmdManager.register([
      [HSFPConstants.CommandType.AddRecommendContents, AddRecommendContentsCommand],
      [HSFPConstants.CommandType.CmdSelectRoomForAutoRecommend, CmdSelectRoomForAutoRecommendCommand]
    ]);
  }

  onDeactive(): void {
    this._handler.dispose();
  }

  handler(): AutoRecommendHandler {
    return this._handler;
  }

  startRecommendFromToolbar(options: unknown): void {
    this._handler.startRecommendFromToolbar(options);
  }

  startRecommendFromRecommendPopup(firstArg: unknown, secondArg: unknown): void {
    this._handler.startRecommendFromRecommendPopup(firstArg, secondArg);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.AutoRecommend, AutoRecommendPlugin);