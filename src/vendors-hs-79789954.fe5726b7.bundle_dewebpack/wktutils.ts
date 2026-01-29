interface Point {
  x: number;
  y: number;
}

interface Loop {
  getStartPt(): Point;
  getAllPoints(): Point[];
}

interface Box2 {
  getCornerPts(): Point[];
}

interface Polygon {
  outer: Loop[];
  holes: Loop[];
}

const EMPTY = "EMPTY";

const formatCoordinate = (value: number, precision: number = 7): string => {
  return value.toFixed(precision);
};

export class WKTUtils {
  static loopToWKTParams(loop: Loop[]): string {
    const coordinates = loop.map((item) => {
      const startPoint = item.getStartPt();
      return `${formatCoordinate(startPoint.x)} ${formatCoordinate(startPoint.y)}`;
    });
    coordinates.push(coordinates[0]);
    return `(${coordinates.join(", ")})`;
  }

  static pointsToWKTParams(points: Point[]): string {
    const coordinates = points.map((point) => {
      return `${formatCoordinate(point.x)} ${formatCoordinate(point.y)}`;
    });
    coordinates.push(coordinates[0]);
    return `(${coordinates.join(", ")})`;
  }

  static pointToWKTParams(point: Point): string {
    return `${formatCoordinate(point.x)} ${formatCoordinate(point.y)}`;
  }

  static pointToWKT(point: Point): string {
    return `POINT (${this.pointToWKTParams(point)})`;
  }

  static box2ToWKT(box: Box2): string {
    return `POLYGON (${this.pointsToWKTParams(box.getCornerPts())})`;
  }

  static loopToWKT(loop: Loop): string {
    return `POLYGON (${this.pointsToWKTParams(loop.getAllPoints())})`;
  }

  static loopsToWKT(loops: Loop[]): string {
    return `MULTIPOLYGON ${
      loops.length
        ? `(${loops
            .map((loop) => `(${this.pointsToWKTParams(loop.getAllPoints())})`)
            .join(", ")})`
        : EMPTY
    }`;
  }

  static polygonToWKTParams(polygon: Polygon): string {
    return polygon.outer.length
      ? `(${[this.loopToWKTParams(polygon.outer)]
          .concat(polygon.holes.map((hole) => this.loopToWKTParams(hole)))
          .join(", ")})`
      : "EMPTY";
  }

  static polygonToWKT(polygon: Polygon): string {
    return `POLYGON ${this.polygonToWKTParams(polygon)}`;
  }

  static boxesToMultiPolygonWKT(boxes: Box2[]): string {
    return `MULTIPOLYGON ${
      boxes.length
        ? `(${boxes
            .map((box) => `(${this.pointsToWKTParams(box.getCornerPts())})`)
            .join(", ")})`
        : EMPTY
    }`;
  }

  static outersToGeometryCollectionWKT(outers: Loop[]): string {
    return `GEOMETRYCOLLECTION ${
      outers.length
        ? `(${outers
            .map((outer) => `POLYGON (${this.loopToWKTParams(outer)})`)
            .join(", ")})`
        : EMPTY
    }`;
  }

  static pointsToGeometryCollectionWKT(points: Point[]): string {
    return `GEOMETRYCOLLECTION ${
      points.length
        ? `(${points
            .map((point) => `POINT (${this.pointToWKTParams(point)})`)
            .join(", ")})`
        : EMPTY
    }`;
  }

  static pointsToMultiPointWKT(points: Point[]): string {
    return `MULTIPOINT ${
      points.length
        ? `(${points.map((point) => this.pointToWKTParams(point)).join(", ")})`
        : EMPTY
    }`;
  }

  static polygonWKTsToMultiPolygon(polygonWKTs: string[]): string {
    return `MULTIPOLYGON ${
      polygonWKTs.length
        ? `(${polygonWKTs
            .map((wkt) => wkt.replace("POLYGON", ""))
            .join(", ")
            .trim()})`
        : EMPTY
    }`;
  }
}