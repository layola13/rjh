import { Line3d, Arc3d, Tolerance, Matrix4, Point3d } from './geometry';
import { Logger } from './logger';

interface Vertex {
  getPoint(): Point3d;
}

interface Curve3d {
  // Base interface for 3D curves
}

interface Coedge3d {
  tag: number;
  getCurve(): Curve3d;
  getFace(): Face | null;
}

interface Face {
  tag: number;
  getVertexes(): Vertex[];
  getCoedge3ds(): Coedge3d[];
  getCenterNorm(): Point3d;
}

interface Edge {
  // Edge interface placeholder
}

interface BoundingBox {
  getCenter(): Point3d;
}

interface Brep {
  getFaces(): Face[];
  getEdges(): Edge[];
  getVertexs(): Vertex[];
  getBoundingBox(): BoundingBox;
}

export class CopyHelper {
  private static _instance: CopyHelper;

  /**
   * Calculate matching coedge path between two B-reps
   * @param sourceBrep Source boundary representation
   * @param coedgeTags Array of coedge tags to match
   * @param targetBrep Target boundary representation
   * @returns Array of matching coedge tags
   */
  public calcMatchingCoedgePath(
    sourceBrep: Brep,
    coedgeTags: number[],
    targetBrep: Brep
  ): number[] {
    const matchedTags: number[] = [];

    if (sourceBrep.getFaces().length !== targetBrep.getFaces().length) {
      return [];
    }
    if (sourceBrep.getEdges().length !== targetBrep.getEdges().length) {
      return [];
    }
    if (sourceBrep.getVertexs().length !== targetBrep.getVertexs().length) {
      return [];
    }

    const transformMatrix = this.getBrep2BrepMatrix(sourceBrep, targetBrep);

    for (const coedgeTag of coedgeTags) {
      const sourceCoedge = this.getCoedgeByTag(sourceBrep, coedgeTag);
      if (!sourceCoedge) {
        Logger.console.assert(false, 'find matched coedge failed');
        return [];
      }

      const sourceFace = sourceCoedge.getFace();
      if (!sourceFace) {
        return [];
      }

      const matchedFace = this.getMatchingFace(sourceFace, targetBrep, transformMatrix);
      if (!matchedFace) {
        Logger.console.assert(false, 'find matched face failed');
        return [];
      }

      const matchedCoedge = this.getMatchingCoedge(sourceCoedge, matchedFace);
      if (!matchedCoedge) {
        Logger.console.assert(false, 'find matching coedge failed');
        return [];
      }

      matchedTags.push(matchedCoedge.tag);
    }

    return matchedTags;
  }

  /**
   * Calculate matching face between two B-reps by tag
   * @param sourceBrep Source boundary representation
   * @param faceTag Face tag to match
   * @param targetBrep Target boundary representation
   * @returns Matching face tag or undefined
   */
  public calcMatchingFace(
    sourceBrep: Brep,
    faceTag: number,
    targetBrep: Brep
  ): number | undefined {
    if (sourceBrep.getFaces().length !== targetBrep.getFaces().length) {
      return undefined;
    }
    if (sourceBrep.getEdges().length !== targetBrep.getEdges().length) {
      return undefined;
    }
    if (sourceBrep.getVertexs().length !== targetBrep.getVertexs().length) {
      return undefined;
    }

    const transformMatrix = this.getBrep2BrepMatrix(sourceBrep, targetBrep);
    const sourceFace = this.getFaceByTag(sourceBrep, faceTag);

    if (!sourceFace) {
      return undefined;
    }

    const matchedFace = this.getMatchingFace(sourceFace, targetBrep, transformMatrix);
    if (!matchedFace) {
      return undefined;
    }

    return matchedFace.tag;
  }

  /**
   * Find matching face in target B-rep
   * @param sourceFace Source face to match
   * @param targetBrep Target boundary representation
   * @param transformMatrix Transformation matrix between B-reps
   * @returns Matching face or undefined
   */
  private getMatchingFace(
    sourceFace: Face,
    targetBrep: Brep,
    transformMatrix: Matrix4
  ): Face | undefined {
    const targetFaces = targetBrep.getFaces();

    for (const targetFace of targetFaces) {
      if (this.judgeSameFace(sourceFace, targetFace, transformMatrix)) {
        return targetFace;
      }
    }

    return undefined;
  }

