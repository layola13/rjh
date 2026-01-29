import { isPointOnCurve } from './curve-utils';
import { Edge } from './edge';
import { CoEdge } from './coedge';
import { Loop } from './loop';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ArcEdge extends Edge {
  curve: {
    getCenter(): Point3D;
  };
  from: Point3D;
  to: Point3D;
  radius: number;
  clockwise: boolean;
  isArcEdge(): boolean;
}

interface InsertEdgeResult {
  newVertex: HSCore.Model.Vertex;
  newEdge: Edge;
  newCoEdges: CoEdge[];
}

interface InsertPointResult {
  newVertex: HSCore.Model.Vertex;
  newCoEdge: CoEdge;
}

interface InsertPointsResult {
  newVertices: HSCore.Model.Vertex[];
  newCoEdges: CoEdge[];
}

export const EdgeUtil = {
  toTHREECurve(edge: Edge): THREE.Curve<THREE.Vector3> | THREE.Line3 {
    if (this.isArcEdge(edge)) {
      const arcEdge = edge as ArcEdge;
      const center = GeLib.VectorUtils.toTHREEVector3(arcEdge.curve.getCenter());
      const fromPoint = GeLib.VectorUtils.toTHREEVector3(arcEdge.from);
      const toPoint = GeLib.VectorUtils.toTHREEVector3(arcEdge.to);
      
      fromPoint.z = toPoint.z = center.z = 0;
      
      return GeLib.ArcUtils.createArcFromPoints(
        fromPoint,
        toPoint,
        center,
        arcEdge.radius,
        arcEdge.clockwise
      );
    } else {
      const fromPoint = GeLib.VectorUtils.toTHREEVector3(edge.from);
      const toPoint = GeLib.VectorUtils.toTHREEVector3(edge.to);
      return new THREE.Line3(fromPoint, toPoint);
    }
  },

  getCoEdgeLoop(coEdge: CoEdge): Loop | undefined {
    if (coEdge && coEdge instanceof CoEdge) {
      const parent = coEdge.getUniqueParent();
      if (parent && parent instanceof Loop) {
        return parent;
      }
    }
    return undefined;
  },

  getEdgeLoops(edge: Edge): Loop[] {
    const loops: Loop[] = [];
    let loop: Loop | undefined;
    let coEdge = edge.coedge;

    if (coEdge) {
      loop = this.getCoEdgeLoop(coEdge);
      if (loop) {
        loops.push(loop);
      }

      coEdge = coEdge.partner;
      if (coEdge) {
        loop = this.getCoEdgeLoop(coEdge);
        if (loop) {
          loops.push(loop);
        }
      }
    }

    return loops;
  },

  insertEdgeAtEndPoint(edge: Edge, isFromPoint: boolean): InsertEdgeResult {
    const point = isFromPoint ? edge.from : edge.to;
    const newVertex = HSCore.Model.Vertex.create(point.x, point.y, point.z);
    let newEdge: Edge | undefined;
    const newCoEdges: CoEdge[] = [];

    for (const key in edge.parents) {
      const parent = edge.parents[key];
      if (!parent) {
        continue;
      }

      const shouldReverse = parent.reversed ? !isFromPoint : isFromPoint;
      const fromVertex = shouldReverse ? point : newVertex;
      const toVertex = shouldReverse ? newVertex : point;
      const coEdge = HSCore.Model.CoEdge.create(fromVertex, toVertex);

      if (newEdge) {
        assert(newEdge === coEdge.edge, "insertEdgeAtEndPoint", "HSCore.Util");
      } else {
        newEdge = coEdge.edge;
      }

      if (shouldReverse) {
        parent.from = coEdge.to;
      } else {
        parent.to = coEdge.from;
      }

      const loop = this.getCoEdgeLoop(parent);
      if (loop) {
        if (shouldReverse) {
          loop.appendCoEdge(coEdge, parent.prev);
        } else {
          loop.appendCoEdge(coEdge, parent);
        }
      }

      newCoEdges.push(coEdge);
    }

    return {
      newVertex,
      newEdge: newEdge!,
      newCoEdges
    };
  },

  insertEdgeAtFromToPoint(edge: Edge, isFromPoint: boolean): InsertPointResult {
    const point = isFromPoint ? edge.from : edge.to;
    return this.insertPointOnCoEdge(edge, point, isFromPoint);
  },

  insertPointOnCoEdge(coEdge: CoEdge, point: Point3D, insertAtStart: boolean): InsertPointResult {
    const newVertex = HSCore.Model.Vertex.create(point.x, point.y, point.z);
    const fromVertex = insertAtStart ? coEdge.from : newVertex;
    const toVertex = insertAtStart ? newVertex : coEdge.to;
    const newCoEdge = HSCore.Model.CoEdge.create(fromVertex, toVertex);

    if (insertAtStart) {
      coEdge.from = newCoEdge.to;
    } else {
      coEdge.to = newCoEdge.from;
    }

    const loop = this.getCoEdgeLoop(coEdge);
    if (loop) {
      if (insertAtStart) {
        loop.appendCoEdge(newCoEdge, coEdge.prev);
      } else {
        loop.appendCoEdge(newCoEdge, coEdge);
      }
    }

    if (coEdge.partner) {
      const partnerLoop = this.getCoEdgeLoop(coEdge.partner);
      const partnerCoEdge = HSCore.Model.CoEdge.create(toVertex, fromVertex);
      
      if (insertAtStart) {
        partnerLoop?.appendCoEdge(partnerCoEdge, coEdge.partner);
      } else {
        partnerLoop?.appendCoEdge(partnerCoEdge, coEdge.partner.prev);
      }
    }

    return {
      newVertex,
      newCoEdge
    };
  },

  insertPointsOnCoEdge(coEdge: CoEdge, points: Point3D[], insertAtStart: boolean): InsertPointsResult {
    const newCoEdges: CoEdge[] = [];
    const newVertices: HSCore.Model.Vertex[] = [];
    let currentCoEdge = coEdge;

    for (const point of points) {
      const { newVertex, newCoEdge } = this.insertPointOnCoEdge(currentCoEdge, point, insertAtStart);
      newCoEdges.push(newCoEdge);
      newVertices.push(newVertex);
      
      if (!insertAtStart) {
        currentCoEdge = newCoEdge;
      }
    }

    return {
      newVertices,
      newCoEdges
    };
  },

  isPointOnCoEdge(coEdge: CoEdge, point: Point3D): boolean {
    return this.isPointOnEdge(coEdge.edge, point);
  },

  isPointOnEdge(edge: Edge, point: Point3D, adjustZ: boolean = true): boolean {
    const curve = this.toTHREECurve(edge);
    const threePoint = GeLib.VectorUtils.toTHREEVector3(point);
    
    if (adjustZ) {
      threePoint.z = edge.from.z;
    }
    
    return isPointOnCurve(threePoint, curve);
  },

  isArcEdge(edge: Edge): edge is ArcEdge {
    return edge instanceof Edge && edge.isArcEdge();
  }
};