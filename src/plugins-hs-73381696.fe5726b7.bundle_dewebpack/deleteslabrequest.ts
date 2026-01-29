interface Slab {
  parents: Record<string, Layer>;
}

interface Layer {
  removeChild(slab: Slab): void;
}

interface EntityData {
  [key: string]: unknown;
}

declare namespace HSCore {
  namespace Transaction {
    class Request {}
  }
  namespace Util {
    namespace Transaction {
      function saveEntityToData(entities: Layer[], data: EntityData): void;
      function restoreEntityFromData(entities: Layer[], data: EntityData): void;
    }
  }
}

export class DeleteSlabRequest extends HSCore.Transaction.Request {
  private readonly _slab: Slab;
  private readonly _layers: Layer[];
  private readonly _beforeData: EntityData;
  private readonly _afterData: EntityData;

  constructor(slab: Slab) {
    super();
    this._slab = slab;
    this._layers = Object.values(slab.parents);
    this._beforeData = {};
    this._afterData = {};
  }

  doRequest(): void {
    this._layers.forEach((layer: Layer) => {
      layer.removeChild(this._slab);
    });
  }

  onCommit(): void {
    HSCore.Util.Transaction.saveEntityToData(this._layers, this._beforeData);
    this.doRequest();
    HSCore.Util.Transaction.saveEntityToData(this._layers, this._afterData);
  }

  onUndo(): void {
    HSCore.Util.Transaction.restoreEntityFromData(this._layers, this._beforeData);
  }

  onRedo(): void {
    HSCore.Util.Transaction.restoreEntityFromData(this._layers, this._afterData);
  }
}