type Vertex = number[];

interface Contour extends Array<Vertex> {}

interface Polygon extends Array<Contour> {}

class TessellatorContext {
  private _current: unknown[];
  private _out: unknown[];

  constructor() {
    this._current = [];
    this._out = [];
  }

  gluTessBeginPolygon(): void {
    throw new Error('Method not implemented');
  }

  gluTessBeginContour(): void {
    throw new Error('Method not implemented');
  }

  gluTessVertex(vertex: Vertex, data: Vertex): void {
    throw new Error('Method not implemented');
  }

  gluTessEndContour(): void {
    throw new Error('Method not implemented');
  }

  gluTessEndPolygon(): void {
    throw new Error('Method not implemented');
  }

  tessellate(fillPolygons: Polygon, holePolygons: Polygon): void {
    this._current = [];
    this._out = [];
    this.gluTessBeginPolygon();

    for (const contour of fillPolygons) {
      this.gluTessBeginContour();
      for (const vertex of contour) {
        this.gluTessVertex(vertex, vertex);
      }
      this.gluTessEndContour();
    }

    for (const contour of holePolygons) {
      this.gluTessBeginContour();
      for (const vertex of contour) {
        this.gluTessVertex(vertex, vertex);
      }
      this.gluTessEndContour();
    }

    this.gluTessEndPolygon();
  }
}