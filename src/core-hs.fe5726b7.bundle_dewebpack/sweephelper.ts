import { Arc3d, Coordinate3, Plane } from './geometry';
import { Logger } from './logger';

interface SweepInformation {
  sweepCoedges: Coedge3d[];
  sweepPath: Curve3d[];
  sweepStartPoint: Point3d;
  coordinate: Coordinate3 | undefined;
}

interface Point3d {
  equals(other: Point3d): boolean;
  clone(): Point3d;
}

interface Curve3d {
  getStartPt(): Point3d;
  getEndPt(): Point3d;
  getStartParam(): number;
  getEndParam(): number;
  getParamAt(point: Point3d): number;
  getStartTangent(): Vector3d;
  containsPoint(point: Point3d): boolean;
  setRange(start: number, end: number): void;
  reverse(): void;
  clone(): Curve3d;
  userData?: { tag: string };
}

interface Vector3d {
  clone(): Vector3d;
  cross(other: Vector3d): Vector3d;
}

interface Surface {
  getUVAt(point: Point3d): { u: number; v: number };
  getNormAt(uv: { u: number; v: number }): Vector3d;
}

interface Face3d {
  tag: string;
  getSameDirWithSurface(): boolean;
  getWires(): Wire3d[];
  getSurface(): Surface;
}

interface Wire3d {
  getCoedge3ds(): Coedge3d[];
}

interface Vertex3d {
  getPoint(): Point3d;
}

interface Coedge3d {
  tag: string;
  getCurve(): Curve3d;
  getFace(): Face3d | undefined;
  getStartVertex(): Vertex3d;
  getEndVertex(): Vertex3d;
}

interface Edge3d {
  getCoedge3ds(): Coedge3d[];
}

interface Brep {
  getFaceByTag(tag: string): Face3d | undefined;
  getEdges(): Edge3d[];
}

export class SweepHelper {
  private static _instance: SweepHelper;

  /**
   * Gets sweep information including coedges, path, start point, and local coordinate
   */
  getSweepInformation(
    coedgeTags: string[],
    breps: Brep[],
    faceTag?: string
  ): SweepInformation {
    const sweepCoedges = this.getPathCoedge3ds(coedgeTags, breps, faceTag);
    const sweepPath = this.getSweepPath3DbyCoedges(sweepCoedges);
    const sweepStartPoint = sweepPath[0].getStartPt();
    const coordinate = this.getLocalCoordinateBySweepPath(
      sweepPath,
      sweepStartPoint,
      sweepCoedges[0].getFace()
    );

    return {
      sweepCoedges,
      sweepPath,
      sweepStartPoint,
      coordinate,
    };
  }

  /**
   * Gets 3D sweep path with optional start and end point constraints
   */
  getSweepPath3D(
    coedgeTags: string[],
    breps: Brep[],
    faceTag: string | undefined,
    startPoint?: Point3d,
    endPoint?: Point3d
  ): Curve3d[] {
    if (coedgeTags.some((tag) => typeof tag !== 'string')) {
      return coedgeTags as unknown as Curve3d[];
    }

    const pathCoedges = this.getPathCoedge3ds(coedgeTags, breps, faceTag);
    const fullPath = this.getSweepPath3DbyCoedges(pathCoedges);
    const resultPath: Curve3d[] = [];

    for (let i = 0; i < fullPath.length; i++) {
      const curve = fullPath[i];

      if (resultPath.length === 0) {
        if (startPoint) {
          if (curve.containsPoint(startPoint)) {
            const clonedCurve = curve.clone();
            clonedCurve.setRange(
              curve.getParamAt(startPoint),
              curve.getEndParam()
            );
            resultPath.push(clonedCurve);
          }
        } else {
          resultPath.push(curve);
        }
      } else {
        if (endPoint && curve.containsPoint(endPoint)) {
          const clonedCurve = curve.clone();
          clonedCurve.setRange(
            curve.getStartParam(),
            curve.getParamAt(endPoint)
          );
          resultPath.push(clonedCurve);
          break;
        }
        resultPath.push(curve);
      }
    }

    return resultPath;
  }

  /**
   * Converts coedges to 3D sweep path curves
   */
  getSweepPath3DbyCoedges(coedges: Coedge3d[]): Curve3d[] {
    const curves: Curve3d[] = [];

    if (coedges.length === 0) {
      Logger.console.assert(
        false,
        'getSweepPath3DbyCoedges: input coedges is empty, please check!'
      );
      return curves;
    }

    if (coedges.length === 1) {
      const curve = coedges[0].getCurve();
      const face = coedges[0].getFace();

      if (!face?.getSameDirWithSurface()) {
        curve.reverse();
      }

      curve.userData = { tag: coedges[0].tag };
      curves.push(curve);
      return curves;
    }

    let currentCurve = coedges[0].getCurve().clone();
    const firstStart = coedges[0].getCurve().getStartPt();
    const secondStart = coedges[1].getCurve().getStartPt();
    const secondEnd = coedges[1].getCurve().getEndPt();

    if (firstStart.equals(secondStart) || firstStart.equals(secondEnd)) {
      currentCurve.reverse();
    }

    currentCurve.userData = { tag: coedges[0].tag };
    curves.push(currentCurve);

    for (let i = 1; i < coedges.length; i++) {
      const nextCurve = coedges[i].getCurve().clone();
      const currentEnd = currentCurve.getEndPt();
      const nextEnd = nextCurve.getEndPt();

      if (currentEnd.equals(nextEnd)) {
        nextCurve.reverse();
      }

      nextCurve.userData = { tag: coedges[i].tag };
      curves.push(nextCurve);
      currentCurve = nextCurve;
    }

    return curves;
  }

