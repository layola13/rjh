import { HSCore } from './HSCore';

interface ProxyUndoRedoObject {
  prepareRedo(): void;
}

interface ProxyObject {
  prepareUndoData(content: LayerContent): ProxyUndoRedoObject | null;
  removeFromFloorplan(content: LayerContent): void;
}

interface LayerContent {
  getProxyObject(): ProxyObject | null;
}

interface FloorSlabs {
  [key: string]: unknown;
}

interface Layer {
  prev: Layer | null;
  next: Layer | null;
  floorSlabs: FloorSlabs;
  forEachContent(callback: (content: LayerContent) => void): void;
  roomBuilder: {
    build(options?: { slabOption?: { cleanBuildUp?: boolean } }): void;
  };
  dirtyPosition(): void;
}

interface Scene {
  rootLayer: Layer;
  lastLayer: Layer;
  activeLayer: Layer;
  ceilingLayer: Layer & { dirtyPosition(): void };
  removeLayer(layer: Layer): void;
}

interface FloorplanApp {
  floorplan: {
    scene: Scene;
  };
}

declare const HSApp: {
  App: {
    getApp(): FloorplanApp;
  };
};

function cleanLayerCeiling(layer: Layer): void {
  // Implementation for cleaning layer ceiling
}

export class DeleteLayerRequest extends HSCore.Transaction.Common.StateRequest {
  private _layer: Layer;
  protected proxyUndoRedoObjs: Set<ProxyUndoRedoObject>;

  constructor(layer: Layer) {
    super();
    this._layer = layer;
    this.proxyUndoRedoObjs = new Set<ProxyUndoRedoObject>();
  }

  doRequest(): void {
    const scene = HSApp.App.getApp().floorplan.scene;
    const layer = this._layer;
    const rootLayer = scene.rootLayer;
    const lastLayer = scene.lastLayer;
    const prevLayer = layer.prev;
    const nextLayer = layer.next;
    const layerIndex = HSCore.Util.Layer.getLayerIndex(layer);

    if (layer !== rootLayer) {
      layer.forEachContent((content: LayerContent) => {
        const proxyObject = content.getProxyObject();
        if (proxyObject) {
          const undoData = proxyObject.prepareUndoData(content);
          if (undoData) {
            this.proxyUndoRedoObjs.add(undoData);
            proxyObject.removeFromFloorplan(content);
            undoData.prepareRedo();
            return;
          }
        }
      });

      if (prevLayer) {
        cleanLayerCeiling(prevLayer);
        prevLayer.next = nextLayer;
      }

      scene.activeLayer = scene.rootLayer;

      if (lastLayer === layer) {
        scene.ceilingLayer.floorSlabs = layer.floorSlabs;
      }

      layer.floorSlabs = {};
      scene.removeLayer(layer);

      if (prevLayer) {
        prevLayer.roomBuilder.build({
          slabOption: {
            cleanBuildUp: true
          }
        });
      }

      if (nextLayer) {
        nextLayer.roomBuilder.build();
      }

      if (lastLayer === layer) {
        scene.ceilingLayer.dirtyPosition();
      }

      let currentLayer: Layer | null = nextLayer;
      for (let i = layerIndex; i > 0 && currentLayer; i--) {
        currentLayer.dirtyPosition();
        currentLayer = currentLayer.next;
      }

      currentLayer = prevLayer;
      for (let i = layerIndex; i < 0 && currentLayer; i++) {
        currentLayer.dirtyPosition();
        currentLayer = currentLayer.prev;
      }
    } else {
      console.warn("一楼不能删除!!");
    }
  }

  onCommit(): void {
    this.doRequest();
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }
}