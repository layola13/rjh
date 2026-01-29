import { Vector2, OffsetCurve2d, Line2d, Arc2d } from './geometry';
import { Dimension, InputBoxType, PathItem } from './ui';
import { WallDimension } from './gizmos';
import { getArcDimensionLines, getRadianArc } from './dimensionUtils';
import { SnapHelper } from './snapHelper';
import { DashAttr } from './attributes';
import { getConstraintLine } from './constraintUtils';

interface Wall {
  id: string;
  curve: Line2d | Arc2d;
  width: number;
  positionCurve: Arc2d | Line2d;
  getUniqueParent(): FloorPlan;
}

interface FloorPlan {
  walls: Record<string, Wall>;
}

interface MoveWallInitData {
  wall: Wall;
}

interface Position {
  x: number;
  y: number;
}

interface ParallelWallInfo {
  left: number;
  right: number;
  y: number;
  width: number;
}

interface ReferInfo {
  angle: number;
  parallels: ParallelWallInfo[];
}

interface DimensionChangeEvent {
  data: {
    offset?: Vector2;
    keyCode?: number;
  };
}

interface MouseEventData {
  ctrlKey: boolean;
  type: string;
}

const EPSILON = 0.001;

export class MoveWall extends HSApp.View.SVG.Temp {
  private _beginPosition: Position;
  private _wall: Wall;
  private _wallDims: Array<Dimension | PathItem> = [];
  private _referInfo: ReferInfo;
  private _referDims: Dimension[];
  private _offset: Vector2 = Vector2.O();
  private _snapHelper: SnapHelper;
  private _activeDimension?: Dimension;

  constructor(
    context: unknown,
    cmdManager: unknown,
    initData: MoveWallInitData,
    position: [number, number]
  ) {
    super(context, cmdManager, initData);

    context.application
      .getActive2DView()
      .gizmoManager.getTypeGizmo(WallDimension)
      .forEach((gizmo: { setVisible: (visible: boolean) => void }) => gizmo.setVisible(false));

    this._wall = initData.wall;
    this._beginPosition = {
      x: position[0],
      y: position[1],
    };

    this._updateWallDimension();

    this._referDims = [0, 0].map(() => 
      new Dimension(context, { type: InputBoxType.Number }, { offset: 0, offsetByScreen: true })
    );

    this._referInfo = {
      angle: 0,
      parallels: [],
    };

    if (this._wall.curve.isLine2d()) {
      this._initReferInfo();
    }

    this._initSnapHelper(context);
  }

  private _updateWallDimension(): void {
    const dimensionPaths: Array<Line2d | Arc2d | undefined> = [];

    if (this._wall.curve.isArc2d()) {
      const arcDimLines = getArcDimensionLines(this._wall.positionCurve);
      dimensionPaths.push(arcDimLines.length, arcDimLines.height);

      if (!this._wallDims.length) {
        dimensionPaths.forEach(() => {
          const dim = new Dimension(
            this.context,
            { type: InputBoxType.Number },
            { offset: -0.2, offsetByScreen: false }
          );
          this._wallDims.push(dim);
        });
        this._wallDims.forEach(dim => dim.show());
      }
    } else if (this._wall.curve.isLine2d()) {
      const offsetCurve = OffsetCurve2d.makeByOffset(this._wall.curve, -this._wall.width / 2);
      dimensionPaths.push(offsetCurve);

      const radianArc = getRadianArc(offsetCurve);
      dimensionPaths.push(radianArc);

      if (radianArc) {
        dimensionPaths.push(new Line2d(radianArc.getCenter(), radianArc.getStartPt()));
      } else {
        dimensionPaths.push(undefined);
      }

      if (!this._wallDims.length) {
        const lengthDim = new Dimension(
          this.context,
          { type: InputBoxType.Number },
          { offset: -0.2, offsetByScreen: false }
        );
        this._wallDims.push(lengthDim);

        const angleDim = new Dimension(this.context, { type: InputBoxType.Angle });
        this._wallDims.push(angleDim);

        const pathItem = new PathItem(this.context).attr(DashAttr);
        this._wallDims.push(pathItem);

        this._wallDims.forEach(dim => dim.show());
      }
    }

    this._wallDims.forEach((dim, index) => {
      if (dimensionPaths[index]) {
        dim.path = dimensionPaths[index];
        dim.show();
      } else {
        dim.hide();
      }
    });
  }

