import { SnapHelper, CurveType } from './SnapHelper';
import { Vector } from './Vector';
import { Geometry } from './Geometry';

interface SnapOptions {
  orthoModeOn: boolean;
  curveType: CurveType;
  step: number;
  showPoint: boolean;
}

interface PolygonData {
  lines: Geometry[];
  points: Vector[];
}

interface SnapResult {
  ui: unknown;
  offset: Vector;
}

export class CopyPasteRoomSnapHelper extends SnapHelper {
  constructor() {
    super();
  }

  /**
   * Snaps geometries by analyzing polygon lines and points
   * @param geometries - Array of geometry objects to snap
   * @returns Cloned offset vector if snap is successful, undefined otherwise
   */
  public snapByPolygon(geometries: Geometry[]): Vector | undefined {
    const lines: Geometry[] = [];
    const points: Vector[] = [];

    for (const geometry of geometries) {
      if (geometry.isLine2d()) {
        lines.push(geometry);
      }
      points.push(geometry.getStartPt());
    }

    const polygonData: PolygonData = {
      lines,
      points
    };

    const snapOptions: SnapOptions = {
      orthoModeOn: false,
      curveType: CurveType.LineSegment,
      step: 2,
      showPoint: true
    };

    const snapResult = this._snap(polygonData, snapOptions);

    if (snapResult) {
      this._handleSnapUIData(snapResult.ui);
      return snapResult.offset.clone();
    }

    return undefined;
  }

  protected _snap(data: PolygonData, options: SnapOptions): SnapResult | undefined {
    // Implementation inherited from SnapHelper base class
    return super._snap(data, options);
  }

  protected _handleSnapUIData(uiData: unknown): void {
    // Implementation inherited from SnapHelper base class
    super._handleSnapUIData(uiData);
  }
}