import { Arc2d, Line2d } from './geometry';
import { CurveType, BizType, SnapHelper } from './snap-helper';

interface PolygonSnapData {
  lines: Line2d[];
  points: Array<{ x: number; y: number }>;
}

interface SnapResult {
  ui: unknown;
  offset: { clone(): { x: number; y: number } };
}

interface Curve2d {
  isLine2d(): boolean;
  getStartPt(): { x: number; y: number };
  getEndPt(): { x: number; y: number };
}

interface Floor {
  worldRawPath2d: {
    outer: Array<Arc2d | Line2d>;
  };
}

interface Layer {
  forEachFloor(callback: (floor: Floor) => void): void;
}

export class DrawPolygonRoomSnapHelper extends SnapHelper {
  private _layer?: Layer;
  private _points: Array<{ x: number; y: number }> = [];
  private _curveBeans: Array<unknown> = [];

  snapByPolygon(curves: Curve2d[]): { x: number; y: number } | undefined {
    const lines: Line2d[] = [];
    const points: Array<{ x: number; y: number }> = [];

    for (const curve of curves) {
      if (curve.isLine2d()) {
        lines.push(curve as Line2d);
      }
      points.push(curve.getStartPt());
    }

    const snapData: PolygonSnapData = {
      lines,
      points
    };

    const snapResult = this._snap(snapData, {
      orthoModeOn: false,
      curveType: CurveType.LineSegment,
      step: 2,
      showPoint: true
    });

    if (snapResult) {
      this._handleSnapUIData(snapResult.ui);
      return snapResult.offset.clone();
    }

    return undefined;
  }

  refreshForOutdoorPath(): void {
    const app = (globalThis as any).HSApp?.App?.getApp();
    
    if (this._layer === app?.floorplan?.scene?.rootLayer) {
      const outdoorLayer: Layer = (globalThis as any).HSCore.Util.Layer.getOutdoorLayer();
      const floors: Floor[] = [];

      outdoorLayer.forEachFloor((floor: Floor) => {
        floors.push(floor);
      });

      if (floors.length === 0) {
        return;
      }

      floors.forEach((floor: Floor) => {
        floor.worldRawPath2d.outer.forEach((curve: Arc2d | Line2d) => {
          this._points.push(curve.getStartPt());

          if (curve instanceof Arc2d) {
            const lineSegment = new Line2d(curve.getStartPt(), curve.getEndPt());
            this._curveBeans.push(
              this._getCBean(CurveType.LineSegment, lineSegment, BizType.ArcWallLength)
            );
          } else if (curve instanceof Line2d) {
            this._curveBeans.push(
              this._getCBean(CurveType.LineSegment, curve, BizType.WallCenter)
            );
          }
        });
      });
    }
  }

  protected _snap(
    data: PolygonSnapData,
    options: {
      orthoModeOn: boolean;
      curveType: CurveType;
      step: number;
      showPoint: boolean;
    }
  ): SnapResult | undefined {
    // Implementation inherited from SnapHelper base class
    return undefined;
  }

  protected _handleSnapUIData(uiData: unknown): void {
    // Implementation inherited from SnapHelper base class
  }

  protected _getCBean(curveType: CurveType, curve: Line2d, bizType: BizType): unknown {
    // Implementation inherited from SnapHelper base class
    return {};
  }
}