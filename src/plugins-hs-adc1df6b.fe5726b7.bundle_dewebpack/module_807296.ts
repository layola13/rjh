import Handler from './Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

class OpenDoorPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;

  constructor() {
    const config: PluginConfig = {
      name: "open door Plugin",
      description: "open door in 3d model",
      dependencies: [HSFPConstants.PluginType.ContextualTools]
    };
    
    super(config);
    this._handler = new Handler();
  }

  onActive(viewer: unknown, context: unknown): void {
    this._handler.init(viewer, context);
  }

  onDeactive(): void {
    this._handler.uninit();
  }

  onOpenDoor(doorId: unknown): void {
    this._handler._onOpenDoor(doorId);
  }

  onCloseDoor(doorId: unknown): void {
    this._handler._onCloseDoor(doorId);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.OpenDoor, OpenDoorPlugin);