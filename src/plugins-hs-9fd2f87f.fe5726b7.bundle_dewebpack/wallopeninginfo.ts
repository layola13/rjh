import { Vector2, Polygon, Loop, Line2d, MathAlg, PtLoopPositonType } from './math-library';
import { HSCore } from './hs-core';
import { DiffToolUtil } from './diff-tool-util';

interface FloorplanInfo {
  getWallInfoById(id: string): WallInfo | undefined;
}

interface WallInfo {
  isArc: boolean;
  from: Vector2;
  to: Vector2;
  wall: {
    path: Vector2[];
  };
}

interface OpeningData {
  from: Vector2;
  to: Vector2;
  zFrom: Vector2;
  zTo: Vector2;
  z: number;
  ZSize: number;
  width: number;
  direction?: string;
  outline?: Vector2[];
}

interface CenterLineData {
  from: Vector2;
  to: Vector2;
  width: number;
}

type Content = HSCore.Model.Opening | HSCore.Model.ParametricOpening;

export class WallOpeningInfo {
  private readonly _floorplanInfo: FloorplanInfo;
  private readonly _content: Content;
  private _openings: OpeningData[];
  private _originOpenings: OpeningData[];
  private readonly _outline: Vector2[];
  private _isArc: boolean;

  constructor(content: Content, floorplanInfo: FloorplanInfo) {
    this._floorplanInfo = floorplanInfo;
    this._content = content;
    this._openings = [];
    this._originOpenings = [];
    this._outline = this.createOutline(content);
    this._isArc = false;
    this.init();
  }

  private init(): void {
    this.initArcInfo();
    this.initOpeningData();
  }

  private initOpeningData(): void {
    const centerLines: CenterLineData[] = [];
    let isArcOpening = false;
    const host = this._content.getHost();

    if (host && host instanceof HSCore.Model.Wall) {
      const wallInfo = this._floorplanInfo.getWallInfoById(host.id);
      if (wallInfo?.isArc) {
        const fromMid = this._outline[0].midTo(this._outline[3]);
        const toMid = this._outline[1].midTo(this._outline[2]);
        centerLines.push({
          from: fromMid,
          to: toMid,
          width: this._content.YSize
        });
        isArcOpening = true;
      }
    }

    if (!isArcOpening) {
      if (this._content instanceof HSCore.Model.Opening) {
        centerLines.push(...this.createOpeningCenterLine());
      } else if (this._content instanceof HSCore.Model.ParametricOpening) {
        centerLines.push(...this.createParametricCenterLine(this._content));
      }
    }

    if (centerLines.length > 0) {
      const zFrom = new Vector2(0, this.getZFrom(this._content));
      const zTo = new Vector2(0, this.getZTo(this._content));
      const z = this._content.z;
      const zSize = this._content.ZSize;

      centerLines.forEach(line => {
        this._originOpenings.push({
          from: line.from,
          to: line.to,
          zFrom,
          zTo,
          z,
          ZSize: zSize,
          width: line.width
        });
      });

      this.openings = this.originOpenings.slice(0);
    }
  }

  private getZFrom(content: Content): number {
    return content instanceof HSCore.Model.ParametricOpening
      ? content.getHoleZ()
      : content.z;
  }

  private getZTo(content: Content): number {
    return content instanceof HSCore.Model.ParametricOpening
      ? content.getHoleZ() + content.ZSize
      : content.z + content.ZSize;
  }

