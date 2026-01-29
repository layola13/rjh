import { HSCore } from './HSCore';
import { Util } from './Util';

interface Point {
  x: number;
  y: number;
}

interface ConstraintInfo {
  constraintLine: [Point, Point];
  isNeedInsertNewEdge: boolean;
}

interface Vertex {
  x: number;
  y: number;
  parents: Record<string, Edge>;
  set(x: number, y: number): void;
}

interface Edge {
  from: Vertex;
  to: Vertex;
  edge?: Edge;
  prev?: Edge;
}

interface Layer {
  [key: string]: unknown;
}

interface MoveEventData {
  offset: Point;
}

export class MoveSlabProfileEdgeRequest extends HSCore.Transaction.Common.StateRequest {
  entity: Edge;
  layer: Layer;
  dataFrom: Point;
  dataTo: Point;
  private _fromPointConstraintInfo!: ConstraintInfo;
  private _toPointConstraintInfo!: ConstraintInfo;
  private _miniWallLen: number;

  constructor(entity: Edge, layer: Layer) {
    super();
    this.entity = entity;
    this.layer = layer;
    this._miniWallLen = 0.05;
    this.dataFrom = {
      x: this.entity.from.x,
      y: this.entity.from.y
    };
    this.dataTo = {
      x: this.entity.to.x,
      y: this.entity.to.y
    };
    this._computeConstraintDirection();
  }

  onReceive(eventType: string, eventData: MoveEventData): boolean {
    if (eventType === 'move') {
      this.move(eventData.offset.x, eventData.offset.y);
      return true;
    }
    return super.onReceive(eventType, eventData);
  }

  onActivate(): void {
    this._tryInsertNewEdges();
  }

  private _tryInsertNewEdges(): void {
    if (this._fromPointConstraintInfo.isNeedInsertNewEdge) {
      this._insertEdgeAtPoint(this.entity.from);
    }
    if (this._toPointConstraintInfo.isNeedInsertNewEdge) {
      this._insertEdgeAtPoint(this.entity.to);
    }
  }

  private _insertEdgeAtPoint(point: Vertex): void {
    if (!this.entity) {
      return;
    }

    const isFromPoint = HSCore.Util.Math.isSamePoint(this.entity.from, point, 0.001);
    const newVertex = HSCore.Model.Vertex.create(point.x, point.y);
    const startVertex = isFromPoint ? point : newVertex;
    const endVertex = isFromPoint ? newVertex : point;
    const newCoEdge = HSCore.Model.CoEdge.create(startVertex, endVertex);

    if (isFromPoint) {
      this.entity.from = newCoEdge.to;
    } else {
      this.entity.to = newCoEdge.from;
    }

    const coEdgeLoop = HSCore.Util.Edge.getCoEdgeLoop(this.entity);
    if (coEdgeLoop) {
      if (isFromPoint) {
        coEdgeLoop.appendCoEdge(newCoEdge, this.entity.prev);
      } else {
        coEdgeLoop.appendCoEdge(newCoEdge, this.entity);
      }
      assert(coEdgeLoop.validate());
    }
  }

  move(offsetX: number, offsetY: number): void {
    const newFromPoint: Point = {
      x: this.dataFrom.x + offsetX,
      y: this.dataFrom.y + offsetY
    };
    const newToPoint: Point = {
      x: this.dataTo.x + offsetX,
      y: this.dataTo.y + offsetY
    };
    this._move(newFromPoint, newToPoint);
  }

  private _move(newFromPoint: Point, newToPoint: Point): void {
    const fromVertex = this.entity.from;
    const toVertex = this.entity.to;
    const fromConstraintLine = this._fromPointConstraintInfo.constraintLine;
    const toConstraintLine = this._toPointConstraintInfo.constraintLine;

    let skipConstraints = false;
    if (!fromConstraintLine || !toConstraintLine) {
      skipConstraints = true;
    }

    if (skipConstraints) {
      fromVertex.set(newFromPoint.x, newFromPoint.y);
      toVertex.set(newToPoint.x, newToPoint.y);
    } else {
      const newFromIntersection = HSCore.Util.Math.lineLineIntersection(
        fromConstraintLine[0],
        fromConstraintLine[1],
        newFromPoint,
        newToPoint
      );
      const newToIntersection = HSCore.Util.Math.lineLineIntersection(
        toConstraintLine[0],
        toConstraintLine[1],
        newFromPoint,
        newToPoint
      );

      if (!newFromIntersection || !newToIntersection) {
        return;
      }

      if (HSCore.Util.Math.getDistance(newFromIntersection, newToIntersection) < this._miniWallLen) {
        return;
      }

      const originalDirection = HSCore.Util.Math.Vec2.difference(fromVertex, toVertex);
      const newDirection = HSCore.Util.Math.Vec2.difference(newFromIntersection, newToIntersection);
      if (HSCore.Util.Math.Vec2.dot(originalDirection, newDirection) < 0) {
        return;
      }

      if (
        isNaN(newFromIntersection.x) ||
        isNaN(newFromIntersection.y) ||
        isNaN(newToIntersection.x) ||
        isNaN(newToIntersection.y) ||
        !isFinite(newFromIntersection.x) ||
        !isFinite(newFromIntersection.y) ||
        !isFinite(newToIntersection.x) ||
        !isFinite(newToIntersection.y)
      ) {
        assert(false, 'bad calculation');
        return;
      }

      fromVertex.set(newFromIntersection.x, newFromIntersection.y);
      toVertex.set(newToIntersection.x, newToIntersection.y);
    }
  }

