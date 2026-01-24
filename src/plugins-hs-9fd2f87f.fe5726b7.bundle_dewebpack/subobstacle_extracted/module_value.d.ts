/**
 * Adjusts polygon vertices based on boundary offsets and directional vectors.
 * 
 * @remarks
 * This function modifies polygon vertices by applying offset corrections when edges
 * align with specific directional boundaries (front, right, back, left). It uses
 * vector normalization and angle comparison to determine which offsets to apply.
 * 
 * @param vertices - Array of polygon vertices to be modified in-place
 * @param boundaryPoints - Array of exactly 4 boundary reference points defining the directional vectors
 * @param offsets - Object containing offset values for each direction
 * @param offsets.front - Offset to apply in the front direction
 * @param offsets.right - Offset to apply in the right direction
 * @param offsets.back - Offset to apply in the back direction
 * @param offsets.left - Offset to apply in the left direction
 * @param applyCornerCorrection - Optional flag to enable additional corner correction logic (default: false)
 * 
 * @returns void - Modifies the vertices array in-place
 */
declare function adjustPolygonVertices(
  vertices: Array<{ x: number; y: number }>,
  boundaryPoints: [
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number }
  ],
  offsets: {
    front: number;
    right: number;
    back: number;
    left: number;
  },
  applyCornerCorrection?: boolean
): void;

/**
 * Offset configuration for polygon adjustments
 */
interface PolygonOffsets {
  /** Offset value for the front boundary */
  front: number;
  /** Offset value for the right boundary */
  right: number;
  /** Offset value for the back boundary */
  back: number;
  /** Offset value for the left boundary */
  left: number;
}

/**
 * 2D point representation
 */
interface Point2D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Boundary points defining directional vectors (must contain exactly 4 points)
 */
type BoundaryPoints = readonly [Point2D, Point2D, Point2D, Point2D];

/**
 * Main module export - adjusts polygon vertices based on directional boundaries
 */
declare module 'module_value' {
  export default adjustPolygonVertices;
  export type { PolygonOffsets, Point2D, BoundaryPoints };
}