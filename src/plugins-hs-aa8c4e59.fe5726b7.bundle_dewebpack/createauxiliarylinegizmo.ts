import { Line2d, Vector2 } from './geometry';
import { HSCore } from './core';
import { PathItem, EndPointItem, InputBoxComp, InputBoxType, EndPointType } from './items';
import { SnapHelper, SnapType } from './snap';
import { getUnitParam } from './units';
import { HSApp } from './app';
import { AuxiAttr, SnapAttr, AuxiEndPointAttr } from './attributes';

interface SnapResult {
  offset: Vector2;
  type: SnapType;
  curve?: Line2d;
}

interface MouseEventWithClient {
  clientX: number;
  clientY: number;
  button: number;
  ctrlKey: boolean;
}

interface InputBoxOptions {
  type: InputBoxType;
  onEnter: (value: number) => void;
}

interface SnapHelperOptions {
  prePointOrthoSnap: boolean;
}

const SNAP_TYPES: SnapType[] = [
  SnapType.Border,
  SnapType.ArcLength,
  SnapType.ArcHeight,
  SnapType.AuxiliaryLine,
  SnapType.MidPoint
];

export class CreateAuxiliaryLineGizmo extends HSApp.View.SVG.Temp {
  public signal: HSCore.Util.Signal;

  private _lineItem: PathItem;
  private _pos?: Vector2;
  private _start?: Vector2;
  private _posItem: EndPointItem;
  private _startItem: EndPointItem;
  private _snapVector?: Vector2;
  private _specialVector?: Vector2;
  private _specialPathItem: PathItem;
  private _inputBox: InputBoxComp;
  private _snapHelper: SnapHelper;

  constructor(context: unknown, param1: unknown, param2: unknown) {
    super(context, param1, param2, false);

    this.signal = new HSCore.Util.Signal();

    this._snapHelper = new SnapHelper(context, {
      prePointOrthoSnap: true
    });
    this._snapHelper.dimensionVisible = false;
    this._snapHelper.refreshForAuxiliaryLine();

    this._lineItem = new PathItem(context).attr(AuxiAttr);
    this._lineItem.show();

    this._specialPathItem = new PathItem(context).attr(SnapAttr);
    this._specialPathItem.hide();

    this._inputBox = new InputBoxComp(context, {
      type: InputBoxType.Number,
      onEnter: (value: number) => {
        if (!this._start || !this._pos || !this._specialVector) return;

        const projectedPoint = new Line2d(
          this._start,
          this._specialVector,
          [0, 1]
        ).getProjectedPtBy(this._pos);

        const offset = this._pos.subtracted(projectedPoint);
        const distance = value / getUnitParam();
        this._pos = projectedPoint.added(offset.normalize().multiply(distance));

        this._clickHandler();
      }
    });
    this._inputBox.hide();

    this._startItem = new EndPointItem(context, AuxiEndPointAttr);
    this._posItem = new EndPointItem(context, AuxiEndPointAttr);
    this._posItem.show();

    this.signalHook.listen(
      context.hscanvas.signalViewBoxChanged,
      this._onViewBoxChanged
    );
  }

  private get _elements(): Array<PathItem | EndPointItem | InputBoxComp> {
    return [
      this._lineItem,
      this._specialPathItem,
      this._inputBox,
      this._startItem,
      this._posItem
    ];
  }

  public onDraw(): void {
    if (!this._pos) return;

    let displayPosition = this._pos;

    if (this._specialVector) {
      const extendedLine = new Line2d(
        this._pos,
        this._specialVector,
        [0, 1]
      ).extendDouble(100);

      this._specialPathItem.path = extendedLine;
      this._specialPathItem.show();

      if (this._start) {
        displayPosition = extendedLine.getProjectedPtBy(this._start);

        this._posItem.updateData({
          position: displayPosition
        });

        const midPoint = this._start.added(displayPosition).multiply(0.5);
        const distance = this._start.distanceTo(displayPosition) * getUnitParam();

        this._inputBox.updateData({
          position: midPoint,
          value: distance,
          focus: true
        });

        this._inputBox.show();
      }
    } else {
      this._specialPathItem.hide();
      this._inputBox.hide();
    }

    this._lineItem.path = this._start
      ? new Line2d(this._start, displayPosition)
      : undefined;
  }