  private createParametricCenterLine(content: HSCore.Model.ParametricOpening): CenterLineData[] {
    const result: CenterLineData[] = [];
    const relatedWalls = content.relatedWalls.slice();
    let targetWallId = '';
    let diffPath: Vector2[] = [];

    if (relatedWalls.length > 1) {
      const path1 = this.getWallPath(relatedWalls[0].id);
      const path2 = this.getWallPath(relatedWalls[1].id);

      if (path1 && path2) {
        const intersections = HSCore.Util.TgWall.PTInstance().intersect([path1], [path2]);

        if (intersections.length > 0) {
          const intersectionPoly = intersections[0][0];
          const allOnPath1 = this.allPointsOnPolygon(intersectionPoly, path1);
          const allOnPath2 = this.allPointsOnPolygon(intersectionPoly, path2);

          if (allOnPath1 !== allOnPath2) {
            if (allOnPath1 && !allOnPath2) {
              targetWallId = relatedWalls[0].id;
              const diff = HSCore.Util.TgWall.PTInstance().different([path1], [path2]);
              diffPath = new Polygon(new Loop(diff[0][0])).toPaths().flat();
            } else {
              targetWallId = relatedWalls[1].id;
              const diff = HSCore.Util.TgWall.PTInstance().different([path2], [path1]);
              diffPath = new Polygon(new Loop(diff[0][0])).toPaths().flat();
            }
          } else {
            targetWallId = relatedWalls[0].id;
            const diff = HSCore.Util.TgWall.PTInstance().different([path1], [path2]);
            diffPath = new Polygon(new Loop(diff[0][0])).toPaths().flat();
          }
        }
      }
    }

    relatedWalls.forEach(wall => {
      const wallInfo = this._floorplanInfo.getWallInfoById(wall.id);
      const viewData = content.get2DViewData();

      if (wallInfo && viewData?.innerPath && viewData.innerPath.length > 0) {
        let innerPath = viewData.innerPath[0].slice();

        if (innerPath.length > 0) {
          const matrix = DiffToolUtil.calcLocalToParentMatrix2d(content);
          innerPath = innerPath.map(pt => new Vector2(pt.x, pt.y).transform(matrix));

          let fromPt = wallInfo.from.clone();
          let toPt = wallInfo.to.clone();

          if (wall.id === targetWallId) {
            const adjusted = DiffToolUtil.calcParametricOpeningFromTo(fromPt, toPt, diffPath);
            fromPt = adjusted[0];
            toPt = adjusted[1];
          }

          const openingFromTo = DiffToolUtil.calcParametricOpeningFromTo(fromPt, toPt, innerPath);
          if (openingFromTo.length > 0) {
            result.push({
              from: openingFromTo[0],
              to: openingFromTo[1],
              width: DiffToolUtil.getWallWidth(wall)
            });
          }
        }
      }
    });

    return result;
  }

  private allPointsOnPolygon(points: Vector2[], polygonPath: Vector2[]): boolean {
    const pointsFlat = new Polygon(new Loop(points)).toPaths().flat();
    const polygon = new Polygon(new Loop(polygonPath));
    
    for (const point of pointsFlat) {
      if (MathAlg.PositionJudge.ptToPolygon(point, polygon) === PtLoopPositonType.IN) {
        return false;
      }
    }
    
    return true;
  }

  private getWallPath(wallId: string): Vector2[] | undefined {
    const wallInfo = this._floorplanInfo.getWallInfoById(wallId);
    return wallInfo?.wall.path.slice();
  }

  private createOpeningCenterLine(): CenterLineData[] {
    const result: CenterLineData[] = [];
    const host = this._content.getHost();

    if (host && host instanceof HSCore.Model.Wall) {
      const wallInfo = this._floorplanInfo.getWallInfoById(host.id);

      if (wallInfo) {
        const openingFromTo = DiffToolUtil.calcParametricOpeningFromTo(
          wallInfo.from,
          wallInfo.to,
          this._outline
        );

        if (openingFromTo.length < 1) {
          const fromMid = this._outline[0].midTo(this._outline[3]);
          const toMid = this._outline[1].midTo(this._outline[2]);
          result.push({
            from: fromMid,
            to: toMid,
            width: DiffToolUtil.getContentParentWallWidth(this._content)
          });
          return result;
        }

        const perpendiculars: Vector2[] = [];
        const wallDirection = wallInfo.to.subtract(wallInfo.from);
        const outlineCount = this._outline.length;

        for (let i = 0; i < outlineCount; i++) {
          const current = this._outline[i % outlineCount];
          const next = this._outline[(i + 1) % outlineCount];
          const edgeDirection = next.subtracted(current);

          if (wallDirection.isPerpendicular(edgeDirection)) {
            perpendiculars.push(current.interpolated(next, 0.5));
          }
        }

        if (perpendiculars.length === 2) {
          const centerLine = new Line2d(perpendiculars[0], perpendiculars[1]);
          const param1 = centerLine.getParamAt(openingFromTo[0]);
          openingFromTo[0] = centerLine.getPtAt(param1);
          const param2 = centerLine.getParamAt(openingFromTo[1]);
          openingFromTo[1] = centerLine.getPtAt(param2);
        }

        result.push({
          from: openingFromTo[0],
          to: openingFromTo[1],
          width: DiffToolUtil.getContentParentWallWidth(this._content)
        });
      }
    }

    return result;
  }

