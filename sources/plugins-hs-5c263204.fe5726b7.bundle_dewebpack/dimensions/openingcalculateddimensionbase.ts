import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { Vector2, Line2d } from './Vector2';
import { SVGDimensionType } from './SVGDimensionType';
import { DimensionUtils } from './DimensionUtils';

const LinearDimensionStateEnum = HSApp.View.SVG.LinearDimensionStateEnum;

interface AdjacentPointsResult {
  start: Vector2 | undefined;
  end: Vector2 | undefined;
  left: Vector2;
  right: Vector2;
  offset: Vector2;
  invalid: boolean;
}

interface DimensionData {
  start: Vector2;
  end: Vector2;
  textPosition: Vector2;
  min: number;
  max: number;
  direction?: Vector2;
  invalid: boolean;
  inverted?: boolean;
}

interface WorkCurveInfo {
  workCurve: Line2d;
  floor?: HSCore.Model.Floor;
}

export class OpeningCalculatedDimensionBase extends HSApp.View.SVG.Gizmo {
  public entity: HSCore.Model.Opening;
  private _dimensionView2d: HSApp.View.SVG.LinearDimension[] = [];
  private _gizmoDirty: boolean = true;
  private readonly kDimensionOffset: number = 30;
  private intersectPoints: Vector2[] = [];
  private isInValid: boolean = false;

  constructor(
    context: HSApp.Context,
    layer: HSApp.Layer,
    canvas: HTMLCanvasElement,
    entity: HSCore.Model.Opening
  ) {
    super(context, layer, canvas, entity);
    this.entity = entity;
    this._createDimensions();
  }

  static uniqueType(): SVGDimensionType {
    return SVGDimensionType.OpeningCalculatedDimensionBase;
  }

  get dimensionView2d(): HSApp.View.SVG.LinearDimension[] {
    return this._dimensionView2d;
  }

  onActivate(): void {
    this.update();
    const application = this.context.application;
    const cmdManager = HSApp.App.getApp().cmdManager;

    this.signalHook
      .listen(this.entity.signalDirty, () => {
        this.update();
      })
      .listen(application.signalViewActivated, () => {
        this.update();
      })
      .listen(cmdManager.signalCommandSuspending, this._onCommandEnd)
      .listen(cmdManager.signalCommandTerminating, this._onCommandEnd);

    this.childItems.forEach((child) => {
      this.signalHook.listen(child.valueChangeCommit, this.onValueChangeCommit);
    }, this);

    super.onActivate();
  }

  onDeactivate(): void {
    this.unlistenAllEvents();
    super.onDeactivate();
  }

  onCleanup(): void {
    this.childItems.forEach((child) => {
      child.onCleanup();
    });
    super.onCleanup();
  }

  update(): void {
    if (!this.entity) {
      return;
    }

    if (this.entity.getHost()) {
      this.show();
      this._gizmoDirty = true;
      this.dirty = true;
    } else {
      this.hide();
    }
  }

  draw(): void {
    if (this.context.application.isActiveView(this.canvas)) {
      if (this._gizmoDirty) {
        this.updateChildGizmo();
        this._gizmoDirty = false;
      }
      super.draw();
    } else {
      this.hide();
    }
  }

  fillDimensionData(dimensionDataArray: (DimensionData | undefined)[]): void {
    const dimensionCount = this._dimensionView2d.length;

    for (let i = 0; i < dimensionCount; i++) {
      const dimensionView = this._dimensionView2d[i];
      const data = dimensionDataArray[i];

      if (data) {
        const { start, end, min, max, direction, invalid } = data;
        const textPosition = HSCore.Util.Math.Vec2.lerp(start, end, 0.5);

        dimensionView.start = start;
        dimensionView.end = end;
        dimensionView.textPosition = textPosition;
        dimensionView.min = min;
        dimensionView.max = max;
        dimensionView.direction = direction;
        dimensionView.updateState(LinearDimensionStateEnum.invalid, invalid);
      } else {
        dimensionView.visible = false;
      }
    }
  }

