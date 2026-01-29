import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { Line2d, Vector2, Arc2d, Curve2d } from './geometry';
import { PathItem, Dimension, InputBoxType } from './svg-elements';
import { WallType } from './WallType';
import { getRadianArc, getUnitParam } from './utils';

interface DimensionConfig {
  type: InputBoxType;
  editable: boolean;
  onEnter: (value: number, isValid: boolean) => void;
  onTab: (value: number, isValid: boolean) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

interface SignalPayload {
  point?: Vector2;
  keyCode: number;
}

interface WallSnapData {
  width: number;
  mode: HSCore.Model.WallMode;
}

interface DimensionUpdateData {
  curve?: Curve2d;
  offset?: number;
}

interface CreateTgWallGizmoCommand {
  wallType: WallType;
  step: number;
  onKeyDown?: (event: KeyboardEvent) => void;
}

interface AppSettingsUtil {
  wallWidth: number;
  wallMode: HSCore.Model.WallMode;
}

declare const appSettingsUtil: AppSettingsUtil;

const NormalWallAttr = {
  stroke: '#000000',
  strokeWidth: 1,
  fill: 'none'
};

const FitWallAttr = {
  stroke: '#FF0000',
  strokeWidth: 2,
  fill: 'none'
};

const DashAttr = {
  stroke: '#999999',
  strokeWidth: 1,
  strokeDasharray: '5,5',
  fill: 'none'
};

export class CreateTgWallGizmo extends HSApp.View.SVG.Temp {
  public signal: HSCore.Util.Signal<SignalPayload>;
  public lineDimension: Dimension;
  public curveDimension: Dimension;
  public archHeightDimension: Dimension;

  private _curve?: Curve2d;
  private _wallItem: PathItem;
  private _horizontalItem: PathItem;
  private _snapWidth: number = 0;
  private _snapMode?: HSCore.Model.WallMode;

  protected readonly cmd: CreateTgWallGizmoCommand;
  protected readonly context: {
    hscanvas: {
      signalViewBoxChanged: HSCore.Util.Signal<void>;
    };
  };

  constructor(
    canvas: unknown,
    context: unknown,
    cmd: CreateTgWallGizmoCommand
  ) {
    super(canvas, context, cmd, false);

    this.signal = new HSCore.Util.Signal<SignalPayload>();

    this._wallItem = new PathItem(canvas).attr(NormalWallAttr);
    this._horizontalItem = new PathItem(canvas).attr(DashAttr);

    this.lineDimension = new Dimension(canvas, {
      type: InputBoxType.Number,
      editable: true,
      onEnter: this._onLineDimensionEnter,
      onTab: this._onLineDimensionTab,
      onKeyDown: cmd.onKeyDown
    });

    this.curveDimension = new Dimension(canvas, {
      type: InputBoxType.Angle,
      editable: true,
      onEnter: this._onCurveDimensionEnter,
      onTab: this._onCurveDimensionTab,
      onKeyDown: cmd.onKeyDown
    });

    this.archHeightDimension = new Dimension(canvas, {
      type: InputBoxType.Number,
      editable: true,
      onEnter: this._onArcHeightDimensionEnter,
      onTab: this._onArcHeightDimensionTab,
      onKeyDown: cmd.onKeyDown
    });

    this.archHeightDimension.updateData({ offset: 0 });

    this.signalHook.listen(
      this.context.hscanvas.signalViewBoxChanged,
      this._onViewBoxChanged
    );
  }

  get dimensions(): Dimension[] {
    return [this.lineDimension, this.curveDimension, this.archHeightDimension];
  }

  get curve(): Curve2d | undefined {
    return this._curve;
  }

  set curve(value: Curve2d | undefined) {
    this._curve = value;
    this.setDirty();
  }

  get middleCurve(): Curve2d | undefined {
    if (!this._curve) {
      return undefined;
    }

    const clonedCurve = this._curve.clone();
    
    if (this.wallMode === HSCore.Model.WallMode.Middle) {
      return clonedCurve;
    }

    const offsetAmount = this.wallMode === HSCore.Model.WallMode.Inner
      ? -this.wallWidth / 2
      : this.wallWidth / 2;

    clonedCurve.offset(offsetAmount);
    return clonedCurve;
  }

  get wallPath(): unknown[] {
    return this.middleCurve
      ? HSCore.Util.TgWall.getWallPath(this.middleCurve, this.wallWidth)
      : [];
  }

  get setting(): AppSettingsUtil {
    return appSettingsUtil;
  }

  get wallWidth(): number {
    return this._snapWidth || this.setting.wallWidth;
  }

  get wallMode(): HSCore.Model.WallMode {
    return this._snapMode || this.setting.wallMode;
  }

  private get _wallType(): WallType {
    return this.cmd.wallType;
  }

  private get _elements(): Array<PathItem | Dimension> {
    return [this._wallItem, this._horizontalItem, ...this.dimensions];
  }

  public onDraw(): void {
    const isVisible = this.visible;
    const curve = this._curve;

    if (isVisible && curve) {
      this._handleWallItem(this.wallPath);
      this._handleHorizontalItem(curve);
      this._handleLineDimension(curve);
      this._handleCurveDimension(curve);
      this._handleArchHeightDimension(curve);
    } else {
      this._elements.forEach(element => element.hide());
    }
  }

  public onCleanup(): void {
    this._elements.forEach(element => element.dispose());
    this.signal.dispose();
    super.onCleanup();
  }

  public setWallSnapData(data: WallSnapData): void {
    const { width, mode } = data;

    if (this._snapWidth !== width) {
      this._snapWidth = width;
      const attr = width ? FitWallAttr : NormalWallAttr;
      this._wallItem.attr(attr);
    }

    if (this._snapMode !== mode) {
      this._snapMode = mode;
    }

    this.draw();
  }

