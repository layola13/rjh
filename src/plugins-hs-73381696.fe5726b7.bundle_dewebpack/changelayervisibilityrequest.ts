interface Layer {
  doc: Document;
  isFlagOff(flag: number): boolean;
  setFlagOn(flag: number, value: boolean): void;
  setFlagOff(flag: number, value: boolean): void;
}

interface Scene {
  layers: Record<string, Layer>;
  activeLayer: Layer;
  forEachLayer(callback: (layer: Layer) => void): void;
}

interface Document {
  scene: Scene;
}

interface DocManager {
  activeDocument: Document;
}

declare namespace HSCore {
  namespace Model {
    enum EntityFlagEnum {
      hidden
    }
  }
  namespace Doc {
    function getDocManager(): DocManager;
  }
  namespace Transaction {
    namespace Common {
      class StateRequest {
        onCommit?(): void;
        canTransactField?(): boolean;
      }
    }
  }
}

export class ChangeLayerVisibilityRequest extends HSCore.Transaction.Common.StateRequest {
  private _layer: Layer | null;
  public visible: boolean;
  public singleLayerMode: boolean;
  public visibleLayers: Layer[];

  constructor(layer: Layer | null, visible: boolean, singleLayerMode: boolean = false) {
    super();
    this._layer = layer;
    this.visible = visible;
    this.singleLayerMode = singleLayerMode;
    this.visibleLayers = [];
  }

  onCommit(): void {
    const document = this._layer 
      ? this._layer.doc 
      : HSCore.Doc.getDocManager().activeDocument;
    const scene = document.scene;

    this.visibleLayers = [];
    scene.forEachLayer((layer: Layer) => {
      if (layer.isFlagOff(HSCore.Model.EntityFlagEnum.hidden)) {
        this.visibleLayers.push(layer);
      }
    });

    if (this._layer) {
      if (this.visible) {
        this._layer.setFlagOff(HSCore.Model.EntityFlagEnum.hidden, true);
      } else {
        this._layer.setFlagOn(HSCore.Model.EntityFlagEnum.hidden, true);
      }
    } else {
      const layers = scene.layers;
      if (this.singleLayerMode) {
        const activeLayer = scene.activeLayer;
        for (const key in layers) {
          layers[key].setFlagOn(HSCore.Model.EntityFlagEnum.hidden, true);
        }
        activeLayer.setFlagOff(HSCore.Model.EntityFlagEnum.hidden, true);
      } else {
        for (const key in layers) {
          layers[key].setFlagOff(HSCore.Model.EntityFlagEnum.hidden, true);
        }
      }
    }
  }

  canTransactField(): boolean {
    return true;
  }
}