  updateChildGizmo(): void {
    const host = this.entity.getHost();

    if (host instanceof HSCore.Model.Wall) {
      const dimensionDataArray: (DimensionData | undefined)[] = [];
      const adjacentPoints = this._getClosestAdjacentPointOnWall(host);

      this.formatDimensionView(adjacentPoints, dimensionDataArray);

      if (dimensionDataArray.length === 0) {
        return;
      }

      this.fillDimensionData(dimensionDataArray);
    } else if (
      this.entity instanceof HSCore.Model.Opening &&
      host instanceof HSCore.Model.NCustomizedParametricRoof
    ) {
      const roofDimensionData = this._computeRoofOpeningSizeDimensionData();

      for (let i = 0, count = this._dimensionView2d.length; i < count; i++) {
        const dimensionView = this._dimensionView2d[i];

        if (i === 1) {
          if (roofDimensionData) {
            const { start, end, textPosition, min, max, invalid } = roofDimensionData;
            dimensionView.start = start;
            dimensionView.end = end;
            dimensionView.textPosition = textPosition;
            dimensionView.min = min;
            dimensionView.max = max;
            dimensionView.updateState(LinearDimensionStateEnum.invalid, invalid);
          } else {
            dimensionView.visible = false;
          }
        } else {
          dimensionView.visible = false;
        }
      }
    }
  }

  calcIntersect(
    wall: HSCore.Model.Wall,
    infiniteLine: Line2d,
    direction: Vector2,
    originalLine: Line2d
  ): boolean {
    let hasOverlap = false;

    wall.forEachOpening((opening) => {
      if (opening.id !== this.entity.id) {
        const profile = opening.bottomProfile;
        profile.forEach((curve) => {
          DimensionUtils.getIntersectPoints(infiniteLine, direction, curve, this.intersectPoints);
        });

        if (DimensionUtils.curvesCurvesOverlap(profile, [originalLine])) {
          hasOverlap = true;
        }
      }
    });

    wall.forEachParametricOpenings((opening) => {
      if (opening.id !== this.entity.id) {
        const segments = opening.pathSegments;
        segments.forEach((segment) => {
          DimensionUtils.getIntersectPoints(infiniteLine, direction, segment, this.intersectPoints);
        });

        if (DimensionUtils.curvesCurvesOverlap(segments, [originalLine])) {
          hasOverlap = true;
        }
      }
    });

    return hasOverlap;
  }

  formatDimensionView(
    adjacentPointsArray: AdjacentPointsResult[],
    dimensionDataArray: (DimensionData | undefined)[],
    includeMiddle: boolean = true
  ): void {
    adjacentPointsArray.forEach((adjacentPoints) => {
      const { start, end, left, right, offset, invalid } = adjacentPoints;

      const startOffset = start?.add(offset);
      const endOffset = end?.add(offset);
      const leftOffset = left.add(offset);
      const rightOffset = right.add(offset);

      const totalDistance = startOffset && endOffset ? startOffset.distanceTo(endOffset) : undefined;
      const entityLength = this.getEntityLength();
      const isAirConditionHole = this.entity.metadata.contentType.isTypeOf(
        HSCatalog.ContentTypeEnum.AirConditionHoleOpening
      );

      const normalizedDirection = rightOffset.subtracted(leftOffset).normalized();

      if (startOffset && leftOffset) {
        dimensionDataArray.push({
          start: startOffset,
          end: leftOffset,
          textPosition: HSCore.Util.Math.Vec2.lerp(startOffset, leftOffset, 0.5),
          min: 0,
          max: totalDistance ? totalDistance - entityLength : 0,
          direction: normalizedDirection,
          invalid
        });
      }

      if (leftOffset && rightOffset) {
        if (includeMiddle) {
          dimensionDataArray.push({
            start: leftOffset,
            end: rightOffset,
            textPosition: HSCore.Util.Math.Vec2.lerp(leftOffset, rightOffset, 0.5),
            min: isAirConditionHole ? 0.01 : 0,
            max: isAirConditionHole ? 0.2 : totalDistance ?? Number.MAX_VALUE,
            direction: normalizedDirection,
            invalid
          });
        } else {
          dimensionDataArray.push(undefined);
        }
      }

      if (rightOffset && endOffset) {
        dimensionDataArray.push({
          start: endOffset,
          end: rightOffset,
          textPosition: HSCore.Util.Math.Vec2.lerp(endOffset, rightOffset, 0.5),
          min: 0,
          max: totalDistance ? totalDistance - entityLength : 0,
          direction: normalizedDirection.multiplied(-1),
          invalid
        });
      }
    });
  }

