import { Vector2, Line2d, Arc2d, CONST } from './geometry';
import { Dimension, InputBoxType, PathItem } from './ui';
import { SnapHelper, SnapType } from './snap';
import { getArcDimensionLines, getRadianArc } from './wall-utils';
import { DashAttr } from './attributes';

interface MovePointOptions {
  wall: Wall;
  moveBeginPosition: Vector2 | [number, number];
  mouseBeginPosition: Vector2 | [number, number];
  pointType: JointPointType;
}

enum JointPointType {
  from = 'from',
  to = 'to',
  mid = 'mid'
}

interface Wall {
  curve: Line2d | Arc2d;
  positionCurve: Line2d | Arc2d;
  width: number;
  fromPoint: [number, number];
  toPoint: [number, number];
  midPoint: [number, number];
  getUniqueParent(): WallContainer;
}

interface WallContainer {
  walls: Record<string, Wall>;
}

interface DimensionChangeEvent {
  data: {
    point?: Vector2;
    keyCode?: number;
  };
}

interface CommandManager {
  receive(command: string, data: Record<string, unknown>): void;
}

interface Context {
  // SVG rendering context
}

interface App {
  cmdManager: CommandManager;
}

declare const HSApp: {
  View: {
    SVG: {
      Temp: new (context: Context, manager: unknown, options: unknown) => any;
      Util: {
        ScreenPointToModel(point: [number, number], context: Context): [number, number];
      };
    };
  };
  App: {
    getApp(): App;
  };
  Util: {
    Keyboard: {
      KeyCodes: {
        ENTER: number;
        TAB: number;
      };
    };
  };
};

