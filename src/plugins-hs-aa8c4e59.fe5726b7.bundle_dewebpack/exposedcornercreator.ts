import { MathUtil, Line2d, MathAlg, Vector3 } from './math-utils';
import { BomProcessorResultType } from './bom-processor-result-type';
import { CornerMoldingBom } from './corner-molding-bom';

interface Point3D {
  x: number;
  y: number;
  z: number;
  equals(other: Point3D): boolean;
  getStartPt(): Point3D;
  getEndPt(): Point3D;
}

interface Curve {
  getStartPt(): Point3D;
  getEndPt(): Point3D;
  getStartTangent(): Vector3;
  getMidPt(): Point3D;
  getProjectedPtBy(point: Point3D): Point3D;
  containsPoint(point: Point3D): boolean;
  getLength(): number;
}

interface RawPath {
  outer: Curve[];
}

interface SurfaceObj {
  getNormal(): Vector3;
}

interface Face {
  id: string;
  rawPath: RawPath;
  surfaceObj: SurfaceObj;
}

interface RoomInfo {
  faces: Face[];
}

interface Room {
  id: string;
  roomInfos: RoomInfo[];
}

interface Layer {
  id: string;
  forEachRoom(callback: (room: Room) => void): void;
}

interface PaveInfo {
  line: number[][];
  length: number;
}

interface ExposedCornerInfo {
  processorType: BomProcessorResultType;
  roomId: string;
  layerId?: string;
  cornerInfo: {
    line: number[][];
    length: number;
  };
  entity: {
    instance: {
      id: string;
      parentId: string;
    };
    type: {
      classType: string;
    };
  };
  paveInfo?: PaveInfo[];
}

export class ExposedCornerCreator {
  private layer?: Layer;

  create(layer: Layer): ExposedCornerInfo[] {
    const results: ExposedCornerInfo[] = [];
    this.layer = layer;
    const layerId = layer.id;

    layer.forEachRoom((room: Room) => {
      try {
        const exposedCorners = this.getExposedCorner(room);
        if (exposedCorners) {
          exposedCorners.forEach((corner) => {
            corner.layerId = layerId;
          });
          results.push(...exposedCorners);
        }
      } catch (error) {
        console.error(error);
        const errorMessage = "Find Exposed Corner In Walls Failed";
        HSApp.App.getApp().errorLogger.push(errorMessage, {
          errorStack: new Error(errorMessage),
          description: errorMessage,
          errorInfo: {
            info: error,
            path: {
              file: "homestyler-tools-web/web/plugin/bom4/sdk/bom3/exposedcorner/exposed-corner-creator.ts",
              functionName: "create()"
            }
          }
        });
      }
    });

    return results;
  }

  private getExposedCorner(room: Room): ExposedCornerInfo[] {
    const results: ExposedCornerInfo[] = [];

    room.roomInfos.forEach((roomInfo) => {
      const faces = roomInfo.faces;

      for (let i = 0; i < faces.length; i++) {
        for (let j = i + 1; j < faces.length; j++) {
          const currentFace = faces[i];
          const nextFace = faces[j];

          const currentPoints = currentFace.rawPath.outer.map((curve) => curve.getStartPt());
          const nextPoints = nextFace.rawPath.outer.map((curve) => curve.getStartPt());

          const sharedPoint = currentPoints.find((currentPoint) =>
            nextPoints.find((nextPoint) => currentPoint.equals(nextPoint))
          );

          if (!sharedPoint) continue;

          const currentCurve = currentFace.rawPath.outer.find(
            (curve) =>
              curve.containsPoint(sharedPoint) &&
              MathUtil.isNearlyEqual(curve.getStartTangent().z, 0)
          );

          const nextCurve = nextFace.rawPath.outer.find(
            (curve) =>
              curve.containsPoint(sharedPoint) &&
              MathUtil.isNearlyEqual(curve.getStartTangent().z, 0)
          );

          if (!currentCurve || !nextCurve) continue;

          const lineRange: [number, number] = [0, 100];
          const currentLine = new Line2d(
            currentCurve.getMidPt(),
            currentFace.surfaceObj.getNormal(),
            lineRange
          );
          const nextLine = new Line2d(
            nextCurve.getMidPt(),
            nextFace.surfaceObj.getNormal(),
            lineRange
          );

          const intersections = MathAlg.Intersect.curve2ds(currentLine, nextLine);
          const areParallel = currentLine.isParallelTo(nextLine);

          if (intersections.length === 0 && !areParallel) {
            const cornerId = `${currentFace.id}-${nextFace.id}`;

            const verticalCurves = currentFace.rawPath.outer.filter(
              (curve) =>
                curve.getProjectedPtBy(sharedPoint).equals(sharedPoint) &&
                curve.getStartTangent().isParallel(Vector3.Z())
            );

            let viewSpaceLines: number[][] = [];
            verticalCurves.forEach((curve) => {
              const lines = this.modelSpaceLineToViewSpace([
                curve.getStartPt(),
                curve.getEndPt()
              ]);
              viewSpaceLines.push(...lines);
            });

            const totalLength = verticalCurves.reduce(
              (sum, curve) => sum + curve.getLength(),
              0
            );

            const cornerInfo: ExposedCornerInfo = {
              processorType: BomProcessorResultType.ExposedCornerInfo,
              roomId: room.id,
              cornerInfo: {
                line: viewSpaceLines,
                length: totalLength
              },
              entity: {
                instance: {
                  id: cornerId,
                  parentId: room.id
                },
                type: {
                  classType: "ExposedCorner"
                }
              }
            };

            const paveInfo = new CornerMoldingBom(currentFace, nextFace).calcCornerMolding();
            if (paveInfo.length > 0) {
              paveInfo.forEach((info) => {
                info.line = this.modelSpaceLineToViewSpace(info.line);
              });
              cornerInfo.paveInfo = paveInfo;
            }

            results.push(cornerInfo);
          }
        }
      }
    });

    return results;
  }

  private modelSpaceLineToViewSpace(points: Point3D[]): number[][] {
    const viewSpacePoints: number[][] = [];

    points.forEach((point) => {
      const viewSpacePoint = HSApp.View.T3d.Util.ModelSpaceToViewSpace(point);
      viewSpacePoints.push([viewSpacePoint.x, viewSpacePoint.y, viewSpacePoint.z]);
    });

    return viewSpacePoints;
  }
}