  private _createDimensions = (): void => {
    for (let i = 0; i < 6; i++) {
      const dimension = new HSApp.View.SVG.LinearDimension(
        this.context,
        this.layer,
        this.entity,
        {}
      );
      dimension.updateState(LinearDimensionStateEnum.editable, true);
      this.addChildGizmo(dimension);
      this._dimensionView2d.push(dimension);
    }
  };

  private _onCommandEnd = (event: { data: { cmd?: unknown } }): void => {
    if (event.data.cmd && document && document.activeElement) {
      const activeElement = document.activeElement;
      if (
        activeElement.nodeName === 'INPUT' &&
        !HSApp.View.SVG.LinearDimension.isDimensionInput(activeElement)
      ) {
        return;
      }
    }
  };

  private _getNearestPoint = (entityPosition: Vector2, linePoint: Vector2): Vector2 | undefined => {
    let nearestPoint: Vector2 | undefined;
    let minDistance = Infinity;

    this.intersectPoints.forEach((intersectPoint) => {
      const lineDirection = entityPosition.subtracted(linePoint);
      const pointDirection = intersectPoint.subtracted(linePoint);
      const dotProduct = lineDirection.dot(pointDirection);

      if (dotProduct < 0 || HSCore.Util.Math.nearlyEquals(dotProduct, 0)) {
        const distance = linePoint.distanceTo(intersectPoint);
        if (distance < minDistance) {
          minDistance = distance;
          nearestPoint = intersectPoint;
        }
      }
    });

    return nearestPoint;
  };

  private _getAdjacentPoints = (
    wall: HSCore.Model.Wall,
    workLine: Line2d,
    structureFaces: HSCore.Model.Face[],
    floor?: HSCore.Model.Floor
  ): AdjacentPointsResult => {
    const startPoint = workLine.getStartPt();
    const endPoint = workLine.getEndPt();
    const lineDirection = new Vector2(startPoint, endPoint);
    const entityPosition = new Vector2(this.entity.x, this.entity.y);
    const workCurve = workLine.curve;
    const offsetVector = DimensionUtils.getDimensionYOffsetWithDirection(
      workCurve,
      workLine,
      this.kDimensionOffset
    );

    const infiniteLine = workLine.clone();
    infiniteLine.setRangeInfinit();

    this.intersectPoints = [];

    structureFaces.forEach((face) => {
      const curve = face.faceInfo?.curve;
      if (curve) {
        DimensionUtils.getIntersectPoints(infiniteLine, lineDirection, curve, this.intersectPoints);
      }
    });

    const hasIntersect = this.calcIntersect(wall, infiniteLine, lineDirection, workLine);

    const nearestStartPoint = this._getNearestPoint(entityPosition, startPoint);
    const nearestEndPoint = this._getNearestPoint(entityPosition, endPoint);

    let leftPoint = startPoint;
    let rightPoint = endPoint;

    if (wall.isArcWall() && nearestStartPoint && nearestEndPoint) {
      const nearestLine = new Line2d(nearestStartPoint, nearestEndPoint);
      leftPoint = nearestLine.getProjectedPtBy(startPoint);
      rightPoint = nearestLine.getProjectedPtBy(endPoint);
    }

    return {
      start: nearestStartPoint,
      end: nearestEndPoint,
      left: leftPoint,
      right: rightPoint,
      offset: offsetVector,
      invalid: hasIntersect || !nearestStartPoint || !nearestEndPoint
    };
  };

