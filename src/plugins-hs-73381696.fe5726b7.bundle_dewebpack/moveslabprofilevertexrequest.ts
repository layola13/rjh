import { HSCore } from './HSCore';
import { Util } from './Util';

interface Position {
  x: number;
  y: number;
}

interface MoveOffset {
  x: number;
  y: number;
}

interface Vertex {
  x: number;
  y: number;
  set(x: number, y: number): void;
  dirtyGeometry(): void;
}

interface Layer {
  // Layer properties would be defined based on actual usage
}

export class MoveSlabProfileVertexRequest extends HSCore.Transaction.Common.StateRequest {
  private vertex: Vertex;
  private layer: Layer;
  private moveBeginPosition: Position;

  constructor(vertex: Vertex, layer: Layer) {
    super();
    this.vertex = vertex;
    this.layer = layer;
    this.moveBeginPosition = {
      x: this.vertex.x,
      y: this.vertex.y
    };
  }

  onReceive(action: string, data: { offset?: MoveOffset }): boolean {
    if (action === 'move') {
      this._onMove(data.offset);
      return true;
    }
    return super.onReceive(action, data);
  }

  onCommit(): void {
    this.removeDuplicatePoints();
    HSCore.Util.TgSlab.updateLayerSlabFaces(this.layer);
    super.onCommit();
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '移动楼板端点';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabOperation;
  }

  private removeDuplicatePoints(): void {
    const vertex = this.vertex;
    HSCore.Util.Point.getConnectPoints(vertex).forEach((point: Vertex) => {
      if (HSCore.Util.Math.isSamePoint(point, vertex)) {
        Util.tryMergeVertexOnLoop(point);
      }
    });
  }

  private _onMove(offset?: MoveOffset): void {
    if (!offset) {
      return;
    }

    let newPosition = this._applyMoveRule(offset);
    newPosition = this._adjustMovePosition(newPosition);
    this.vertex.set(newPosition.x, newPosition.y);
    this.vertex.dirtyGeometry();
  }

  private _adjustMovePosition(position: Position): Position {
    return position;
  }

  private _applyMoveRule(offset: MoveOffset): Position {
    return {
      x: this.moveBeginPosition.x + offset.x,
      y: this.moveBeginPosition.y + offset.y
    };
  }
}