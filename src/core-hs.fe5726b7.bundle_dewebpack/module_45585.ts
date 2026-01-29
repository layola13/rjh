interface Range {
  min: number;
  max: number;
}

interface RangeWithValue extends Range {
  value?: number;
}

interface Point {
  x: number;
  y: number;
}

interface MinMaxPoint {
  min: Point;
  max: Point;
}

interface EdgeHostInfo {
  index: number;
  leftSpace: number;
  rightSpace: number;
}

interface OpeningInfo {
  range: Range;
  ID: string;
}

interface EdgeInfo {
  door: OpeningInfo[];
  window: OpeningInfo[];
  hole: OpeningInfo[];
}

type OpeningType = 'door' | 'window' | 'hole';

import { Line } from './line-module';
import { GeometryUtil } from './geometry-util';

export const RoomInfo = {
  getRangeOverLap(rangeA: Range, rangeB: Range): number {
    return rangeA.min < rangeB.max && rangeA.max > rangeB.min
      ? Math.min(rangeA.max, rangeB.max) - Math.max(rangeA.min, rangeB.min)
      : 0;
  },

  getUnionRange(rangeA: Range, rangeB: Range): Range | null {
    if (rangeA.min < rangeB.max && rangeA.max > rangeB.min) {
      const result = { ...rangeA };
      result.max = Math.min(rangeA.max, rangeB.max);
      result.min = Math.max(rangeA.min, rangeB.min);
      return result;
    }
    return null;
  },

  sortRanges<T extends Range>(ranges: T[]): T[] {
    return ranges.sort((a, b) => a.min - b.min);
  },

  combineRanges<T extends Range>(ranges: T[]): T[] {
    const clonedRanges = ranges.map(r => ({ ...r })) as T[];
    const combined: T[] = [];

    this.sortRanges(clonedRanges);

    clonedRanges.forEach(range => {
      if (combined.length === 0) {
        combined.push(range);
      } else {
        const last = combined[combined.length - 1];
        if (last.max > range.min) {
          last.max = Math.max(last.max, range.max);
        } else {
          combined.push(range);
        }
      }
    });

    return combined;
  },

  subRange(sourceRange: Range, subtractRange: Range): Range[] {
    const result: Range[] = [];

    if (sourceRange.min < subtractRange.max && sourceRange.max > subtractRange.min) {
      if (sourceRange.min < subtractRange.min) {
        result.push({
          ...sourceRange,
          max: subtractRange.min
        });
      }
      if (sourceRange.max > subtractRange.max) {
        result.push({
          ...sourceRange,
          min: subtractRange.max
        });
      }
    } else {
      result.push(sourceRange);
    }

    return result;
  },

  subRanges<T extends Range>(sourceRanges: T[], subtractRanges: T[]): Range[] {
    const combinedSource = this.combineRanges(sourceRanges);
    const combinedSubtract = this.combineRanges(subtractRanges);

    return combinedSource.reduce((accumulated, sourceRange) => {
      let currentRanges: Range[] = [sourceRange];

      combinedSubtract.forEach(subtractRange => {
        currentRanges = currentRanges.reduce(
          (acc, range) => acc.concat(this.subRange(range, subtractRange)),
          [] as Range[]
        );
      });

      return accumulated.concat(currentRanges);
    }, [] as Range[]);
  },

  transformLineToAix(elements: (Line | Point)[], referenceLine: Line): (Line | Point)[] {
    const angle = Math.atan2(referenceLine.y1 - referenceLine.y0, referenceLine.x1 - referenceLine.x0);
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    const transformPoint = (point: Point): Point => ({
      x: (point.x - referenceLine.x0) * cosAngle + (point.y - referenceLine.y0) * sinAngle,
      y: -(point.x - referenceLine.x0) * sinAngle + (point.y - referenceLine.y0) * cosAngle
    });

    return elements.map(element => {
      if (element instanceof Line) {
        const startPoint = transformPoint({ x: element.x0, y: element.y0 });
        const endPoint = transformPoint({ x: element.x1, y: element.y1 });
        return new Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
      }
      return transformPoint(element as Point);
    });
  },

  calculateEdgeRangeInformation(
    edges: Line[],
    edgeIndex: number,
    additionalPolygons?: Point[][]
  ): RangeWithValue[] {
    const interpolateY = (segment: MinMaxPoint, xValue: number): number => {
      return (
        (xValue - segment.min.x) * (segment.max.y - segment.min.y) / (segment.max.x - segment.min.x) + segment.min.y
      );
    };

    const targetEdge = edges[edgeIndex];
    let allEdges = this.transformLineToAix(edges, targetEdge);

    if (additionalPolygons instanceof Array) {
      const transformedPolygons = additionalPolygons
        .map(polygon => this.transformLineToAix(polygon, targetEdge))
        .map(transformed => transformed.map(this.extractToEdges));

      transformedPolygons.forEach(polygonEdges => {
        allEdges = allEdges.concat(polygonEdges);
      });
    }

    const segmentLength = targetEdge.getSegmentLength();
    const segments: MinMaxPoint[] = [];
    let xCoordinates: number[] = [];

    allEdges.forEach((edge, index) => {
      if (index === edgeIndex) return;

      const line = edge as Line;
      let minX = Math.min(line.x0, line.x1);
      let maxX = Math.max(line.x0, line.x1);

      if (maxX > 0 && minX < segmentLength) {
        if (maxX > segmentLength) maxX = segmentLength;
        if (minX < 0) minX = 0;

        const minY = (line.y1 - line.y0) * (minX - line.x0) / (line.x1 - line.x0) + line.y0;
        const maxY = (line.y1 - line.y0) * (maxX - line.x0) / (line.x1 - line.x0) + line.y0;

        segments.push({
          min: { x: minX, y: minY },
          max: { x: maxX, y: maxY }
        });

        xCoordinates.push(minX, maxX);
      }
    });

    xCoordinates = xCoordinates.sort((a, b) => a - b);

    const uniqueXValues: number[] = [];
    const ranges: RangeWithValue[] = [];
    let previousX: number | null = null;

    const EPSILON = 0.01;

    xCoordinates.forEach(currentX => {
      if (previousX === null || previousX < currentX - EPSILON) {
        if (previousX !== null) {
          ranges.push({ min: previousX, max: currentX });
        }
        previousX = currentX;
        uniqueXValues.push(currentX);
      }
    });

    ranges.forEach(range => {
      const minMax = { min: null as number | null, max: null as number | null };

      segments.forEach(segment => {
        const overlap = this.getRangeOverLap(range, { min: segment.min.x, max: segment.max.x });

        if (overlap > EPSILON) {
          const yAtMin = interpolateY(segment, range.min);
          const yAtMax = interpolateY(segment, range.max);

          if (minMax.min === null || minMax.min > yAtMin) {
            minMax.min = yAtMin;
            minMax.max = yAtMax;
          }
        }
      });

      range.value = Math.min(minMax.min!, minMax.max!);
    });

    return ranges;
  },

  extractToEdges(point: Point, index: number, points: Point[]): Line {
    const nextIndex = (index + 1) % points.length;
    return new Line(point.x, point.y, points[nextIndex].x, points[nextIndex].y);
  },

  getEdgeAnglesFromVertexs(vertices: Point[]): number[] {
    const vertexCount = vertices.length;
    return vertices.map((vertex, index) => {
      const nextVertex = vertices[(index + 1) % vertexCount];
      return Math.atan2(nextVertex.y - vertex.y, nextVertex.x - vertex.x);
    });
  },

  simplifyRoomGeo(vertices: Point[]): Point[] {
    let simplified = vertices.map(v => ({ x: v.x, y: v.y }));
    const originalCount = vertices.length;

    if (vertices.length < 4) return vertices;

    const angles = this.getEdgeAnglesFromVertexs(simplified);
    const duplicateIndices: number[] = [];
    let previousAngle = angles[originalCount - 1];

    const ANGLE_EPSILON = 0.01;

    angles.forEach((angle, index) => {
      if (Math.abs(previousAngle - angle) < ANGLE_EPSILON) {
        duplicateIndices.push(index);
      } else {
        previousAngle = angle;
      }
    });

    duplicateIndices.sort((a, b) => b - a);
    duplicateIndices.forEach(index => {
      simplified.splice(index, 1);
    });

    const collinearPoints: Point[] = [];

    for (let i = 0; i < simplified.length; ++i) {
      let prevIndex = i - 1;
      if (prevIndex < 0) prevIndex += simplified.length;

      let nextIndex = i + 1;
      if (nextIndex >= simplified.length) nextIndex -= simplified.length;

      const distance = HSCore.Util.Math.closestDistanceToSegment(
        simplified[i],
        simplified[prevIndex],
        simplified[nextIndex]
      );

      if (distance < ANGLE_EPSILON) {
        collinearPoints.push(simplified[i]);
      }
    }

    simplified = simplified.filter(point => 
      collinearPoints.find(cp => cp === point) === undefined
    );

    return simplified;
  },

  getLineAngle(line: Line): number {
    return Math.atan2(line.y1 - line.y0, line.x1 - line.x0);
  },

  isAngleParall(angleA: number, angleB: number, tolerance: number = 0.01): boolean {
    let difference = Math.abs(angleA - angleB);
    difference %= Math.PI;
    return difference < tolerance || difference > Math.PI - tolerance;
  },

  closestSegmentDistance(line: Line, point: Point): number {
    const start = { x: line.x0, y: line.y0 };
    const end = { x: line.x1, y: line.y1 };
    return HSCore.Util.Math.closestDistanceToSegment(point, start, end);
  },

  getOpeningHostEdgeInfo(edges: Line[], opening: any): EdgeHostInfo | null {
    const host = opening.getHost();
    if (!host) return null;

    const hostLine = new Line(host.from.x, host.from.y, host.to.x, host.to.y);
    const hostAngle = this.getLineAngle(hostLine);
    const openingPosition = { x: opening.x, y: opening.y };

    const ANGLE_TOLERANCE = Math.PI / 180;

    const distances = edges.map(edge => {
      const edgeAngle = this.getLineAngle(edge);
      return this.isAngleParall(hostAngle, edgeAngle, ANGLE_TOLERANCE)
        ? this.closestSegmentDistance(edge, openingPosition)
        : Infinity;
    });

    let minDistance: number | null = null;
    let closestEdgeIndex: number | null = null;

    distances.forEach((distance, index) => {
      if (distance !== Infinity && (minDistance === null || minDistance > distance)) {
        minDistance = distance;
        closestEdgeIndex = index;
      }
    });

    if (closestEdgeIndex !== null) {
      const openingSize = { x: opening.XSize, y: opening.YSize };
      const rotation = host.rotation;
      const outline = HSCore.Util.Math.computeOutline(
        openingPosition,
        openingSize.x,
        openingSize.y,
        rotation
      );

      const closestEdge = edges[closestEdgeIndex];
      const leftPoint = closestEdge.getClosestPoint(outline[0].x, outline[0].y);
      const rightPoint = closestEdge.getClosestPoint(outline[2].x, outline[2].y);

      const leftDistanceToStart = HSCore.Util.Math.getDistance(leftPoint, {
        x: closestEdge.x0,
        y: closestEdge.y0
      });
      const rightDistanceToStart = HSCore.Util.Math.getDistance(rightPoint, {
        x: closestEdge.x0,
        y: closestEdge.y0
      });
      const leftSpace = Math.min(leftDistanceToStart, rightDistanceToStart);

      const leftDistanceToEnd = HSCore.Util.Math.getDistance(leftPoint, {
        x: closestEdge.x1,
        y: closestEdge.y1
      });
      const rightDistanceToEnd = HSCore.Util.Math.getDistance(rightPoint, {
        x: closestEdge.x1,
        y: closestEdge.y1
      });
      const rightSpace = Math.min(leftDistanceToEnd, rightDistanceToEnd);

      return {
        index: closestEdgeIndex,
        leftSpace,
        rightSpace
      };
    }

    return null;
  }
};

