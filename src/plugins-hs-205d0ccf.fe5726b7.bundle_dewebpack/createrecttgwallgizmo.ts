import { HSCore } from '../core';
import { HSApp } from '../app';
import { HSPaveSDK } from '../pave-sdk';
import { Loop, Box2, Line2d, Matrix3, Vector2, MathUtil } from '../geometry';
import { PathItem, Dimension, InputBoxType, DimensionConfig } from '../svg-elements';
import { NormalWallAttr } from '../constants';
import { getUnitParam } from '../utils';

interface PointData {
  start: Vector2;
  end: Vector2;
}

interface SignalPayload {
  point?: Vector2;
  keyCode: number;
}

interface OffsetPolygon {
  outer: Line2d[];
  inner?: Line2d[];
}

interface CreateRectTgWallGizmoConfig {
  onKeyDown?: (event: KeyboardEvent) => void;
}

export class CreateRectTgWallGizmo extends HSApp.View.SVG.Temp {
  public signal: HSCore.Util.Signal<SignalPayload>;
  public topDimension: Dimension;
  public leftDimension: Dimension;

  private _pointData?: PointData;
  private _roomItem: PathItem;

  constructor(
    context: HSApp.View.SVG.Context,
    parent: SVGElement,
    config: CreateRectTgWallGizmoConfig
  ) {
    super(context, parent, config, false);

    this.signal = new HSCore.Util.Signal<SignalPayload>();
    this._roomItem = new PathItem(context).attr(NormalWallAttr);

    this.topDimension = new Dimension(context, {
      type: InputBoxType.Number,
      editable: true,
      onEnter: this._onTopDimensionEnter,
      onTab: this._onTopDimensionTab,
      onKeyDown: config.onKeyDown
    });

    this.leftDimension = new Dimension(context, {
      type: InputBoxType.Number,
      editable: true,
      onEnter: this._onLeftDimensionEnter,
      onTab: this._onLeftDimensionTab,
      onKeyDown: config.onKeyDown
    });

    this.signalHook.listen(
      this.context.hscanvas.signalViewBoxChanged,
      this._onViewBoxChanged
    );
  }

  get dimensions(): Dimension[] {
    return [this.topDimension, this.leftDimension];
  }

  set pointData(value: PointData | undefined) {
    this._pointData = value;
    this.setDirty();
  }

  private get setting() {
    return appSettingsUtil;
  }

  private get _wallMode(): HSCore.Model.WallMode {
    return this.setting.wallMode;
  }

  private get _wallWidth(): number {
    return this.setting.wallWidth;
  }

  private get _elements(): Array<PathItem | Dimension> {
    return [this._roomItem, ...this.dimensions];
  }

  private _onViewBoxChanged = (): void => {
    this.setDirty();
  };

  private _onTopDimensionTab = (value: number, isValid: boolean): void => {
    this.signal.dispatch({
      point: isValid ? this._getEndPoint(value, this.topDimension) : undefined,
      keyCode: HSApp.Util.Keyboard.KeyCodes.TAB
    });
  };

  private _onTopDimensionEnter = (value: number, isValid: boolean): void => {
    this.signal.dispatch({
      point: isValid ? this._getEndPoint(value, this.topDimension) : undefined,
      keyCode: HSApp.Util.Keyboard.KeyCodes.ENTER
    });
  };

  private _onLeftDimensionTab = (value: number, isValid: boolean): void => {
    this.signal.dispatch({
      point: isValid ? this._getEndPoint(value, this.leftDimension) : undefined,
      keyCode: HSApp.Util.Keyboard.KeyCodes.TAB
    });
  };

  private _onLeftDimensionEnter = (value: number, isValid: boolean): void => {
    this.signal.dispatch({
      point: isValid ? this._getEndPoint(value, this.leftDimension) : undefined,
      keyCode: HSApp.Util.Keyboard.KeyCodes.ENTER
    });
  };

  private _getOffsetCurves(offset?: number, endPoint?: Vector2): Line2d[] {
    if (!this._pointData) {
      return [];
    }

    const { start, end } = this._pointData;
    const curves = Loop.createByRectangle(start, endPoint ?? end).getAllCurves();

    if (offset === undefined) {
      return curves;
    }

    const clipperService = HSPaveSDK.ServiceManager.getClipperService();
    const offsetResult = clipperService.offset([{ outer: curves }], offset);

    return offsetResult.length === 1 ? offsetResult[0].outer : [];
  }

