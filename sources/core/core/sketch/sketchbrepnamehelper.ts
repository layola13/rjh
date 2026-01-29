import { alg as BRepAlg } from './brep-calculate';
import { MathAlg, Coordinate3, Vector2, Line2d, Polygon } from './math';
import { Circle2d } from './circle2d';
import { CircleArc2d } from './circle-arc2d';
import { Line2d as SketchLine2d } from './sketch-line2d';
import { SketchHelper } from './sketch-helper';
import { Logger } from './logger';

interface SketchCurve {
  id: string;
  discretePoints?: number[][];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

interface SketchFace {
  id: string;
  outerLoop: {
    curves: SketchCurve[];
  };
  getBounding(): {
    x: number;
    y: number;
    x2: number;
    y2: number;
  };
}

interface SketchData {
  faces: SketchFace[];
  getAllCurves(): SketchCurve[];
  getAllPoints(): Vector2[];
}

interface EdgeUserData {
  sketchComId: string;
  sketchType: 'point' | 'curve';
  edgeType: 'edge';
}

interface FaceUserData {
  sketchComId: string;
  sketchType: 'face' | 'curve';
  faceType: 'bottomface' | 'sideface';
}

interface BRepEdge {
  tag: string;
  userData?: EdgeUserData;
  getCurve(): unknown;
  getFaces(): BRepFace[];
  getParent(): BRepShell;
}

interface BRepFace {
  tag: string;
  userData?: FaceUserData;
  getCoedge3ds(): BRepCoedge[];
}

interface BRepCoedge {
  tag: string;
  getEdge(): BRepEdge;
}

interface BRepShell {
  getEdges(): BRepEdge[];
  getFaces(): BRepFace[];
  replaceEdgeTag(oldTag: string, newTag: string): void;
}

export class SketchBrepNameHelper {
  private static _instance: SketchBrepNameHelper;

  reconstructBrepNames(shells: BRepShell[], sketchData: SketchData): void {
    const faces = sketchData.faces;
    const curves = sketchData.getAllCurves();
    const points = sketchData.getAllPoints();

    this.sketch2BrepFaces(shells, faces, curves);
    this.sketchCurve2BrepEdges(shells, curves, points);
    this.giveCoedge3dsToponames(shells);
  }

  private sketchCurve2BrepEdges(
    shells: BRepShell[],
    curves: SketchCurve[],
    points: Vector2[]
  ): void {
    const edges = shells.map(shell => shell.getEdges()).flat();
    const usedTags: string[] = [];

    for (const edge of edges) {
      const curve3d = edge.getCurve();
      const projectedCurve = MathAlg.Project.curve3dTo2d(curve3d, Coordinate3.XOY());

      if (!projectedCurve) {
        Logger.console.assert(false, 'project curve3d failed, please check!');
        continue;
      }

      const startPoint = projectedCurve.getStartPt();
      const endPoint = projectedCurve.getEndPt();

      if (projectedCurve instanceof Line2d && startPoint.equals(endPoint)) {
        const matchedPoint = this.matchPoint(startPoint, points);
        if (matchedPoint) {
          const faces = edge.getFaces();
          faces.sort((a, b) => a.tag.localeCompare(b.tag));

          let newTag = '';
          if (faces.length === 1) {
            newTag = `${faces[0].tag}|${matchedPoint.id}`;
          } else if (faces.length === 2) {
            newTag = `${faces[0].tag}|${faces[1].tag}|${matchedPoint.id}`;
          } else {
            newTag = faces.reduce((acc, face) => `${acc}${face.tag}|`, '') + `|${matchedPoint.id}`;
          }

          edge.getParent().replaceEdgeTag(edge.tag, newTag);
          edge.userData = {
            sketchComId: matchedPoint.id,
            sketchType: 'point',
            edgeType: 'edge'
          };

          if (usedTags.includes(newTag)) {
            Logger.console.warn("face's toponame is reduplicative, please check!");
          }
          usedTags.push(newTag);
        }
      } else {
        const matchedCurve = SketchHelper.getInstance().matchCurve(projectedCurve, curves);
        if (matchedCurve) {
          const faces = edge.getFaces();
          faces.sort((a, b) => a.tag.localeCompare(b.tag));

          let newTag = '';
          if (faces.length === 1) {
            newTag = `${faces[0].tag}|${matchedCurve.id}`;
          } else if (faces.length === 2) {
            newTag = `${faces[0].tag}|${faces[1].tag}|${matchedCurve.id}`;
          } else {
            newTag = faces.reduce((acc, face) => `${acc}${face.tag}|`, '') + matchedCurve.id;
          }

          edge.getParent().replaceEdgeTag(edge.tag, newTag);
          edge.userData = {
            sketchComId: matchedCurve.id,
            sketchType: 'curve',
            edgeType: 'edge'
          };

          if (usedTags.includes(newTag)) {
            Logger.console.warn("face's toponame is reduplicative, please check!");
          }
          usedTags.push(newTag);
        } else {
          Logger.console.assert(false, 'match brepcurve with sketch curve failed, please check!');
        }
      }
    }
  }

