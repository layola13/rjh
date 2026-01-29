import { HSCore } from './HSCore';

export class CreateOutdoorSpaceRequest extends HSCore.Transaction.Common.StateRequest {
  private tempEdges: unknown;

  constructor(edges: unknown) {
    super();
    this.tempEdges = edges;
  }

  onCommit(): void {
    HSCore.Util.Slab.updateOutdoorLayerSlabs(this.tempEdges);
    super.onCommit([]);
  }

  onUndo(): void {
    super.onUndo([]);
  }

  onRedo(): void {
    super.onRedo([]);
  }

  canTransactField(): boolean {
    return true;
  }
}