import { CmdSmartLayoutAccessories } from './603338';
import { SmartLayoutAccessoriesHandler } from './763259';

interface PluginContext {
  app: {
    cmdManager: {
      register(commands: Array<[string, typeof CmdSmartLayoutAccessories]>): void;
    };
  };
}

class SmartLayoutAccessoriesPlugin extends HSApp.Plugin.IPlugin {
  private _handler!: SmartLayoutAccessoriesHandler;

  constructor() {
    super({
      name: "OneKey Decoration Plugin",
      description: "Choose content generate smartLayout accessories",
      dependencies: []
    });
  }

  onActive(context: PluginContext): void {
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.CmdSmartLayoutAccessories, CmdSmartLayoutAccessories]
    ]);
    this._handler = new SmartLayoutAccessoriesHandler();
  }

  startSmartLayoutProcess(data: unknown, options: string = ""): void {
    this._handler.startSmartLayoutProcess(data, options);
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.SmartLayoutAccessories,
  SmartLayoutAccessoriesPlugin
);