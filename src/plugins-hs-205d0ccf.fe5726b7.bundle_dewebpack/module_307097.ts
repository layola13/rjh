import { Handler } from './Handler';
import { HSApp } from './HSApp';

class StartUpActionPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;

  constructor() {
    const dependencies: string[] = [
      HSFPConstants.PluginType.Welcome,
      ...(HSApp.Config.TENANT === 'fp' ? [HSFPConstants.PluginType.DesignTemplates] : []),
      HSFPConstants.PluginType.UnderlayImg,
      HSFPConstants.PluginType.WallAutoBuilder
    ];

    super({
      name: 'StartUpAction Plugin',
      description: '',
      dependencies
    });

    this._handler = new Handler();
  }

  onActive(event: unknown, context: unknown): void {
    super.onActive(event, context);
    this._handler.onActive(event, context);
  }

  onDeactive(event: unknown): void {
    super.onDeactive(event);
    this._handler.onDeactive(event);
  }

  executeAction(action: unknown, data: unknown): void {
    this._handler.executeAction(action, data);
  }

  completeAction(): void {
    this._handler.completeAction();
  }

  cancelAction(): void {
    this._handler.cancelAction();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.StartUpAction, StartUpActionPlugin);