interface Meta {
  clone(): Meta;
  userFreeData: {
    models?: any[];
    [key: string]: any;
  };
}

interface POrdinaryWindowSpec {
  host: any;
  parent: any;
  models: any[];
  pOrdinaryWindow: any;
}

interface HSApp {
  App: {
    getApp(): {
      floorplan: {
        scene: {
          activeLayer: any;
        };
      };
    };
  };
}

interface HSCore {
  Model: {
    POrdinaryWindow: {
      create(meta: Meta): POrdinaryWindow;
    };
  };
  Util: {
    Content: {
      getPOrdinaryWindowSpec(window: POrdinaryWindow): POrdinaryWindowSpec;
      addPOrdinaryWindow(spec: POrdinaryWindowSpec): void;
      removePOrdinaryWindow(window: any): void;
    };
  };
  Transaction: {
    Common: {
      CompositeRequest: new (...args: any[]) => any;
    };
  };
}

interface POrdinaryWindow {
  createChildModels(models: any[]): any[];
}

declare const HSApp: HSApp;
declare const HSCore: HSCore;

class POrdinaryWindowCommand extends HSCore.Transaction.Common.CompositeRequest {
  private _meta: Meta;
  private _host: any;
  private _spec?: POrdinaryWindowSpec;

  constructor(meta: Meta, _n: any, _a: any, _i: any, host: any) {
    super();
    this._meta = meta;
    this._host = host;
  }

  onCommit(): POrdinaryWindow {
    const clonedMeta = this._meta.clone();
    const models = clonedMeta.userFreeData.models;
    delete clonedMeta.userFreeData.models;

    const floorplan = HSApp.App.getApp().floorplan;
    const ordinaryWindow = HSCore.Model.POrdinaryWindow.create(clonedMeta);
    const activeLayer = floorplan.scene.activeLayer;
    const spec = HSCore.Util.Content.getPOrdinaryWindowSpec(ordinaryWindow);

    spec.host = this._host;
    spec.parent = activeLayer;

    const childModels = ordinaryWindow.createChildModels(models ?? []);
    spec.models = spec.models.concat(childModels);

    this._spec = spec;
    HSCore.Util.Content.addPOrdinaryWindow(this._spec);

    return ordinaryWindow;
  }

  onUndo(): void {
    if (this._spec) {
      HSCore.Util.Content.removePOrdinaryWindow(this._spec.pOrdinaryWindow);
    }
    super.onUndo?.call(this, []);
  }

  onRedo(): void {
    super.onRedo?.call(this, []);
    if (this._spec) {
      HSCore.Util.Content.addPOrdinaryWindow(this._spec);
    }
  }
}

export default POrdinaryWindowCommand;