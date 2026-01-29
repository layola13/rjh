interface UnderlayData {
  [key: string]: unknown;
}

interface Layer {
  underlay?: Underlay;
  _floorplan: Floorplan;
}

interface Underlay {
  set(data: UnderlayData): void;
}

interface Floorplan {
  scene: {
    activeLayer: Layer;
  };
  signalUnderlayChanged: {
    dispatch(underlay: Underlay | undefined): void;
  };
}

interface App {
  floorplan: Floorplan;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

declare const HSCore: {
  Model: {
    Underlay: {
      create(data: UnderlayData): Underlay;
    };
  };
  Transaction: {
    Common: {
      StateRequest: new () => StateRequest;
    };
  };
};

interface StateRequest {
  onCommit(args: unknown[]): void;
  onUndo(args: unknown[]): void;
  onRedo(args: unknown[]): void;
}

class UnderlayTransaction extends (HSCore.Transaction.Common.StateRequest as any) {
  private layer: Layer;
  private underlayData: UnderlayData | undefined;

  constructor(underlayData: UnderlayData | undefined, layer?: Layer) {
    super();
    this.layer = layer ?? HSApp.App.getApp().floorplan.scene.activeLayer;
    this.underlayData = underlayData;
  }

  onCommit(): void {
    if (this.underlayData) {
      if (this.layer.underlay) {
        this.layer.underlay.set(this.underlayData);
      } else {
        this.layer.underlay = HSCore.Model.Underlay.create(this.underlayData);
      }
    } else {
      this.layer.underlay = undefined;
    }
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  onUndo(): void {
    super.onUndo([]);
    this.layer._floorplan.signalUnderlayChanged.dispatch(this.layer.underlay);
  }

  onRedo(): void {
    super.onRedo([]);
    this.layer._floorplan.signalUnderlayChanged.dispatch(this.layer.underlay);
  }
}

export default UnderlayTransaction;