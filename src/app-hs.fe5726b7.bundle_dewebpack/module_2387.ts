interface PluginConfig {
  enable?: boolean;
  name?: string;
  description?: string;
  dependencies?: string[];
}

class Plugin {
  type: string | undefined;
  enable: boolean;
  name: string;
  description: string;
  dependencies: string[];

  constructor(config: PluginConfig = {}) {
    this.type = undefined;
    this.enable = config.enable === undefined || config.enable;
    this.name = config.name !== undefined ? config.name : "Unnamed plugin";
    this.description = config.description !== undefined ? config.description : "No Description";
    this.dependencies = config.dependencies !== undefined ? config.dependencies : [];
  }

  onCreate(context: unknown): void {}

  onDestroy(context: unknown): void {}

  onActive(context: unknown, data: unknown): void {}

  onDeactive(context: unknown): void {}
}

export { Plugin };