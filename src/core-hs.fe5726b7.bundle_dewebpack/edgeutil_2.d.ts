/**
 * Edge utility module for geometric operations on edges
 * Provides functions for splitting edges by points
 */

import * as THREE from 'three';

/**
 * Represents a 3D point in space
 */
interface Point3D {
  x: number;
  y: number;
  z?: number;
}

/**
 * Represents a vertex in 3D space
 */
interface Vertex {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents an edge between two vertices
 */
interface Edge {
  /** Starting vertex of the edge */
  from: Vertex;
  /** Ending vertex of the edge */
  to: Vertex;
  /** Length of the edge */
  length: number;
}

/**
 * Result of splitting an edge at a specific point
 */
interface EdgeSplitResult {
  /** The vertex at the split point (undefined if point is outside edge bounds) */
  vertex: Vertex | undefined;
  /** Linear interpolation parameter (0 = start, 1 = end) */
  lerp: number;
  /** Original point that was tested */
  point: Point3D;
}

/**
 * Minimum edge length threshold for splitting operations
 */
const MIN_EDGE_LENGTH = 0.001;

/**
 * Minimum valid lerp value (start of edge)
 */
const MIN_LERP = 0;

/**
 * Maximum valid lerp value (end of edge)
 */
const MAX_LERP = 1;

/**
 * Edge utility functions for geometric operations
 */
export const EdgeUtil = {
  /**
   * Splits an edge by multiple points, creating new vertices at valid intersection points
   * 
   * @param edge - The edge to split
   * @param points - Array of points to split the edge by
   * @returns Array of split results sorted by lerp parameter
   * 
   * @remarks
   * - Only creates vertices for points that lie strictly within the edge (0 < lerp < 1)
   * - Edges shorter than MIN_EDGE_LENGTH (0.001) are not split
   * - Points at edge endpoints are recorded but don't create new vertices
   * - Results are sorted by lerp value (distance along edge)
   * - Calls EulerOperations.esplit to perform the actual edge splitting
   */
  splitEdgeByPoints(edge: Edge, points: Point3D[]): EdgeSplitResult[] {
    // Skip edges that are too short
    if (edge.length < MIN_EDGE_LENGTH) {
      return [];
    }

    // Convert edge to THREE.js curve for geometric calculations
    const curve = HSCore.Util.Edge.toTHREECurve(edge);
    const splitResults: EdgeSplitResult[] = [];

    // Process each point
    points.forEach((point: Point3D) => {
      // Check if point coincides with edge start
      if (GeLib.PointUtils.isSamePoint(point, edge.from)) {
        splitResults.push({
          vertex: edge.from,
          lerp: MIN_LERP,
          point
        });
        return;
      }

      // Check if point coincides with edge end
      if (GeLib.PointUtils.isSamePoint(point, edge.to)) {
        splitResults.push({
          vertex: edge.to,
          lerp: MAX_LERP,
          point
        });
        return;
      }

      // Convert point to THREE.Vector3 for calculations
      const vector3 = GeLib.VectorUtils.toTHREEVector3(point);
      let lerpParameter: number;

      // Calculate parameter along curve
      if (curve instanceof THREE.ArcCurve) {
        // Use specialized arc calculation
        lerpParameter = GeLib.ArcUtils.getParameter(
          curve,
          new THREE.Vector3(vector3.x, vector3.y, 0)
        );
      } else {
        // Use generic closest point calculation
        lerpParameter = curve.closestPointToPointParameter(vector3);
      }

      // Create vertex only if point is strictly inside edge bounds
      if (lerpParameter > MIN_LERP && lerpParameter < MAX_LERP) {
        const newVertex = GeLib.Vertex.create(
          point.x,
          point.y,
          point.z ?? 0
        );
        splitResults.push({
          vertex: newVertex,
          lerp: lerpParameter,
          point
        });
      } else {
        // Record point outside bounds without creating vertex
        splitResults.push({
          vertex: undefined,
          lerp: lerpParameter,
          point
        });
      }
    });

    // Sort results by lerp parameter (distance along edge)
    const sortedResults = splitResults.sort(
      (a: EdgeSplitResult, b: EdgeSplitResult) => a.lerp - b.lerp
    );

    // Extract valid vertices for splitting
    const validVertices: Vertex[] = [];
    sortedResults.forEach((result: EdgeSplitResult) => {
      if (
        result.lerp > MIN_LERP &&
        result.lerp < MAX_LERP &&
        result.vertex
      ) {
        validVertices.push(result.vertex);
      }
    });

    // Perform edge split operation if there are valid vertices
    if (validVertices.length > 0) {
      GeLib.EulerOperations.esplit(edge, validVertices);
    }

    return sortedResults;
  }
};