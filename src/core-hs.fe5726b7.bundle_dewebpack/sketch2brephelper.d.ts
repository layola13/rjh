import type { Shell, Face, Edge, Vertex } from './brep-types';
import type { Vector2, Vector3, Line2d, Arc2d, Polygon, Loop, PolyCurve, Curve2d, Line3d, Arc3d } from './geometry-types';
import type { EncodedSketchFace, SketchData, SketchFace2d, SketchCurve, SketchPoint, FaceInfo } from './sketch-types';

/**
 * Sketch to BRep (Boundary Representation) conversion helper.
 * Handles conversion of 2D sketch geometry to 3D solid models.
 */
export declare class Sketch2BrepHelper {
  private static _instance: Sketch2BrepHelper | undefined;

  /**
   * Singleton instance accessor.
   * @returns The singleton instance of Sketch2BrepHelper
   */
  static getInstance(): Sketch2BrepHelper;

  /**
   * Generate BRep geometry from sketch data.
   * @param sketchData - The input sketch data containing faces and regions
   * @param existingShells - Optional array of existing shells to reuse
   * @returns Generated BRep data including face shells and merged brep, or undefined if generation fails
   */
  generateBrep(
    sketchData: SketchData,
    existingShells?: Shell[]
  ): { faceShells: Shell[]; brep: Shell } | undefined;

  /**
   * Calculate mapping between sketch components and BRep elements.
   * @param brep - The BRep shell to analyze
   * @param sketchData - The sketch data to map against
   * @returns Maps of sketch component IDs to BRep elements (edges, vertices, faces) and smooth surface mappings
   */
  calcSketchBrepMp(
    brep: Shell,
    sketchData: SketchData
  ): {
    sketchBrepMp: Map<string, Array<Edge | Vertex | Face>>;
    sketchSmoothBrepMap: Map<string, Array<Edge | Face>>;
  };

  /**
   * Match a 2D polygon face to corresponding sketch face info.
   * @param polygon - The 2D polygon to match
   * @param faceInfos - Array of candidate face information
   * @returns Matched face info, or undefined if no match found
   */
  matchFace(polygon: Polygon, faceInfos: FaceInfo[]): FaceInfo | undefined;

  /**
   * Fit a 2D curve through multiple curve segments.
   * @param curves - Array of 2D curves to fit
   * @returns Fitted arc curve
   */
  fittingCurve2d(curves: Curve2d[]): Arc2d;

  /**
   * Fit a continuous edge by reconstructing arc from edge segments.
   * @param continuousEdge - The continuous edge to fit
   * @returns Fitted 2D arc, or undefined if fitting fails
   */
  fittingContEdge(continuousEdge: ContinuousEdge): Arc2d | undefined;

  /**
   * Match arc curves by their start/end points.
   * @param points - Array of points defining the arc
   * @param curves - Candidate curves to search
   * @returns Matched circle or arc curve, or undefined if no match
   */
  matchArcsByPts(
    points: Vector2[],
    curves: SketchCurve[]
  ): Circle2d | CircleArc2d | undefined;

  /**
   * Clean up merged BRep shells by removing unnecessary edges and faces.
   * @param shells - Array of shells to clean
   * @param backgroundCurves - Background sketch boundary curves
   * @returns Cleaned array of shells
   */
  clearMergedBreps(shells: Shell[], backgroundCurves: Curve2d[][]): Shell[];

  /**
   * Check if a 3D curve belongs to the sketch background boundary.
   * @param curve - The 3D curve to check
   * @param backgroundCurves - Background sketch boundary curves
   * @returns True if curve is part of sketch background
   */
  isSketchBackgroundCurve(curve: Line3d | Arc3d, backgroundCurves: Curve2d[][]): boolean;
}

/**
 * Represents a continuous edge composed of multiple edge segments.
 */
interface ContinuousEdge {
  /** Get all edge segments */
  getEdges(): Edge[];
  /** Check if the edge forms a closed loop */
  isClose(): boolean;
}

/**
 * Result of shell editing operations.
 */
interface ShellEditResult {
  /** Map of original shells to modified shells */
  modifiedShellsMap: Map<Shell, Shell>;
  /** Error message if operation failed */
  errorStr?: string;
}

/**
 * Interactive faces collection result.
 */
interface InteractiveFacesResult {
  /** Regular faces */
  faces: Face[];
  /** Continuous smooth faces */
  contFaces: ContinuousEdge[];
}

/**
 * Interactive edges collection result.
 */
interface InteractiveEdgesResult {
  /** Regular edges */
  edges: Edge[];
  /** Continuous smooth edges */
  contEdges: ContinuousEdge[];
}

/**
 * Circle 2D geometry.
 */
interface Circle2d extends Curve2d {
  center: Vector2;
  radius: number;
}

/**
 * Circular arc 2D geometry.
 */
interface CircleArc2d extends Curve2d {
  getDiscretePoints(): Vector2[];
}