  /**
   * Checks if sweep path is reversed based on coedge directions
   */
  isSweepPathReversed(
    coedgeTags: string[],
    breps: Brep[],
    faceTag?: string
  ): boolean {
    const pathCoedges = this.getPathCoedge3ds(coedgeTags, breps, faceTag);

    if (pathCoedges.length === 0) {
      return false;
    }

    if (pathCoedges.length === 1) {
      const face = pathCoedges[0].getFace();
      return !face?.getSameDirWithSurface();
    }

    const firstStart = pathCoedges[0].getCurve().getStartPt();
    const secondStart = pathCoedges[1].getCurve().getStartPt();
    const secondEnd = pathCoedges[1].getCurve().getEndPt();

    return firstStart.equals(secondStart) || firstStart.equals(secondEnd);
  }

  /**
   * Gets local coordinate system for the sweep operation
   */
  getLocalCoordinate(
    coedgeTags: string[],
    breps: Brep[],
    faceTag?: string
  ): Coordinate3 | undefined {
    const pathCoedges = this.getPathCoedge3ds(coedgeTags, breps, faceTag);
    const sweepPath = this.getSweepPath3DbyCoedges(pathCoedges);
    const startPoint = this.getSweepStartPointByPath3D(sweepPath);

    if (!startPoint) {
      return undefined;
    }

    return this.getLocalCoordinateBySweepPath(
      sweepPath,
      startPoint,
      pathCoedges[0].getFace()
    );
  }

  /**
   * Calculates local coordinate system based on sweep path and base face
   */
  getLocalCoordinateBySweepPath(
    path: Curve3d[],
    origin: Point3d,
    baseFace?: Face3d
  ): Coordinate3 | undefined {
    if (path.length === 0) {
      return undefined;
    }

    const surface = baseFace
      ? baseFace.getSurface()
      : Plane.makePlaneByPoints(path.map((curve) => curve.getStartPt()));

    if (!surface) {
      return undefined;
    }

    const uv = surface.getUVAt(origin);
    const normal = surface.getNormAt(uv);
    const tangent = path[0].getStartTangent();
    const xAxis = normal.clone().cross(tangent);

    return origin ? new Coordinate3(origin, xAxis, normal) : undefined;
  }

  /**
   * Gets the start point of the sweep path
   */
  getSweepStartPoint(
    coedgeTags: string[],
    breps: Brep[],
    faceTag?: string
  ): Point3d | undefined {
    const sweepPath = this.getSweepPath3D(coedgeTags, breps, faceTag);
    return this.getSweepStartPointByPath3D(sweepPath);
  }

  /**
   * Gets start point from a 3D path
   */
  getSweepStartPointByPath3D(path: Curve3d[]): Point3d | undefined {
    if (path.length === 0) {
      return undefined;
    }
    return path[0].getStartPt();
  }

  /**
   * Gets coedge 3D objects from tags and breps
   */
  getPathCoedge3ds(
    coedgeTags: string[],
    breps: Brep[],
    faceTag?: string
  ): Coedge3d[] {
    let coedges: Coedge3d[] = [];

    if (faceTag) {
      coedges = this.getSweepPathByFace(coedgeTags, faceTag, breps);
    } else {
      if (!coedgeTags) {
        Logger.console.assert(
          false,
          '未考虑的情况，请检查扫掠参数是否正确!'
        );
        return [];
      }
      coedges = this.getSweepPathByCoedges(coedgeTags, breps);
    }

    if (coedges.length === 0) {
      return [];
    }

    return this.reSortSweepPathByFaceDirection(coedges);
  }

  /**
   * Re-sorts sweep path based on face direction
   */
  private reSortSweepPathByFaceDirection(coedges: Coedge3d[]): Coedge3d[] {
    const allCoedgesOnSameFace = (coedges: Coedge3d[]): boolean => {
      if (coedges.length <= 1) {
        return true;
      }

      const firstFaceTag = coedges[0].getFace()?.tag;
      for (let i = 1; i < coedges.length; i++) {
        if (coedges[i].getFace()?.tag !== firstFaceTag) {
          return false;
        }
      }
      return true;
    };

    if (allCoedgesOnSameFace(coedges)) {
      const firstFace = coedges[0].getFace();
      if (!firstFace?.getSameDirWithSurface()) {
        coedges.reverse();
      }
    }

    return this.makeSweepPathContinuity(coedges);
  }

