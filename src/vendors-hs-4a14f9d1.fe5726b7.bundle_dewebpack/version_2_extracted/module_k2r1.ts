import { Point } from './Point';
import { Triangle } from './Triangle';
import { Node } from './Node';
import { AdvancingFront } from './AdvancingFront';
import { Sweep } from './Sweep';

interface SweepContextOptions {
  cloneArrays?: boolean;
}

interface BoundingBox {
  min: Point;
  max: Point;
}

export class Edge {
  public p: Point;
  public q: Point;

  constructor(p1: Point, p2: Point) {
    this.p = p1;
    this.q = p2;

    if (p1.y > p2.y) {
      this.q = p1;
      this.p = p2;
    } else if (p1.y === p2.y) {
      if (p1.x > p2.x) {
        this.q = p1;
        this.p = p2;
      } else if (p1.x === p2.x) {
        throw new Error(`poly2tri Invalid Edge constructor: repeated points! [${p1}]`);
      }
    }

    if (!this.q._p2t_edge_list) {
      this.q._p2t_edge_list = [];
    }
    this.q._p2t_edge_list.push(this);
  }
}

export class Basin {
  public left_node: Node | null = null;
  public bottom_node: Node | null = null;
  public right_node: Node | null = null;
  public width: number = 0;
  public left_highest: boolean = false;

  public clear(): void {
    this.left_node = null;
    this.bottom_node = null;
    this.right_node = null;
    this.width = 0;
    this.left_highest = false;
  }
}

export class EdgeEvent {
  public constrained_edge: Edge | null = null;
  public right: boolean = false;
}

export class SweepContext {
  private triangles_: Triangle[] = [];
  private map_: Triangle[] = [];
  private points_: Point[];
  private edge_list: Edge[] = [];
  private pmin_: Point | null = null;
  private pmax_: Point | null = null;
  private front_: AdvancingFront | null = null;
  private head_: Point | null = null;
  private tail_: Point | null = null;
  private af_head_: Node | null = null;
  private af_middle_: Node | null = null;
  private af_tail_: Node | null = null;
  public basin: Basin;
  public edge_event: EdgeEvent;

  constructor(contour: Point[], options: SweepContextOptions = {}) {
    this.points_ = options.cloneArrays ? contour.slice(0) : contour;
    this.basin = new Basin();
    this.edge_event = new EdgeEvent();
    this.initEdges(this.points_);
  }

  public addHole(polyline: Point[]): this {
    this.initEdges(polyline);
    const length = polyline.length;
    for (let i = 0; i < length; i++) {
      this.points_.push(polyline[i]);
    }
    return this;
  }

  public AddHole = this.addHole;

  public addHoles(holes: Point[][]): this {
    const holeCount = holes.length;
    for (let i = 0; i < holeCount; i++) {
      this.initEdges(holes[i]);
    }
    this.points_ = this.points_.concat.apply(this.points_, holes);
    return this;
  }

  public addPoint(point: Point): this {
    this.points_.push(point);
    return this;
  }

  public AddPoint = this.addPoint;

  public addPoints(points: Point[]): this {
    this.points_ = this.points_.concat(points);
    return this;
  }

  public triangulate(): this {
    Sweep.triangulate(this);
    return this;
  }

  public getBoundingBox(): BoundingBox {
    return {
      min: this.pmin_!,
      max: this.pmax_!
    };
  }

  public getTriangles(): Triangle[] {
    return this.triangles_;
  }

  public GetTriangles = this.getTriangles;

  public front(): AdvancingFront | null {
    return this.front_;
  }

  public pointCount(): number {
    return this.points_.length;
  }

  public head(): Point | null {
    return this.head_;
  }

  public setHead(point: Point): void {
    this.head_ = point;
  }

  public tail(): Point | null {
    return this.tail_;
  }

  public setTail(point: Point): void {
    this.tail_ = point;
  }

  public getMap(): Triangle[] {
    return this.map_;
  }

  public initTriangulation(): void {
    let minX = this.points_[0].x;
    let maxX = this.points_[0].x;
    let minY = this.points_[0].y;
    let maxY = this.points_[0].y;
    const pointCount = this.points_.length;

    for (let i = 1; i < pointCount; i++) {
      const point = this.points_[i];
      if (point.x > maxX) maxX = point.x;
      if (point.x < minX) minX = point.x;
      if (point.y > maxY) maxY = point.y;
      if (point.y < minY) minY = point.y;
    }

    this.pmin_ = new Point(minX, minY);
    this.pmax_ = new Point(maxX, maxY);

    const deltaX = 0.3 * (maxX - minX);
    const deltaY = 0.3 * (maxY - minY);

    this.head_ = new Point(maxX + deltaX, minY - deltaY);
    this.tail_ = new Point(minX - deltaX, minY - deltaY);

    this.points_.sort(Point.compare);
  }

  private initEdges(points: Point[]): void {
    const edgeCount = points.length;
    for (let i = 0; i < edgeCount; ++i) {
      this.edge_list.push(new Edge(points[i], points[(i + 1) % edgeCount]));
    }
  }

  public getPoint(index: number): Point {
    return this.points_[index];
  }

  public addToMap(triangle: Triangle): void {
    this.map_.push(triangle);
  }

  public locateNode(point: Point): Node | null {
    return this.front_!.locateNode(point.x);
  }

  public createAdvancingFront(): void {
    const headTriangle = new Triangle(
      this.points_[0],
      this.tail_!,
      this.head_!
    );
    this.map_.push(headTriangle);

    const middleNode = new Node(headTriangle.getPoint(1), headTriangle);
    const tailNode = new Node(headTriangle.getPoint(0), headTriangle);
    const headNode = new Node(headTriangle.getPoint(2));

    this.front_ = new AdvancingFront(middleNode, headNode);

    middleNode.next = tailNode;
    tailNode.next = headNode;
    tailNode.prev = middleNode;
    headNode.prev = tailNode;
  }

  public removeNode(node: Node): void {
    // Implementation removed or empty
  }

  public mapTriangleToNodes(triangle: Triangle): void {
    for (let i = 0; i < 3; ++i) {
      if (!triangle.getNeighbor(i)) {
        const node = this.front_!.locatePoint(
          triangle.pointCW(triangle.getPoint(i))
        );
        if (node) {
          node.triangle = triangle;
        }
      }
    }
  }

  public removeFromMap(triangle: Triangle): void {
    const triangles = this.map_;
    const length = triangles.length;
    for (let i = 0; i < length; i++) {
      if (triangles[i] === triangle) {
        triangles.splice(i, 1);
        break;
      }
    }
  }

  public meshClean(startTriangle: Triangle): void {
    const triangleStack: Triangle[] = [startTriangle];
    let triangle: Triangle | undefined;

    while ((triangle = triangleStack.pop())) {
      if (!triangle.isInterior()) {
        triangle.setInterior(true);
        this.triangles_.push(triangle);

        for (let i = 0; i < 3; i++) {
          if (!triangle.constrained_edge[i]) {
            triangleStack.push(triangle.getNeighbor(i));
          }
        }
      }
    }
  }
}