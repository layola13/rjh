import { HSApp } from './HSApp';
import { Vector2, Line2d, CONST, MathUtil } from './math';
import { PathItem, Dimension, InputBoxType } from './canvas';
import { WallDimension, dimOffsetLength, sortTolerance } from './gizmo';
import { getUnitParam } from './utils';
import { HSCore } from './core';

interface CutWallParams {
  position: Vector2;
  selectNewWall: boolean;
}

interface Range {
  min: number;
  max: number;
}

interface FaceInfo {
  curve: Line2d;
}

interface Face {
  faceInfo: FaceInfo;
}

interface Wall {
  leftFaces: Record<string, Face>;
  rightFaces: Record<string, Face>;
  curve: Line2d;
  width: number;
  direction: Vector2;
  path: Line2d[];
}

interface Command {
  wall: Wall;
}

interface Context {
  application: {
    getActive2DView(): {
      gizmoManager: {
        getTypeGizmo(type: typeof WallDimension): Array<{ setVisible(visible: boolean): void }>;
      };
    };
  };
}

interface Canvas {
  signalViewBoxChanged: {
    data?: {
      scaleChanged?: boolean;
      positionChanged?: boolean;
    };
  };
}

const ActiveCutLineAttr = {
  stroke: '#FF0000',
  strokeWidth: 2,
  strokeDasharray: '5,5'
};

const SnapAttr = {
  stroke: '#00FF00',
  strokeWidth: 3
};

/**
 * CutWall tool for splitting walls at a specified position
 */
export class CutWall extends HSApp.View.SVG.Temp {
  private _leftStartDimension?: Dimension;
  private _leftEndDimension?: Dimension;
  private _rightStartDimension?: Dimension;
  private _rightEndDimension?: Dimension;
  private _dims: Dimension[] = [];
  private _leftRanges: Range[] = [];
  private _leftPts: number[] = [];
  private _rightRanges: Range[] = [];
  private _rightPts: number[] = [];
  private _hideDimensions: Dimension[] = [];
  private _activeCutLineItem?: PathItem;
  private _activeGizmo?: Dimension;
  private _app?: typeof HSApp.App;
  private _pos?: Vector2;
  private _refreshShowDimensionTimerId?: number;

  constructor(element: unknown, node: unknown, index: unknown) {
    super(element, node, index, false);

    this._app = HSApp.App.getApp();

    this.context.application.getActive2DView().gizmoManager.getTypeGizmo(WallDimension).forEach(gizmo => {
      gizmo.setVisible(false);
    });

    this._leftStartDimension = this._createLengthDimension(this.context);
    this._leftEndDimension = this._createLengthDimension(this.context);
    this._rightStartDimension = this._createLengthDimension(this.context);
    this._rightEndDimension = this._createLengthDimension(this.context);

    this._dims = [
      this._leftStartDimension,
      this._leftEndDimension,
      this._rightStartDimension,
      this._rightEndDimension
    ];

    this._reorderDims();

    this._activeCutLineItem = new PathItem(this.context).attr(ActiveCutLineAttr);

    this._initData();

    this.signalHook.listen(this.getCanvas().signalViewBoxChanged, (event: { data?: { scaleChanged?: boolean; positionChanged?: boolean } }) => {
      if (event.data && (event.data.scaleChanged || event.data.positionChanged)) {
        if (this._refreshShowDimensionTimerId) {
          clearTimeout(this._refreshShowDimensionTimerId);
        }

        this._elements.forEach(element => element.hide());

        this._refreshShowDimensionTimerId = setTimeout(() => {
          this._dims.forEach(dim => dim.update());
          this._elements.forEach(element => {
            if (!this._hideDimensions.includes(element as Dimension)) {
              element.show();
            }
          });
        }, 400);
      }
    });
  }

  private get _elements(): Array<PathItem | Dimension> {
    return [this._activeCutLineItem!, ...this._dims];
  }

  private get _wall(): Wall {
    return (this.cmd as Command).wall;
  }

  private _initData(): void {
    this._leftPts.length = 0;
    this._rightPts.length = 0;

    const faceGroups = [this._wall.leftFaces, this._wall.rightFaces].map(faces => {
      return Object.values(faces).map(face => {
        const curve = face.faceInfo.curve;
        const params = [curve.getStartPt(), curve.getEndPt()].map(point => {
          return this._wall.curve.getParamAt(point);
        });

        return {
          min: Math.min(...params),
          max: Math.max(...params)
        };
      });
    });

    [this._leftRanges, this._rightRanges] = faceGroups;

    this._leftRanges.forEach(range => {
      this._leftPts.push(range.min, range.max);
    });

    this._rightRanges.forEach(range => {
      this._rightPts.push(range.min, range.max);
    });

    this._leftPts.sort((a, b) => a - b);
    this._rightPts.sort((a, b) => a - b);
  }