  public mouseMoveHandler(event: MouseEventWithClient): void {
    const screenPoint: [number, number] = [event.clientX, event.clientY];
    const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel(
      screenPoint,
      this.context
    );
    let currentPos = new Vector2(modelPoint);

    this._snapHelper.hide();

    let snapOffset: Vector2 | undefined;
    let snapType: SnapType | undefined;
    let snapDirection: Vector2 | undefined;

    if (!event.ctrlKey && !this._specialVector) {
      const structureSnap = this._snapHelper.snapStructurePoints(currentPos);
      if (structureSnap) {
        snapOffset = structureSnap.offset;
        snapType = structureSnap.type;
      }

      if (!snapOffset) {
        this._snapHelper.refreshPointOrthoData(currentPos);
        const pointIndex = this._start ? 1 : 0;
        const snapResult = this._snapHelper.snap(
          currentPos,
          pointIndex,
          this._start
        );

        if (snapResult) {
          snapOffset = snapResult.offset;
          snapType = snapResult.type;

          if (snapResult.curve?.isLine2d()) {
            snapDirection = snapResult.curve.getDirection();
          }
        }
      }

      if (snapOffset) {
        currentPos.add(snapOffset);
      }
    }

    this._pos = currentPos;
    this._snapVector = SNAP_TYPES.includes(snapType!) ? snapDirection : undefined;

    this._posItem.updateData({
      position: currentPos,
      hoverOn: !!snapType,
      type: snapType ? EndPointType.Snap : EndPointType.Static
    });
    this._posItem.show();

    const isOverlapping =
      snapType &&
      this._start &&
      this._start.x === currentPos.x &&
      this._start.y === currentPos.y &&
      !this._specialVector;

    if (isOverlapping) {
      this._lineItem.attr(SnapAttr);
    } else {
      this._lineItem.attr(AuxiAttr);
    }

    if (snapType && snapType !== SnapType.Undefined) {
      const tooltipKey = `auxiliary_contextmenu_${snapType}`;
      const tooltipText = ResourceManager.getString(tooltipKey);
      updateMouseTips(
        tooltipText,
        { x: event.clientX, y: event.clientY + 25 },
        {
          background: 'rgba(60, 60, 60, 0.85)',
          txtColor: 'rgba(255, 255, 255, 1)'
        }
      );
    } else {
      updateMouseTips();
    }

    this.setDirty();
  }

  public mouseClickHandler(event: MouseEventWithClient): void {
    if (event.button === 2) {
      this._back();
    } else if (this._pos && event.button === 0) {
      this._clickHandler();
    }
  }

  public onCleanup(): void {
    this._elements.forEach(element => element.dispose());
    this._snapHelper.dispose();
    this.signalHook.unlistenAll();
    updateMouseTips();
    super.onCleanup();
  }

  private _clickHandler(): void {
    if (!this._start) {
      this._start = this._pos;
      this._specialVector = this._snapVector ?? undefined;
      this._snapHelper.prePoint = this._pos;

      this._startItem.updateData({
        position: this._pos!
      });
      this._startItem.show();

      this._posItem.updateData({
        position: this._pos!,
        type: EndPointType.Static
      });

      return;
    }

    if (!this._start.equals(this._pos!)) {
      const app = HSApp.App.getApp();
      const transManager = app.transManager;

      let line: Line2d | undefined;
      if (this._start) {
        line = this._specialVector
          ? new Line2d(this._pos!, this._specialVector, [0, 1])
          : new Line2d(this._start, this._pos!);
      }

      const request = transManager.createRequest(
        HSFPConstants.RequestType.CreateAuxiliaryLine,
        [line]
      );
      transManager.commit(request);

      this._snapHelper.refreshAuxiliaryLineData();
      this._back();
    }
  }

  private _onViewBoxChanged = (): void => {
    if (this._start) {
      this._startItem.updateData({
        position: this._start
      });
    }

    if (this._pos) {
      this._posItem.updateData({
        position: this._pos
      });
    }

    this.setDirty();
  };

  private _back(): void {
    if (this._start) {
      this._snapHelper.prePoint = undefined;
      this._start = undefined;
      this._specialVector = undefined;

      this._posItem.hide();
      this._startItem.hide();
      this._specialPathItem.hide();
      this._snapHelper.hide();

      this.setDirty();
    } else {
      this.cmd.mgr?.cancel();
    }
  }
}