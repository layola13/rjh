interface Meta {
  clone(): Meta;
  userFreeData: {
    models?: any[];
    [key: string]: any;
  };
}

interface CornerFlatWindowSpec {
  host: any;
  parent: any;
  models: any[];
  cornerFlatWindow: any;
}

interface App {
  floorplan: {
    scene: {
      activeLayer: any;
    };
  };
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
}

interface HSCoreNamespace {
  Model: {
    CornerFlatWindow: {
      create(meta: Meta): CornerFlatWindow;
    };
  };
  Util: {
    Content: {
      getCornerFlatWindowSpec(window: CornerFlatWindow): CornerFlatWindowSpec;
      addCornerFlatWindow(spec: CornerFlatWindowSpec): void;
      removeCornerFlatWindow(window: any): void;
    };
  };
  Transaction: {
    Common: {
      CompositeRequest: new (...args: any[]) => CompositeRequest;
    };
  };
}

interface CornerFlatWindow {
  createChildModels(models: any[]): any[];
}

interface CompositeRequest {
  onUndo(args: any[]): void;
  onRedo(args: any[]): void;
}

declare const HSApp: HSAppNamespace;
declare const HSCore: HSCoreNamespace;

class CornerFlatWindowRequest extends (HSCore.Transaction.Common.CompositeRequest as any) {
  private _meta: Meta;
  private _host: any;
  private _spec?: CornerFlatWindowSpec;

  constructor(meta: Meta, n: any, a: any, i: any, host: any) {
    super();
    this._meta = meta;
    this._host = host;
  }

  onCommit(): CornerFlatWindow {
    const clonedMeta = this._meta.clone();
    const models = clonedMeta.userFreeData.models;
    delete clonedMeta.userFreeData.models;

    const app = HSApp.App.getApp();
    const floorplan = app.floorplan;
    const cornerFlatWindow = HSCore.Model.CornerFlatWindow.create(clonedMeta);
    const activeLayer = floorplan.scene.activeLayer;
    const spec = HSCore.Util.Content.getCornerFlatWindowSpec(cornerFlatWindow);

    spec.host = this._host;
    spec.parent = activeLayer;

    const childModels = cornerFlatWindow.createChildModels(models ?? []);
    spec.models = spec.models.concat(childModels);

    this._spec = spec;
    HSCore.Util.Content.addCornerFlatWindow(this._spec);

    return cornerFlatWindow;
  }

  onUndo(): void {
    if (this._spec) {
      HSCore.Util.Content.removeCornerFlatWindow(this._spec.cornerFlatWindow);
    }
    super.onUndo([]);
  }

  onRedo(): void {
    super.onRedo([]);
    if (this._spec) {
      HSCore.Util.Content.addCornerFlatWindow(this._spec);
    }
  }
}

export default CornerFlatWindowRequest;