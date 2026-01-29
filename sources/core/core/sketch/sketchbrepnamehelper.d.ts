/**
 * Module: SketchBrepNameHelper
 * 
 * Provides functionality to reconstruct and assign topological names to BRep (Boundary Representation)
 * elements based on sketch geometry. Handles mapping between 2D sketch components and 3D BRep faces,
 * edges, and coedges.
 */

import type { BRep, Face3d, Edge3d, Coedge3d } from './brep-types';
import type { Sketch, SketchFace, SketchCurve, SketchPoint } from './sketch-types';
import type { Curve2d, Curve3d, Point2d, Vector2, Polygon, Line2d, Coordinate3, BoundingBox2d } from './math-types';

/**
 * User data attached to BRep edges representing sketch curves
 */
interface EdgeCurveUserData {
  /** Unique identifier of the associated sketch component */
  sketchComId: string;
  /** Type of sketch component: 'curve' or 'point' */
  sketchType: 'curve' | 'point';
  /** Type of BRep element */
  edgeType: 'edge';
}

/**
 * User data attached to BRep faces representing sketch faces
 */
interface FaceSketchUserData {
  /** Unique identifier of the associated sketch component */
  sketchComId: string;
  /** Type of sketch component */
  sketchType: 'face' | 'curve';
  /** Type of face: bottom (extruded face) or side (swept face) */
  faceType: 'bottomface' | 'sideface';
}

/**
 * Position result returned by point-to-loop containment test
 */
interface PositionResult {
  /** Position type relative to loop boundary */
  type: PtLoopPositionType;
}

/**
 * Enumeration of point-to-loop position types
 */
enum PtLoopPositionType {
  ONEDGE = 'ONEDGE',
  ONVERTEX = 'ONVERTEX',
  INSIDE = 'INSIDE',
  OUTSIDE = 'OUTSIDE'
}

/**
 * Tolerance value for geometric comparisons (5mm)
 */
const POINT_MATCH_TOLERANCE = 0.005;

/**
 * Tolerance value for face center matching (35mm)
 */
const FACE_CENTER_TOLERANCE = 0.035;

/**
 * Singleton helper class for assigning topological names to BRep elements
 * based on their corresponding sketch geometry.
 * 
 * Responsibilities:
 * - Map sketch faces to BRep faces
 * - Map sketch curves to BRep edges
 * - Generate consistent topological names for coedges
 * - Maintain userData associations between sketch and BRep elements
 */
export class SketchBrepNameHelper {
  private static _instance: SketchBrepNameHelper | null = null;

  private constructor() {}

  /**
   * Gets the singleton instance of SketchBrepNameHelper
   * @returns The singleton instance
   */
  public static getInstance(): SketchBrepNameHelper {
    if (!this._instance) {
      this._instance = new SketchBrepNameHelper();
    }
    return this._instance;
  }

  /**
   * Reconstructs topological names for all BRep elements based on sketch geometry
   * 
   * @param breps - Array of BRep solids to process
   * @param sketch - Source sketch containing faces, curves, and points
   */
  public reconstructBrepNames(breps: BRep[], sketch: Sketch): void {
    const sketchFaces = sketch.faces;
    const sketchCurves = sketch.getAllCurves();
    const sketchPoints = sketch.getAllPoints();

    this.sketch2BrepFaces(breps, sketchFaces, sketchCurves);
    this.sketchCurve2BrepEdges(breps, sketchCurves, sketchPoints);
    this.giveCoedge3dsToponames(breps);
  }

