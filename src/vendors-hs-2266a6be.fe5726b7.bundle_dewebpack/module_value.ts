interface Vertex {
  [key: string]: unknown;
}

type Contour = Vertex[];
type Polygon = Contour[];

interface TessellatorContext {
  _current: unknown[];
  _out: unknown[];
  gluTessBeginPolygon(): void;
  gluTessBeginContour(): void;
  gluTessEndContour(): void;
  gluTessEndPolygon(): void;
  gluTessVertex(vertex: Vertex, data: Vertex): void;
}

function tessellatePolygons(
  this: TessellatorContext,
  outerPolygons: Polygon,
  innerPolygons: Polygon
): void {
  this._current = [];
  this._out = [];
  this.gluTessBeginPolygon();

  for (const contour of outerPolygons) {
    this.gluTessBeginContour();
    
    for (const vertex of contour) {
      this.gluTessVertex(vertex, vertex);
    }
    
    this.gluTessEndContour();
  }

  for (const contour of innerPolygons) {
    this.gluTessBeginContour();
    
    for (const vertex of contour) {
      this.gluTessVertex(vertex, vertex);
    }
    
    this.gluTessEndContour();
  }

  this.gluTessEndPolygon();
}