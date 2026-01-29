import { HSCore } from './HSCore';

interface Layer {
  slabSketch2dGuildLines: unknown[];
  slabSketch2dHoles: unknown[];
}

export class DeleteLayerSlabHoles extends HSCore.Transaction.Common.StateRequest {
  private layer: Layer;

  constructor(layer: Layer) {
    super();
    this.layer = layer;
  }

  onCommit(): boolean {
    this.layer.slabSketch2dGuildLines = [];
    this.layer.slabSketch2dHoles = [];
    super.onCommit();
    return true;
  }

  canTransactField(): boolean {
    return true;
  }
}