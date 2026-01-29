import { Vector2, Line2d, Arc2d } from './geometry';
import { Logger } from './logger';

enum PointType {
  start = "start",
  end = "end"
}

enum CurveType {
  line = "line",
  arc = "arc"
}

interface Edge {
  curve: Line2d | Arc2d;
}

interface PointInfo {
  ctype: CurveType;
  ptype: PointType;
  pt: Vector2;
  index: number;
}

const TOLERANCE = 1e-6;
const FIX_TOLERANCE = 2e-6;
const ANGLE_TOLERANCE = 1e-10;

export class ExboolUtil {
  /**
   * Fixes points that lie on or near edges by adjusting their positions
   * to ensure geometric consistency.
   */
  static ptInEdgesFix(edges: Edge[]): void {
    if (edges.length < 2) return;

    Logger.console.time("exbool.ptInEdgesFix");

    const pointInfos: PointInfo[] = [];
    const curveEndpoints = new Map<Line2d | Arc2d, [Vector2, Vector2]>();

    // Collect all start and end points from edges
    for (let i = 0; i < edges.length; i++) {
      const curve = edges[i].curve;
      const startPt = curve.getStartPt();
      const endPt = curve.getEndPt();
      const curveType = curve.isLine2d() ? CurveType.line : CurveType.arc;

      pointInfos.push({
        ctype: curveType,
        ptype: PointType.start,
        pt: startPt,
        index: i
      });

      pointInfos.push({
        ctype: curveType,
        ptype: PointType.end,
        pt: endPt,
        index: i
      });

      curveEndpoints.set(curve, [startPt, endPt]);
    }

    // Sort by X coordinate and fix nearly coincident X values
    pointInfos.sort((a, b) => a.pt.x - b.pt.x);

    for (let i = 1; i < pointInfos.length; i++) {
      const prev = pointInfos[i - 1];
      const curr = pointInfos[i];
      const deltaX = Math.abs(curr.pt.x - prev.pt.x);

      if (deltaX > 0 && deltaX <= FIX_TOLERANCE) {
        const adjustedPt = new Vector2(prev.pt.x, pointInfos[i].pt.y);
        this.relatedUpdate(pointInfos, i, edges, adjustedPt, curveEndpoints);
      }
    }

    // Sort by Y coordinate and fix nearly coincident Y values
    pointInfos.sort((a, b) => a.pt.y - b.pt.y);

    for (let i = 1; i < pointInfos.length; i++) {
      const prev = pointInfos[i - 1];
      const curr = pointInfos[i];
      const deltaY = Math.abs(curr.pt.y - prev.pt.y);

      if (deltaY > 0 && deltaY <= FIX_TOLERANCE) {
        const adjustedPt = new Vector2(pointInfos[i].pt.x, prev.pt.y);
        this.relatedUpdate(pointInfos, i, edges, adjustedPt, curveEndpoints);
      }
    }

    // Check for points nearly on line segments
    const processedIndices = new Set<number>();
    let previousPt: Vector2 | undefined;
    let projectedPt = Vector2.O();

    for (let i = 0; i < pointInfos.length; i++) {
      const { pt, ctype, index } = pointInfos[i];

      if (previousPt && previousPt.equals(pt)) continue;
      if (processedIndices.has(i)) continue;
      if (ctype !== CurveType.line) continue;

      previousPt = pt;

      for (let j = 0; j < edges.length; j++) {
        if (index === j) continue;
        if (!edges[j].curve.isLine2d()) continue;

        if (this.ptnearlyOnLine2d(pt, edges[j].curve, projectedPt, curveEndpoints)) {
          this.relatedUpdate(pointInfos, i, edges, projectedPt, curveEndpoints, processedIndices);
          projectedPt = Vector2.O();
        }
      }
    }

    Logger.console.timeEnd("exbool.ptInEdgesFix");
  }

