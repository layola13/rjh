import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface Slab {
  getBaseLayer(): Layer;
}

interface Layer {
  // Define layer properties as needed
}

export class ChangeSlabRequest extends HSApp.Request.LayerStructureEditRequest {
  private slab: Slab;

  constructor(slab: Slab) {
    super(slab.getBaseLayer());
    this.slab = slab;
  }

  onCommit(): boolean {
    super.onCommit();
    return true;
  }

  doRequest(): void {
    HSCore.Util.Slab.validateSlabFaces(this.slab);
    super.doRequest();
  }
}