  removeDuplicatePoints(): void {
    const fromVertex = this.entity.from;
    const toVertex = this.entity.to;

    let connectedPoints = HSCore.Util.Point.getConnectPoints(fromVertex);
    connectedPoints.forEach((connectedPoint: Vertex) => {
      if (HSCore.Util.Math.isSamePoint(connectedPoint, fromVertex)) {
        Util.tryMergeVertexOnLoop(connectedPoint);
      }
    });

    connectedPoints = HSCore.Util.Point.getConnectPoints(toVertex);
    connectedPoints.forEach((connectedPoint: Vertex) => {
      if (HSCore.Util.Math.isSamePoint(connectedPoint, toVertex)) {
        Util.tryMergeVertexOnLoop(connectedPoint);
      }
    });
  }

  private _getConstraintInfo(vertex: Vertex): ConstraintInfo {
    const parentEdges: Edge[] = [];
    for (const key in vertex.parents) {
      const parentEdge = vertex.parents[key];
      if (parentEdge !== this.entity.edge) {
        parentEdges.push(parentEdge);
      }
    }

    let constraintDirection: HSCore.Util.Math.Vec2 | undefined;
    let constraintLine: [Point, Point];
    let isNeedInsertNewEdge = false;

    if (parentEdges.length === 2) {
      if (HSCore.Util.Math.isParallel(
        parentEdges[0].from,
        parentEdges[0].to,
        parentEdges[1].from,
        parentEdges[1].to
      )) {
        constraintLine = [
          { x: parentEdges[0].from.x, y: parentEdges[0].from.y },
          { x: parentEdges[0].to.x, y: parentEdges[0].to.y }
        ];
        isNeedInsertNewEdge = true;
      } else {
        constraintDirection = new HSCore.Util.Math.Vec2(
          this.entity.from.x - this.entity.to.x,
          this.entity.from.y - this.entity.to.y
        ).rotate(HSCore.Util.Math.toRadians(90));
        constraintLine = [
          { x: vertex.x, y: vertex.y },
          { x: constraintDirection.x + vertex.x, y: constraintDirection.y + vertex.y }
        ];
        isNeedInsertNewEdge = true;
      }
    } else if (parentEdges.length === 1) {
      const angle = HSCore.Util.Math.lineLineAngle(
        parentEdges[0].from,
        parentEdges[0].to,
        this.entity.from,
        this.entity.to
      );
      if (angle < 20) {
        constraintDirection = new HSCore.Util.Math.Vec2(
          this.entity.from.x - this.entity.to.x,
          this.entity.from.y - this.entity.to.y
        ).rotate(HSCore.Util.Math.toRadians(90));
        constraintLine = [
          { x: vertex.x, y: vertex.y },
          { x: constraintDirection.x + vertex.x, y: constraintDirection.y + vertex.y }
        ];
        isNeedInsertNewEdge = true;
      } else {
        constraintLine = [
          { x: parentEdges[0].from.x, y: parentEdges[0].from.y },
          { x: parentEdges[0].to.x, y: parentEdges[0].to.y }
        ];
      }
    } else {
      if (parentEdges.length > 2) {
        isNeedInsertNewEdge = true;
      }
      constraintDirection = new HSCore.Util.Math.Vec2(
        this.entity.from.x - this.entity.to.x,
        this.entity.from.y - this.entity.to.y
      ).rotate(HSCore.Util.Math.toRadians(90));
      constraintLine = [
        { x: vertex.x, y: vertex.y },
        { x: constraintDirection.x + vertex.x, y: constraintDirection.y + vertex.y }
      ];
    }

    return {
      constraintLine,
      isNeedInsertNewEdge
    };
  }

  private _computeConstraintDirection(): void {
    this._fromPointConstraintInfo = this._getConstraintInfo(this.entity.from);
    this._toPointConstraintInfo = this._getConstraintInfo(this.entity.to);
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
    return '移动楼板边';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabOperation;
  }
}