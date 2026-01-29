import { HSApp } from './path/to/HSApp';
import { Handler } from './path/to/Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface App {
  app: unknown;
}

class EditStatusPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;

  constructor() {
    const config: PluginConfig = {
      name: "EditStatus plugin",
      description: "provide design edit status plugin",
      dependencies: [HSFPConstants.PluginType.MessageCenter]
    };
    
    super(config);
    this._handler = new Handler();
  }

  onActive(app: App, options: unknown): void {
    super.onActive(app, options);
    this._handler.init(app.app, options);
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.EmergencyNoticePlugin,
  EditStatusPlugin,
  (): Promise<void> => Promise.resolve()
);