  private initArcInfo(): void {
    const host = this._content.getHost();
    if (host && host instanceof HSCore.Model.Wall) {
      const wallInfo = this._floorplanInfo.getWallInfoById(host.id);
      if (wallInfo) {
        this._isArc = wallInfo.isArc;
      }
    }
  }

  getId(): string {
    return this._content.id;
  }

  get isArc(): boolean {
    return this._isArc;
  }

  get content(): Content {
    return this._content;
  }

  get openings(): OpeningData[] {
    return this._openings;
  }

  set openings(value: OpeningData[]) {
    this._openings = value;
  }

  get originOpenings(): OpeningData[] {
    return this._originOpenings;
  }

  propertyEquals(other: Content): boolean {
    return DiffToolUtil.propertyEqual(this.content, other);
  }

  private createOutline(content: Content): Vector2[] {
    if (content instanceof HSCore.Model.ParametricOpening) {
      const box = content.bound.toBox();
      return [
        new Vector2(box.left, box.top),
        new Vector2(box.right, box.top),
        new Vector2(box.right, box.bottom),
        new Vector2(box.left, box.bottom)
      ];
    }

    if (content instanceof HSCore.Model.Opening) {
      const bound = DiffToolUtil.getContentBound(
        content,
        !HSCore.Util.Content.isWallNiche(content)
      );
      return DiffToolUtil.computeOutline(
        bound.center,
        bound.width,
        bound.height,
        -bound.rotation / 180 * Math.PI
      );
    }

    return [];
  }

  addOverlapInfo(other: WallOpeningInfo): void {
    const newOpenings: OpeningData[] = [];

    this.openings.forEach(opening => {
      const splitResults: OpeningData[] = [];
      let hasOverlap = false;

      other.originOpenings.forEach(otherOpening => {
        if (!this.isArc && !other.isArc && this.isOverlapped(opening, otherOpening)) {
          const xyParams = DiffToolUtil.getOverlappedParameters(
            opening.from,
            opening.to,
            otherOpening.from,
            otherOpening.to
          );
          const zParams = DiffToolUtil.getOverlappedParameters(
            opening.zFrom,
            opening.zTo,
            otherOpening.zFrom,
            otherOpening.zTo
          );
          splitResults.push(...this.splitOpening(opening, xyParams, zParams));
          hasOverlap = true;
        }
      });

      if (hasOverlap) {
        newOpenings.push(...splitResults);
      } else {
        newOpenings.push(opening);
      }
    });

    this.openings = newOpenings;
  }

  private isOverlapped(opening1: OpeningData, opening2: OpeningData): boolean {
    if (!opening1 || !opening2) {
      return false;
    }

    return (
      HSCore.Util.Math.isSegmentsOverlapped(opening1.from, opening1.to, opening2.from, opening2.to) &&
      HSCore.Util.Math.isSegmentsOverlapped(opening1.zFrom, opening1.zTo, opening2.zFrom, opening2.zTo)
    );
  }

