import { HSCore } from './HSCore';
import { Vector2 } from './Vector2';
import { Matrix3 } from './Matrix3';
import { Line2d, Loop, Polygon, MathAlg } from './Math';

interface ContentBound {
  center: Vector2;
  width: number;
  height: number;
  rotation: number;
}

interface ContentOutline {
  bound: {
    isValid: () => boolean;
  };
  outline: Vector2[];
}

export class DiffToolUtil {
  /**
   * Compare if two content properties are equal
   */
  static propertyEqual(
    contentA: HSCore.Model.Content,
    contentB: HSCore.Model.Content
  ): boolean {
    return (
      this.isSameContent(contentA, contentB) &&
      HSCore.Util.Math.nearlyEquals(contentA.x, contentB.x) &&
      HSCore.Util.Math.nearlyEquals(contentA.y, contentB.y) &&
      HSCore.Util.Math.nearlyEquals(contentA.z, contentB.z) &&
      HSCore.Util.Math.nearlyEquals(contentA.XSize, contentB.XSize) &&
      HSCore.Util.Math.nearlyEquals(contentA.YSize, contentB.YSize) &&
      HSCore.Util.Math.nearlyEquals(contentA.ZSize, contentB.ZSize) &&
      HSCore.Util.Math.nearlyEquals(contentA.XRotation, contentB.XRotation) &&
      HSCore.Util.Math.nearlyEquals(contentA.YRotation, contentB.YRotation) &&
      HSCore.Util.Math.nearlyEquals(contentA.ZRotation, contentB.ZRotation)
    );
  }

  /**
   * Check if two content instances have the same content type
   */
  static isSameContent(
    contentA: HSCore.Model.Content,
    contentB: HSCore.Model.Content
  ): boolean {
    if (
      contentA instanceof HSCore.Model.CustomizedModel &&
      contentB instanceof HSCore.Model.CustomizedModel
    ) {
      return contentA.contentType.isSame(contentB.contentType);
    }
    return contentA.seekId === contentB.seekId;
  }

  /**
   * Calculate parametric opening from/to parameters based on polygon intersection
   */
  static calcParametricOpeningFromTo(
    startPoint: Vector2,
    endPoint: Vector2,
    polygon: Vector2[]
  ): Vector2[] {
    const PARALLEL_TOLERANCE = 0.001;
    let minParam = 100;
    let maxParam = -100;
    let hasIntersection = false;
    const polygonLength = polygon.length;

    for (let i = 0; i < polygonLength; i++) {
      const currentVertex = polygon[i];
      const nextVertex = polygon[(i + 1) % polygonLength];

      if (
        HSCore.Util.Math.isParallel(
          startPoint,
          endPoint,
          currentVertex,
          nextVertex,
          PARALLEL_TOLERANCE
        )
      ) {
        hasIntersection = true;
        const paramCurrent = HSCore.Util.Math.getLerpNumber(
          startPoint,
          endPoint,
          currentVertex
        );
        const paramNext = HSCore.Util.Math.getLerpNumber(
          startPoint,
          endPoint,
          nextVertex
        );
        minParam = Math.min(minParam, paramCurrent);
        maxParam = Math.max(maxParam, paramCurrent);
        minParam = Math.min(minParam, paramNext);
        maxParam = Math.max(maxParam, paramNext);
      }
    }

    if (!hasIntersection) {
      return [];
    }

    minParam = Math.max(minParam, 0);
    maxParam = Math.min(maxParam, 1);

    const fromPoint = HSCore.Util.Math.getLerpPoint(startPoint, endPoint, minParam);
    const toPoint = HSCore.Util.Math.getLerpPoint(startPoint, endPoint, maxParam);

    return [new Vector2(fromPoint.x, fromPoint.y), new Vector2(toPoint.x, toPoint.y)];
  }