declare const HSCore: {
  Util: {
    TgWall: {
      makeByOffseted(curve: Line2d | Arc2d, offset: number): Line2d;
    };
  };
  Model: {
    JointPointType: typeof JointPointType;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare function updateMouseTips(
  text?: string,
  position?: { x: number; y: number },
  style?: { background: string; txtColor: string }
): void;

export class MovePoint extends HSApp.View.SVG.Temp {
  private _wall: Wall;
  private _wallDims: Array<Dimension | PathItem> = [];
  private _mouseBeginPosition: Vector2;
  private _modelBeginPosition: Vector2;
  private _pointType: JointPointType;
  private _snapHelper: SnapHelper;
  private _offset: Vector2 = Vector2.O();
  private _activeDimension?: Dimension;
  private _rotateCenter: Vector2 = Vector2.O();

  constructor(context: Context, manager: unknown, options: MovePointOptions) {
    super(context, manager, options);

    this._wall = options.wall;
    this._modelBeginPosition = new Vector2(options.moveBeginPosition);
    this._mouseBeginPosition = new Vector2(options.mouseBeginPosition);
    this._pointType = options.pointType;

    this._updateWallDimension();
    this._initSnapHelper(context);
  }

  private _onDimensionChange = (event: DimensionChangeEvent): void => {
    const { point, keyCode } = event.data;
    const hasPoint = point !== undefined;

    if (point) {
      const originPoint = this._getOriginPoint();
      this.cmdManager.receive('gizmo.mousemove', {
        offset: point.subtracted(originPoint).added(this._offset)
      });
    }

    if (keyCode === HSApp.Util.Keyboard.KeyCodes.ENTER) {
      if (hasPoint) {
        this.cmdManager.receive('gizmo.mouseup', {});
      }
    } else if (keyCode === HSApp.Util.Keyboard.KeyCodes.TAB) {
      this._focusDimension(
        Dimension.getNextDimension(this._snapHelper.dimensions, this._activeDimension)
      );
    }
  };

  private _updateWallDimension(): void {
    const dimensionPaths: Array<Line2d | Arc2d | undefined> = [];

    if (this._wall.curve.isArc2d()) {
      const arcDimensions = getArcDimensionLines(this._wall.positionCurve);
      dimensionPaths.push(arcDimensions.length, arcDimensions.height);

      if (!this._wallDims.length) {
        dimensionPaths.forEach(() => {
          const dimension = new Dimension(
            this.context,
            { type: InputBoxType.Number },
            { offset: -0.2, offsetByScreen: false }
          );
          this._wallDims.push(dimension);
        });

        this._wallDims.forEach((dim) => dim.show());
      }
    } else if (this._wall.curve.isLine2d()) {
      const offsetWall = HSCore.Util.TgWall.makeByOffseted(
        this._wall.curve,
        -this._wall.width / 2
      );
      dimensionPaths.push(offsetWall);

      const radianArc = getRadianArc(offsetWall);
      dimensionPaths.push(radianArc);

      if (radianArc) {
        dimensionPaths.push(new Line2d(radianArc.getCenter(), radianArc.getStartPt()));
      } else {
        dimensionPaths.push(undefined);
      }

      if (!this._wallDims.length) {
        const lengthDimension = new Dimension(
          this.context,
          { type: InputBoxType.Number },
          { offset: -0.2, offsetByScreen: false }
        );
        this._wallDims.push(lengthDimension);

        const angleDimension = new Dimension(
          this.context,
          { type: InputBoxType.Angle }
        );
        this._wallDims.push(angleDimension);

        const pathItem = new PathItem(this.context).attr(DashAttr);
        this._wallDims.push(pathItem);

        this._wallDims.forEach((dim) => dim.show());
      }
    }

    this._wallDims.forEach((dim, index) => {
      if (dimensionPaths[index]) {
        (dim as any).path = dimensionPaths[index];
        dim.show();
      } else {
        dim.hide();
      }
    });
  }

  onDraw(): void {
    this._updateWallDimension();
  }

  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void {
    const [modelX, modelY] = HSApp.View.SVG.Util.ScreenPointToModel(
      [screenX, screenY],
      this.context
    );

    this._offset = new Vector2(
      modelX - this._mouseBeginPosition.x,
      modelY - this._mouseBeginPosition.y
    );

    this.cmdManager.receive(`gizmo.${event.type}`, {
      offset: this._offset,
      event
    });

    this._snapHelper.hide();

    if (!event.ctrlKey) {
      const originPoint = this._getOriginPoint();
      const snapResult = this._snapHelper.snap(originPoint, 1, this._rotateCenter);

      if (snapResult?.offset) {
        const { offset: snapOffset, type: snapType } = snapResult;
        snapOffset.add(this._offset);

        this.cmdManager.receive(`gizmo.${event.type}`, {
          offset: snapOffset,
          event,
          snap: true
        });

        if (!this._activeDimension?.supportActive()) {
          this._focusDimension(
            Dimension.getNextDimension(this._snapHelper.dimensions, this._activeDimension)
          );
        }

        if (snapType === SnapType.FootPoint) {
          const tooltipText = ResourceManager.getString(
            `auxiliary_contextmenu_${SnapType.FootPoint}`
          );
          updateMouseTips(
            tooltipText,
            { x: event.clientX, y: event.clientY + 25 },
            { background: 'rgba(60, 60, 60, 0.85)', txtColor: 'rgba(255, 255, 255, 1)' }
          );
        } else {
          updateMouseTips();
        }
      }
    }

    this.draw();
  }

  onMouseUp(event: MouseEvent, _screenX: number, _screenY: number): void {
    this.cmdManager.receive(`gizmo.${event.type}`, { event });
  }

  onCleanup(): void {
    super.onCleanup?.();
    this._wallDims.forEach((dim) => dim.dispose());
    this._snapHelper.dispose();
    updateMouseTips();
  }

  get cmdManager(): CommandManager {
    return HSApp.App.getApp().cmdManager;
  }

  get dimensions(): Dimension[] {
    return this._snapHelper.dimensions;
  }

  private _initSnapHelper(context: Context): void {
    this._snapHelper = new SnapHelper(context, { prePointOrthoSnap: true });
    this._snapHelper.signal.listen(this._onDimensionChange);

    let orthogonalDirection: Vector2 | undefined;

    if (
      this._wall.curve instanceof Arc2d &&
      ![JointPointType.from, JointPointType.to].includes(this._pointType)
    ) {
      orthogonalDirection = this._modelBeginPosition
        .subtracted(this._wall.curve.getCenter())
        .normalized()
        .vecRotate(CONST.PI_2);
    }

    const parentContainer = this._wall.getUniqueParent();
    const otherWalls = Object.values(parentContainer.walls).filter(
      (wall) => wall !== this._wall
    );

    this._snapHelper.refreshForMovePoint(
      otherWalls,
      undefined,
      this._wall,
      orthogonalDirection
    );

    this._rotateCenter =
      this._pointType === JointPointType.from
        ? new Vector2(this._wall.toPoint)
        : new Vector2(this._wall.fromPoint);

    this._snapHelper.prePoint = this._rotateCenter;
  }

  private _getOriginPoint(): Vector2 {
    if (this._pointType === JointPointType.from) {
      return new Vector2(this._wall.fromPoint);
    } else if (this._pointType === JointPointType.to) {
      return new Vector2(this._wall.toPoint);
    } else {
      return new Vector2(this._wall.midPoint);
    }
  }

  private _focusDimension(dimension?: Dimension): void {
    this._activeDimension = dimension;
    this.dimensions.forEach((dim) => {
      if (dim !== this._activeDimension) {
        dim.blur();
      }
    });
    this._activeDimension?.focus();
  }
}