  private createSplitData(
    from: Vector2,
    to: Vector2,
    zFrom: Vector2,
    zTo: Vector2,
    z: number,
    zSize: number,
    width: number,
    direction: string
  ): OpeningData {
    return {
      from: new Vector2(from.x, from.y),
      to: new Vector2(to.x, to.y),
      zFrom: new Vector2(zFrom.x, zFrom.y),
      zTo: new Vector2(zTo.x, zTo.y),
      z,
      ZSize: zSize,
      width,
      direction
    };
  }

  private splitOpening(
    opening: OpeningData,
    xyParams: [number, number],
    zParams: [number, number]
  ): OpeningData[] {
    const result: OpeningData[] = [];
    const splitFromXY = HSCore.Util.Math.getLerpPoint(opening.from, opening.to, xyParams[0]);
    const splitToXY = HSCore.Util.Math.getLerpPoint(opening.from, opening.to, xyParams[1]);
    const splitFromZ = HSCore.Util.Math.getLerpPoint(opening.zFrom, opening.zTo, zParams[0]);
    const splitToZ = HSCore.Util.Math.getLerpPoint(opening.zFrom, opening.zTo, zParams[1]);
    const direction = this.getOpeningDiffDirection(xyParams, zParams);

    if (!HSCore.Util.Math.nearlyEquals(xyParams[0], 0)) {
      result.push(
        this.createSplitData(
          opening.from,
          splitFromXY,
          opening.zFrom,
          opening.zTo,
          opening.z,
          opening.ZSize,
          opening.width,
          direction
        )
      );
    }

    if (!HSCore.Util.Math.nearlyEquals(xyParams[1], 1)) {
      result.push(
        this.createSplitData(
          splitToXY,
          opening.to,
          opening.zFrom,
          opening.zTo,
          opening.z,
          opening.ZSize,
          opening.width,
          direction
        )
      );
    }

    if (!HSCore.Util.Math.nearlyEquals(xyParams[0], xyParams[1])) {
      if (!HSCore.Util.Math.nearlyEquals(zParams[0], 0)) {
        result.push(
          this.createSplitData(
            splitFromXY,
            splitToXY,
            opening.zFrom,
            splitFromZ,
            opening.zFrom.y,
            splitFromZ.y - opening.zFrom.y,
            opening.width,
            direction
          )
        );
      }

      if (!HSCore.Util.Math.nearlyEquals(zParams[1], 1)) {
        result.push(
          this.createSplitData(
            splitFromXY,
            splitToXY,
            splitToZ,
            opening.zTo,
            splitToZ.y,
            opening.zTo.y - splitToZ.y,
            opening.width,
            direction
          )
        );
      }
    }

    return result;
  }

  private getOpeningDiffDirection(xyParams: [number, number], zParams: [number, number]): string {
    let direction = '';
    const hasHorizontalSplit =
      !HSCore.Util.Math.nearlyEquals(xyParams[0], 0) ||
      !HSCore.Util.Math.nearlyEquals(xyParams[1], 1);
    const hasVerticalSplit = !(
      HSCore.Util.Math.nearlyEquals(xyParams[0], xyParams[1]) ||
      (HSCore.Util.Math.nearlyEquals(zParams[0], 0) && HSCore.Util.Math.nearlyEquals(zParams[1], 1))
    );

    if (hasVerticalSplit && !hasHorizontalSplit) {
      direction = 'v';
    } else if (!hasVerticalSplit && hasHorizontalSplit) {
      direction = 'h';
    } else if (hasVerticalSplit && hasHorizontalSplit) {
      direction = 'vh';
    }

    return direction;
  }

  computeOutline(): void {
    this.openings.forEach(opening => {
      const from = opening.from;
      const to = opening.to;
      const direction = from.clone().subtract(to);
      const angle = new Vector2(1, 0).angleTo(direction);
      const center = from.interpolated(to, 0.5);
      const length = direction.getLength();
      const width = opening.width;
      opening.outline = DiffToolUtil.computeOutline(center, length, width, angle);
    });
  }
}