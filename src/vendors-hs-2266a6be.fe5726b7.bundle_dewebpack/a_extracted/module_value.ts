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
  gluTessVertex(vertex: Vertex, data: Vertex): void;
  gluTessEndContour(): void;
  gluTessEndPolygon(): void;
}

function tessellatePolygons(
  this: TessellatorContext,
  polygons: Polygon,
  holes: Polygon
): void {
  this._current = [];
  this._out = [];
  this.gluTessBeginPolygon();

  for (const contour of polygons) {
    this.gluTessBeginContour();
    
    for (const vertex of contour) {
      this.gluTessVertex(vertex, vertex);
    }
    
    this.gluTessEndContour();
  }

  for (const holeContour of holes) {
    this.gluTessBeginContour();
    
    for (const vertex of holeContour) {
      this.gluTessVertex(vertex, vertex);
    }
    
    this.gluTessEndContour();
  }

  this.gluTessEndPolygon();
}

export { tessellatePolygons, type Vertex, type Contour, type Polygon, type TessellatorContext };