  /**
   * Updates all related point infos and edge curves when a point is adjusted.
   */
  private static relatedUpdate(
    pointInfos: PointInfo[],
    startIndex: number,
    edges: Edge[],
    newPt: Vector2,
    curveEndpoints: Map<Line2d | Arc2d, [Vector2, Vector2]>,
    processedIndices?: Set<number>
  ): void {
    const originalPt = pointInfos[startIndex].pt;
    const relatedPoints: PointInfo[] = [];

    // Find all point infos with the same position
    for (let i = startIndex; i < pointInfos.length; i++) {
      if (pointInfos[i].ctype === CurveType.arc) {
        relatedPoints.splice(0);
        break;
      }

      if (pointInfos[i].pt.equals(originalPt)) {
        relatedPoints.push(pointInfos[i]);
        processedIndices?.add(i);
      }
    }

    // Update each related point and its corresponding edge
    for (const pointInfo of relatedPoints) {
      const edge = edges[pointInfo.index];
      const curve = edge.curve;

      if (pointInfo.ptype === PointType.start) {
        pointInfo.pt = newPt;

        const endpoints = curveEndpoints.get(curve);
        const endPt = endpoints ? endpoints[1] : curve.getEndPt();

        if (pointInfo.ctype === CurveType.line) {
          edge.curve = new Line2d(newPt, endPt);
          curveEndpoints.set(edge.curve, [newPt, endPt]);
        } else if (pointInfo.ctype === CurveType.arc) {
          const center = edge.curve.getCenter();
          const isCCW = edge.curve.isCCW();
          edge.curve = Arc2d.makeArcByStartEndPoints(center, newPt, endPt, isCCW);
        }
      } else {
        pointInfo.pt = newPt;

        const endpoints = curveEndpoints.get(curve);
        const startPt = endpoints ? endpoints[0] : curve.getStartPt();

        if (pointInfo.ctype === CurveType.line) {
          edge.curve = new Line2d(startPt, newPt);
          curveEndpoints.set(edge.curve, [startPt, newPt]);
        } else if (pointInfo.ctype === CurveType.arc) {
          const center = edge.curve.getCenter();
          const isCCW = edge.curve.isCCW();
          edge.curve = Arc2d.makeArcByStartEndPoints(center, startPt, newPt, isCCW);
        }
      }
    }
  }

  /**
   * Checks if a point is nearly on a line segment and calculates the projection.
   */
  private static ptnearlyOnLine2d(
    pt: Vector2,
    line: Line2d | Arc2d,
    outProjectedPt: Vector2,
    curveEndpoints?: Map<Line2d | Arc2d, [Vector2, Vector2]>
  ): boolean {
    const endpoints = curveEndpoints?.get(line);
    const startPt = endpoints ? endpoints[0] : line.getStartPt();
    const endPt = endpoints ? endpoints[1] : line.getEndPt();

    if (!endpoints && curveEndpoints) {
      curveEndpoints.set(line, [startPt, endPt]);
    }

    const minX = Math.min(startPt.x, endPt.x) - TOLERANCE;
    const maxX = Math.max(startPt.x, endPt.x) + TOLERANCE;
    const minY = Math.min(startPt.y, endPt.y) - TOLERANCE;
    const maxY = Math.max(startPt.y, endPt.y) + TOLERANCE;

    if (pt.x < minX || pt.x > maxX || pt.y < minY || pt.y > maxY) {
      return false;
    }

    const lineDir = endPt.subtracted(startPt).normalize();
    const ptVec = pt.subtracted(startPt);
    const dirDiff = lineDir.subtracted(ptVec.normalized());

    if (Math.abs(dirDiff.x) < ANGLE_TOLERANCE && Math.abs(dirDiff.y) < ANGLE_TOLERANCE) {
      return false;
    }

    const projection = lineDir.dot(ptVec);
    const distance = ptVec.getLength();
    const perpDistance = Math.sqrt(distance * distance - projection * projection);

    if (perpDistance >= TOLERANCE || perpDistance === 0) {
      return false;
    }

    outProjectedPt.copy(lineDir.multiply(projection).add(startPt));
    return true;
  }
}