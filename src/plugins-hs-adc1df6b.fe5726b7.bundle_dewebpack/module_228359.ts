import { HSApp } from './HSApp';
import { Handler } from './Handler';
import { OutdoorDrawingUtil } from './OutdoorDrawingUtil';

interface PluginDependency {
  name: string;
  description: string;
  dependencies: string[];
}

class OutdoorDrawingPlugin extends HSApp.Plugin.IPlugin {
  private _handler?: Handler;

  constructor() {
    super([
      {
        name: "outdoor drawing",
        description: "",
        dependencies: [
          HSFPConstants.PluginType.Toolbar,
          HSFPConstants.PluginType.ContextualTools,
          HSFPConstants.PluginType.PropertyBar,
          HSFPConstants.PluginType.LeftMenu,
          HSFPConstants.PluginType.RightMenu,
          HSFPConstants.PluginType.PageHeader
        ]
      }
    ]);
  }

  onActive(context: any, config: any): void {
    this._handler = new Handler();
    this._handler.init(context.app, config);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }

  enterOutdoorDrawing(): void {
    const rootLayer = HSApp.App.getApp().floorplan.scene.rootLayer;
    this._handler?.enterEnvironment(rootLayer);
  }

  exitOutdoorDrawing(): void {
    this._handler?.exitEnvironment();
  }

  couldDeleteOutdoorFace(face: any): boolean {
    return OutdoorDrawingUtil.couldDeleteOutdoorFace(face);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.OutdoorDrawing, OutdoorDrawingPlugin);