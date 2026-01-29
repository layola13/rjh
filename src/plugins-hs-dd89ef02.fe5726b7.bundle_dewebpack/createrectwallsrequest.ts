import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

interface RectWallsOption {
  x?: number;
  y?: number;
  wallIsBearing?: boolean;
  wallMode?: string;
}

interface Point {
  x: number;
  y: number;
}

interface Wall {
  from: Point;
  to: Point;
  width: number;
  length: number;
  offset(x: number, y: number): void;
}

interface Layer {
  height: number;
  addChild(wall: Wall): void;
}

interface TemplateCurve {
  getStartPt(): Point;
  getEndPt(): Point;
}

export class CreateRectWallsRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _fp: any;
  private readonly _layer: Layer;
  private readonly _templateCurves: TemplateCurve[];
  private readonly _wallWidth: number;
  private readonly _option: RectWallsOption;
  private readonly _preLayerSlabInfo: any;

  constructor(
    fp: any,
    layer: Layer,
    templateCurves: TemplateCurve[],
    wallWidth: number,
    option: RectWallsOption
  ) {
    super(layer);
    this._fp = fp;
    this._layer = layer;
    this._templateCurves = templateCurves;
    this._wallWidth = wallWidth;
    this._option = option;
    this._preLayerSlabInfo = HSCore.Util.Slab.getLayerSlabAutoRegions(layer);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layer);
  }

  private _createRectWallsWithPoints(points: Point[]): Wall[] {
    const offsetX = this._option.x ?? 0;
    const offsetY = this._option.y ?? 0;

    if (!points || points.length < 4) {
      return [];
    }

    const walls: Wall[] = [];
    const vertices = points.map((point) =>
      HSCore.Model.Vertex.create(point.x + offsetX, point.y + offsetY)
    );

    for (let i = 0, length = vertices.length; i < length; ++i) {
      const wall = HSCore.Model.Wall.create(
        vertices[i],
        vertices[(i + 1) % length],
        this._wallWidth,
        this._layer.height
      );
      walls.push(wall);
    }

    return walls;
  }

  rectWallsSnapTo(walls: Wall[], targetWalls: Wall[]): void {
    const globalWallWidth = this._fp.globalWallWidth;

    walls.forEach((wall) => {
      const offset: Point = {
        x: NaN,
        y: NaN
      };

      targetWalls.forEach((targetWall) => {
        if (
          wall.length < 2 * globalWallWidth ||
          targetWall.length < 2 * globalWallWidth
        ) {
          return;
        }

        if (
          !HSCore.Util.Math.isParallel(
            wall.from,
            wall.to,
            targetWall.from,
            targetWall.to,
            0.2
          )
        ) {
          return;
        }

        const targetWidth = targetWall.width;

        if (
          HSCore.Util.Math.isPointInLineSegment(wall.from, targetWall.from, targetWall.to, targetWidth) ||
          HSCore.Util.Math.isPointInLineSegment(wall.to, targetWall.from, targetWall.to, targetWidth) ||
          HSCore.Util.Math.isPointInLineSegment(targetWall.from, wall.from, wall.to, targetWidth) ||
          HSCore.Util.Math.isPointInLineSegment(targetWall.to, wall.from, wall.to, targetWidth)
        ) {
          const intersect = HSCore.Util.Math.getPerpendicularIntersect(
            wall.from,
            targetWall.from,
            targetWall.to
          );
          const deltaX = intersect.x - wall.from.x;
          const deltaY = intersect.y - wall.from.y;

          offset.x = isNaN(offset.x) || Math.abs(offset.x) < Math.abs(deltaX) ? deltaX : offset.x;
          offset.y = isNaN(offset.y) || Math.abs(offset.y) < Math.abs(deltaY) ? deltaY : offset.y;
        }
      });

      if (!isNaN(offset.x) && !isNaN(offset.y)) {
        wall.from.offset(offset.x, offset.y);
        wall.to.offset(offset.x, offset.y);
      }
    });
  }

  onCommit(): void {
    const wallIsBearing = this._option?.wallIsBearing;
    const wallMode = this._option?.wallMode;

    const walls = this._templateCurves.map((curve) =>
      HSCore.Model.Wall.createLineWall(
        curve.getStartPt(),
        curve.getEndPt(),
        this._wallWidth,
        this._layer.height,
        undefined,
        undefined,
        wallIsBearing,
        wallMode
      )
    );

    walls.forEach((wall) => this._layer.addChild(wall));

    HSCore.Util.TgWall.createRectWallsJoints(walls);
    HSCore.Util.TgWall.processWallsJoints(walls);
    HSCore.Util.TgWall.updateLayer(this._layer);
    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();

    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '画房间';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}