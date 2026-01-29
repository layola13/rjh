import { Util } from './Util';
import { StateRequest } from './StateRequest';

interface Layer {
  // Add specific layer properties based on your application
  [key: string]: unknown;
}

interface Vertex {
  // Add specific vertex properties based on your application
  [key: string]: unknown;
}

interface ClicksRatio {
  id: string;
  name: string;
}

interface CurrentParams {
  activeSection: string;
  clicksRatio: ClicksRatio;
}

/**
 * Request to delete a slab profile point
 */
export class DeleteSlabProfilePointRequest extends StateRequest {
  private readonly layer: Layer;
  private readonly vertex: Vertex;

  constructor(vertex: Vertex, layer: Layer) {
    super();
    this.vertex = vertex;
    this.layer = layer;
  }

  onCommit(): void {
    if (Util.tryMergeVertexOnLoop(this.vertex)) {
      HSCore.Util.TgSlab.updateLayerSlabFaces(this.layer);
      super.onCommit?.();
    }
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "删除楼板端点";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabOperation;
  }

  getCurrentParams(): CurrentParams {
    return {
      activeSection: HSFPConstants.LogGroupTypes.SlabOperation,
      clicksRatio: {
        id: "deleteSlabProfilePoint",
        name: "删除楼板端点"
      }
    };
  }
}