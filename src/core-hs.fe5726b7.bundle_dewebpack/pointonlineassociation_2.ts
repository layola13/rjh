import { AssociationBase, Association } from './AssociationBase';
import { PointUtil } from './PointUtil';

interface Vertex {
  x: number;
  y: number;
  set(x: number, y: number, z?: unknown, invalidate?: boolean): void;
  _invalidateSubgraph(): void;
  length(): number;
}

interface Edge {
  from: Vertex;
  to: Vertex;
  isSplitEdge: boolean;
  isInnerEdge: boolean;
  dirty(): void;
}

interface Vector2 {
  x: number;
  y: number;
  length(): number;
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
  distanceTo(other: Vector3): number;
}

interface Line3 {
  start: Vector3;
  end: Vector3;
}

declare const GeLib: {
  VectorUtils: {
    toTHREEVector3(vertex: Vertex): Vector3;
  };
  LineUtils: {
    getIntersection(line1: Line3, line2: Line3): Vector3 | null;
    isPointOnLine(point: Vector3, line: Line3): boolean;
  };
};

declare const THREE: {
  Line3: new (start: Vector3, end: Vector3) => Line3;
};

declare const HSCore: {
  Util: {
    Math: {
      Vec2: {
        difference(a: Vector3, b: Vertex): Vector2;
      };
    };
  };
};

declare const HSConstants: {
  ModelClass: {
    PointOnLineAssociation: string;
  };
};

/**
 * Association that constrains a point to lie on a line formed by connected edges.
 * When computed, projects the target vertex onto the nearest intersecting line.
 */
export class PointOnLineAssociation extends AssociationBase {
  private _entity: Edge;

  constructor(entity: Edge, target: Vertex) {
    super(entity, target);
  }

  get entity(): Edge {
    return this._entity;
  }

  /**
   * Computes the association by projecting the target vertex onto the nearest intersecting line.
   * @param invalidate - Whether to invalidate the subgraph after computation
   */
  compute(invalidate: boolean = true): void {
    const entityLine = PointOnLineAssociation._wallVertexToLine(this.entity);
    let closestIntersection: Vector3 | undefined;
    let closestDistance: Vector2 | undefined;
    const affectedEdges = new Set<Edge>();
    const targetVertex = this.firstTarget as Vertex;

    PointUtil.getParentEdges(targetVertex).forEach((edge: Edge) => {
      const edgeLine = PointOnLineAssociation._wallVertexToLine(edge);
      const intersection = GeLib.LineUtils.getIntersection(entityLine, edgeLine);

      if (!intersection) {
        return;
      }

      if (edge.isSplitEdge && edge.isInnerEdge) {
        affectedEdges.add(edge);
      }

      const distanceVector = HSCore.Util.Math.Vec2.difference(intersection, targetVertex);

      if (!closestDistance || closestDistance.length() > distanceVector.length()) {
        closestIntersection = intersection;
        closestDistance = distanceVector;
      }
    });

    if (closestIntersection) {
      targetVertex.set(closestIntersection.x, closestIntersection.y, undefined, invalidate);

      affectedEdges.forEach((edge: Edge) => {
        const oppositeVertex = edge.from === targetVertex ? edge.to : edge.from;
        oppositeVertex.set(
          oppositeVertex.x + closestDistance!.x,
          oppositeVertex.y + closestDistance!.y,
          undefined,
          invalidate
        );
      });

      if (invalidate) {
        targetVertex._invalidateSubgraph();
      }
    }
  }

  /**
   * Converts an edge (wall vertex pair) to a 3D line with z=0.
   * @param edge - The edge to convert
   * @returns A THREE.Line3 representation of the edge
   */
  private static _wallVertexToLine(edge: Edge): Line3 {
    const startPoint = GeLib.VectorUtils.toTHREEVector3(edge.from);
    const endPoint = GeLib.VectorUtils.toTHREEVector3(edge.to);
    startPoint.z = 0;
    endPoint.z = 0;
    return new THREE.Line3(startPoint, endPoint);
  }

  /**
   * Extends a wall edge to include a given point if the point lies on the edge's line.
   * @param edge - The edge to potentially extend
   * @param point - The point to extend to
   */
  private static _extendWallToPoint(edge: Edge, point: Vertex): void {
    const targetPoint = GeLib.VectorUtils.toTHREEVector3(point);
    const startPoint = GeLib.VectorUtils.toTHREEVector3(edge.from);
    const endPoint = GeLib.VectorUtils.toTHREEVector3(edge.to);
    const edgeLine = new THREE.Line3(startPoint, endPoint);

    if (GeLib.LineUtils.isPointOnLine(targetPoint, edgeLine)) {
      if (startPoint.distanceTo(targetPoint) > endPoint.distanceTo(targetPoint)) {
        edge.to.set(targetPoint.x, targetPoint.y);
      } else {
        edge.from.set(targetPoint.x, targetPoint.y);
      }
      edge.dirty();
    }
  }
}

Association.registerClass(HSConstants.ModelClass.PointOnLineAssociation, PointOnLineAssociation);