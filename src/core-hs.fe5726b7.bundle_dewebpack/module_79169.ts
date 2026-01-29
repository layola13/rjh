import { Logger } from './logger';

interface Point {
  x: number;
  y: number;
}

interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
  clone(): Bounds;
}

interface PolygonBound {
  maxx: number;
  maxy: number;
  minx: number;
  miny: number;
  length: number;
  width: number;
  center: THREE.Vector2;
}

interface ClipFace {
  outer: Point[];
  holes?: Point[][];
}

interface OffsetOptions {
  joinType: number;
}

interface ClipOptions {
  operation?: number;
  subject_fillType?: number;
  clip_fillType?: number;
  joinType?: number;
}

interface SATVector {
  x: number;
  y: number;
}

interface SATPolygon {
  pos?: SATVector;
  points: SATVector[];
}

interface SATResponse {
  overlap: number;
  overlapN: SATVector;
  overlapV: SATVector;
  a: unknown;
  b: unknown;
  aInB: boolean;
  bInA: boolean;
}

interface ClipperPoint {
  X: number;
  Y: number;
}

declare const SAT: {
  Vector: new (x: number, y: number) => SATVector;
  Polygon: new (pos: SATVector | undefined, points: SATVector[]) => SATPolygon;
  Response: new () => SATResponse;
  testPolygonPolygon(polyA: SATPolygon, polyB: SATPolygon, response?: SATResponse): boolean;
};

declare const ClipperLib: {
  JS: {
    ScaleUpPaths(paths: ClipperPoint[][], scale: number): void;
    AreaOfPolygon(polygon: ClipperPoint[]): number;
  };
  Clipper: {
    CleanPolygons(polygons: ClipperPoint[][], distance: number): ClipperPoint[][];
  };
};

declare const GeLib: {
  PolygonUtils: {
    getArea(polygon: Point[]): number;
  };
};

declare const THREE: {
  Vector2: new (x: number, y: number) => { x: number; y: number };
};

declare const HSCore: {
  Util: {
    Math: {
      rectIntersection(rect1: Bounds, rect2: Bounds): boolean;
    };
  };
};

interface GeometryUtils {
  ClipType: Readonly<{
    union: 0;
    diff: 1;
    inter: 2;
    xor: 3;
  }>;
  PolyFillType: Readonly<{
    evenOdd: 0;
    nonZero: 1;
    positive: 2;
    negative: 3;
  }>;
  JoinType: Readonly<{
    miter: 0;
    square: 1;
    round: 2;
  }>;
  EndType: Readonly<{
    openSquare: 0;
    openRound: 1;
    openButt: 2;
    closedLine: 3;
    closedPolygon: 4;
  }>;
  outlineIntersect(polygon1: Point[], polygon2: Point[], response?: Partial<SATResponse>): boolean;
  boundExpand(bounds: Bounds, expansion: number): Bounds;
  AABBIntersect(bounds1: Bounds, bounds2: Bounds, tolerance?: number): boolean;
  MorphologicalOpeningPolygon(polygons: Point[][], offset: number): Point[][];
  MorphologicalClosingPolygon(polygons: Point[][], offset: number): Point[][];
  FixPolygon(polygons: Point[][], offset: number, options?: OffsetOptions): Point[][];
  CleanPolygons(polygons: Point[][], distance: number): Point[][];
  getPolygonBound(polygon: Point[]): PolygonBound;
  ClipFaces(faces1: ClipFace[], faces2: ClipFace[], options?: ClipOptions): ClipFace[];
  CombinePolygons(polygons: Point[][]): ClipFace[];
  getPolygonArea(polygon: Point[]): number;
  overlapArea(face1: ClipFace, face2: ClipFace): number;
  getClipFacesArea(faces: ClipFace[]): number;
  offsetPolygons?(polygons: Point[][], delta: number, options?: OffsetOptions): Point[][];
  ClipPolygon2?(subject: Point[][], clip: Point[][], options?: ClipOptions): ClipFace[];
}

