import { AssociationBase, Association } from './AssociationBase';
import { PointUtil } from './PointUtil';

/**
 * Represents an association that constrains a point (vertex) to lie on a line (edge).
 * When computed, it projects the point onto the nearest intersecting line and adjusts
 * related split edges accordingly.
 */
export class PointOnLineAssociation extends AssociationBase {
  /**
   * Creates a new PointOnLineAssociation instance.
   * @param entity - The primary entity (typically a wall vertex or edge)
   * @param target - The target entity to associate with
   */
  constructor(entity: WallEdge, target: WallVertex) {
    super(entity, target);
  }

  /**
   * Gets the associated entity (wall edge).
   */
  get entity(): WallEdge {
    return this._entity;
  }

  /**
   * Computes the point-on-line constraint by finding the nearest intersection
   * with parent edges and adjusting the vertex position accordingly.
   * @param invalidate - Whether to invalidate the subgraph after computation (default: true)
   */
  compute(invalidate: boolean = true): void {
    // Convert the entity edge to a 3D line
    const entityLine = PointOnLineAssociation._wallVertexToLine(this.entity);
    
    let closestIntersection: THREE.Vector3 | undefined;
    let shortestOffset: THREE.Vector3 | undefined;
    const affectedSplitEdges = new Set<WallEdge>();
    
    const targetVertex = this.firstTarget;
    
    // Find all parent edges of the target vertex
    PointUtil.getParentEdges(targetVertex).forEach((parentEdge: WallEdge) => {
      const parentLine = PointOnLineAssociation._wallVertexToLine(parentEdge);
      const intersection = GeLib.LineUtils.getIntersection(entityLine, parentLine);
      
      if (!intersection) {
        return;
      }
      
      // Track split edges that need adjustment
      if (parentEdge.isSplitEdge && parentEdge.isInnerEdge) {
        affectedSplitEdges.add(parentEdge);
      }
      
      // Calculate offset from target vertex to intersection
      const offset = HSCore.Util.Math.Vec2.difference(intersection, targetVertex);
      
      // Keep track of the closest intersection
      if (!shortestOffset || shortestOffset.length() > offset.length()) {
        closestIntersection = intersection;
        shortestOffset = offset;
      }
    });
    
    // Apply the computed position adjustment
    if (closestIntersection) {
      targetVertex.set(closestIntersection.x, closestIntersection.y, undefined, invalidate);
      
      // Adjust connected split edges
      affectedSplitEdges.forEach((splitEdge: WallEdge) => {
        const oppositeVertex = splitEdge.from === targetVertex ? splitEdge.to : splitEdge.from;
        oppositeVertex.set(
          oppositeVertex.x + shortestOffset!.x,
          oppositeVertex.y + shortestOffset!.y,
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
   * Converts a wall edge (defined by two vertices) to a THREE.Line3 in 2D space (z=0).
   * @param edge - The wall edge to convert
   * @returns A THREE.Line3 representation of the edge
   */
  private static _wallVertexToLine(edge: WallEdge): THREE.Line3 {
    const startPoint = GeLib.VectorUtils.toTHREEVector3(edge.from);
    const endPoint = GeLib.VectorUtils.toTHREEVector3(edge.to);
    
    // Flatten to 2D by setting z to 0
    startPoint.z = 0;
    endPoint.z = 0;
    
    return new THREE.Line3(startPoint, endPoint);
  }

  /**
   * Extends a wall edge to reach a specific point if the point lies on the edge's line.
   * Adjusts the nearest endpoint (from or to) to match the point's position.
   * @param edge - The wall edge to extend
   * @param point - The target point to extend to
   */
  private static _extendWallToPoint(edge: WallEdge, point: WallVertex): void {
    const targetPoint = GeLib.VectorUtils.toTHREEVector3(point);
    const startPoint = GeLib.VectorUtils.toTHREEVector3(edge.from);
    const endPoint = GeLib.VectorUtils.toTHREEVector3(edge.to);
    const edgeLine = new THREE.Line3(startPoint, endPoint);
    
    if (GeLib.LineUtils.isPointOnLine(targetPoint, edgeLine)) {
      // Extend the endpoint closest to the target point
      if (startPoint.distanceTo(targetPoint) > endPoint.distanceTo(targetPoint)) {
        edge.to.set(targetPoint.x, targetPoint.y);
      } else {
        edge.from.set(targetPoint.x, targetPoint.y);
      }
      edge.dirty();
    }
  }
}

// Register the class with the association system
Association.registerClass(HSConstants.ModelClass.PointOnLineAssociation, PointOnLineAssociation);

/**
 * Type definitions for external dependencies
 */
interface WallEdge {
  from: WallVertex;
  to: WallVertex;
  isSplitEdge: boolean;
  isInnerEdge: boolean;
  dirty(): void;
}

interface WallVertex {
  x: number;
  y: number;
  set(x: number, y: number, z?: number, invalidate?: boolean): void;
  _invalidateSubgraph(): void;
}

declare namespace GeLib {
  namespace VectorUtils {
    function toTHREEVector3(vertex: WallVertex): THREE.Vector3;
  }
  
  namespace LineUtils {
    function getIntersection(line1: THREE.Line3, line2: THREE.Line3): THREE.Vector3 | null;
    function isPointOnLine(point: THREE.Vector3, line: THREE.Line3): boolean;
  }
}

declare namespace HSCore.Util.Math {
  namespace Vec2 {
    function difference(v1: WallVertex | THREE.Vector3, v2: WallVertex): THREE.Vector3;
  }
}

declare namespace HSConstants {
  enum ModelClass {
    PointOnLineAssociation = 'PointOnLineAssociation'
  }
}