  onDraw(): void {
    const referenceLines = this._calReferLines();
    this._referDims.forEach((dim, index) => {
      if (referenceLines[index]) {
        dim.updateData({ curve: referenceLines[index] });
        dim.show();
      } else {
        dim.hide();
      }
    });
    this._updateWallDimension();
  }

  private _initReferInfo(): void {
    const wallCurve = this._wall.curve;
    if (!wallCurve.isLine2d()) return;

    const startPt = wallCurve.getStartPt();
    const endPt = wallCurve.getEndPt();
    const angle = wallCurve.getDirection().angle(Vector2.X());
    const walls = this._wall.getUniqueParent().walls;

    Object.keys(walls).forEach(wallId => {
      const otherWall = walls[wallId];
      const otherCurve = otherWall.curve;
      const otherWidth = otherWall.width;

      if (
        wallId !== this._wall.id &&
        otherCurve.isLine2d() &&
        HSCore.Util.Math.isParallel(
          otherCurve.getStartPt(),
          otherCurve.getEndPt(),
          startPt,
          endPt
        )
      ) {
        const rotatedPoints = [otherCurve.getStartPt(), otherCurve.getEndPt()].map(pt =>
          pt.rotated(Vector2.O(), -angle)
        );
        const [pt1, pt2] = rotatedPoints;
        const left = Math.min(pt1.x, pt2.x);
        const right = Math.max(pt1.x, pt2.x);

        this._referInfo.parallels.push({
          left,
          right,
          y: pt1.y,
          width: otherWidth,
        });
      }
    });

    this._referInfo.angle = angle;
  }

  private _calReferLines(): Line2d[] {
    const { parallels, angle } = this._referInfo;
    if (!parallels.length) return [];

    const rotatedWallPoints = [this._wall.curve.getStartPt(), this._wall.curve.getEndPt()].map(
      pt => pt.rotated(Vector2.O(), -angle)
    );
    const [wallPt1, wallPt2] = rotatedWallPoints;
    const currentWall = {
      left: Math.min(wallPt1.x, wallPt2.x),
      right: Math.max(wallPt1.x, wallPt2.x),
      y: wallPt1.y,
      width: this._wall.width,
    };

    const overlaps = (parallel: ParallelWallInfo): boolean =>
      currentWall.right > parallel.left + EPSILON &&
      currentWall.left < parallel.right - EPSILON;

    const sortedParallels = parallels
      .filter(overlaps)
      .sort((a, b) => {
        const aOverlaps = overlaps(a);
        const bOverlaps = overlaps(b);
        if (aOverlaps && !bOverlaps) return -1;
        if (!aOverlaps && bOverlaps) return 1;
        return Math.abs(a.y - currentWall.y) - Math.abs(b.y - currentWall.y);
      });

    const above = sortedParallels.filter(p => p.y > currentWall.y)[0];
    const below = sortedParallels.filter(p => p.y < currentWall.y)[0];

    return [above, below]
      .filter(Boolean)
      .map(parallel => {
        let refY = parallel.y;
        let wallY = currentWall.y;

        if (refY > wallY + EPSILON) {
          refY -= parallel.width / 2;
          wallY += currentWall.width / 2;
        } else if (refY < wallY - EPSILON) {
          refY += parallel.width / 2;
          wallY -= currentWall.width / 2;
        }

        const xCoords = [
          currentWall.left,
          currentWall.right,
          parallel.left,
          parallel.right,
        ].sort((a, b) => a - b);
        const midX = (xCoords[1] + xCoords[2]) / 2;

        const [start, end] = [new Vector2(midX, refY), new Vector2(midX, wallY)].map(pt =>
          pt.rotate(Vector2.O(), angle)
        );

        return new Line2d(start, end);
      });
  }

