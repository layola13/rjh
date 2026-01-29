interface Point {
  x: number;
  y: number;
}

class Triangle {
  private points_: [Point, Point, Point];
  private neighbors_: [Triangle | null, Triangle | null, Triangle | null];
  private interior_: boolean;
  private constrained_edge: [boolean, boolean, boolean];
  private delaunay_edge: [boolean, boolean, boolean];

  constructor(pointA: Point, pointB: Point, pointC: Point) {
    this.points_ = [pointA, pointB, pointC];
    this.neighbors_ = [null, null, null];
    this.interior_ = false;
    this.constrained_edge = [false, false, false];
    this.delaunay_edge = [false, false, false];
  }

  toString(): string {
    return `[${this.pointToString(this.points_[0])}${this.pointToString(this.points_[1])}${this.pointToString(this.points_[2])}]`;
  }

  private pointToString(point: Point): string {
    return `(${point.x},${point.y})`;
  }

  getPoint(index: number): Point {
    return this.points_[index];
  }

  GetPoint(index: number): Point {
    return this.getPoint(index);
  }

  getPoints(): [Point, Point, Point] {
    return this.points_;
  }

  getNeighbor(index: number): Triangle | null {
    return this.neighbors_[index];
  }

  containsPoint(point: Point): boolean {
    const points = this.points_;
    return point === points[0] || point === points[1] || point === points[2];
  }

  containsEdge(edge: { p: Point; q: Point }): boolean {
    return this.containsPoint(edge.p) && this.containsPoint(edge.q);
  }

  containsPoints(pointA: Point, pointB: Point): boolean {
    return this.containsPoint(pointA) && this.containsPoint(pointB);
  }

  isInterior(): boolean {
    return this.interior_;
  }

  setInterior(isInterior: boolean): this {
    this.interior_ = isInterior;
    return this;
  }

  markNeighborPointers(pointA: Point, pointB: Point, neighbor: Triangle): void {
    const points = this.points_;
    if ((pointA === points[2] && pointB === points[1]) || (pointA === points[1] && pointB === points[2])) {
      this.neighbors_[0] = neighbor;
    } else if ((pointA === points[0] && pointB === points[2]) || (pointA === points[2] && pointB === points[0])) {
      this.neighbors_[1] = neighbor;
    } else if ((pointA === points[0] && pointB === points[1]) || (pointA === points[1] && pointB === points[0])) {
      this.neighbors_[2] = neighbor;
    } else {
      throw new Error('poly2tri Invalid Triangle.markNeighborPointers() call');
    }
  }

  markNeighbor(neighbor: Triangle): void {
    const points = this.points_;
    if (neighbor.containsPoints(points[1], points[2])) {
      this.neighbors_[0] = neighbor;
      neighbor.markNeighborPointers(points[1], points[2], this);
    } else if (neighbor.containsPoints(points[0], points[2])) {
      this.neighbors_[1] = neighbor;
      neighbor.markNeighborPointers(points[0], points[2], this);
    } else if (neighbor.containsPoints(points[0], points[1])) {
      this.neighbors_[2] = neighbor;
      neighbor.markNeighborPointers(points[0], points[1], this);
    }
  }

  clearNeighbors(): void {
    this.neighbors_[0] = null;
    this.neighbors_[1] = null;
    this.neighbors_[2] = null;
  }

  clearDelaunayEdges(): void {
    this.delaunay_edge[0] = false;
    this.delaunay_edge[1] = false;
    this.delaunay_edge[2] = false;
  }

  pointCW(point: Point): Point | null {
    const points = this.points_;
    if (point === points[0]) return points[2];
    if (point === points[1]) return points[0];
    if (point === points[2]) return points[1];
    return null;
  }

  pointCCW(point: Point): Point | null {
    const points = this.points_;
    if (point === points[0]) return points[1];
    if (point === points[1]) return points[2];
    if (point === points[2]) return points[0];
    return null;
  }

  neighborCW(point: Point): Triangle | null {
    if (point === this.points_[0]) return this.neighbors_[1];
    if (point === this.points_[1]) return this.neighbors_[2];
    return this.neighbors_[0];
  }

  neighborCCW(point: Point): Triangle | null {
    if (point === this.points_[0]) return this.neighbors_[2];
    if (point === this.points_[1]) return this.neighbors_[0];
    return this.neighbors_[1];
  }

  getConstrainedEdgeCW(point: Point): boolean {
    if (point === this.points_[0]) return this.constrained_edge[1];
    if (point === this.points_[1]) return this.constrained_edge[2];
    return this.constrained_edge[0];
  }