  public getModeCurves(mode: HSCore.Model.WallMode, endPoint?: Vector2): Line2d[] {
    if (this._wallMode === mode) {
      return this._getOffsetCurves(undefined, endPoint);
    }

    const halfWidth = this._wallWidth / 2;

    if (this._wallMode === HSCore.Model.WallMode.Inner) {
      if (mode === HSCore.Model.WallMode.Middle) {
        return this._getOffsetCurves(halfWidth, endPoint);
      }
      if (mode === HSCore.Model.WallMode.Outer) {
        return this._getOffsetCurves(this._wallWidth, endPoint);
      }
    } else if (this._wallMode === HSCore.Model.WallMode.Middle) {
      if (mode === HSCore.Model.WallMode.Inner) {
        return this._getOffsetCurves(-halfWidth, endPoint);
      }
      if (mode === HSCore.Model.WallMode.Outer) {
        return this._getOffsetCurves(halfWidth, endPoint);
      }
    } else if (this._wallMode === HSCore.Model.WallMode.Outer) {
      if (mode === HSCore.Model.WallMode.Inner) {
        return this._getOffsetCurves(-this._wallWidth, endPoint);
      }
      if (mode === HSCore.Model.WallMode.Middle) {
        return this._getOffsetCurves(-halfWidth, endPoint);
      }
    }

    return [];
  }

  public onDraw(): void {
    const isVisible = this.visible;
    const pointData = this._pointData;

    if (isVisible && pointData) {
      this._handleRoomItem();

      const boundingBox = new Box2();
      boundingBox.expandByPoint(pointData.start, pointData.end);
      this._handleDimensions(boundingBox);
    } else {
      this._elements.forEach(element => element.hide());
    }
  }

  public onCleanup(): void {
    this._elements.forEach(element => element.dispose());
    this.signal.dispose();
    super.onCleanup();
  }

  private _handleRoomItem(): void {
    const outerCurves = this.getModeCurves(HSCore.Model.WallMode.Outer);

    if (outerCurves.length === 0) {
      this._roomItem.hide();
      return;
    }

    const paths: Line2d[][] = [outerCurves];
    const innerCurves = this.getModeCurves(HSCore.Model.WallMode.Inner);

    if (innerCurves.length > 0) {
      paths.push(
        innerCurves
          .map(curve => curve.reversed())
          .reverse()
      );
    }

    this._roomItem.path = paths;
    this._roomItem.show();
  }

  private _handleDimensions(boundingBox: Box2): void {
    const { min, max } = boundingBox;
    const EPSILON = 0.001;

    const topLine = new Line2d({ x: min.x, y: max.y }, max);
    if (MathUtil.isNearlyBiggerOrEqual(topLine.getLength(), EPSILON)) {
      this.topDimension.updateData({ curve: topLine });
      this.topDimension.show();
    } else {
      this.topDimension.hide();
    }

    const leftLine = new Line2d(min, { x: min.x, y: max.y });
    if (MathUtil.isNearlyBiggerOrEqual(leftLine.getLength(), EPSILON)) {
      this.leftDimension.updateData({ curve: leftLine });
      this.leftDimension.show();
    } else {
      this.leftDimension.hide();
    }
  }

  private _getEndPoint(value: number, dimension: Dimension): Vector2 {
    if (!this._pointData) {
      throw new Error('Point data is not defined');
    }

    const { start, end } = this._pointData;
    const delta = end.subtracted(start);
    const unitParam = getUnitParam();

    let transformMatrix: Matrix3;

    if (dimension === this.topDimension) {
      transformMatrix = Matrix3.makeScale(Vector2.O(), {
        x: value / unitParam / Math.abs(delta.x),
        y: 1
      });
    } else if (dimension === this.leftDimension) {
      transformMatrix = Matrix3.makeScale(Vector2.O(), {
        x: 1,
        y: value / unitParam / Math.abs(delta.y)
      });
    } else {
      return end;
    }

    delta.transform(transformMatrix);
    return start.added(delta);
  }
}