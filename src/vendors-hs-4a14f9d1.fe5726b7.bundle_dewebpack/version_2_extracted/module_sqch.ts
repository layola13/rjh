class Node {
  point: Point;
  triangle: Triangle | null;
  next: Node | null;
  prev: Node | null;
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
  private head_: Node;
  private tail_: Node;
  private search_node_: Node;

  constructor(head: Node, tail: Node) {
    this.head_ = head;
    this.tail_ = tail;
    this.search_node_ = head;
  }

  head(): Node {
    return this.head_;
  }

  setHead(node: Node): void {
    this.head_ = node;
  }

  tail(): Node {
    return this.tail_;
  }

  setTail(node: Node): void {
    this.tail_ = node;
  }

  search(): Node {
    return this.search_node_;
  }

  setSearch(node: Node): void {
    this.search_node_ = node;
  }

  findSearchNode(): Node {
    return this.search_node_;
  }

  locateNode(value: number): Node | null {
    let currentNode = this.search_node_;

    if (value < currentNode.value) {
      while ((currentNode = currentNode.prev!)) {
        if (value >= currentNode.value) {
          this.search_node_ = currentNode;
          return currentNode;
        }
      }
    } else {
      while ((currentNode = currentNode.next!)) {
        if (value < currentNode.value) {
          this.search_node_ = currentNode.prev!;
          return currentNode.prev;
        }
      }
    }

    return null;
  }

  locatePoint(point: Point): Node | null {
    const targetX = point.x;
    let currentNode = this.findSearchNode(targetX);
    const nodeX = currentNode.point.x;

    if (targetX === nodeX) {
      if (point !== currentNode.point) {
        if (point === currentNode.prev?.point) {
          currentNode = currentNode.prev;
        } else {
          if (point !== currentNode.next?.point) {
            throw new Error("poly2tri Invalid AdvancingFront.locatePoint() call");
          }
          currentNode = currentNode.next;
        }
      }
    } else if (targetX < nodeX) {
      while ((currentNode = currentNode.prev!) && point !== currentNode.point);
    } else {
      while ((currentNode = currentNode.next!) && point !== currentNode.point);
    }

    if (currentNode) {
      this.search_node_ = currentNode;
    }

    return currentNode ?? null;
  }
}

interface Point {
  x: number;
  y: number;
}

interface Triangle {
  [key: string]: unknown;
}

export { AdvancingFront, Node };
export type { Point, Triangle };