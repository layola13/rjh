import { HSCore } from './HSCore';
import { HSPaveSDK } from './HSPaveSDK';
import { MathAlg, Matrix4, Matrix3, Plane, Vector3 } from './MathLibrary';

interface Face {
  id: string;
  rawPath: {
    outer: Curve3D[];
  };
  holesPath2d: Path2D[];
  surfaceObj: {
    localToWorld: Matrix4;
  };
  material?: {
    mixpaint?: MixPaint;
  };
}

interface Curve3D {
  getStartPt(): Vector3;
  getEndPt(): Vector3;
  transformed(matrix: Matrix4): Curve3D;
  transform(matrix: Matrix3): void;
}

interface Curve2D {
  getStartPt(): Vector2;
  getEndPt(): Vector2;
  clone(): Curve2D;
}

interface Path2D {
  outer: Curve2D[];
  holes: Curve2D[][];
  clone(): Path2D;
}

interface MixPaint {
  mixPave: MixPave;
}

interface MixPave {
  forEachRegion(callback: (region: Region) => void): void;
  forEachFreeRegion(callback: (region: Region) => void): void;
}

interface Region {
  pattern: unknown;
  path: Path2D;
}

interface Vector2 {
  x: number;
  y: number;
}

interface PointWithLength {
  length: number;
  pt: Vector3;
}

interface CornerMoldingResult {
  length: number;
  line: [Vector3, Vector3];
  isTwoFace: boolean;
}

const TOLERANCE = 1e-5;

export class CornerMoldingBom {
  private face1: Face;
  private face2: Face;
  private shareEdge?: Curve3D;
  private corners: unknown[];

  constructor(face1: Face, face2: Face) {
    this.face1 = face1;
    this.face2 = face2;
    this.shareEdge = undefined;
    this.corners = [];

    const outerPath1 = face1.rawPath.outer;
    const outerPath2 = face2.rawPath.outer;
    const colinearCurves: Curve3D[] = [];

    for (let i = 0; i < outerPath1.length; i++) {
      const curve1 = outerPath1[i];
      for (let j = 0; j < outerPath2.length; j++) {
        const curve2 = outerPath2[j];
        if (MathAlg.CurveCurveColinear.curve3ds(curve1, curve2)) {
          colinearCurves.push(curve1, curve2);
        }
      }
    }

    this.shareEdge = MathAlg.CurveCurveMerge.mergeCurves3ds(colinearCurves)[0];
  }

  calcCornerMolding(): CornerMoldingResult[] {
    if (!this.shareEdge) {
      return [];
    }

    const cornerMolding1 = this.getFaceCornerMolding(this.face1);
    const cornerMolding2 = this.getFaceCornerMolding(this.face2);
    const filtered1 = cornerMolding1 && this.filterRepeat(cornerMolding1);
    const filtered2 = cornerMolding2 && this.filterRepeat(cornerMolding2);

    return filtered1 && filtered2 ? this.computeShareEdge(filtered1, filtered2) : [];
  }

  private getFaceCornerMolding(face: Face): [Vector3, Vector3][] | undefined {
    if (!face.material?.mixpaint) {
      return undefined;
    }

    const holesPath = face.holesPath2d;
    holesPath.push(...Utils.getObstaclePath(face, false));

    const transformMatrix = face.surfaceObj.localToWorld.inversed() || new Matrix4();
    const groupTransform = this.getGroupFaceTransform(face);

    if (groupTransform) {
      transformMatrix.preMultiply(Matrix4.makeByMatrix3(groupTransform));
      holesPath.forEach((path) => {
        path.outer.forEach((curve) => curve.transform(groupTransform));
        path.holes.forEach((hole) => {
          hole.forEach((curve) => curve.transform(groupTransform));
        });
      });
    }

    const transformedEdge = this.shareEdge!.transformed(transformMatrix);
    const curve2d = Plane.XOY().getCurve2d(transformedEdge);
    const edges: [Vector3, Vector3][] = [];
    const inverseMatrix = transformMatrix.inversed() || new Matrix4();
    const mixPave = face.material.mixpaint.mixPave;

    mixPave.forEachRegion((region) => {
      this.getRegionEdge(region, holesPath, curve2d, inverseMatrix, edges);
    });

    mixPave.forEachFreeRegion((region) => {
      this.getRegionEdge(region, holesPath, curve2d, inverseMatrix, edges);
    });

    return edges;
  }

  private getGroupFaceTransform(face: Face): Matrix3 | undefined {
    if (!face.material?.mixpaint) {
      return undefined;
    }

    const decorator = new HSCore.Model.MixPaintDecorator(face.material.mixpaint);
    const offset = decorator.getFaceGroupOffset(face.id);

    return offset
      ? Matrix3.makeTranslate({ x: offset.left, y: offset.bottom })
      : undefined;
  }

