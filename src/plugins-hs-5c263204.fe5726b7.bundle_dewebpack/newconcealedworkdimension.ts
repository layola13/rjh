import { Line2d, Vector2, Loop, MathAlg } from './geometry';
import { HSCore } from './core';
import { ContentTypeEnum } from './content-types';
import { NewFurnitureDimension } from './furniture-dimension';

interface DirStartPt {
  dir: Vector2;
  startPt: Vector2;
}

interface LinearDimensionData {
  startPoint: Vector2;
  endPoint?: Vector2;
}

interface HelperLinearData {
  start: Vector2;
  end: Vector2;
}

interface HelperBoxData {
  // Define based on actual structure
  [key: string]: unknown;
}

interface IntersectInfo {
  linearDimensionData: LinearDimensionData;
  helperLinearData?: HelperLinearData;
  helperBoxData?: HelperBoxData;
}

interface CurveInfo {
  entity: HSCore.Model.Content | HSCore.Model.Entity;
  curve: Line2d;
}

interface ContentStartPoints {
  left: Vector2;
  right: Vector2;
  top: Vector2;
  bottom: Vector2;
}

interface SettingChangedEvent {
  data: {
    fieldName: string;
  };
}

interface AuxOptions {
  canCreateEntity(entity: HSCore.Model.Entity): boolean;
}

interface Context {
  auxOptions?: AuxOptions;
}

export class NewConcealedworkDimension extends NewFurnitureDimension {
  private readonly _defaultTol: number = 0.001;
  private _dirStartPts: DirStartPt[] = [];
  public readonly type: string = 'hsw.view.svg.gizmo.CWContentDimension';
  protected entity: HSCore.Model.Content;
  protected context: Context;
  protected contentCurvesInfo: CurveInfo[];

  constructor(
    entity: HSCore.Model.Content,
    context: Context,
    options: unknown
  ) {
    super(entity, context, options);
    this.entity.bound.isValid();
  }

