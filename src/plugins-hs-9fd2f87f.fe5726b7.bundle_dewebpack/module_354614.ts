interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface App {
  cmdManager: CommandManager;
}

interface CommandManager {
  register(commandType: string, command: typeof ExportImageCommand): void;
}

interface PluginContext {
  app: App;
}

namespace HSFPConstants {
  export enum CommandType {
    ExportImage = "ExportImage"
  }
}

namespace HSApp.Plugin {
  export abstract class IPlugin {
    constructor(config: PluginConfig) {}
    
    abstract onActive(context: PluginContext): void;
    abstract onDeactive(): void;
  }

  export function registerPlugin(name: string, plugin: typeof IPlugin): void {}
}

class ExportImageCommand {
  // Export image command implementation
}

class ExportPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "export image",
      description: "Process export image command.",
      dependencies: []
    });
  }

  onActive(context: PluginContext): void {
    context.app.cmdManager.register(
      HSFPConstants.CommandType.ExportImage,
      ExportImageCommand
    );
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }
}

HSApp.Plugin.registerPlugin("hsw.plugin.Export.Plugin", ExportPlugin);