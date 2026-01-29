interface PluginContext {
  app: {
    cmdManager: {
      register(commands: Array<[string, new (...args: any[]) => any]>): void;
    };
    transManager: {
      register(transactions: Array<[string, new (...args: any[]) => any]>): void;
    };
  };
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

abstract class IPlugin {
  constructor(config: PluginConfig) {}
  abstract onActive(context: PluginContext): void;
  abstract onDeactive(): void;
}

class MoveUnderlayCommand {}
class UpdateUnderlayCommand {}
class UpdateUnderlayTransaction {}
class DeleteUnderlayTransaction {}

namespace HSFPConstants {
  export enum CommandType {
    MoveUnderlay = 'MoveUnderlay',
    UpdateUnderlay = 'UpdateUnderlay'
  }
  
  export enum RequestType {
    UpdateUnderlay = 'UpdateUnderlay',
    DeleteUnderlay = 'DeleteUnderlay'
  }
}

namespace HSApp.Plugin {
  export function registerPlugin(pluginName: string, pluginClass: new () => IPlugin): void {}
}

class UnderlayPlugin extends IPlugin {
  constructor() {
    super({
      name: 'underlay',
      description: 'underlay related command',
      dependencies: []
    });
  }

  onActive(context: PluginContext): void {
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.MoveUnderlay, MoveUnderlayCommand],
      [HSFPConstants.CommandType.UpdateUnderlay, UpdateUnderlayCommand]
    ]);
    
    context.app.transManager.register([
      [HSFPConstants.RequestType.UpdateUnderlay, UpdateUnderlayTransaction],
      [HSFPConstants.RequestType.DeleteUnderlay, DeleteUnderlayTransaction]
    ]);
  }

  onDeactive(): void {}
}

HSApp.Plugin.registerPlugin('hsw.plugin.Underlay.Plugin', UnderlayPlugin);