  getConstrainedEdgeCCW(point: Point): boolean {
    if (point === this.points_[0]) return this.constrained_edge[2];
    if (point === this.points_[1]) return this.constrained_edge[0];
    return this.constrained_edge[1];
  }

  getConstrainedEdgeAcross(point: Point): boolean {
    if (point === this.points_[0]) return this.constrained_edge[0];
    if (point === this.points_[1]) return this.constrained_edge[1];
    return this.constrained_edge[2];
  }

  setConstrainedEdgeCW(point: Point, value: boolean): void {
    if (point === this.points_[0]) {
      this.constrained_edge[1] = value;
    } else if (point === this.points_[1]) {
      this.constrained_edge[2] = value;
    } else {
      this.constrained_edge[0] = value;
    }
  }

  setConstrainedEdgeCCW(point: Point, value: boolean): void {
    if (point === this.points_[0]) {
      this.constrained_edge[2] = value;
    } else if (point === this.points_[1]) {
      this.constrained_edge[0] = value;
    } else {
      this.constrained_edge[1] = value;
    }
  }

  getDelaunayEdgeCW(point: Point): boolean {
    if (point === this.points_[0]) return this.delaunay_edge[1];
    if (point === this.points_[1]) return this.delaunay_edge[2];
    return this.delaunay_edge[0];
  }

  getDelaunayEdgeCCW(point: Point): boolean {
    if (point === this.points_[0]) return this.delaunay_edge[2];
    if (point === this.points_[1]) return this.delaunay_edge[0];
    return this.delaunay_edge[1];
  }

  setDelaunayEdgeCW(point: Point, value: boolean): void {
    if (point === this.points_[0]) {
      this.delaunay_edge[1] = value;
    } else if (point === this.points_[1]) {
      this.delaunay_edge[2] = value;
    } else {
      this.delaunay_edge[0] = value;
    }
  }

  setDelaunayEdgeCCW(point: Point, value: boolean): void {
    if (point === this.points_[0]) {
      this.delaunay_edge[2] = value;
    } else if (point === this.points_[1]) {
      this.delaunay_edge[0] = value;
    } else {
      this.delaunay_edge[1] = value;
    }
  }

  neighborAcross(point: Point): Triangle | null {
    if (point === this.points_[0]) return this.neighbors_[0];
    if (point === this.points_[1]) return this.neighbors_[1];
    return this.neighbors_[2];
  }

  oppositePoint(triangle: Triangle, point: Point): Point | null {
    const cwPoint = triangle.pointCW(point);
    return cwPoint ? this.pointCW(cwPoint) : null;
  }

  legalize(point: Point, newPoint: Point): void {
    const points = this.points_;
    if (point === points[0]) {
      points[1] = points[0];
      points[0] = points[2];
      points[2] = newPoint;
    } else if (point === points[1]) {
      points[2] = points[1];
      points[1] = points[0];
      points[0] = newPoint;
    } else if (point === points[2]) {
      points[0] = points[2];
      points[2] = points[1];
      points[1] = newPoint;
    } else {
      throw new Error('poly2tri Invalid Triangle.legalize() call');
    }
  }

  index(point: Point): number {
    const points = this.points_;
    if (point === points[0]) return 0;
    if (point === points[1]) return 1;
    if (point === points[2]) return 2;
    throw new Error('poly2tri Invalid Triangle.index() call');
  }

  edgeIndex(pointA: Point, pointB: Point): number {
    const points = this.points_;
    if (pointA === points[0]) {
      if (pointB === points[1]) return 2;
      if (pointB === points[2]) return 1;
    } else if (pointA === points[1]) {
      if (pointB === points[2]) return 0;
      if (pointB === points[0]) return 2;
    } else if (pointA === points[2]) {
      if (pointB === points[0]) return 1;
      if (pointB === points[1]) return 0;
    }
    return -1;
  }

  markConstrainedEdgeByIndex(index: number): void {
    this.constrained_edge[index] = true;
  }

  markConstrainedEdgeByEdge(edge: { p: Point; q: Point }): void {
    this.markConstrainedEdgeByPoints(edge.p, edge.q);
  }

  markConstrainedEdgeByPoints(pointA: Point, pointB: Point): void {
    const points = this.points_;
    if ((pointB === points[0] && pointA === points[1]) || (pointB === points[1] && pointA === points[0])) {
      this.constrained_edge[2] = true;
    } else if ((pointB === points[0] && pointA === points[2]) || (pointB === points[2] && pointA === points[0])) {
      this.constrained_edge[1] = true;
    } else if ((pointB === points[1] && pointA === points[2]) || (pointB === points[2] && pointA === points[1])) {
      this.constrained_edge[0] = true;
    }
  }
}

export default Triangle;