  /**
   * Maps sketch curves to BRep edges by projecting 3D edges to 2D and matching
   * with sketch geometry. Assigns topological names and userData.
   * 
   * @param breps - Array of BRep solids
   * @param sketchCurves - Array of 2D sketch curves
   * @param sketchPoints - Array of 2D sketch points
   */
  private sketchCurve2BrepEdges(
    breps: BRep[],
    sketchCurves: SketchCurve[],
    sketchPoints: SketchPoint[]
  ): void {
    const allEdges = breps.flatMap(brep => brep.getEdges());
    const usedTopoNames: string[] = [];

    for (const edge of allEdges) {
      const curve3d = edge.getCurve();
      const projected2dCurve = MathAlg.Project.curve3dTo2d(curve3d, Coordinate3.XOY());

      if (!projected2dCurve) {
        Logger.console.assert(false, 'project curve3d failed, please check!');
        continue;
      }

      const startPoint = projected2dCurve.getStartPt();
      const endPoint = projected2dCurve.getEndPt();

      // Handle degenerate edges (point-like edges)
      if (projected2dCurve instanceof Line2d && startPoint.equals(endPoint)) {
        const matchedPoint = this.matchPoint(startPoint, sketchPoints);
        if (matchedPoint) {
          const adjacentFaces = edge.getFaces();
          const topoName = this.buildEdgeTopoName(adjacentFaces, matchedPoint.id);

          edge.getParent().replaceEdgeTag(edge.tag, topoName);
          edge.userData = {
            sketchComId: matchedPoint.id,
            sketchType: 'point',
            edgeType: 'edge'
          } as EdgeCurveUserData;

          if (usedTopoNames.includes(topoName)) {
            Logger.console.warn("edge's toponame is reduplicative, please check!");
          }
          usedTopoNames.push(topoName);
        }
      } else {
        // Handle regular curve edges
        const matchedCurve = SketchHelper.getInstance().matchCurve(projected2dCurve, sketchCurves);
        if (matchedCurve) {
          const adjacentFaces = edge.getFaces();
          const topoName = this.buildEdgeTopoName(adjacentFaces, matchedCurve.id);

          edge.getParent().replaceEdgeTag(edge.tag, topoName);
          edge.userData = {
            sketchComId: matchedCurve.id,
            sketchType: 'curve',
            edgeType: 'edge'
          } as EdgeCurveUserData;

          if (usedTopoNames.includes(topoName)) {
            Logger.console.warn("edge's toponame is reduplicative, please check!");
          }
          usedTopoNames.push(topoName);
        } else {
          Logger.console.assert(false, 'match brepcurve with sketch curve failed, please check!');
        }
      }
    }
  }

  /**
   * Builds a topological name for an edge based on its adjacent faces
   * 
   * @param faces - Array of faces adjacent to the edge (sorted by tag)
   * @param componentId - Sketch component ID
   * @returns Formatted topological name string
   */
  private buildEdgeTopoName(faces: Face3d[], componentId: string): string {
    faces.sort((a, b) => a.tag.localeCompare(b.tag));

    if (faces.length === 1) {
      return `${faces[0].tag}|${componentId}`;
    } else if (faces.length === 2) {
      return `${faces[0].tag}|${faces[1].tag}|${componentId}`;
    } else {
      return faces.reduce((acc, face) => acc + `${face.tag}|`, '') + componentId;
    }
  }

  /**
   * Maps sketch faces to BRep faces by projecting faces onto XOY plane
   * and matching with sketch geometry.
   * 
   * @param breps - Array of BRep solids
   * @param sketchFaces - Array of sketch faces
   * @param sketchCurves - Array of sketch curves (for side face matching)
   */
  private sketch2BrepFaces(
    breps: BRep[],
    sketchFaces: SketchFace[],
    sketchCurves: SketchCurve[]
  ): void {
    const allFaces = breps.flatMap(brep => brep.getFaces());
    const usedTopoNames: string[] = [];

    for (const face of allFaces) {
      const projectedGeometry = BRepCalculateProject.face(face, Coordinate3.XOY());

      if (projectedGeometry instanceof Polygon) {
        // Bottom face (extruded from sketch face)
        const matchedFace = this.matchFace(projectedGeometry, sketchFaces);
        if (matchedFace) {
          const topoName = matchedFace.id;
          face.tag = topoName;
          face.userData = {
            sketchComId: matchedFace.id,
            sketchType: 'face',
            faceType: 'bottomface'
          } as FaceSketchUserData;

          if (usedTopoNames.includes(topoName)) {
            Logger.console.warn("face's toponame is reduplicative, please check!");
          }
          usedTopoNames.push(topoName);
        } else {
          Logger.console.assert(false, 'match face failed, please check!');
        }
      } else {
        // Side face (swept from sketch curve)
        if (projectedGeometry.length === 0) {
          Logger.console.assert(false, 'Brep.alg.BRepCalculateProject.face failed, return empty!');
          continue;
        }

        const firstProjectedCurve = projectedGeometry[0];
        const curvesInProjection = firstProjectedCurve.getAllCurves();

        if (curvesInProjection.length !== 1) {
          Logger.console.assert(false, "calcSketchBrepMp: projCurve's length is not one!");
        }

        const projectedCurve = curvesInProjection[0];
        const matchedCurve = SketchHelper.getInstance().matchCurve(projectedCurve, sketchCurves);

        if (matchedCurve) {
          const topoName = matchedCurve.id;
          face.tag = topoName;
          face.userData = {
            sketchComId: matchedCurve.id,
            sketchType: 'curve',
            faceType: 'sideface'
          } as FaceSketchUserData;

          if (usedTopoNames.includes(topoName)) {
            Logger.console.warn("face's toponame is reduplicative, please check!");
          }
          usedTopoNames.push(topoName);
        } else {
          Logger.console.assert(false, 'match curve failed!');
        }
      }
    }
  }

