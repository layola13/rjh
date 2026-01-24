/**
 * Point utility module providing operations for point manipulation, wall merging, and association management
 * @module PointUtil
 */

/**
 * Point utility class providing static methods for point-related operations
 */
export declare class PointUtil {
  /**
   * Checks if walls connected to a point can be merged
   * @param point - The point to check for wall merging capability
   * @returns True if the walls can be merged, false otherwise
   * @remarks
   * - Returns false if there are no walls or more than 3 walls connected to the point
   * - Requires at least 2 walls that share the same point (from or to)
   */
  canMergeWall(point: HSCore.Model.Point): boolean;

  /**
   * Attempts to merge walls connected at a specific point
   * @param point - The point where walls should be merged
   * @param force - If true, allows merging even when more than 2 walls are connected
   * @returns The merged wall if successful, undefined otherwise
   * @remarks
   * - Sorts walls by length in descending order before merging
   * - Only merges if exactly 2 eligible walls are found
   * - The first wall absorbs the second wall
   */
  tryMergeWallOnPoint(point: HSCore.Model.Point, force?: boolean): HSCore.Model.Wall | undefined;

  /**
   * Finds walls that can be merged from a list of candidate walls
   * @param walls - Array of walls to search for mergeable pairs
   * @returns Object containing the mergeable walls, or undefined if none found
   * @remarks
   * - Skips invalid walls
   * - Returns the first mergeable pair found
   */
  findMergeWalls(walls: HSCore.Model.Wall[]): { merge: [HSCore.Model.Wall, HSCore.Model.Wall] } | undefined;

  /**
   * Internal method to check if two walls can be merged
   * @param wall1 - First wall to check
   * @param wall2 - Second wall to check
   * @returns True if the walls can be merged, false otherwise
   * @remarks
   * Checks the following conditions:
   * - Walls must share a common endpoint (from or to)
   * - Walls must be collinear (on the same line or arc)
   * - Load bearing property must match
   * - Heights must be nearly equal
   * - Widths must be nearly equal (unless wall is wrapped)
   * - Arc walls cannot merge with line walls
   */
  _canMerge(wall1: HSCore.Model.Wall, wall2: HSCore.Model.Wall): boolean;

  /**
   * Gets the wall associated with a point through the association manager
   * @param point - The point to query for associated wall
   * @returns The associated wall if found, undefined otherwise
   */
  getAssociatedWall(point: HSCore.Model.Point): HSCore.Model.Wall | undefined;

  /**
   * Gets all points connected to the specified point through edges
   * @param point - The point to find connections for
   * @returns Array of connected points (excludes the input point itself)
   * @remarks
   * - Retrieves all edges connected to the point
   * - Returns unique points from edge endpoints
   * - Filters out the input point from results
   */
  getConnectPoints(point: HSCore.Model.Point): HSCore.Model.Point[];

  /**
   * Sets or updates the entity associated with a point
   * @param point - The point to associate
   * @param entity - The entity to associate (Vertex or Wall), or null to remove association
   * @remarks
   * - Removes existing association if it differs from the new entity
   * - Creates PointOnPointAssociation for Vertex entities
   * - Creates PointOnLineAssociation for Wall entities
   */
  setAssociateEntity(
    point: HSCore.Model.Point,
    entity: HSCore.Model.Vertex | HSCore.Model.Wall | null
  ): void;
}

/**
 * Namespace declarations for HSCore framework types
 */
declare namespace HSCore {
  namespace Model {
    /**
     * Represents a 2D point in the floor plan
     */
    interface Point {
      id: string;
      x: number;
      y: number;
    }

    /**
     * Represents a wall element with geometric and structural properties
     */
    interface Wall {
      id: string;
      from: Point;
      to: Point;
      center?: THREE.Vector3;
      radius?: number;
      clockwise?: boolean;
      length: number;
      width: number;
      height3d: number;
      isLoadBearing: boolean;
      isValid(): boolean;
      merge(other: Wall): void;
    }

    /**
     * Represents a vertex point in 3D space
     */
    interface Vertex {
      id: string;
      position: THREE.Vector3;
    }
  }

  namespace Util {
    namespace Point {
      function getParentWalls(point: Model.Point): Model.Wall[];
      function getParentEdges(point: Model.Point): Array<{ from: Model.Point; to: Model.Point }>;
    }

    namespace Math {
      function isSamePoint(p1: Model.Point, p2: Model.Point): boolean;
      function nearlyEquals(a: number, b: number): boolean;
    }

    namespace Wall {
      function isArcWall(wall: Model.Wall): boolean;
      function getClassifiedNeighborWalls(wall: Model.Wall, includeInvalid: boolean): Model.Wall[];
      function getWallWrapInfo(wall: Model.Wall, neighbors: Model.Wall[]): { isWrapped: boolean };
    }
  }

  namespace Doc {
    interface AssociationManager {
      getEntityByTarget(target: Model.Point, strict: boolean): Model.Wall | Model.Vertex | null;
      removeAssociation(entityId: string, target: Model.Point): void;
      addAssociation(entity: Model.Wall | Model.Vertex, target: Model.Point, type: string): void;
    }

    interface DocumentManager {
      associationManager: AssociationManager;
    }

    function getDocManager(): DocumentManager;
  }
}

declare namespace HSConstants {
  enum ModelClass {
    PointOnPointAssociation = "PointOnPointAssociation",
    PointOnLineAssociation = "PointOnLineAssociation"
  }
}

declare namespace GeLib {
  namespace VectorUtils {
    function toTHREEVector3(point: { x: number; y: number }): THREE.Vector3;
  }

  namespace ArcUtils {
    function createArcFromPoints(
      from: THREE.Vector3,
      to: THREE.Vector3,
      center: THREE.Vector3,
      radius: number,
      clockwise: boolean
    ): THREE.ArcCurve;
  }

  namespace LineUtils {
    function isSameLines(line1: THREE.Line3, line2: THREE.Line3): boolean;
  }

  namespace MathUtils {
    function nearlyEqual(a: number, b: number, tolerance: number): boolean;
  }
}

declare namespace THREE {
  class Vector3 {
    x: number;
    y: number;
    z: number;
  }

  class Line3 {
    constructor(start: Vector3, end: Vector3);
  }

  class ArcCurve {
    aX: number;
    aY: number;
    xRadius: number;
    yRadius: number;
  }
}