  onMouseMove(event: MouseEventData, screenX: number, screenY: number): void {
    const shouldSnap = !event.ctrlKey;
    const [modelX, modelY] = HSApp.View.SVG.Util.ScreenPointToModel(
      [screenX, screenY],
      this.context
    );

    this._offset = new Vector2({
      x: modelX - this._beginPosition.x,
      y: modelY - this._beginPosition.y,
    });

    this.cmdManager.receive(`gizmo.${event.type}`, {
      offset: this._offset,
      event,
    });

    this._snapHelper.hide();

    if (shouldSnap) {
      const snapOffset = this._snapHelper.snapByWall(this._wall);
      if (snapOffset) {
        this.cmdManager.receive(`gizmo.${event.type}`, {
          offset: snapOffset.added(this._offset),
          event,
        });

        if (!this._activeDimension?.supportActive()) {
          this._focusDimension(
            Dimension.getNextDimension(this._snapHelper.dimensions, this._activeDimension)
          );
        }
      }
    }

    this.draw();
  }

  onMouseUp(event: MouseEventData, screenX: number, screenY: number): void {
    const [modelX, modelY] = HSApp.View.SVG.Util.ScreenPointToModel(
      [screenX, screenY],
      this.context
    );

    this.cmdManager.receive(`gizmo.${event.type}`, {
      position: { x: modelX, y: modelY },
      undefined: undefined,
      event,
    });
  }

  onCleanup(): void {
    super.onCleanup();

    [...this._wallDims, ...this._referDims].forEach(dim => dim.dispose());

    this.context.application
      .getActive2DView()
      .gizmoManager.getTypeGizmo(WallDimension)
      .forEach((gizmo: { setVisible: (visible: boolean) => void }) => gizmo.setVisible(true));

    this._snapHelper.dispose();
  }

  get cmdManager(): unknown {
    return HSApp.App.getApp().cmdManager;
  }

  get dimensions(): Dimension[] {
    return this._snapHelper.dimensions;
  }

  private _initSnapHelper(context: unknown): void {
    this._snapHelper = new SnapHelper(context);
    this._snapHelper.signal.listen(this._onDimensionChange);

    let constraintDirection: Vector2 | undefined;

    if (
      getConstraintLine(this._wall, HSCore.Model.JointPointType.from) ||
      getConstraintLine(this._wall, HSCore.Model.JointPointType.to)
    ) {
      if (this._wall.curve instanceof Arc2d) return;
      if (this._wall.curve instanceof Line2d) {
        constraintDirection = this._wall.curve.getDirection();
      }
    }

    const floorPlan = this._wall.getUniqueParent();
    const otherWalls = Object.values(floorPlan.walls).filter(wall => wall !== this._wall);

    this._snapHelper.refreshForMoveWall(otherWalls, this._wall, constraintDirection);
  }

  private _focusDimension(dimension?: Dimension): void {
    this._activeDimension = dimension;
    this.dimensions.forEach(dim => {
      if (dim !== this._activeDimension) {
        dim.blur();
      }
    });
    this._activeDimension?.focus();
  }

  private _onDimensionChange = (event: DimensionChangeEvent): void => {
    const { offset, keyCode } = event.data;
    const hasOffset = offset !== undefined;

    if (offset) {
      this.cmdManager.receive('gizmo.mousemove', {
        offset: offset.added(this._offset),
      });
    }

    if (keyCode === HSApp.Util.Keyboard.KeyCodes.ENTER) {
      if (hasOffset) {
        this.cmdManager.receive('gizmo.mouseup', {});
      }
    } else if (keyCode === HSApp.Util.Keyboard.KeyCodes.TAB) {
      this._focusDimension(
        Dimension.getNextDimension(this._snapHelper.dimensions, this._activeDimension)
      );
    }
  };
}