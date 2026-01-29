import { IPlugin } from 'HSApp/Plugin';
import { PluginType } from 'HSFPConstants';
import { Signal } from 'HSCore/Util';
import { registerOnSaveOriginExtend } from './utils';
import SpaceRebuildHandler from './SpaceRebuildHandler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: PluginType[];
}

interface PluginContext {
  // Define based on actual usage
  [key: string]: unknown;
}

class SpaceRebuildPlugin extends IPlugin {
  public signalSaveOriginDesign?: Signal<unknown>;
  private _handler?: SpaceRebuildHandler;
  public readonly registerOnSaveOriginExtend = registerOnSaveOriginExtend;

  constructor() {
    const config: PluginConfig = {
      name: 'Space Rebuild Plugin',
      description: 'Simple space rebuild ability for supporting DWG export.',
      dependencies: [
        PluginType.Toolbar,
        PluginType.Persistence
      ]
    };

    super(config);
  }

  public onActive(activeData: unknown, context: PluginContext): void {
    super.onActive?.(activeData);

    this.signalSaveOriginDesign = new Signal(this);

    if (!this._handler) {
      this._handler = new SpaceRebuildHandler(context);
      this._handler.init();
    }
  }

  public onDeactive(): void {
    // Cleanup logic if needed
  }

  public diffWalls(): unknown {
    return this._handler?.diffWalls();
  }
}

HSApp.Plugin.registerPlugin(PluginType.SpaceRebuild, SpaceRebuildPlugin);

export default SpaceRebuildPlugin;