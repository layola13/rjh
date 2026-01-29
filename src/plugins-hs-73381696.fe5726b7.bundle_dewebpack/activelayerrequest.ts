import { StateRequest } from './StateRequest';

interface Layer {
  doc?: {
    scene?: Scene;
  };
}

interface Scene {
  activeLayer: Layer | null;
}

/**
 * Request to activate a specific layer in the document scene.
 */
export class ActiveLayerRequest extends StateRequest {
  private readonly _layer: Layer;

  constructor(layer: Layer) {
    super();
    this._layer = layer;
  }

  onCommit(): void {
    if (!this._layer) {
      return;
    }

    const scene = this._layer.doc?.scene;
    if (scene) {
      scene.activeLayer = this._layer;
    }
  }

  canTransactField(): boolean {
    return true;
  }
}