  private sketch2BrepFaces(
    shells: BRepShell[],
    sketchFaces: SketchFace[],
    curves: SketchCurve[]
  ): void {
    const faces = shells.map(shell => shell.getFaces()).flat();
    const usedTags: string[] = [];

    for (const face of faces) {
      const projected = BRepAlg.BRepCalculateProject.face(face, Coordinate3.XOY());

      if (projected instanceof Polygon) {
        const matchedFace = this.matchFace(projected, sketchFaces);
        if (matchedFace) {
          const tag = matchedFace.id;
          face.tag = tag;
          face.userData = {
            sketchComId: matchedFace.id,
            sketchType: 'face',
            faceType: 'bottomface'
          };

          if (usedTags.includes(tag)) {
            Logger.console.warn("face's toponame is reduplicative, please check!");
          }
          usedTags.push(tag);
        } else {
          Logger.console.assert(false, 'match face failed, please check!');
        }
      } else {
        if (projected.length === 0) {
          Logger.console.assert(false, 'Brep.alg.BRepCalculateProject.face failed, return empty!');
          continue;
        }

        const firstProjected = projected[0];
        if (firstProjected.getAllCurves().length !== 1) {
          Logger.console.assert(false, "calcSketchBrepMp: projCurve's length is not one!");
        }

        const projectedCurve = firstProjected.getAllCurves()[0];
        const matchedCurve = SketchHelper.getInstance().matchCurve(projectedCurve, curves);

        if (matchedCurve) {
          const tag = matchedCurve.id;
          face.tag = tag;
          face.userData = {
            sketchComId: matchedCurve.id,
            sketchType: 'curve',
            faceType: 'sideface'
          };

          if (usedTags.includes(tag)) {
            Logger.console.warn("face's toponame is reduplicative, please check!");
          }
          usedTags.push(tag);
        } else {
          Logger.console.assert(false, 'match curve failed!');
        }
      }
    }
  }

  private giveCoedge3dsToponames(shells: BRepShell[]): void {
    if (shells.length === 0) {
      return;
    }

    for (const shell of shells) {
      const faces = shell.getFaces();
      for (const face of faces) {
        for (const coedge of face.getCoedge3ds()) {
          const tag = `${face.tag}|${coedge.getEdge().tag}`;
          coedge.tag = tag;
        }
      }
    }
  }

  private matchPoint(point: Vector2, points: Vector2[]): Vector2 | undefined {
    const tolerance = 0.005;
    const matched = points.filter(p => point.equals(p, tolerance));
    if (matched.length !== 0) {
      return matched[0];
    }
    return undefined;
  }

  private matchFace(polygon: Polygon, sketchFaces: SketchFace[]): SketchFace | undefined {
    const center = polygon.getBoundingBox().getCenter();
    const sameCenterFaces: SketchFace[] = [];

    for (const sketchFace of sketchFaces) {
      const bounds = sketchFace.getBounding();
      const faceCenter = {
        x: (bounds.x + bounds.x2) / 2,
        y: (bounds.y + bounds.y2) / 2
      };

      if (center.equals(faceCenter, 0.035)) {
        sameCenterFaces.push(sketchFace);
      }
    }

    if (sameCenterFaces.length === 0) {
      Logger.console.assert(false, 'sameCenterFaceInfos length is zero, please check!');
      return undefined;
    }

    for (const sketchFace of sameCenterFaces) {
      const testPoints: Vector2[] = [];

      for (const curve of sketchFace.outerLoop.curves) {
        if (curve instanceof Circle2d || curve instanceof CircleArc2d) {
          testPoints.push(new Vector2(curve.discretePoints![0]));
        } else if (curve instanceof SketchLine2d) {
          const line = new Line2d(curve.start!, curve.end!);
          testPoints.push(new Vector2(curve.start!));
          testPoints.push(new Vector2(line.getMidPt()));
        }
      }

      let allMatch = true;
      for (const testPoint of testPoints) {
        const position = MathAlg.PositionJudge.ptToLoop(testPoint, polygon.getLoops()[0], 0.005);
        if (
          position.type !== MathAlg.PtLoopPositonType.ONEDGE &&
          position.type !== MathAlg.PtLoopPositonType.ONVERTEX
        ) {
          allMatch = false;
          break;
        }
      }

      if (allMatch) {
        return sketchFace;
      }
    }

    return undefined;
  }

  static getInstance(): SketchBrepNameHelper {
    if (!this._instance) {
      this._instance = new SketchBrepNameHelper();
    }
    return this._instance;
  }
}