  /**
   * Find matching coedge in target face
   * @param sourceCoedge Source coedge to match
   * @param targetFace Target face containing potential matches
   * @returns Matching coedge or undefined
   */
  private getMatchingCoedge(sourceCoedge: Coedge3d, targetFace: Face): Coedge3d | undefined {
    const sourceCurve = sourceCoedge.getCurve();
    const targetCoedges = targetFace.getCoedge3ds();

    for (const targetCoedge of targetCoedges) {
      const targetCurve = targetCoedge.getCurve();

      if (sourceCurve instanceof Line3d && targetCurve instanceof Line3d) {
        const sourceStart = sourceCurve.getStartPt();
        const sourceEnd = sourceCurve.getEndPt();
        const targetStart = targetCurve.getStartPt();
        const targetEnd = targetCurve.getEndPt();

        if (
          this.pointInPTS(sourceStart, [targetStart, targetEnd]) &&
          this.pointInPTS(sourceEnd, [targetStart, targetEnd])
        ) {
          return targetCoedge;
        }
      } else if (sourceCurve instanceof Arc3d && targetCurve instanceof Arc3d) {
        const sourceCenter = sourceCurve.getCenter();
        const targetCenter = targetCurve.getCenter();

        if (sourceCenter.equals(targetCenter)) {
          const sourceStartParam = sourceCurve.getStartParam();
          const sourceEndParam = sourceCurve.getEndParam();
          const targetStartParam = targetCurve.getStartParam();
          const targetEndParam = targetCurve.getEndParam();
          const tolerance = new Tolerance();

          if (
            (tolerance.areParamEqual(sourceStartParam, targetStartParam) &&
              tolerance.areParamEqual(sourceEndParam, targetEndParam)) ||
            (tolerance.areParamEqual(sourceStartParam, targetEndParam) &&
              tolerance.areParamEqual(sourceEndParam, targetStartParam))
          ) {
            return targetCoedge;
          }
        }
      }
    }

    return undefined;
  }

  /**
   * Judge if two faces are the same based on vertices and normal
   * @param sourceFace Source face
   * @param targetFace Target face
   * @param transformMatrix Transformation matrix
   * @returns True if faces are the same
   */
  private judgeSameFace(sourceFace: Face, targetFace: Face, transformMatrix: Matrix4): boolean {
    const sourcePoints = sourceFace
      .getVertexes()
      .map((vertex) => vertex.getPoint().clone().transform(transformMatrix));
    const targetPoints = targetFace.getVertexes().map((vertex) => vertex.getPoint().clone());

    if (sourcePoints.length !== targetPoints.length) {
      return false;
    }

    const sourceNormal = sourceFace.getCenterNorm();
    const targetNormal = targetFace.getCenterNorm();

    if (!sourceNormal.equals(targetNormal)) {
      return false;
    }

    for (const sourcePoint of sourcePoints) {
      if (!this.pointInPTS(sourcePoint, targetPoints)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if a point exists in an array of points
   * @param point Point to check
   * @param points Array of points
   * @returns True if point exists in array
   */
  private pointInPTS(point: Point3d, points: Point3d[]): boolean {
    for (const targetPoint of points) {
      if (targetPoint.equals(point)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Find coedge by tag in B-rep
   * @param brep Boundary representation
   * @param tag Coedge tag to search for
   * @returns Coedge or undefined
   */
  private getCoedgeByTag(brep: Brep, tag: number): Coedge3d | undefined {
    const faces = brep.getFaces();

    for (const face of faces) {
      const matchedCoedges = face.getCoedge3ds().filter((coedge) => coedge.tag === tag);
      if (matchedCoedges.length === 1) {
        return matchedCoedges[0];
      }
    }

    return undefined;
  }

  /**
   * Find face by tag in B-rep
   * @param brep Boundary representation
   * @param tag Face tag to search for
   * @returns Face or undefined
   */
  private getFaceByTag(brep: Brep, tag: number): Face | undefined {
    const faces = brep.getFaces();

    for (const face of faces) {
      if (face.tag === tag) {
        return face;
      }
    }

    return undefined;
  }

  /**
   * Calculate transformation matrix between two B-reps
   * @param sourceBrep Source boundary representation
   * @param targetBrep Target boundary representation
   * @returns Transformation matrix
   */
  private getBrep2BrepMatrix(sourceBrep: Brep, targetBrep: Brep): Matrix4 {
    const sourceBoundingBox = sourceBrep.getBoundingBox();
    const targetBoundingBox = targetBrep.getBoundingBox();
    const sourceCenter = sourceBoundingBox.getCenter();
    const targetCenter = targetBoundingBox.getCenter();

    const deltaX = targetCenter.x - sourceCenter.x;
    const deltaY = targetCenter.y - sourceCenter.y;
    const deltaZ = targetCenter.z - sourceCenter.z;

    return Matrix4.makeTranslate({
      x: deltaX,
      y: deltaY,
      z: deltaZ,
    });
  }

  /**
   * Get singleton instance of CopyHelper
   * @returns CopyHelper instance
   */
  public static getInstance(): CopyHelper {
    if (!CopyHelper._instance) {
      CopyHelper._instance = new CopyHelper();
    }
    return CopyHelper._instance;
  }
}