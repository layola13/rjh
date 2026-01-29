import { Loop, Vector2, MathUtil } from './geometry';
import { DrawPolygonRoomSnapHelper } from './DrawPolygonRoomSnapHelper';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { NormalWallAttr } from './WallAttributes';
import Snap from 'snapsvg';

interface WallSetting {
  wallMode: number;
  wallWidth: number;
}

interface PolygonCommand {
  polygon: Vector2[];
  setting: WallSetting;
  type: string;
  onReceive(event: string, data: Record<string, unknown>): void;
}

interface ClipperRegion {
  outer: Vector2[];
}

export class CreatePolygonTgWallGizmo extends HSApp.View.SVG.Temp {
  private _pos: Vector2 | undefined;
  private _snapHelper: DrawPolygonRoomSnapHelper | undefined;
  private _layer: any;
  private _rotation: number;
  private _roomItem: HSApp.View.SVG.SketchDimension.PathItem | undefined;
  private _wallPath: Vector2[] | undefined;
  private _mouseOffset: Vector2;

  protected cmd: PolygonCommand;
  protected context: any;
  protected layer: any;

  constructor(context: any, layer: any, cmd: PolygonCommand) {
    super(context, layer, cmd);

    this._layer = HSCore.Doc.getDocManager().activeDocument.scene.activeLayer;
    
    HSApp.App.getApp().hotkey.registerHotkey(
      'esc',
      this.onESC.bind(this),
      this.cmd.type
    );

    this._snapHelper = new DrawPolygonRoomSnapHelper(context);
    this._updateSnapHelper();
    this._rotation = 0;

    const boundingBoxSize = new Loop(this.getWallPath()).getBoundingBox().getSize();
    this._mouseOffset = new Vector2(-boundingBoxSize.x / 2, boundingBoxSize.y / 2);

    this.initElements();
  }

  private get _wallMode(): number {
    return this.cmd.setting.wallMode;
  }

  private get _wallWidth(): number {
    return this.cmd.setting.wallWidth;
  }

  private get _offset(): Vector2 {
    return this._pos ? this._pos.added(this._mouseOffset) : this._mouseOffset;
  }

  /**
   * Get the wall path vertices
   * @param useOriginal - If true, return the original polygon without rotation
   */
  getWallPath(useOriginal: boolean = false): Vector2[] {
    if (useOriginal) {
      return this.cmd.polygon.map(point => point.clone());
    }

    if (!this._wallPath) {
      const polygon = this.cmd.polygon;
      this._wallPath = polygon.map(point =>
        point.clone().rotate(this._rotation, Vector2.O())
      );
    }

    return this._wallPath.map(point => point.clone());
  }

  private _updateSnapHelper(): void {
    const walls = Object.values(this._layer.walls);
    this._snapHelper?.refreshForMoveWall(walls, null, undefined);
    this._snapHelper?.refreshForOutdoorPath();
    this._snapHelper?.hide();
  }

  initElements(): void {
    this.createWallPathElement();
    this.dirtyGraph();
  }

  /**
   * Get curves for a specific wall mode with offset
   */
  getModeCurves(mode: number, useOriginal: boolean = false): Vector2[] {
    const getModeValue = (wallMode: number): number => {
      if (wallMode === HSCore.Model.WallMode.Inner) return 1;
      if (wallMode === HSCore.Model.WallMode.Middle) return 2;
      return 3;
    };

    const currentModeValue = getModeValue(this._wallMode);
    const targetModeValue = getModeValue(mode);
    const offsetDistance = 0.5 * this._wallWidth * (targetModeValue - currentModeValue);

    if (MathUtil.isNearlyEqual(offsetDistance, 0)) {
      return this.getWallPath(useOriginal);
    }

    const clipperService = HSPaveSDK.ServiceManager.getClipperService();
    const offsetRegions = clipperService.offset(
      [{ outer: this.getWallPath(useOriginal) }],
      offsetDistance
    );

    return offsetRegions.length === 1 ? offsetRegions[0].outer : [];
  }

  createWallPathElement(): void {
    const paths: Vector2[][] = [];
    const outerCurves = this.getModeCurves(HSCore.Model.WallMode.Outer, true);
    const innerCurves = this.getModeCurves(HSCore.Model.WallMode.Inner, true);

    if (outerCurves?.length > 0) {
      paths.push(outerCurves);
    }

    if (innerCurves?.length > 0) {
      paths.push(
        innerCurves
          .map(curve => curve.reverse())
          .reverse()
      );
    }

    this._roomItem = new HSApp.View.SVG.SketchDimension.PathItem(
      this.context,
      this.layer
    ).attr(NormalWallAttr);

    this._roomItem.path = paths;
  }

  onWallSettingChanged(): void {
    if (this._roomItem) {
      this._roomItem.dispose();
    }
    this.createWallPathElement();
  }

  onDraw(): void {
    super.onDraw();
    this._updatePreviewPath();
  }

  private _updatePreviewPath(): void {
    if (this._pos) {
      const rotationDegrees = (this._rotation / Math.PI) * 180;
      const canvasPoint = HSApp.View.SVG.Util.ModelPointToCanvas(this._offset);
      const transformMatrix = new Snap.Matrix()
        .translate(canvasPoint.x, canvasPoint.y)
        .rotate(-rotationDegrees, 0, 0);

      this._roomItem?.attr({ transform: transformMatrix });
      this._roomItem?.show();
    } else {
      this._roomItem?.hide();
    }
  }

  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void {
    const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel(
      [screenX, screenY],
      this.context
    );
    this._pos = new Vector2(modelPoint);
    this._snapHelper?.hide();

    let allCurves = this.getModeCurves(HSCore.Model.WallMode.Outer);
    allCurves = allCurves.concat(this.getModeCurves(HSCore.Model.WallMode.Middle));
    allCurves = allCurves.concat(this.getModeCurves(HSCore.Model.WallMode.Inner));
    allCurves = allCurves.map(curve => curve.translate(this._offset));

    if (!event.ctrlKey && allCurves?.length) {
      const snapOffset = this._snapHelper?.snapByPolygon(allCurves);
      if (snapOffset) {
        this._pos.add(snapOffset);
      }
    }

    this.dirtyGraph();
  }

  onMouseDown(event: MouseEvent): void {
    if (event.button !== 2) {
      const wallPath = this.getWallPath();
      const translatedPath = wallPath.map(point => point.translate(this._offset));

      this.cmd.onReceive('gizmo.drawRoom', {
        curves: translatedPath
      });

      this._updateSnapHelper();
    } else {
      this.onESC();
    }
  }

  rotate(): void {
    this._rotation = (this._rotation - Math.PI / 2) % (2 * Math.PI);
    this._wallPath = undefined;
    this.dirtyGraph();
  }

  onESC(): void {
    this._snapHelper?.hide();
    this.cmd.onReceive('gizmo.Complete', {});
  }

  onCleanup(): void {
    if (this._roomItem) {
      this._roomItem.dispose();
      this._roomItem = undefined;
    }

    if (this._snapHelper) {
      this._snapHelper.dispose();
      this._snapHelper = undefined;
    }

    this._wallPath = undefined;

    HSApp.App.getApp().hotkey.unregisterCmdHotkey('esc', this.cmd.type);
    updateMouseTips();

    super.onCleanup();
  }

  protected dirtyGraph(): void {
    // Implementation from parent class
  }
}