export class RoomInfoManager {
  Polygon: Point[];
  Edges: Line[];
  EdgesInfo: EdgeInfo[];

  constructor(room?: any) {
    if (room) {
      const docManager = HSCore.Doc.getDocManager();
      const geometry = docManager.geometryManager.getGeometry(room);
      const baseGeometry = geometry.floor ? geometry.floor : geometry;
      const points = GeometryUtil.getPoints(baseGeometry);
      const cleanedPolygons = HSCore.Util.Collision.CleanPolygons([points], 0.001);

      this.Polygon = cleanedPolygons[0];
      this.Edges = this.Polygon.map(RoomInfo.extractToEdges);
      this.EdgesInfo = this.Edges.map(() => ({
        door: [],
        window: [],
        hole: []
      }));

      room.forEachWall((wall: any) => {
        if (!wall.openings) return;

        Object.keys(wall.openings).forEach(openingId => {
          const opening = wall.openings[openingId];

          if (Object.keys(opening.parents).length === 0) return;

          const edgeInfo = RoomInfo.getOpeningHostEdgeInfo(this.Edges, opening);
          if (!edgeInfo) return;

          const edgeLength = this.Edges[edgeInfo.index].getSegmentLength();
          const range: Range = {
            min: edgeInfo.leftSpace,
            max: edgeLength - edgeInfo.rightSpace
          };

          let openingType: OpeningType | null = null;
          let contentType = opening.contentType;
          let isWindow = false;

          if (!contentType) {
            const parent = opening.getUniqueParent();
            if (
              parent &&
              (parent.instanceOf(HSConstants.ModelClass.NgPOrdinaryWindow) ||
                parent.instanceOf(HSConstants.ModelClass.NgBayWindow) ||
                parent.instanceOf(HSConstants.ModelClass.NgCornerFlatWindow))
            ) {
              contentType = parent.contentType;
              isWindow = true;
            }
          }

          if (contentType) {
            if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.Door)) {
              openingType = 'door';
            } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.Window) || isWindow) {
              openingType = 'window';
            } else if (
              contentType.isTypeOf([
                HSCatalog.ContentTypeEnum.WallOpening,
                HSCatalog.ContentTypeEnum.AdjustableArchWallOpening
              ])
            ) {
              openingType = 'hole';
            }

            if (openingType) {
              this.setOpening(openingType, openingId, edgeInfo.index, range);
            }
          }
        });
      });
    }
  }

  setOpening(type: OpeningType, id: string, edgeIndex: number, range: Range): void {
    const sortOpenings = (openings: OpeningInfo[]): OpeningInfo[] => {
      return openings.sort((a, b) => a.range.min - b.range.min);
    };

    const edgeInfo = this.EdgesInfo[edgeIndex];

    if (type === 'window') {
      edgeInfo.window.push({ range, ID: id });
      sortOpenings(edgeInfo.window);
    } else if (type === 'door') {
      edgeInfo.door.push({ range, ID: id });
      sortOpenings(edgeInfo.door);
    } else {
      edgeInfo.hole.push({ range, ID: id });
      sortOpenings(edgeInfo.hole);
    }
  }
}