  /**
   * Assigns topological names to coedges based on their parent face and edge tags
   * 
   * @param breps - Array of BRep solids
   */
  private giveCoedge3dsToponames(breps: BRep[]): void {
    if (breps.length === 0) {
      return;
    }

    for (const brep of breps) {
      const faces = brep.getFaces();
      for (const face of faces) {
        const coedges = face.getCoedge3ds();
        for (const coedge of coedges) {
          const topoName = `${face.tag}|${coedge.getEdge().tag}`;
          coedge.tag = topoName;
        }
      }
    }
  }

  /**
   * Finds a sketch point that matches the given 2D point within tolerance
   * 
   * @param point - 2D point to match
   * @param sketchPoints - Array of sketch points to search
   * @returns Matched sketch point or undefined
   */
  private matchPoint(point: Point2d, sketchPoints: SketchPoint[]): SketchPoint | undefined {
    const matches = sketchPoints.filter(sketchPoint =>
      point.equals(sketchPoint, POINT_MATCH_TOLERANCE)
    );

    if (matches.length !== 0) {
      return matches[0];
    }
    return undefined;
  }

  /**
   * Finds a sketch face that matches the given polygon by comparing centers
   * and boundary geometry
   * 
   * @param polygon - Projected polygon to match
   * @param sketchFaces - Array of sketch faces to search
   * @returns Matched sketch face or undefined
   */
  private matchFace(polygon: Polygon, sketchFaces: SketchFace[]): SketchFace | undefined {
    const polygonCenter = polygon.getBoundingBox().getCenter();
    const candidateFaces: SketchFace[] = [];

    // Find faces with matching centers
    for (const sketchFace of sketchFaces) {
      const bounds = sketchFace.getBounding();
      const faceCenter = {
        x: (bounds.x + bounds.x2) / 2,
        y: (bounds.y + bounds.y2) / 2
      };

      if (polygonCenter.equals(faceCenter, FACE_CENTER_TOLERANCE)) {
        candidateFaces.push(sketchFace);
      }
    }

    if (candidateFaces.length === 0) {
      Logger.console.assert(false, 'sameCenterFaceInfos length is zero, please check!');
      return undefined;
    }

    // Verify geometric match by checking sample points
    for (const candidateFace of candidateFaces) {
      const samplePoints: Vector2[] = [];

      for (const curve of candidateFace.outerLoop.curves) {
        if (curve instanceof Circle2d || curve instanceof CircleArc2d) {
          samplePoints.push(new Vector2(curve.discretePoints[0]));
        } else if (curve instanceof Line2d) {
          const line = new Line2d(curve.start, curve.end);
          samplePoints.push(new Vector2(curve.start));
          samplePoints.push(new Vector2(line.getMidPt()));
        }
      }

      let allPointsMatch = true;
      for (const samplePoint of samplePoints) {
        const positionResult = MathAlg.PositionJudge.ptToLoop(
          samplePoint,
          polygon.getLoops()[0],
          POINT_MATCH_TOLERANCE
        );

        if (
          positionResult.type !== PtLoopPositionType.ONEDGE &&
          positionResult.type !== PtLoopPositionType.ONVERTEX
        ) {
          allPointsMatch = false;
          break;
        }
      }

      if (allPointsMatch) {
        return candidateFace;
      }
    }

    return undefined;
  }
}