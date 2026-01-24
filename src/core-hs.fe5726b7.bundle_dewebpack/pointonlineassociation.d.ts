import { AssociationBase, Association } from './AssociationBase';
import { PointUtil } from './PointUtil';

/**
 * Point on line association constraint.
 * Ensures a vertex point remains constrained to lie on an intersection line
 * formed by wall edges in a 2D plane.
 */
export declare class PointOnLineAssociation extends AssociationBase {
  /**
   * Creates a new point-on-line association constraint.
   * @param entity - The primary entity (wall edge) for this association
   * @param target - The target entity to be constrained
   */
  constructor(entity: WallEdge, target: Vertex);

  /**
   * Gets the associated wall edge entity.
   */
  get entity(): WallEdge;

  /**
   * Computes and applies the constraint, moving the target vertex to the nearest
   * intersection point on related wall lines.
   * 
   * @param shouldInvalidate - Whether to invalidate the subgraph after computation (default: true)
   * 
   * Algorithm:
   * 1. Converts the entity edge to a 2D line
   * 2. Finds all parent edges of the first target vertex
   * 3. Computes intersections between the entity line and each parent edge line
   * 4. Selects the closest intersection point
   * 5. Updates the vertex position and adjusts connected split/inner edges accordingly
   */
  compute(shouldInvalidate?: boolean): void;

  /**
   * Converts a wall edge (defined by from/to vertices) into a THREE.Line3
   * projected onto the Z=0 plane.
   * 
   * @param edge - The wall edge to convert
   * @returns A THREE.Line3 representing the edge in 2D space (z=0)
   */
  private static _wallVertexToLine(edge: WallEdge): THREE.Line3;
}

/**
 * Represents a wall edge with start and end vertices.
 */
interface WallEdge {
  /** Starting vertex of the edge */
  from: Vertex;
  /** Ending vertex of the edge */
  to: Vertex;
  /** Indicates if this edge was created by splitting another edge */
  isSplitEdge: boolean;
  /** Indicates if this is an interior edge (not on the boundary) */
  isInnerEdge: boolean;
}

/**
 * Represents a 2D/3D vertex point.
 */
interface Vertex {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Z coordinate (optional) */
  z?: number;

  /**
   * Updates the vertex position.
   * @param x - New X coordinate
   * @param y - New Y coordinate
   * @param z - New Z coordinate (undefined to keep current)
   * @param shouldInvalidate - Whether to trigger invalidation
   */
  set(x: number, y: number, z: number | undefined, shouldInvalidate: boolean): void;

  /**
   * Marks the subgraph containing this vertex as needing recalculation.
   * @internal
   */
  _invalidateSubgraph(): void;
}

/**
 * Global geometry library providing line and vector utilities.
 */
declare namespace GeLib {
  namespace LineUtils {
    /**
     * Computes the intersection point of two 3D lines.
     * @returns The intersection point, or null if lines don't intersect
     */
    function getIntersection(line1: THREE.Line3, line2: THREE.Line3): THREE.Vector3 | null;
  }

  namespace VectorUtils {
    /**
     * Converts a vertex to a THREE.Vector3.
     */
    function toTHREEVector3(vertex: Vertex): THREE.Vector3;
  }
}

/**
 * Global core utilities.
 */
declare namespace HSCore {
  namespace Util {
    namespace Math {
      namespace Vec2 {
        /**
         * Computes the vector difference between two points.
         */
        function difference(point1: THREE.Vector3, point2: Vertex): THREE.Vector3;
      }
    }
  }
}

/**
 * Global constants for model class identifiers.
 */
declare namespace HSConstants {
  enum ModelClass {
    PointOnLineAssociation = 'PointOnLineAssociation'
  }
}