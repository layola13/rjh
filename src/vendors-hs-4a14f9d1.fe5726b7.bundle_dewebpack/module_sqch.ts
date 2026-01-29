class AdvancingFrontNode {
  point: Point;
  triangle: Triangle | null;
  next: AdvancingFrontNode | null;
  prev: AdvancingFrontNode | null;
  value: number;

  constructor(point: Point, triangle?: Triangle | null) {
    this.point = point;
    this.triangle = triangle ?? null;
    this.next = null;
    this.prev = null;
    this.value = point.x;
  }
}

class AdvancingFront {
  private head_: AdvancingFrontNode;
  private tail_: AdvancingFrontNode;
  private search_node_: AdvancingFrontNode;

  constructor(head: AdvancingFrontNode, tail: AdvancingFrontNode) {
    this.head_ = head;
    this.tail_ = tail;
    this.search_node_ = head;
  }

  head(): AdvancingFrontNode {
    return this.head_;
  }

  setHead(node: AdvancingFrontNode): void {
    this.head_ = node;
  }

  tail(): AdvancingFrontNode {
    return this.tail_;
  }

  setTail(node: AdvancingFrontNode): void {
    this.tail_ = node;
  }

  search(): AdvancingFrontNode {
    return this.search_node_;
  }

  setSearch(node: AdvancingFrontNode): void {
    this.search_node_ = node;
  }

  findSearchNode(): AdvancingFrontNode {
    return this.search_node_;
  }

  locateNode(x: number): AdvancingFrontNode | null {
    let node = this.search_node_;

    if (x < node.value) {
      while ((node = node.prev!)) {
        if (x >= node.value) {
          this.search_node_ = node;
          return node;
        }
      }
    } else {
      while ((node = node.next!)) {
        if (x < node.value) {
          this.search_node_ = node.prev!;
          return node.prev;
        }
      }
    }

    return null;
  }

  locatePoint(point: Point): AdvancingFrontNode | null {
    const x = point.x;
    let node = this.findSearchNode(x);
    const nodeX = node.point.x;

    if (x === nodeX) {
      if (point !== node.point) {
        if (point === node.prev!.point) {
          node = node.prev!;
        } else {
          if (point !== node.next!.point) {
            throw new Error('poly2tri Invalid AdvancingFront.locatePoint() call');
          }
          node = node.next!;
        }
      }
    } else if (x < nodeX) {
      while ((node = node.prev!) && point !== node.point);
    } else {
      while ((node = node.next!) && point !== node.point);
    }

    if (node) {
      this.search_node_ = node;
    }

    return node;
  }
}

interface Point {
  x: number;
  y: number;
}

interface Triangle {
  [key: string]: unknown;
}

export { AdvancingFront, AdvancingFrontNode };