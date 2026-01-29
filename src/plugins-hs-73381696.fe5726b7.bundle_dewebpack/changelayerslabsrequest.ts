interface Layer {
  floorSlabs: Record<string, FloorSlab>;
}

interface FloorSlab {
  dirtyGeometry(): void;
}

interface TransactionData {
  [key: string]: unknown;
}

interface LayerUtil {
  dirtyLayerInfo(layer: Layer): void;
  refreshFaceMixpaint(layer: Layer): void;
  getUnderLayer(layer: Layer): Layer | null;
}

interface TransactionUtil {
  saveEntitiesToData(entities: FloorSlab[], data: TransactionData): void;
  restoreEntitiesFromData(entities: FloorSlab[], data: TransactionData): void;
}

interface HSCoreGlobal {
  Util: {
    Layer: LayerUtil;
    Transaction: TransactionUtil;
  };
  Transaction: {
    Request: new (...args: unknown[]) => unknown;
  };
}

declare const HSCore: HSCoreGlobal;

export class ChangeLayerSlabsRequest extends (HSCore.Transaction.Request as any) {
  public readonly layer: Layer;
  private readonly _beforeData: TransactionData;
  private readonly _afterData: TransactionData;

  constructor(layer: Layer, beforeData: TransactionData, afterData: TransactionData) {
    super();
    this.layer = layer;
    this._beforeData = beforeData;
    this._afterData = afterData;
  }

  private dirtyLayerInfo(): void {
    HSCore.Util.Layer.dirtyLayerInfo(this.layer);
    HSCore.Util.Layer.refreshFaceMixpaint(this.layer);
    
    const underLayer = HSCore.Util.Layer.getUnderLayer(this.layer);
    if (underLayer) {
      HSCore.Util.Layer.dirtyLayerInfo(underLayer);
      HSCore.Util.Layer.refreshFaceMixpaint(underLayer);
    }
  }

  private doRequest(data: TransactionData): void {
    ChangeLayerSlabsRequest.restoreFromData(this.layer, data);
    
    Object.values(this.layer.floorSlabs).forEach((slab: FloorSlab) => {
      slab.dirtyGeometry();
    });
    
    this.dirtyLayerInfo();
  }

  public onCommit(): void {
    this.doRequest(this._afterData);
  }

  public onUndo(): void {
    this.doRequest(this._beforeData);
  }

  public onRedo(): void {
    this.doRequest(this._afterData);
  }

  public static saveToData(layer: Layer, data: TransactionData): void {
    const slabs = Object.values(layer.floorSlabs);
    HSCore.Util.Transaction.saveEntitiesToData(slabs, data);
  }

  public static restoreFromData(layer: Layer, data: TransactionData): void {
    const slabs = Object.values(layer.floorSlabs);
    HSCore.Util.Transaction.restoreEntitiesFromData(slabs, data);
  }
}