  /**
   * Get overlapped parameters for line segment intersection
   */
  static getOverlappedParameters(
    lineStart: Vector2,
    lineEnd: Vector2,
    testStart: Vector2,
    testEnd: Vector2
  ): number[] {
    let minOverlap: number;
    let maxOverlap: number;
    const paramStart = HSCore.Util.Math.getLerpNumber(lineStart, lineEnd, testStart);
    const paramEnd = HSCore.Util.Math.getLerpNumber(lineStart, lineEnd, testEnd);
    let hasOverlap = false;

    if (paramStart < 0) {
      minOverlap = 0;
      if (paramEnd > 0) {
        maxOverlap = Math.min(paramEnd, 1);
        hasOverlap = true;
      }
    } else if (paramStart < 1) {
      minOverlap = Math.min(paramStart, paramEnd);
      minOverlap = Math.max(minOverlap, 0);
      maxOverlap = Math.max(paramStart, paramEnd);
      maxOverlap = Math.min(maxOverlap, 1);
      hasOverlap = true;
    } else {
      maxOverlap = 1;
      if (paramEnd < 1) {
        minOverlap = Math.max(paramEnd, 0);
        hasOverlap = true;
      }
    }

    return hasOverlap && !HSCore.Util.Math.nearlyEquals(minOverlap, maxOverlap)
      ? [minOverlap, maxOverlap]
      : [];
  }

  /**
   * Compute outline rectangle vertices given center, dimensions and rotation
   */
  static computeOutline(
    center: Vector2,
    width: number,
    height: number,
    rotation: number
  ): Vector2[] {
    const topLeft = new Vector2(-width / 2, height / 2);
    const topRight = new Vector2(width / 2, height / 2);

    topLeft.vecRotate(rotation);
    topRight.vecRotate(rotation);
    topLeft.add(center);
    topRight.add(center);

    const outline: Vector2[] = [];
    outline.push(topRight);
    outline.push(topLeft);
    outline.push(new Vector2(2 * center.x - topRight.x, 2 * center.y - topRight.y));
    outline.push(new Vector2(2 * center.x - topLeft.x, 2 * center.y - topLeft.y));

    return outline;
  }

  /**
   * Get bounding box of content
   */
  static getContentBound(
    content: HSCore.Model.Content,
    useHostWidth?: boolean
  ): ContentBound {
    let effectiveHeight: number | undefined;

    if (useHostWidth) {
      const host = content.getHost();
      effectiveHeight =
        host && host instanceof HSCore.Model.Wall
          ? host.width
          : HSApp.App.getApp().floorplan.globalWallWidth;
    }

    const posSize = HSApp.Util.Content.getContentPosSize(content);

    return {
      center: new Vector2(posSize.x, posSize.y),
      width: posSize.XSize,
      height: effectiveHeight ?? posSize.YSize,
      rotation: content.rotation,
    };
  }

  /**
   * Get parent wall width for content
   */
  static getContentParentWallWidth(content: HSCore.Model.Content): number {
    return HSCore.Util.Content.isWallNiche(content)
      ? content.YSize
      : this.getWallWidth(content.getHost());
  }

  /**
   * Get wall width or global wall width
   */
  static getWallWidth(wall?: HSCore.Model.Wall): number {
    return wall && wall instanceof HSCore.Model.Wall
      ? wall.width
      : HSApp.App.getApp().floorplan.globalWallWidth;
  }

  /**
   * Check if content is a corner bay window
   */
  static isCornerBayWindow(content: HSCore.Model.Content): boolean {
    return (
      content instanceof HSCore.Model.ParametricOpening &&
      content.contentType.isTypeOf('bay window') &&
      content.relatedWalls.length > 1
    );
  }

  /**
   * Check if content is a bay window
   */
  static isBayWindow(content: HSCore.Model.Content): boolean {
    return (
      content instanceof HSCore.Model.ParametricOpening &&
      content.contentType.isTypeOf('bay window') &&
      content.relatedWalls.length === 1
    );
  }

  /**
   * Check if content is a corner window
   */
  static isCornerWindow(content: HSCore.Model.Content): boolean {
    return (
      content instanceof HSCore.Model.ParametricOpening &&
      content.contentType.isTypeOf('corner window')
    );
  }

  /**
   * Check if content is a floor-based window
   */
  static isFloorBaseWindow(content: HSCore.Model.Content): boolean {
    return (
      content instanceof HSCore.Model.ParametricOpening &&
      content.contentType.isTypeOf('floor-based window')
    );
  }

