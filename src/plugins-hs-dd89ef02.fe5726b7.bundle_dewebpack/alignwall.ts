import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { Line2d, Vector2, Interval } from './geometry';
import { PathItem } from './PathItem';
import { SnapAttr } from './SnapAttr';

interface PathItemData {
  gizmo: PathItem;
  wall: any;
  mode: HSCore.Model.WallMode;
}

interface MouseTipsOptions {
  background: string;
  txtColor: string;
}

interface AlignWallCommand {
  offset: Vector2;
  wall?: any;
}

declare function updateMouseTips(
  text?: string,
  position?: { x: number; y: number },
  options?: MouseTipsOptions
): void;

declare const ResourceManager: {
  getString(key: string): string;
};

export class AlignWall extends HSApp.View.SVG.Temp {
  private _app: any;
  private _wall: any;
  private _layer: any;
  private _pathItems: PathItemData[] = [];
  private _selfItem?: PathItemData;
  private _activeItem?: PathItemData;

  constructor(
    context: any,
    sceneNode: any,
    viewport: any,
    wall: any
  ) {
    super(context, sceneNode, viewport, false);
    
    this._wall = wall;
    this._layer = wall.getUniqueParent();
    this._app = HSApp.App.getApp();
    this._updatePathItems([wall]);
  }

  private _updatePathItems(walls: any[]): void {
    this._pathItems.forEach((item) => item.gizmo.dispose());
    this._pathItems.length = 0;

    walls.forEach((wall) => {
      const modes = [
        HSCore.Model.WallMode.Inner,
        HSCore.Model.WallMode.Middle,
        HSCore.Model.WallMode.Outer
      ];

      modes.forEach((mode) => {
        const pathItem = new PathItem(this.context).attr(SnapAttr);
        pathItem.path = this._getCurveByMode(wall, mode);
        pathItem.hide();
        
        this._pathItems.push({
          gizmo: pathItem,
          wall: wall,
          mode: mode
        });
      });
    });
  }

  private _getCurveByMode(wall: any, mode: HSCore.Model.WallMode): Line2d {
    let curve: any;

    switch (mode) {
      case HSCore.Model.WallMode.Inner:
        curve = wall.leftCurve;
        break;
      case HSCore.Model.WallMode.Outer:
        curve = wall.rightCurve;
        break;
      default:
        curve = wall.curve;
    }

    return curve instanceof Line2d ? curve : new Line2d();
  }

  private _updateTips(event: MouseEvent): void {
    const messageKey = this._selfItem === undefined
      ? 'wall_contextmenu_align_first'
      : 'wall_contextmenu_align_next';
    const message = ResourceManager.getString(messageKey);

    updateMouseTips(message, {
      x: event.clientX,
      y: event.clientY + 25
    }, {
      background: 'rgba(60, 60, 60, 0.85)',
      txtColor: 'rgba(255, 255, 255, 1)'
    });
  }

  private _deleteTips(): void {
    updateMouseTips();
  }

  private _getNearPath(screenX: number, screenY: number): PathItemData | undefined {
    const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel(
      [screenX, screenY],
      this.context
    );
    const point = new Vector2(modelPoint[0], modelPoint[1]);
    const threshold = 0.03;

    return this._pathItems.find((item) => {
      const curve = this._getCurveByMode(item.wall, item.mode);
      const closestPoint = curve.getClosestPoint(point);
      return point.distanceTo(closestPoint) < threshold;
    });
  }

  public onMouseMove(event: MouseEvent, screenX: number, screenY: number): void {
    const nearPath = this._getNearPath(screenX, screenY);

    if (this._activeItem !== nearPath) {
      this._activeItem?.gizmo.hide();
      this._activeItem = nearPath;
      this._activeItem?.gizmo.show();
    }

    this._updateTips(event);
  }

  public onMouseDown(event: MouseEvent): void {
    if (event && event.which === 3) {
      this.cmd.onESC();
    }

    if (!this._activeItem) {
      return;
    }

    const wallCurve = this._wall.curve;

    if (this._selfItem === undefined && wallCurve instanceof Line2d) {
      const pathItem = new PathItem(this.context).attr(SnapAttr);
      pathItem.path = this._getCurveByMode(this._activeItem.wall, this._activeItem.mode);

      this._selfItem = {
        gizmo: pathItem,
        wall: this._activeItem.wall,
        mode: this._activeItem.mode
      };

      const parallelWalls = Object.values(this._layer.walls).filter((wall: any) => {
        return wall !== this._wall &&
               wall.curve instanceof Line2d &&
               wall.curve.isParallelTo(wallCurve);
      });

      this._updatePathItems(parallelWalls);
      this._updateTips(event);
      return;
    }

    const selfCurve = this._getCurveByMode(this._wall, this._selfItem!.mode);
    const activeCurve = this._getCurveByMode(this._activeItem.wall, this._activeItem.mode);
    const startPoint = selfCurve.getStartPt();
    const offset = activeCurve.getProjectedPtBy(startPoint).subtracted(startPoint);

    if (HSCore.Util.Math.nearlyEquals(offset.getLength(), 0)) {
      return;
    }

    const params = [activeCurve.getStartPt(), activeCurve.getEndPt()].map((point) => {
      return selfCurve.getParamAt(point);
    });

    const hasIntersection = selfCurve.getRange()
      .intersected(new Interval(params[0], params[1]))
      .length !== 0;

    let shouldMergeWalls = this._wall.width === this._activeItem.wall.width && hasIntersection;

    if (shouldMergeWalls) {
      const activeWallCurve = this._activeItem.wall.curve.clone();
      activeWallCurve.setRangeInfinit();
      const projectedStart = this._wall.curve.getStartPt().added(offset);
      shouldMergeWalls = activeWallCurve.containsPoint(projectedStart);
    }

    this._app.cmdManager.receive('gizmo.alignwall', {
      offset: offset,
      wall: shouldMergeWalls ? this._activeItem.wall : undefined
    });

    this._selfItem.gizmo.dispose();

    const newPathItem = new PathItem(this.context).attr(SnapAttr);
    newPathItem.path = this._getCurveByMode(this._wall, this._selfItem.mode);
    this._selfItem.gizmo = newPathItem;

    if (shouldMergeWalls) {
      this.cmd.onESC();
    }
  }

  public onDraw(): void {
    // Drawing logic placeholder
  }

  public onCleanup(): void {
    this._deleteTips();
    this._updatePathItems([]);
    this._selfItem?.gizmo.dispose();
    super.onCleanup();
  }
}