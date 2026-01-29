import { HSApp } from './HSApp';
import { PathItem } from './PathItem';
import { FitWallAttr } from './FitWallAttr';
import { Vector2, ClipperLib } from './Geometry';
import { HSCore } from './HSCore';

interface Wall {
  curve: {
    isLine2d(): boolean;
    isColinearWith(other: any): boolean;
  };
  path: Array<{ getStartPt(): { x: number; y: number } }>;
  crossPath: any;
  width: number;
  getUniqueParent(): Layer;
}

interface Layer {
  walls: Record<string, Wall>;
}

interface Point {
  X: number;
  Y: number;
}

interface MouseTipsOptions {
  background: string;
  txtColor: string;
}

interface MergeWallCommand {
  wall: Wall;
}

declare function ResourceManager.getString(key: string): string;
declare function updateMouseTips(text?: string, position?: { x: number; y: number }, options?: MouseTipsOptions): void;

export class MergeWall extends HSApp.View.SVG.Temp {
  private _wall: Wall;
  private _destWall?: Wall;
  private _layer: Layer;
  private _destWallItem: PathItem;
  private _app: any;

  constructor(arg1: any, arg2: any, arg3: any, wall: Wall) {
    super(arg1, arg2, arg3, false);
    
    this._wall = wall;
    this._layer = wall.getUniqueParent();
    this._destWallItem = new PathItem(arg1).attr(FitWallAttr);
    this._app = HSApp.App.getApp();
  }

  private _getDestWall(screenX: number, screenY: number): Wall | undefined {
    const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel(
      [screenX, screenY],
      this.context
    );
    const targetPoint = new Vector2(modelPoint[0], modelPoint[1]);

    let walls = Object.values(this._layer.walls);
    walls = walls.filter((wall: Wall) => wall !== this._wall);

    for (const candidateWall of walls) {
      const polygonPoints: Point[] = candidateWall.path.map((segment) => {
        const startPoint = segment.getStartPt();
        return {
          X: startPoint.x,
          Y: startPoint.y
        };
      });

      const testPoint: Point = {
        X: targetPoint.x,
        Y: targetPoint.y
      };

      const isPointInPolygon = ClipperLib.Clipper.PointInPolygon(testPoint, polygonPoints);
      const areCollinear = this._wall.curve.isLine2d() &&
                          candidateWall.curve.isLine2d() &&
                          this._wall.curve.isColinearWith(candidateWall.curve);
      const isOverlapped = HSCore.Util.TgWall.isLoopOverlapped(
        this._wall.crossPath,
        candidateWall.crossPath
      );
      const widthsMatch = HSCore.Util.Math.nearlyEquals(
        this._wall.width,
        candidateWall.width
      );

      if (isPointInPolygon && areCollinear && isOverlapped && widthsMatch) {
        return candidateWall;
      }
    }

    return undefined;
  }

  private _reset(): void {
    this._destWall = undefined;
    this._destWallItem.hide();
  }

  private _updateTips(event: MouseEvent): void {
    const tooltipText = ResourceManager.getString("wall_contextmenu_merge");
    updateMouseTips(
      tooltipText,
      {
        x: event.clientX,
        y: event.clientY + 25
      },
      {
        background: "rgba(60, 60, 60, 0.85)",
        txtColor: "rgba(255, 255, 255, 1)"
      }
    );
  }

  private _deleteTips(): void {
    updateMouseTips();
  }

  public onMouseMove(event: MouseEvent, screenX: number, screenY: number): void {
    const destinationWall = this._getDestWall(screenX, screenY);

    if (destinationWall) {
      this._destWall = destinationWall;
      this._destWallItem.path = destinationWall.path;
      this._destWallItem.show();
    } else {
      this._reset();
    }

    this._updateTips(event);
  }

  public onMouseDown(event?: MouseEvent): void {
    if (event?.which === 3) {
      this.cmd.onESC();
    }

    if (this._destWall) {
      const commandManager = this._app.cmdManager;
      const command: MergeWallCommand = {
        wall: this._destWall
      };
      commandManager.receive("gizmo.mergewall", command);
      this._reset();
    }
  }

  public onDraw(): void {
    // Intentionally empty
  }

  public onCleanup(): void {
    this._reset();
    this._deleteTips();
    super.onCleanup();
  }
}