  /**
   * Check if content is an ordinary window
   */
  static isOrdinaryWindow(content: HSCore.Model.Content): boolean {
    return (
      content instanceof HSCore.Model.ParametricOpening &&
      content.contentType.isTypeOf('ordinary window')
    );
  }

  /**
   * Calculate local to parent 2D transformation matrix
   */
  static calcLocalToParentMatrix2d(content: {
    x: number;
    y: number;
    ZRotation: number;
  }): Matrix3 {
    const { x, y, ZRotation } = content;
    const matrix = new Matrix3();
    matrix.applyRotate(Vector2.O(), (-ZRotation * Math.PI) / 180);
    matrix.applyTranslate({ x, y });
    return matrix;
  }

  /**
   * Check if content is a new diff tool window type
   */
  static isNewDiffToolWindow(content: HSCore.Model.Content): boolean {
    return (
      content instanceof HSCore.Model.Opening ||
      content instanceof HSCore.Model.ParametricOpening
    );
  }

  /**
   * Check if content is a new diff tool content type
   */
  static isNewDiffToolContent(content: HSCore.Model.Content): boolean {
    return (
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Beam) ||
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Column) ||
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.FloorDrain) ||
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.RoomHeater) ||
      content instanceof HSCore.Model.Obstacle
    );
  }

  /**
   * Check if a point is inside a room
   */
  static isPointInRoom(point: Vector2, room: HSCore.Model.Room): boolean {
    const rawPath = room.worldRawPath2d;
    const loops: Loop[] = [];
    loops.push(new Loop(rawPath.outer));
    rawPath.holes.forEach((hole) => loops.push(new Loop(hole)));

    const polygon = new Polygon(loops);
    return (
      MathAlg.PositionJudge.ptToPolygon(new Vector2(point), polygon) !==
      MathAlg.PtLoopPositonType.OUT
    );
  }

  /**
   * Check if contents are on the same room outline
   */
  static isContentsOnSameRoomOutline(
    contents: ContentOutline[],
    room: HSCore.Model.Room
  ): boolean {
    if (contents.length === 0) {
      return false;
    }

    const rawPath = room.worldRawPath2d;
    const roomOutlineEdges = [...rawPath.outer];
    rawPath.holes.forEach((hole) => roomOutlineEdges.push(...hole));

    const findEdgeForContent = (content: ContentOutline): Line2d | undefined => {
      content.bound.isValid();
      const outline = content.outline;

      for (let i = 0; i < outline.length; i++) {
        const nextIndex = (i + 1) % outline.length;
        const edge = new Line2d(outline[i], outline[nextIndex]);
        const foundEdge = findOverlappingEdge(edge, roomOutlineEdges);
        if (foundEdge) {
          return foundEdge;
        }
      }
      return undefined;
    };

    const findOverlappingEdge = (
      contentEdge: Line2d,
      roomEdges: Line2d[]
    ): Line2d | undefined => {
      for (const roomEdge of roomEdges) {
        const overlapType = MathAlg.PositionJudge.curveCurveOverlap(
          contentEdge,
          roomEdge
        );
        if (
          overlapType === MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP ||
          overlapType === MathAlg.CurveCuvePositonType.OVERLAP
        ) {
          return roomEdge;
        }
      }
      return undefined;
    };

    const firstEdge = findEdgeForContent(contents[0]);
    return !!firstEdge && contents.every((content) => findEdgeForContent(content) === firstEdge);
  }

  /**
   * Check if a 2D line crosses room structure
   */
  static isLine2dCrossStructure(line: Line2d, room: HSCore.Model.Room): boolean {
    const rawPath = room.worldRawPath2d;
    const roomOutlineEdges = [...rawPath.outer];
    rawPath.holes.forEach((hole) => roomOutlineEdges.push(...hole));

    return !roomOutlineEdges.every(
      (edge) =>
        MathAlg.PositionJudge.curveToCurve(line, edge) ===
        MathAlg.CurveCuvePositonType.NOT_INTERSECT
    );
  }

  /**
   * Get the bottom layer of a scene hierarchy
   */
  static getBottomLayer(content: { scene: { rootLayer: any } }): any {
    let currentLayer = content.scene.rootLayer;
    while (currentLayer?.prev) {
      currentLayer = currentLayer.prev;
    }
    return currentLayer;
  }
}