  private _createLengthDimension(context: Context): Dimension {
    const dimension = new Dimension(
      context,
      {
        type: InputBoxType.Number,
        editable: true,
        onEnter: this._onValueChangeCommit.bind(this),
        onTab: this._onInputSwitching.bind(this)
      },
      {
        offset: this._wall.width / 2 + dimOffsetLength,
        offsetByScreen: false
      }
    );

    dimension.show();
    return dimension;
  }

  private _reorderDims(): void {
    const tolerance = sortTolerance / HSApp.View.SVG.Util.ModelToScreenFactor(this.context);

    this._dims.sort((dimA, dimB) => {
      if (dimA.isShow && dimB.isShow) {
        const posA = dimA.inputPosition;
        const posB = dimB.inputPosition;

        if (posA.y - posB.y > tolerance) return -1;
        if (posB.y - posA.y > tolerance) return 1;
        return posA.x - posB.x;
      }

      return dimA.isShow ? -1 : 1;
    });

    this._setActiveDim(this._dims[0]);
  }

  private _setActiveDim(dimension: Dimension): void {
    this._activeGizmo = dimension;

    this._dims.forEach(dim => {
      if (dim === dimension) {
        dim.focus();
      } else {
        dim.blur();
      }
    });
  }

  private _onValueChangeCommit(value: number, _temp: unknown, dimension: Dimension): void {
    if (!this._pos) return;

    const otherPoint = [dimension.curve.getStartPt(), dimension.curve.getEndPt()].find(point => {
      return !point.equals(this._pos!);
    });

    if (!otherPoint) return;

    const direction = this._pos.subtracted(otherPoint).normalized();
    direction.multiply(value / getUnitParam());

    this._pos = otherPoint.added(direction);
    this._cutWall();
  }

  private _onInputSwitching(value: number, isTab: boolean): void {
    if (!this._activeGizmo) return;

    if (isTab && this._pos) {
      const direction = new Vector2(this._wall.direction).normalized();

      if (this._activeGizmo === this._leftEndDimension || this._activeGizmo === this._rightEndDimension) {
        direction.reverse();
      }

      direction.multiply(value / getUnitParam() - this._activeGizmo.curve.getLength());
      this._mouseMove(this._pos.add(direction));
    }

    const visibleDims = this._dims.filter(dim => dim.isShow);
    const currentIndex = visibleDims.indexOf(this._activeGizmo);
    const nextIndex = (currentIndex + 1) % visibleDims.length;

    this._setActiveDim(visibleDims[nextIndex]);
  }

  private _getDestWall(position: Vector2): Wall | undefined {
    const walls = [this._wall];

    for (const wall of walls) {
      const polygon = wall.path.map(segment => {
        const startPoint = segment.getStartPt();
        return { X: startPoint.x, Y: startPoint.y };
      });

      const point = { X: position.x, Y: position.y };

      if (
        ClipperLib.Clipper.PointInPolygon(point, polygon) &&
        this._wall.curve.isLine2d() &&
        wall.curve.isLine2d() &&
        this._wall.curve.isParallelTo(wall.curve) &&
        HSCore.Util.Math.nearlyEquals(this._wall.width, wall.width)
      ) {
        return wall;
      }
    }

    return undefined;
  }

  public onMouseMove(_event: unknown, screenX: number, screenY: number): void {
    const modelCoords = HSApp.View.SVG.Util.ScreenPointToModel([screenX, screenY], this.context);
    this._mouseMove(new Vector2(modelCoords[0], modelCoords[1]));
  }