  /**
   * Checks if the coedge path forms a closed loop
   */
  private isClosed(coedges: Coedge3d[]): boolean {
    if (coedges.length === 0) {
      return true;
    }

    if (coedges.length === 1) {
      const curve = coedges[0].getCurve();
      return curve instanceof Arc3d && curve.isClosed();
    }

    for (let i = 0; i < coedges.length; i++) {
      const current = coedges[i];
      const next = i === coedges.length - 1 ? coedges[0] : coedges[i + 1];

      const currentStart = current.getStartVertex().getPoint();
      const currentEnd = current.getEndVertex().getPoint();
      const nextStart = next.getStartVertex().getPoint();
      const nextEnd = next.getEndVertex().getPoint();

      const isConnected =
        currentStart.equals(nextStart) ||
        currentStart.equals(nextEnd) ||
        currentEnd.equals(nextStart) ||
        currentEnd.equals(nextEnd);

      if (!isConnected) {
        return false;
      }
    }

    return true;
  }

  /**
   * Ensures sweep path continuity by reordering if needed
   */
  private makeSweepPathContinuity(coedges: Coedge3d[]): Coedge3d[] {
    if (this.isClosed(coedges)) {
      return coedges;
    }

    if (coedges.length === 1) {
      return coedges;
    }

    const firstStart = coedges[0].getStartVertex().getPoint();
    const firstEnd = coedges[0].getEndVertex().getPoint();
    const lastStart = coedges[coedges.length - 1].getStartVertex().getPoint();
    const lastEnd = coedges[coedges.length - 1].getEndVertex().getPoint();

    const needsReordering =
      firstStart.equals(lastStart) ||
      firstStart.equals(lastEnd) ||
      firstEnd.equals(lastStart) ||
      firstEnd.equals(lastEnd);

    if (!needsReordering) {
      return coedges;
    }

    const lastCoedge = coedges[coedges.length - 1];
    if (!lastCoedge) {
      return coedges;
    }

    const reordered = [lastCoedge].concat(coedges.slice(0, coedges.length - 1));
    return this.makeSweepPathContinuity(reordered);
  }

  /**
   * Gets sweep path coedges from a specific face
   */
  private getSweepPathByFace(
    coedgeTags: string[],
    faceTag: string,
    breps: Brep[]
  ): Coedge3d[] {
    let targetFace: Face3d | undefined;

    breps.forEach((brep) => {
      const face = brep.getFaceByTag(faceTag);
      if (face) {
        targetFace = face;
      }
    });

    if (!targetFace) {
      Logger.console.assert(false, 'find brep face failed!');
      return [];
    }

    let resultCoedges: Coedge3d[] = [];
    const wires = targetFace.getWires();

    if (coedgeTags.length === 0) {
      resultCoedges = [...wires[0].getCoedge3ds()];
    }

    for (const wire of wires) {
      const coedges = wire.getCoedge3ds();
      let hasMatchingTag = false;

      for (const coedge of coedges) {
        if (coedgeTags.includes(coedge.tag)) {
          hasMatchingTag = true;
        }
      }

      if (hasMatchingTag) {
        resultCoedges = [...coedges];
      }
    }

    if (resultCoedges.length === 0) {
      if (!coedgeTags[0].includes('|')) {
        return resultCoedges;
      }

      const partialTag = coedgeTags[0].split('|').pop();
      if (!partialTag) {
        return resultCoedges;
      }

      for (const wire of wires) {
        const coedges = wire.getCoedge3ds();
        let hasMatchingPartialTag = false;

        for (const coedge of coedges) {
          if (partialTag === coedge.tag.split('|').pop()) {
            hasMatchingPartialTag = true;
          }
        }

        if (hasMatchingPartialTag) {
          resultCoedges = [...coedges];
        }
      }
    }

    return resultCoedges;
  }

  /**
   * Gets sweep path coedges by matching tags
   */
  private getSweepPathByCoedges(
    coedgeTags: string[],
    breps: Brep[]
  ): Coedge3d[] {
    const resultCoedges: Coedge3d[] = [];

    for (const tag of coedgeTags) {
      const coedge = this.getRelatedCoedge(tag, breps);
      if (!coedge) {
        break;
      }
      resultCoedges.push(coedge);
    }

    return resultCoedges;
  }

  /**
   * Finds a coedge by tag in the given breps
   */
  private getRelatedCoedge(
    coedgeTag: string,
    breps: Brep[]
  ): Coedge3d | undefined {
    for (const brep of breps) {
      const edges = brep.getEdges();

      for (const edge of edges) {
        const matchingCoedges = edge
          .getCoedge3ds()
          .filter((coedge) => coedge.tag === coedgeTag);

        if (matchingCoedges.length > 0) {
          return matchingCoedges[0];
        }
      }
    }

    return undefined;
  }

  /**
   * Gets singleton instance of SweepHelper
   */
  static getInstance(): SweepHelper {
    if (!this._instance) {
      this._instance = new SweepHelper();
    }
    return this._instance;
  }
}