  private _onViewBoxChanged = (): void => {
    this.setDirty();
  };

  private _onLineDimensionTab = (value: number, isValid: boolean): void => {
    this.signal.dispatch({
      point: isValid ? this._getLineDimChanged(value) : undefined,
      keyCode: HSApp.Util.Keyboard.KeyCodes.TAB
    });
  };

  private _onLineDimensionEnter = (value: number, isValid: boolean): void => {
    this.signal.dispatch({
      point: isValid ? this._getLineDimChanged(value) : undefined,
      keyCode: HSApp.Util.Keyboard.KeyCodes.ENTER
    });
  };

  private _onCurveDimensionTab = (value: number, isValid: boolean): void => {
    this.signal.dispatch({
      point: isValid ? this._getCurveDimChanged(value) : undefined,
      keyCode: HSApp.Util.Keyboard.KeyCodes.TAB
    });
  };

  private _onCurveDimensionEnter = (value: number, isValid: boolean): void => {
    this.signal.dispatch({
      point: isValid ? this._getCurveDimChanged(value) : undefined,
      keyCode: HSApp.Util.Keyboard.KeyCodes.ENTER
    });
  };

  private _onArcHeightDimensionTab = (value: number, isValid: boolean): void => {
    this.signal.dispatch({
      point: isValid ? this._getArchDimChanged(value) : undefined,
      keyCode: HSApp.Util.Keyboard.KeyCodes.TAB
    });
  };

  private _onArcHeightDimensionEnter = (value: number, isValid: boolean): void => {
    this.signal.dispatch({
      point: isValid ? this._getArchDimChanged(value) : undefined,
      keyCode: HSApp.Util.Keyboard.KeyCodes.ENTER
    });
  };

  private _handleWallItem(path: unknown[]): void {
    if (path.length) {
      this._wallItem.path = path;
      this._wallItem.show();
    } else {
      this._wallItem.hide();
    }
  }

  private _handleHorizontalItem(curve: Curve2d): void {
    if (curve.isLine2d() && !this._isOrtho(curve)) {
      const direction = curve.getDirection();
      const startPoint = curve.getStartPt();
      const length = curve.getLength();
      const horizontalVector = Vector2.X(length).multiplied(direction.x > 0 ? 1 : -1);
      const endPoint = startPoint.added(horizontalVector);

      this._horizontalItem.path = new Line2d(startPoint, endPoint);
      this._horizontalItem.show();
    } else {
      this._horizontalItem.hide();
    }
  }

  private _handleLineDimension(curve: Curve2d): void {
    const baseLine = curve.isLine2d()
      ? curve
      : new Line2d(curve.getStartPt(), curve.getEndPt());

    const offsetLine = baseLine.clone();
    offsetLine.offset(this.wallWidth / 2);

    this.lineDimension.updateData({ curve: offsetLine });

    const isEditable = !(
      this._wallType === WallType.ArcHeight && this.cmd.step === 2
    );
    this.lineDimension.editable = isEditable;
    this.lineDimension.show();
  }

  private _handleCurveDimension(curve: Curve2d): void {
    if (curve.isLine2d() && !this._isOrtho(curve)) {
      const radianArc = getRadianArc(curve);
      this.curveDimension.updateData({ curve: radianArc });
      this.curveDimension.show();
    } else {
      this.curveDimension.hide();
    }
  }

  private _handleArchHeightDimension(curve: Curve2d): void {
    if (curve.isArc2d()) {
      const chordLine = new Line2d(curve.getStartPt(), curve.getEndPt());
      const chordMidPoint = chordLine.getMidPt();
      const arcMidPoint = curve.getMidPt();

      this.archHeightDimension.updateData({
        curve: new Line2d(chordMidPoint, arcMidPoint)
      });

      const isEditable = !(
        this._wallType === WallType.ArcThree && this.cmd.step === 2
      );
      this.archHeightDimension.editable = isEditable;
      this.archHeightDimension.show();
    } else {
      this.archHeightDimension.hide();
    }
  }

  private _isOrtho(curve: Curve2d): boolean {
    if (!curve.isLine2d()) {
      return false;
    }

    const direction = curve.getDirection();
    return direction.isParallel(Vector2.X()) || direction.isParallel(Vector2.Y());
  }

  private _getLineDimChanged(value: number): Vector2 {
    const curve = this._curve!;
    const baseLine = new Line2d(curve.getStartPt(), curve.getEndPt());
    const newLength = value / getUnitParam();
    return this._getUpdateCurve(baseLine, newLength).getEndPt();
  }

  private _getCurveDimChanged(angleDegrees: number): Vector2 {
    const radianCurve = this.curveDimension.curve as Curve2d;
    const angleRadians = (angleDegrees * Math.PI) / 180;
    return this._getUpdateCurve(radianCurve, angleRadians).getEndPt();
  }

  private _getArchDimChanged(height: number): Vector2 {
    const curve = this._curve!;
    const chordLine = new Line2d(curve.getStartPt(), curve.getEndPt());
    const arcMidPoint = curve.getMidPt();
    const chordMidPoint = chordLine.getMidPt();

    const heightVector = arcMidPoint
      .subtracted(chordMidPoint)
      .normalized()
      .multiplied(height / getUnitParam());

    return chordMidPoint.added(heightVector);
  }

  private _getUpdateCurve(curve: Curve2d, newParameter: number): Curve2d {
    const range = curve.getRange();
    const clonedCurve = curve.clone();
    return clonedCurve.setRange(range.min, range.min + newParameter);
  }
}