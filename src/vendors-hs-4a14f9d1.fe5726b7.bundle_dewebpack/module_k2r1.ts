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

class Edge {
  public p: Point;
  public q: Point;

  constructor(p: Point, q: Point) {
    this.p = p;
    this.q = q;

    if (p.y > q.y) {
      this.q = p;
      this.p = q;
    } else if (p.y === q.y) {
      if (p.x > q.x) {
        this.q = p;
        this.p = q;
      } else if (p.x === q.x) {
        throw new Error(`poly2tri Invalid Edge constructor: repeated points! ${JSON.stringify(p)}`);
      }
    }

    if (!this.q._p2t_edge_list) {
      this.q._p2t_edge_list = [];
    }
    this.q._p2t_edge_list.push(this);
  }
}

class Basin {
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

class EdgeEvent {
  public constrained_edge: Edge | null = null;
  public right: boolean = false;
}

class SweepContext {
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

  public addHole(hole: Point[]): this {
    this.initEdges(hole);
    const length = hole.length;
    for (let i = 0; i < length; i++) {
      this.points_.push(hole[i]);
    }
    return this;
  }

  public AddHole(hole: Point[]): this {
    return this.addHole(hole);
  }

  public addHoles(holes: Point[][]): this {
    const length = holes.length;
    for (let i = 0; i < length; i++) {
      this.initEdges(holes[i]);
    }
    this.points_ = this.points_.concat.apply(this.points_, holes);
    return this;
  }

  public addPoint(point: Point): this {
    this.points_.push(point);
    return this;
  }

  public AddPoint(point: Point): this {
    return this.addPoint(point);
  }

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

  public GetTriangles(): Triangle[] {
    return this.getTriangles();
  }

  public front(): AdvancingFront | null {
    return this.front_;
  }

  public pointCount(): number {
    return this.points_.length;
  }

  public head(): Point | null {
    return this.head_;
  }

  public setHead(head: Point): void {
    this.head_ = head;
  }

  public tail(): Point | null {
    return this.tail_;
  }

  public setTail(tail: Point): void {
    this.tail_ = tail;
  }

  public getMap(): Triangle[] {
    return this.map_;
  }

  public initTriangulation(): void {
    let maxX = this.points_[0].x;
    let minX = this.points_[0].x;
    let maxY = this.points_[0].y;
    let minY = this.points_[0].y;
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

  public initEdges(points: Point[]): void {
    const length = points.length;
    for (let i = 0; i < length; ++i) {
      this.edge_list.push(new Edge(points[i], points[(i + 1) % length]));
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
    const initialTriangle = new Triangle(
      this.points_[0],
      this.tail_!,
      this.head_!
    );
    this.map_.push(initialTriangle);

    const middleNode = new Node(initialTriangle.getPoint(1), initialTriangle);
    const leftNode = new Node(initialTriangle.getPoint(0), initialTriangle);
    const rightNode = new Node(initialTriangle.getPoint(2));

    this.front_ = new AdvancingFront(middleNode, rightNode);

    middleNode.next = leftNode;
    leftNode.next = rightNode;
    leftNode.prev = middleNode;
    rightNode.prev = leftNode;
  }

  public removeNode(node: Node): void {
    // Implementation placeholder
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
    const map = this.map_;
    const length = map.length;
    for (let i = 0; i < length; i++) {
      if (map[i] === triangle) {
        map.splice(i, 1);
        break;
      }
    }
  }

  public meshClean(triangle: Triangle): void {
    const stack: Triangle[] = [triangle];
    let currentTriangle: Triangle | undefined;

    while ((currentTriangle = stack.pop())) {
      if (!currentTriangle.isInterior()) {
        currentTriangle.setInterior(true);
        this.triangles_.push(currentTriangle);

        for (let i = 0; i < 3; i++) {
          if (!currentTriangle.constrained_edge[i]) {
            stack.push(currentTriangle.getNeighbor(i));
          }
        }
      }
    }
  }
}

export { SweepContext, Edge, Basin, EdgeEvent };