  private getRegionEdge(
    region: Region,
    holesPath: Path2D[],
    sharedCurve2d: Curve2D,
    inverseMatrix: Matrix4,
    edges: [Vector3, Vector3][]
  ): void {
    if (!(region.pattern instanceof HSPaveSDK.PavePattern)) {
      return;
    }

    const regionPaths = [region.path.clone()];
    const clippedPaths =
      holesPath.length > 0
        ? HSCore.Geometry.TgUtil.clip(regionPaths, holesPath, HSPaveSDK.ClipMode.Diff)
        : regionPaths;

    if (clippedPaths.length === 0) {
      return;
    }

    clippedPaths.forEach((path) => {
      path.outer
        .filter((curve) => MathAlg.CurveCurveColinear.curve2ds(curve, sharedCurve2d))
        .forEach((curve) => {
          const start = Vector3.XY(curve.getStartPt()).transform(inverseMatrix);
          const end = Vector3.XY(curve.getEndPt()).transform(inverseMatrix);
          edges.push([start, end]);
        });
    });
  }

  private filterRepeat(edges: [Vector3, Vector3][]): [PointWithLength, PointWithLength][] {
    const filtered: [PointWithLength, PointWithLength][] = [];
    if (edges.length === 0) {
      return filtered;
    }

    const edgeEnd = this.shareEdge!.getEndPt();
    const edgeStart = this.shareEdge!.getStartPt();
    const direction = edgeEnd.subtracted(edgeStart).normalize();

    const edgesWithLength = edges.map((edge) =>
      edge
        .map((pt) => ({
          length: direction.dot(pt),
          pt: pt,
        }))
        .sort((a, b) => a.length - b.length)
    );

    edgesWithLength.sort((a, b) => a[0].length - b[0].length);

    let currentEdge: [PointWithLength, PointWithLength] = [
      edgesWithLength[0][0],
      edgesWithLength[0][1],
    ];

    if (edgesWithLength.length === 1) {
      return [currentEdge];
    }

    for (let i = 1; i < edgesWithLength.length; i++) {
      if (currentEdge[1].length < edgesWithLength[i][0].length) {
        filtered.push(currentEdge);
        currentEdge = [edgesWithLength[i][0], edgesWithLength[i][1]];
      } else {
        currentEdge[1] = edgesWithLength[i][1];
      }

      if (i === edgesWithLength.length - 1) {
        filtered.push(currentEdge);
      }
    }

    return filtered;
  }

  private computeShareEdge(
    edges1: [PointWithLength, PointWithLength][],
    edges2: [PointWithLength, PointWithLength][]
  ): CornerMoldingResult[] {
    const results: CornerMoldingResult[] = [];
    const overlaps: [PointWithLength, PointWithLength][] = [];

    for (let i = 0; i < edges1.length; i++) {
      const edge1 = edges1[i];
      for (let j = 0; j < edges2.length; j++) {
        const edge2 = edges2[j];

        if (edge1[1].length < edge2[0].length || edge1[0].length > edge2[1].length) {
          continue;
        }

        const overlapStart = edge1[0].length > edge2[0].length ? edge1[0] : edge2[0];
        const overlapEnd = edge1[1].length < edge2[1].length ? edge1[1] : edge2[1];

        if (!HSCore.Util.Math.nearlyEquals(overlapStart.length, overlapEnd.length, TOLERANCE)) {
          overlaps.push([overlapStart, overlapEnd]);
        }
      }
    }

    overlaps.sort((a, b) => a[0].length - b[0].length);

    const remaining: [PointWithLength, PointWithLength][] = [];

    const processEdges = (edgeList: [PointWithLength, PointWithLength][]): void => {
      if (overlaps.length === 0) {
        remaining.push(...edgeList);
        return;
      }

      let edgeIndex = 0;
      let overlapIndex = 0;
      let wasMerged = false;

      while (edgeIndex < edgeList.length && overlapIndex < overlaps.length) {
        const edge = edgeList[edgeIndex];
        const overlap = overlaps[overlapIndex];

        if (overlap[0].length - edge[1].length > TOLERANCE) {
          if (!wasMerged) {
            remaining.push(edge);
          }
          wasMerged = false;
          edgeIndex++;
        } else if (edge[0].length - overlap[1].length > TOLERANCE) {
          wasMerged = false;
          overlapIndex++;
        } else {
          if (overlap[0].length - edge[0].length > TOLERANCE) {
            remaining.push([edge[0], overlap[0]]);
          }

          if (
            edge[1].length - overlap[1].length > TOLERANCE &&
            ((overlapIndex + 1 < overlaps.length &&
              edge[1].length < overlaps[overlapIndex + 1][0].length) ||
              overlapIndex + 1 === overlaps.length)
          ) {
            remaining.push([overlap[1], edge[1]]);
          }

          wasMerged = true;
          overlapIndex++;
        }
      }
    };

    processEdges(edges1);
    processEdges(edges2);

    overlaps.forEach((overlap) => {
      results.push({
        length: Math.abs(overlap[1].length - overlap[0].length),
        line: [overlap[0].pt, overlap[1].pt],
        isTwoFace: true,
      });
    });

    remaining.forEach((edge) => {
      results.push({
        length: Math.abs(edge[1].length - edge[0].length),
        line: [edge[0].pt, edge[1].pt],
        isTwoFace: false,
      });
    });

    return results;
  }
}