interface WallBoardClipOptions {
  isClipMeshData?: boolean;
  isChangeMeshRef?: boolean;
}

interface MeshDef {
  [key: string]: unknown;
}

interface GraphicObject {
  [key: string]: unknown;
}

interface ClipResultItem {
  objects: GraphicObject[];
  meshDefs: MeshDef[];
}

interface GraphicData {
  meshDefs: MeshDef[];
  objects: GraphicObject[];
}

interface App {
  geometryManager: {
    convertUnit(objects: GraphicObject[], meshDefs: MeshDef[]): void;
    _convertMeshRefToArray(objects: GraphicObject[], meshDefs: MeshDef[]): void;
  };
}

interface PluginContext {
  app: App;
}

class WallBoardProcessor {
  wallboradclip(isClipMeshData: boolean): Promise<ClipResultItem[]> {
    // Implementation details
    return Promise.resolve([]);
  }
}

class WallBoardHandler {
  waistlineEnabled: boolean = false;
  baseboardEnabled: boolean = false;

  constructor(app: App, config: unknown) {
    // Implementation details
  }

  init(): void {
    // Implementation details
  }

  uninit(): void {
    // Implementation details
  }
}

class WallBoardPlugin extends HSApp.Plugin.IPlugin {
  private app?: App;
  private _handler?: WallBoardHandler;
  private _wp: WallBoardProcessor;

  constructor() {
    super({
      name: "WallBoard Plugin",
      description: "add wallboard to a wall",
      dependencies: [
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.RightMenu,
        HSFPConstants.PluginType.MaterialImage,
        "hsw.plugin.WallMolding.Plugin",
        HSFPConstants.PluginType.Ngmmixpaint
      ]
    });
    this._wp = new WallBoardProcessor();
  }

  onActive(context: PluginContext, config: unknown): void {
    this.app = context.app;
    this._handler = new WallBoardHandler(context.app, config);
    this._handler.init();
  }

  onDeactive(): void {
    this._handler?.uninit();
  }

  async getWallBoardClipGraphicData(options?: WallBoardClipOptions): Promise<GraphicData> {
    const meshDefs: MeshDef[] = [];
    const objects: GraphicObject[] = [];
    const app = HSApp.App.getApp() as App;

    const clipResults = await this._wp.wallboradclip(!options || options.isClipMeshData);

    clipResults.forEach((result: ClipResultItem) => {
      app.geometryManager.convertUnit(result.objects, result.meshDefs);
      meshDefs.push(...result.meshDefs);
      objects.push(...result.objects);
    });

    const graphicData: GraphicData = {
      meshDefs,
      objects
    };

    if (options?.isChangeMeshRef) {
      app.geometryManager._convertMeshRefToArray(graphicData.objects, graphicData.meshDefs);
    }

    return graphicData;
  }

  isWaistlineEnabled(): boolean {
    return this._handler?.waistlineEnabled ?? false;
  }

  isBaseboardEnabled(): boolean {
    return this._handler?.baseboardEnabled ?? false;
  }
}

HSApp.Plugin.registerPlugin("hsw.plugin.wallboard.Plugin", WallBoardPlugin);