  private _mouseMove(position: Vector2): void {
    const destWall = this._getDestWall(position);
    const curve = this._wall.curve;

    if (destWall === this._wall && curve.isLine2d()) {
      const closestPoint = curve.getClosestPoint(position);
      let param = curve.getParamAt(closestPoint);

      const isOutsideLeft = this._leftRanges.every(range => param <= range.min || param >= range.max);
      const isOutsideRight = this._rightRanges.every(range => param <= range.min || param >= range.max);

      if (isOutsideLeft || isOutsideRight) {
        this._reset();
        return;
      }

      const snapThreshold = 0.03;
      let snappedParam: number | undefined;

      this._leftRanges.concat(this._rightRanges).some(range => {
        return [range.max, range.min].some(boundaryParam => {
          if (Math.abs(boundaryParam - param) < snapThreshold) {
            snappedParam = boundaryParam;
            return true;
          }
          return false;
        });
      });

      if (snappedParam !== undefined) {
        closestPoint.set(curve.getPtAt(snappedParam));
        this._activeCutLineItem!.attr(SnapAttr);
      } else {
        this._activeCutLineItem!.attr(ActiveCutLineAttr);
      }

      const leftIndex = this._leftPts.findIndex(pt => pt >= param);
      const [leftStart, leftEnd] = [leftIndex - 1, leftIndex].map(idx => curve.getPtAt(this._leftPts[idx]));

      this._leftStartDimension!.updateData({ curve: new Line2d(closestPoint, leftStart) });
      this._leftEndDimension!.updateData({ curve: new Line2d(leftEnd, closestPoint) });

      const rightIndex = this._rightPts.findIndex(pt => pt >= param);
      const [rightStart, rightEnd] = [rightIndex - 1, rightIndex].map(idx => curve.getPtAt(this._rightPts[idx]));

      this._rightStartDimension!.updateData({ curve: new Line2d(rightStart, closestPoint) });
      this._rightEndDimension!.updateData({ curve: new Line2d(closestPoint, rightEnd) });

      this._hideDimensions.length = 0;

      if (leftStart.equals(rightStart)) {
        const hideTarget = curve.getDirection().y >= 0 ? this._rightStartDimension! : this._leftStartDimension!;
        this._hideDimensions.push(hideTarget);
      }

      if (leftEnd.equals(rightEnd)) {
        const hideTarget = curve.getDirection().y >= 0 ? this._rightEndDimension! : this._leftEndDimension!;
        this._hideDimensions.push(hideTarget);
      }

      let needsReorder = false;

      this._dims.forEach(dim => {
        if (this._hideDimensions.includes(dim)) {
          if (dim.isShow) {
            dim.hide();
            needsReorder = true;
          }
        } else {
          if (!dim.isShow) {
            dim.show();
            needsReorder = true;
          }
        }
      });

      if (needsReorder) {
        this._reorderDims();
      }

      const perpendicular = curve.getDirection().normalized().vecRotate(CONST.PI_2).multiplied(1.1 * this._wall.width * 0.7);
      this._activeCutLineItem!.path = new Line2d(closestPoint.added(perpendicular), closestPoint.subtracted(perpendicular));
      this._activeCutLineItem!.show();

      this._pos = closestPoint;
    } else {
      this._reset();
    }
  }

  private _reset(): void {
    this._pos = undefined;
    this._activeCutLineItem?.hide();
    this._elements.forEach(element => element.hide());
  }

  private _cutWall(): void {
    if (!this._pos || !this._isCutValid()) return;

    const commandManager = this._app!.cmdManager;
    const params: CutWallParams = {
      position: this._pos,
      selectNewWall: this._activeGizmo === this._leftEndDimension || this._activeGizmo === this._rightEndDimension
    };

    commandManager.receive('gizmo.cutwall', params);
    this.refreshWallData();
  }

  public getParam(): CutWallParams | undefined {
    if (!this._isCutValid()) return undefined;

    return {
      position: this._pos!,
      selectNewWall: this._activeGizmo === this._leftEndDimension || this._activeGizmo === this._rightEndDimension
    };
  }

  private _isCutValid(): boolean {
    if (!this._pos) return false;

    const param = this._wall.curve.getParamAt(this._pos);
    const boundaries = [
      this._leftPts[0],
      this._leftPts[this._leftPts.length - 1],
      this._rightPts[0],
      this._rightPts[this._rightPts.length - 1]
    ];

    return boundaries.every(boundary => !MathUtil.isNearlyEqual(param, boundary));
  }

  public refreshWallData(): void {
    this._reset();
    this._initData();
  }

  public onCleanup(): void {
    this._reset();

    this._elements.forEach(element => element.dispose());

    this.context.application.getActive2DView().gizmoManager.getTypeGizmo(WallDimension).forEach(gizmo => {
      gizmo.setVisible(true);
    });

    super.onCleanup();
  }
}