  public isValidContent = (entity: HSCore.Model.Entity): boolean => {
    const auxOptions = this.context.auxOptions;
    return !(
      entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed) ||
      entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden) ||
      (auxOptions && !auxOptions.canCreateEntity(entity)) ||
      entity.contentType.isTypeOf(ContentTypeEnum.CeilingLight)
    ) && Object.values(entity.parents).length !== 0;
  };

  public getNearestIntersectInfo = (
    line: Line2d,
    curves: CurveInfo[]
  ): IntersectInfo => {
    let intersectPoint: Vector2 | undefined;
    let intersectCurve: Line2d | undefined;
    let intersectEntity: HSCore.Model.Content | HSCore.Model.Entity | undefined;

    const rightNormal = line.getRightNormal();
    const startPoint = this._dirStartPts.find(item => item.dir.equals(rightNormal))!.startPt;
    const testLine = new Line2d(startPoint, rightNormal, [0, 1e6]);
    let minDistance = Infinity;

    curves.forEach(item => {
      const { entity, curve } = item;
      const isParallel = testLine.isParallelTo(curve);
      const clonedCurve = curve.clone();
      clonedCurve.setRangeInfinit();

      if (!isParallel) {
        const intersections = MathAlg.CalculateIntersect.curve2ds(clonedCurve, testLine);
        if (intersections[0]) {
          const point = intersections[0].point;
          const distance = startPoint.distanceTo(point);
          if (distance < minDistance) {
            minDistance = distance;
            intersectPoint = point;
            intersectCurve = curve;
            intersectEntity = entity;
          }
        }
      }
    });

    if (
      intersectEntity instanceof HSCore.Model.Content &&
      HSCore.Util.Content.isCWUniqueContent(intersectEntity) &&
      intersectPoint
    ) {
      const room = HSCore.Util.Room.getRoomContentIn(this.entity);
      if (room) {
        const targetContent = intersectEntity;
        const currentRoomCurve = this._getSnapedRoomCurveIn2D(this.entity, room);
        const targetRoomCurve = this._getSnapedRoomCurveIn2D(targetContent, room);

        if (currentRoomCurve && targetRoomCurve && currentRoomCurve.equals(targetRoomCurve)) {
          if (this._getAlginType(this.entity) === 0) {
            const outline = targetContent.outline;
            intersectPoint = this._getCenterOfSegment(outline[2], outline[3]);
          }
        }
      }
    }

    const linearDimensionData: LinearDimensionData = {
      startPoint,
      endPoint: intersectPoint,
    };

    const helperData = this.calculateHelperData(intersectCurve, intersectPoint, intersectEntity);

    return {
      linearDimensionData,
      helperLinearData: helperData.helperLinearData,
      helperBoxData: helperData.helperBoxData,
    };
  };

  public computeChildGizmoInfo(): void {
    if (HSCore.Util.Room.getRoomContentIn(this.entity)) {
      this._computeDirAndStartPt();
      super.computeChildGizmoInfo([]);
    }
  }

  protected _onSettingChanged(event: SettingChangedEvent): void {
    if (event.data.fieldName === 'concealedWorkDimensionType') {
      this._computeDirAndStartPt();
      this.update();
    } else {
      super._onSettingChanged([event]);
    }
  }

  public checkCandidateContent(content: HSCore.Model.Entity): boolean {
    if (content === this.entity) return false;
    if (!this.isValidContent(content)) return false;

    content.bound;
    return !HSCore.Util.Collision.outlineIntersect(content.outline, this.entity.outline);
  }

  protected _findCandidateContents(entity: HSCore.Model.Entity): HSCore.Model.Content[] {
    const baseContents = super._findCandidateContents([entity]);
    const additionalContents = new Set<HSCore.Model.Content>();

    entity.forEachStructureFace((face: HSCore.Model.StructureFace) => {
      face.getLinkStructure()
        .filter((structure: HSCore.Model.Structure) => structure instanceof HSCore.Model.Wall)
        .forEach((wall: HSCore.Model.Wall) => {
          wall.forEachContent((content: HSCore.Model.Content) => {
            if (this.checkCandidateContent(content)) {
              content.bound.isValid();
              additionalContents.add(content);
            }
          });
        });
    });

    return baseContents.concat(Array.from(additionalContents));
  }

  public computeOverLapDimensionInfo(line: Line2d, point: Vector2): IntersectInfo {
    const dimensionInfo = this.getDimensionInfoByLine(line, this.contentCurvesInfo);
    const { linearDimensionData, helperLinearData, helperBoxData } = dimensionInfo;
    const startPoint = linearDimensionData.startPoint;

    if (linearDimensionData.endPoint) {
      return {
        linearDimensionData,
        helperLinearData,
        helperBoxData,
      };
    }

    const rightNormal = line.getRightNormal();
    const testLine = new Line2d(startPoint, rightNormal, [0, 1e6]);
    const footParam = testLine.getAllFootParams(point)[0];
    const footPoint = testLine.getPtAt(footParam);

    return {
      linearDimensionData: {
        startPoint,
        endPoint: footPoint,
      },
      helperLinearData: {
        start: point,
        end: footPoint,
      },
    };
  }

  public getCandidateCurvesInfoByLine(line: Line2d, curvesInfo: CurveInfo[]): CurveInfo[] {
    const result: CurveInfo[] = [];
    const startPt = line.getStartPt();
    const endPt = line.getEndPt();
    const rightNormal = line.getRightNormal();

    const startLine = new Line2d(startPt, rightNormal, [0, 1e6]);
    const endLine = new Line2d(endPt, rightNormal, [0, 1e6]);

    const boundingLoop = new Loop([startPt, endPt, startLine.getEndPt(), endLine.getEndPt()]);
    const boundingCurves = boundingLoop.getAllCurves();

    for (const curveInfo of curvesInfo) {
      const { curve } = curveInfo;
      const hasIntersection = boundingCurves.some(boundCurve => {
        return (
          MathAlg.PositionJudge.curveToCurve(curve, boundCurve, this._defaultTol) !==
          MathAlg.CurveCuvePositonType.NOT_INTERSECT
        );
      });

      if (hasIntersection) {
        result.push(curveInfo);
      }
    }

    return result;
  }

  private _computeDirAndStartPt(): void {
    this._dirStartPts.length = 0;

    const outline = this.entity.outline;
    const basePoint = new Vector2(outline[2]);
    const leftDir = new Vector2(outline[3]).subtract(basePoint).normalize();
    const rightDir = leftDir.reversed().normalize();
    const topDir = leftDir.vecRotated(Math.PI / 2).normalize();
    const bottomDir = topDir.reversed().normalize();

    const directions = {
      left: leftDir,
      right: rightDir,
      top: topDir,
      bottom: bottomDir,
    };

    const startPoints = this._getCWContentStartPoint(this.entity);

    this._dirStartPts.push(
      { dir: directions.left, startPt: startPoints.left },
      { dir: directions.right, startPt: startPoints.right },
      { dir: directions.top, startPt: startPoints.top },
      { dir: directions.bottom, startPt: startPoints.bottom }
    );
  }

  private _getAlginType(content: HSCore.Model.Content): number {
    const waterTypes = [
      HSCore.Catalog.ContentTypeEnum.ColdHotWater,
      HSCore.Catalog.ContentTypeEnum.ColdWater,
      HSCore.Catalog.ContentTypeEnum.HotWater,
      HSCore.Catalog.ContentTypeEnum.ColdWaterValve,
    ];

    return content.contentType.isTypeOf(waterTypes)
      ? 0
      : (window as any).adskUser.customizedSetting.concealedWorkDimensionType;
  }

  private _getCWContentStartPoint(content: HSCore.Model.Content): ContentStartPoints {
    content.bound.isValid();

    const outline = content.outline;
    const isGroundSocket = content.contentType.isTypeOf(
      HSCore.Catalog.ContentTypeEnum.SocketGroundSocket
    );
    const centerPoint = new Vector2(content.x, content.y);

    let leftPt: Vector2;
    let rightPt: Vector2;
    let topPt: Vector2;
    let bottomPt: Vector2;

    const alignType = this._getAlginType(content);

    if (alignType === 0) {
      const refPoint = isGroundSocket
        ? centerPoint
        : new Vector2((outline[2].x + outline[3].x) / 2, (outline[2].y + outline[3].y) / 2);
      leftPt = rightPt = topPt = bottomPt = refPoint;
    } else if (alignType === 1) {
      if (isGroundSocket) {
        leftPt = this._getCenterOfSegment(outline[3], outline[0]);
        rightPt = this._getCenterOfSegment(outline[1], outline[2]);
        topPt = this._getCenterOfSegment(outline[2], outline[3]);
        bottomPt = this._getCenterOfSegment(outline[0], outline[1]);
      } else {
        leftPt = new Vector2(outline[3]);
        rightPt = new Vector2(outline[2]);
        topPt = bottomPt = new Vector2(
          (outline[2].x + outline[3].x) / 2,
          (outline[2].y + outline[3].y) / 2
        );
      }
    } else {
      leftPt = rightPt = topPt = bottomPt = centerPoint;
    }

    return {
      left: leftPt,
      right: rightPt,
      top: topPt,
      bottom: bottomPt,
    };
  }

  private _getCenterOfSegment(pt1: Vector2, pt2: Vector2): Vector2 {
    return new Vector2((pt1.x + pt2.x) / 2, (pt1.y + pt2.y) / 2);
  }

  private _getSnapedRoomCurveIn2D(
    content: HSCore.Model.Content,
    room: HSCore.Model.Room
  ): Line2d | undefined {
    const roomInfo = room.roomInfos.length > 0 && room.roomInfos[0];
    if (!roomInfo) return undefined;

    const path = roomInfo.path;
    if (!path) return undefined;

    const outerPath = path.outer;
    const holes = path.holes;
    if (outerPath.length === 0) return undefined;

    const allPaths = [outerPath, ...holes];
    const contentOutline = content.outline;
    const contentLine = new Line2d(contentOutline[2], contentOutline[3]);

    for (const pathCurves of allPaths) {
      const matchedCurve = pathCurves.find(curve => {
        const positionType = MathAlg.PositionJudge.curveCurveOverlap(
          contentLine,
          curve,
          this._defaultTol
        );
        return (
          positionType === MathAlg.CurveCuvePositonType.OVERLAP ||
          positionType === MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
        );
      });

      if (matchedCurve) {
        return matchedCurve;
      }
    }

    return undefined;
  }

  protected calculateHelperData(
    curve: Line2d | undefined,
    point: Vector2 | undefined,
    entity: HSCore.Model.Entity | undefined
  ): { helperLinearData?: HelperLinearData; helperBoxData?: HelperBoxData } {
    // Implementation depends on parent class
    return { helperLinearData: undefined, helperBoxData: undefined };
  }

  protected getDimensionInfoByLine(line: Line2d, curvesInfo: CurveInfo[]): IntersectInfo {
    // Implementation depends on parent class
    return {
      linearDimensionData: { startPoint: line.getStartPt() },
    };
  }

  protected update(): void {
    // Implementation depends on parent class
  }
}