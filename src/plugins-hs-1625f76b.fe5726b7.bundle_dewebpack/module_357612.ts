interface BayWindowMeta {
  clone(): BayWindowMeta;
  userFreeData: {
    models?: any[];
    [key: string]: any;
  };
  [key: string]: any;
}

interface Position {
  x: number;
  y: number;
}

interface BayWindowSpec {
  host: any;
  parent: any;
  models: any[];
  bayWindow: any;
  [key: string]: any;
}

interface BayWindow {
  x: number;
  y: number;
  createChildModels(models: any[]): any[];
  buildPartsInfo(models: any[]): void;
  [key: string]: any;
}

interface Layer {
  [key: string]: any;
}

interface Scene {
  activeLayer: Layer;
  [key: string]: any;
}

interface Floorplan {
  scene: Scene;
  [key: string]: any;
}

interface App {
  floorplan: Floorplan;
  getApp(): App;
}

declare const HSApp: {
  App: App;
};

declare const HSCore: {
  Model: {
    BayWindow: {
      create(meta: BayWindowMeta): BayWindow;
    };
  };
  Util: {
    Content: {
      getBayWindowSpec(bayWindow: BayWindow): BayWindowSpec;
      addBayWindow(spec: BayWindowSpec): void;
      removeBayWindow(bayWindow: any): void;
    };
  };
  Transaction: {
    Common: {
      CompositeRequest: new (...args: any[]) => any;
    };
  };
};

export default class BayWindowTransaction extends HSCore.Transaction.Common.CompositeRequest {
  private readonly _meta: BayWindowMeta;
  private readonly _host: any;
  private readonly _position: Position | null;
  private _spec?: BayWindowSpec;

  constructor(
    meta: BayWindowMeta,
    position: Position | null,
    _thirdArg: any,
    _fourthArg: any,
    host: any
  ) {
    super();
    this._meta = meta;
    this._host = host;
    this._position = position;
  }

  onCommit(): BayWindow {
    const clonedMeta = this._meta.clone();
    const models = clonedMeta.userFreeData.models;
    delete clonedMeta.userFreeData.models;

    const floorplan = HSApp.App.getApp().floorplan;
    const bayWindow = HSCore.Model.BayWindow.create(clonedMeta);
    const activeLayer = floorplan.scene.activeLayer;

    if (this._position) {
      bayWindow.x = this._position.x;
      bayWindow.y = this._position.y;
    }

    const spec = HSCore.Util.Content.getBayWindowSpec(bayWindow);
    spec.host = this._host;
    spec.parent = activeLayer;

    const childModels = bayWindow.createChildModels(models ?? []);
    spec.models = spec.models.concat(childModels);

    this._spec = spec;
    HSCore.Util.Content.addBayWindow(this._spec);
    bayWindow.buildPartsInfo(models ?? []);

    return bayWindow;
  }

  onUndo(): void {
    if (this._spec) {
      HSCore.Util.Content.removeBayWindow(this._spec.bayWindow);
    }
    super.onUndo?.([]);
  }

  onRedo(): void {
    super.onRedo?.([]);
    if (this._spec) {
      HSCore.Util.Content.addBayWindow(this._spec);
    }
  }
}