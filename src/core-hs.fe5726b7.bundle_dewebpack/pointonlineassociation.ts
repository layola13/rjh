import { AssociationBase, Association } from './AssociationBase';
import { PointUtil } from './PointUtil';

interface WallVertex {
  x: number;
  y: number;
  set(x: number, y: number, z: number | undefined, notify: boolean): void;
  _invalidateSubgraph(): void;
}

interface Edge {
  from: WallVertex;
  to: WallVertex;
  isSplitEdge: boolean;
  isInnerEdge: boolean;
}

interface Vector2 {
  x: number;
  y: number;
  length(): number;
}

interface Line3 {
  start: { x: number; y: number; z: number };
  end: { x: number; y: number; z: number };
}

declare const GeLib: {
  LineUtils: {
    getIntersection(line1: Line3, line2: Line3): Vector2 | null;
  };
  VectorUtils: {
    toTHREEVector3(vertex: WallVertex): { x: number; y: number; z: number };
  };
};

declare const HSCore: {
  Util: {
    Math: {
      Vec2: {
        difference(point1: Vector2, point2: WallVertex): Vector2;
      };
    };
  };
};

declare const THREE: {
  Line3: new (start: { x: number; y: number; z: number }, end: { x: number; y: number; z: number }) => Line3;
};

declare const HSConstants: {
  ModelClass: {
    PointOnLineAssociation: string;
  };
};

export class PointOnLineAssociation extends AssociationBase {
  private _entity: Edge;

  constructor(entity: Edge, target: WallVertex) {
    super(entity, target);
  }

  get entity(): Edge {
    return this._entity;
  }

  get firstTarget(): WallVertex {
    return this._firstTarget;
  }

  compute(notify: boolean = true): void {
    const entityLine = PointOnLineAssociation._wallVertexToLine(this.entity);
    let closestIntersection: Vector2 | undefined;
    let shortestDistance: Vector2 | undefined;
    const affectedEdges = new Set<Edge>();
    const targetPoint = this.firstTarget;

    PointUtil.getParentEdges(targetPoint).forEach((edge: Edge) => {
      const edgeLine = PointOnLineAssociation._wallVertexToLine(edge);
      const intersection = GeLib.LineUtils.getIntersection(entityLine, edgeLine);

      if (!intersection) {
        return;
      }

      if (edge.isSplitEdge && edge.isInnerEdge) {
        affectedEdges.add(edge);
      }

      const distanceVector = HSCore.Util.Math.Vec2.difference(intersection, targetPoint);

      if (!shortestDistance || shortestDistance.length() > distanceVector.length()) {
        closestIntersection = intersection;
        shortestDistance = distanceVector;
      }
    });

    if (closestIntersection) {
      targetPoint.set(closestIntersection.x, closestIntersection.y, undefined, notify);

      affectedEdges.forEach((edge: Edge) => {
        const otherVertex = edge.from === targetPoint ? edge.to : edge.from;
        otherVertex.set(
          otherVertex.x + shortestDistance!.x,
          otherVertex.y + shortestDistance!.y,
          undefined,
          notify
        );
      });

      if (notify) {
        targetPoint._invalidateSubgraph();
      }
    }
  }

  private static _wallVertexToLine(edge: Edge): Line3 {
    const startPoint = GeLib.VectorUtils.toTHREEVector3(edge.from);
    const endPoint = GeLib.VectorUtils.toTHREEVector3(edge.to);
    startPoint.z = 0;
    endPoint.z = 0;
    return new THREE.Line3(startPoint, endPoint);
  }
}

Association.registerClass(HSConstants.ModelClass.PointOnLineAssociation, PointOnLineAssociation);