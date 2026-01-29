import { HSCore } from './HSCore';

interface Layer {
  prev: Layer | null;
  next: Layer | null;
  roomBuilder: {
    build(options: { slabOption: { cleanBuildUp: boolean; cleanBuildDown: boolean } }): void;
  };
  dirtyPosition(): void;
}

interface Scene {
  rootLayer: Layer | null;
  ceilingLayer: Layer;
  forEachLayer(callback: (layer: Layer) => void): void;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

function cleanLayerCeiling(layer: Layer): void {
  // Implementation depends on external module
}

function cleanLayerFloor(layer: Layer): void {
  // Implementation depends on external module
}

export class ResetLayerIndexRequest extends HSCore.Transaction.Common.StateRequest {
  public readonly targetLayer: Layer;
  private readonly _newPreLayer: Layer | null;
  private readonly _newNextLayer: Layer | null;
  
  private floorplan: Floorplan;
  private scene: Scene;
  private targetPreLayer: Layer | null;
  private targetNextLayer: Layer | null;
  private newPreLayer: Layer | null;
  private newNextLayer: Layer | null;
  private resetRootLayer: Layer | null | undefined;
  private resetCeilingLayerCache: Layer[];
  private resetFloorLayerCache: Layer[];
  private sortedLayers: Layer[];

  constructor(targetLayer: Layer, newPreLayer: Layer | null, newNextLayer: Layer | null) {
    super();
    
    this.targetLayer = targetLayer;
    this._newPreLayer = newPreLayer;
    this._newNextLayer = newNextLayer;
    
    this.floorplan = HSApp.App.getApp().floorplan;
    this.scene = this.floorplan.scene;
    this.targetPreLayer = this.targetLayer.prev;
    this.targetNextLayer = this.targetLayer.next;
    this.newPreLayer = this._newPreLayer ? this._newPreLayer : this._newNextLayer?.prev ?? null;
    this.newNextLayer = this._newNextLayer ? this._newNextLayer : this._newPreLayer?.next ?? null;
    this.resetRootLayer = this.targetLayer === this.scene.rootLayer 
      ? this.targetNextLayer || this.targetPreLayer 
      : undefined;
    this.resetCeilingLayerCache = [];
    this.resetFloorLayerCache = [];
    this.sortedLayers = [];
  }

  public clean(): void {
    if (this.targetPreLayer) {
      cleanLayerCeiling(this.targetPreLayer);
      this.resetCeilingLayerCache.push(this.targetPreLayer);
    }
    
    cleanLayerCeiling(this.targetLayer);
    this.resetCeilingLayerCache.push(this.targetLayer);
    
    cleanLayerFloor(this.targetLayer);
    this.resetFloorLayerCache.push(this.targetLayer);
    
    if (this.targetNextLayer) {
      cleanLayerFloor(this.targetNextLayer);
      this.resetFloorLayerCache.push(this.targetNextLayer);
    }
    
    if (this.newPreLayer) {
      cleanLayerCeiling(this.newPreLayer);
      this.resetCeilingLayerCache.push(this.newPreLayer);
    }
    
    if (this.newNextLayer) {
      cleanLayerFloor(this.newNextLayer);
      this.resetFloorLayerCache.push(this.newNextLayer);
    }
  }

  public resetRelationship(): void {
    if (this.targetPreLayer) {
      this.targetPreLayer.next = this.targetNextLayer;
    }
    
    this.targetLayer.prev = this.newPreLayer;
    this.targetLayer.next = this.newNextLayer;
    
    if (this.resetRootLayer) {
      this.scene.rootLayer = this.resetRootLayer;
    }
  }

  public build(): void {
    this.sortedLayers = Array.from(
      new Set([
        this.targetPreLayer,
        this.targetNextLayer,
        this.newPreLayer,
        this.targetLayer,
        this.newNextLayer
      ])
    )
      .filter((layer): layer is Layer => !!layer)
      .sort((a, b) => {
        return HSCore.Util.Layer.getLayerIndex(a) - HSCore.Util.Layer.getLayerIndex(b);
      });

    this.sortedLayers.forEach((layer) => {
      const cleanBuildUp = this.resetCeilingLayerCache.includes(layer);
      const cleanBuildDown = this.resetFloorLayerCache.includes(layer) && 
        (!layer.prev || !this.resetCeilingLayerCache.includes(layer.prev));
      
      layer.roomBuilder.build({
        slabOption: {
          cleanBuildUp,
          cleanBuildDown
        }
      });
      
      HSCore.Util.Layer.refreshFaceMixpaint(layer);
      HSCore.Util.Layer.extendsCrossLayerOpenings(layer.prev, layer);
      HSCore.Util.Layer.extendsCrossLayerOpenings(layer, layer.next);
      HSCore.Util.Layer.dirtyLayerInfo(layer);
      layer.dirtyPosition();
    });

    this.scene.forEachLayer((layer) => {
      return layer.dirtyPosition();
    });
    
    this.scene.ceilingLayer.dirtyPosition();
  }

  public onUndo(): void {
    super.onUndo();
    this.sortedLayers.forEach((layer) => {
      return layer.dirtyPosition();
    });
  }

  public onRedo(): void {
    super.onRedo();
    this.sortedLayers.forEach((layer) => {
      return layer.dirtyPosition();
    });
  }

  public canTransactField(): boolean {
    return true;
  }

  public onCommit(): void {
    this.clean();
    this.resetRelationship();
    this.build();
    super.onCommit();
  }
}