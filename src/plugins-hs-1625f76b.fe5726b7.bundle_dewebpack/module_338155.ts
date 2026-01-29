interface ModelMeta {
  clone(): ModelMeta;
  userFreeData: {
    models?: any[];
    [key: string]: any;
  };
}

interface CornerWindowSpec {
  host: any;
  parent: any;
  models: any[];
  cornerWindow: any;
}

interface FloorplanScene {
  activeLayer: any;
}

interface Floorplan {
  scene: FloorplanScene;
}

interface App {
  floorplan: Floorplan;
}

declare namespace HSApp {
  namespace App {
    function getApp(): App;
  }
}

declare namespace HSCore {
  namespace Model {
    namespace CornerWindow {
      function create(meta: ModelMeta): CornerWindowModel;
    }
  }

  namespace Util {
    namespace Content {
      function getCornerWindowSpec(cornerWindow: CornerWindowModel): CornerWindowSpec;
      function addCornerWindow(spec: CornerWindowSpec): void;
      function removeCornerWindow(cornerWindow: any): void;
    }
  }

  namespace Transaction {
    namespace Common {
      class CompositeRequest {
        onUndo(args: any[]): void;
        onRedo(args: any[]): void;
      }
    }
  }
}

interface CornerWindowModel {
  createChildModels(models: any[]): any[];
}

class AddCornerWindowRequest extends HSCore.Transaction.Common.CompositeRequest {
  private _meta: ModelMeta;
  private _host: any;
  private _spec?: CornerWindowSpec;

  constructor(
    meta: ModelMeta,
    _n: unknown,
    _a: unknown,
    _i: unknown,
    host: any
  ) {
    super();
    this._meta = meta;
    this._host = host;
  }

  onCommit(): CornerWindowModel {
    const metaClone = this._meta.clone();
    const models = metaClone.userFreeData.models;
    delete metaClone.userFreeData.models;

    const floorplan = HSApp.App.getApp().floorplan;
    const cornerWindow = HSCore.Model.CornerWindow.create(metaClone);
    const activeLayer = floorplan.scene.activeLayer;
    const spec = HSCore.Util.Content.getCornerWindowSpec(cornerWindow);

    spec.host = this._host;
    spec.parent = activeLayer;

    const childModels = cornerWindow.createChildModels(models ?? []);
    spec.models = spec.models.concat(childModels);

    this._spec = spec;
    HSCore.Util.Content.addCornerWindow(this._spec);

    return cornerWindow;
  }

  onUndo(): void {
    if (this._spec) {
      HSCore.Util.Content.removeCornerWindow(this._spec.cornerWindow);
    }
    super.onUndo([]);
  }

  onRedo(): void {
    super.onRedo([]);
    if (this._spec) {
      HSCore.Util.Content.addCornerWindow(this._spec);
    }
  }
}

export default AddCornerWindowRequest;