  private _getClosestAdjacentPointOnWall(wall: HSCore.Model.Wall): AdjacentPointsResult[] {
    const entityProfile = this.getWorkingEntityProfile();
    const workCurveInfos: WorkCurveInfo[] = [];
    const floors: HSCore.Model.Floor[] = [];
    const structureFaces: HSCore.Model.Face[] = [];

    wall.roomInfos.forEach((roomInfo) => {
      floors.push(...roomInfo.floors);
      roomInfo.structureFaceInfos.outer.forEach((faceInfo) => {
        structureFaces.push(faceInfo.face);
      });
    });

    floors.forEach((floor) => {
      const outerPath = floor.worldRawPath2d.outer;
      const overlapCurve = DimensionUtils.curvesCurvesOverlap(outerPath, entityProfile);
      if (overlapCurve) {
        workCurveInfos.push({
          workCurve: overlapCurve,
          floor
        });
      }
    });

    if (workCurveInfos.length === 0) {
      const wallDirection = wall.direction;
      const wallPath = wall.isArcWall()
        ? wall.path
        : wall.path.filter((segment) => {
            return segment instanceof Line2d && segment.toVector2().isParallel(wallDirection);
          });

      const overlapCurve = DimensionUtils.curvesCurvesOverlap(wallPath, entityProfile);
      if (overlapCurve) {
        workCurveInfos.push({
          workCurve: overlapCurve
        });
      }
    }

    const adjacentPointsResults: AdjacentPointsResult[] = [];

    for (let i = 0; i < workCurveInfos.length; i++) {
      const { workCurve, floor } = workCurveInfos[i];
      const adjacentPoints = this._getAdjacentPoints(wall, workCurve, structureFaces, floor);

      if (adjacentPointsResults.length > 0) {
        const currentStart = adjacentPoints.start;
        const currentLeft = adjacentPoints.left;
        const currentRight = adjacentPoints.right;
        const currentEnd = adjacentPoints.end;

        const currentStartDistance = currentStart?.sqDistanceTo(currentLeft);
        const previousStartDistance = adjacentPointsResults[0].start?.sqDistanceTo(
          adjacentPointsResults[0].left
        );

        const currentEndDistance = currentEnd?.sqDistanceTo(currentRight);
        const previousEndDistance = adjacentPointsResults[0].end?.sqDistanceTo(
          adjacentPointsResults[0].right
        );

        const startDistancesDiffer =
          previousStartDistance !== undefined &&
          currentEndDistance !== undefined &&
          !HSCore.Util.Math.nearlyEquals(previousStartDistance, currentEndDistance, 1e-4);

        const endDistancesDiffer =
          currentStartDistance !== undefined &&
          previousEndDistance !== undefined &&
          !HSCore.Util.Math.nearlyEquals(currentStartDistance, previousEndDistance, 1e-4);

        if (startDistancesDiffer || endDistancesDiffer) {
          adjacentPointsResults.push(adjacentPoints);
        }
      } else {
        adjacentPointsResults.push(adjacentPoints);
      }
    }

    return adjacentPointsResults;
  }

  private _computeRoofOpeningSizeDimensionData(): DimensionData | undefined {
    const outlinePoints = this.entity.getFrontOutlinePointsInWorld();

    if (outlinePoints && outlinePoints.length === 4) {
      const startPoint = HSCore.Util.Math.Vec2.lerp(outlinePoints[3], outlinePoints[0], 0.1);
      const endPoint = HSCore.Util.Math.Vec2.lerp(outlinePoints[2], outlinePoints[1], 0.1);

      return {
        start: startPoint,
        end: endPoint,
        textPosition: HSCore.Util.Math.Vec2.lerp(startPoint, endPoint, 0.5),
        min: 0,
        max: Number.MAX_VALUE,
        invalid: false,
        inverted: false
      };
    }

    return undefined;
  }
}