export const GeometryUtils: GeometryUtils = {
  ClipType: {
    union: 0,
    diff: 1,
    inter: 2,
    xor: 3
  },

  PolyFillType: {
    evenOdd: 0,
    nonZero: 1,
    positive: 2,
    negative: 3
  },

  JoinType: {
    miter: 0,
    square: 1,
    round: 2
  },

  EndType: {
    openSquare: 0,
    openRound: 1,
    openButt: 2,
    closedLine: 3,
    closedPolygon: 4
  },

  outlineIntersect(polygon1: Point[], polygon2: Point[], response?: Partial<SATResponse>): boolean {
    if (typeof SAT === 'undefined') {
      console.error('The collision detection expected SAT library, import the external js in github : https://github.com/jriecken/sat-js');
      return false;
    }

    if (!Array.isArray(polygon1) || polygon1.length < 3) {
      return false;
    }

    if (!Array.isArray(polygon2) || polygon2.length < 3) {
      return false;
    }

    const satPolygon1 = polygon1.map((point: Point) => new SAT.Vector(point.x, point.y));
    const satPolygon2 = polygon2.map((point: Point) => new SAT.Vector(point.x, point.y));
    const satResponse = new SAT.Response();
    const hasIntersection = SAT.testPolygonPolygon(
      new SAT.Polygon(undefined, satPolygon1),
      new SAT.Polygon(undefined, satPolygon2),
      satResponse
    );

    if (response) {
      Object.assign(response, satResponse);
    }

    return hasIntersection;
  },

  boundExpand(bounds: Bounds, expansion: number): Bounds {
    const expandedBounds = bounds.clone();
    expandedBounds.left -= expansion;
    expandedBounds.top -= expansion;
    expandedBounds.width += 2 * expansion;
    expandedBounds.height += 2 * expansion;
    return expandedBounds;
  },

  AABBIntersect(bounds1: Bounds, bounds2: Bounds, tolerance: number = 0): boolean {
    return HSCore.Util.Math.rectIntersection(
      this.boundExpand(bounds1, tolerance),
      this.boundExpand(bounds2, tolerance)
    );
  },

  MorphologicalOpeningPolygon(polygons: Point[][], offset: number): Point[][] {
    Logger.console.assert(this.offsetPolygons, 'this.offsetPolygons is undefined');

    const options: OffsetOptions = {
      joinType: GeometryUtils.JoinType.miter
    };

    let result = this.offsetPolygons!(polygons, -offset, options);
    result = this.offsetPolygons!(result, offset, options);
    return result;
  },

  MorphologicalClosingPolygon(polygons: Point[][], offset: number): Point[][] {
    Logger.console.assert(this.offsetPolygons, 'this.offsetPolygons is undefined');

    const options: OffsetOptions = {
      joinType: GeometryUtils.JoinType.miter
    };

    let result = this.offsetPolygons!(polygons, offset, options);
    result = this.offsetPolygons!(result, -offset, options);
    return result;
  },

  FixPolygon(polygons: Point[][], offset: number, options?: OffsetOptions): Point[][] {
    Logger.console.assert(this.offsetPolygons, 'this.offsetPolygons is undefined');

    let result = this.offsetPolygons!(polygons, -offset, options);
    result = this.offsetPolygons!(result, offset, options);
    return result;
  },

  CleanPolygons(polygons: Point[][], distance: number): Point[][] {
    if (typeof ClipperLib === 'undefined') {
      console.error('The collision detection expected Clipper library.');
      return [];
    }

    const convertToClipperFormat = (polys: Point[][]): ClipperPoint[][] => {
      return polys.map((polygon: Point[]) => {
        return polygon.map((point: Point) => ({
          X: point.x,
          Y: point.y
        }));
      });
    };

    const clipperPolygons = convertToClipperFormat(polygons);
    const scaleFactor = 1e6;

    ClipperLib.JS.ScaleUpPaths(clipperPolygons, scaleFactor);

    return ClipperLib.Clipper.CleanPolygons(clipperPolygons, distance * scaleFactor).map(
      (polygon: ClipperPoint[]) => {
        return polygon.map((point: ClipperPoint) => ({
          x: point.X / scaleFactor,
          y: point.Y / scaleFactor
        }));
      }
    );
  },

  getPolygonBound(polygon: Point[]): PolygonBound {
    let maxX = -Infinity;
    let maxY = -Infinity;
    let minX = Infinity;
    let minY = Infinity;

    for (let i = 0, length = polygon.length; i < length; i++) {
      if (polygon[i].x > maxX) {
        maxX = polygon[i].x;
      }
      if (polygon[i].y > maxY) {
        maxY = polygon[i].y;
      }
      if (polygon[i].x < minX) {
        minX = polygon[i].x;
      }
      if (polygon[i].y < minY) {
        minY = polygon[i].y;
      }
    }

    return {
      maxx: maxX,
      maxy: maxY,
      minx: minX,
      miny: minY,
      length: Math.abs(maxX - minX),
      width: Math.abs(maxY - minY),
      center: new THREE.Vector2((maxX + minX) / 2, (maxY + minY) / 2)
    };
  },

  ClipFaces(faces1: ClipFace[], faces2: ClipFace[], options?: ClipOptions): ClipFace[] {
    Logger.console.assert(this.ClipPolygon2, 'this.ClipPolygon2 is undefined');

    const extractPolygons = (faces: ClipFace[]): Point[][] => {
      const polygons: Point[][] = [];
      faces.forEach((face: ClipFace) => {
        if (face.outer && face.outer.length) {
          polygons.push(face.outer);
        }
        if (face.holes) {
          face.holes.forEach((hole: Point[]) => {
            if (hole && hole.length) {
              polygons.push(hole);
            }
          });
        }
      });
      return polygons;
    };

    const subjectPolygons = extractPolygons(faces1);
    const clipPolygons = extractPolygons(faces2);

    return clipPolygons.length > 0 ? this.ClipPolygon2!(subjectPolygons, clipPolygons, options) : faces1;
  },

  CombinePolygons(polygons: Point[][]): ClipFace[] {
    Logger.console.assert(this.ClipPolygon2, 'this.ClipPolygon2 is undefined');

    const lastPolygon = polygons.pop();
    if (!lastPolygon) {
      return [];
    }

    if (polygons.length === 0) {
      return [{ outer: lastPolygon }];
    }

    const result = this.ClipPolygon2!(polygons, [lastPolygon], {
      operation: GeometryUtils.ClipType.union
    });

    return result.length === 0 ? [{ outer: lastPolygon }] : result;
  },

  getPolygonArea(polygon: Point[]): number {
    return ClipperLib.JS.AreaOfPolygon(
      polygon.map((point: Point) => ({
        X: point.x,
        Y: point.y
      }))
    );
  },

  overlapArea(face1: ClipFace, face2: ClipFace): number {
    const clipOptions: ClipOptions = {
      operation: GeometryUtils.ClipType.inter,
      subject_fillType: GeometryUtils.PolyFillType.positive,
      clip_fillType: GeometryUtils.PolyFillType.positive
    };

    const intersectionFaces = this.ClipFaces([face1], [face2], clipOptions);
    const area = this.getClipFacesArea(intersectionFaces);
    return Math.abs(area);
  },

  getClipFacesArea(faces: ClipFace[]): number {
    if (!faces) {
      return 0;
    }

    let totalArea = 0;

    for (const face of faces) {
      totalArea += GeLib.PolygonUtils.getArea(face.outer);

      if (face.holes) {
        for (const hole of face.holes) {
          totalArea += GeLib.PolygonUtils.getArea(hole);
        }
      }
    }

    return totalArea;
  }
};

Object.freeze(GeometryUtils.ClipType);
Object.freeze(GeometryUtils.PolyFillType);
Object.freeze(GeometryUtils.JoinType);
Object.freeze(GeometryUtils.EndType);