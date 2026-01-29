interface Coedge {
  length: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  edge: unknown;
}

interface Layer {
  [key: string]: unknown;
}

interface SplitResult {
  point: Vertex;
  edges: unknown[];
}

interface Vertex {
  x: number;
  y: number;
}

interface TransactionManager {
  cancel(): void;
}

interface CurrentParams {
  activeSection: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

declare const HSCore: {
  Model: {
    Vertex: {
      create(x: number, y: number): Vertex;
    };
  };
  Util: {
    Math: {
      lerp(from: number, to: number, t: number): number;
    };
    TgSlab: {
      updateLayerSlabFaces(layer: Layer): void;
    };
  };
  Transaction: {
    Common: {
      StateRequest: new (...args: unknown[]) => StateRequest;
    };
  };
};

declare const HSFPConstants: {
  LogGroupTypes: {
    SlabOperation: string;
  };
};

interface StateRequest {
  mgr: TransactionManager;
  onCommit(): void;
}

class SplitSlabProfileEdgeRequest extends (HSCore.Transaction.Common.StateRequest as any) {
  coedge: Coedge;
  layer: Layer;
  lerp: number;
  mgr: TransactionManager;

  constructor(coedge: Coedge, layer: Layer, lerp: number) {
    super();
    this.coedge = coedge;
    this.layer = layer;
    this.lerp = lerp;
  }

  splitByLerpNumber(lerpValue: number, updateFaces: boolean): SplitResult | undefined {
    const coedge = this.coedge;
    
    const MIN_EDGE_LENGTH = 0.3;
    if (coedge.length < MIN_EDGE_LENGTH || lerpValue < 0 || lerpValue > 1) {
      return undefined;
    }

    const interpolatedX = HSCore.Util.Math.lerp(coedge.from.x, coedge.to.x, lerpValue);
    const interpolatedY = HSCore.Util.Math.lerp(coedge.from.y, coedge.to.y, lerpValue);
    const vertex = HSCore.Model.Vertex.create(interpolatedX, interpolatedY);

    const edges = Util.splitEdgeByPoints(this.coedge.edge, [vertex], updateFaces);

    if (edges.length > 1) {
      return undefined;
    }

    return {
      point: vertex,
      edges: edges
    };
  }

  onCommit(): void {
    const splitResult = this.splitByLerpNumber(this.lerp, false);
    
    if (splitResult) {
      HSCore.Util.TgSlab.updateLayerSlabFaces(this.layer);
      super.onCommit();
    } else {
      this.mgr.cancel();
    }
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "添加楼板端点";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabOperation;
  }

  getCurrentParams(): CurrentParams {
    return {
      activeSection: HSFPConstants.LogGroupTypes.SlabOperation,
      clicksRatio: {
        id: "splitSlabProfileEdge",
        name: "添加楼板端点"
      }
    };
  }
}

const Util = {
  splitEdgeByPoints(edge: unknown, points: Vertex[], updateFaces: boolean): unknown[] {
    return [];
  }
};

export { SplitSlabProfileEdgeRequest };