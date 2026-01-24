/**
 * Node in the advancing front data structure
 */
export class AdvancingFrontNode {
  /** The point associated with this node */
  point: Point;
  
  /** The triangle associated with this node, if any */
  triangle: Triangle | null;
  
  /** Reference to the next node in the linked list */
  next: AdvancingFrontNode | null;
  
  /** Reference to the previous node in the linked list */
  prev: AdvancingFrontNode | null;
  
  /** Cached x-coordinate value of the point for quick comparisons */
  value: number;

  /**
   * Creates a new AdvancingFrontNode
   * @param point - The point to associate with this node
   * @param triangle - Optional triangle to associate with this node
   */
  constructor(point: Point, triangle?: Triangle | null) {
    this.point = point;
    this.triangle = triangle ?? null;
    this.next = null;
    this.prev = null;
    this.value = point.x;
  }
}

/**
 * Advancing Front data structure used in the Poly2Tri triangulation algorithm.
 * Maintains a doubly-linked list of nodes with efficient search capabilities.
 */
export class AdvancingFront {
  /** Head (leftmost) node of the advancing front */
  private head_: AdvancingFrontNode;
  
  /** Tail (rightmost) node of the advancing front */
  private tail_: AdvancingFrontNode;
  
  /** Cached node for optimized searching */
  private search_node_: AdvancingFrontNode;

  /**
   * Creates a new AdvancingFront
   * @param head - The head node of the front
   * @param tail - The tail node of the front
   */
  constructor(head: AdvancingFrontNode, tail: AdvancingFrontNode) {
    this.head_ = head;
    this.tail_ = tail;
    this.search_node_ = head;
  }

  /**
   * Gets the head node of the advancing front
   * @returns The head node
   */
  head(): AdvancingFrontNode {
    return this.head_;
  }

  /**
   * Sets the head node of the advancing front
   * @param node - The new head node
   */
  setHead(node: AdvancingFrontNode): void {
    this.head_ = node;
  }

  /**
   * Gets the tail node of the advancing front
   * @returns The tail node
   */
  tail(): AdvancingFrontNode {
    return this.tail_;
  }

  /**
   * Sets the tail node of the advancing front
   * @param node - The new tail node
   */
  setTail(node: AdvancingFrontNode): void {
    this.tail_ = node;
  }

  /**
   * Gets the current search node
   * @returns The search node
   */
  search(): AdvancingFrontNode {
    return this.search_node_;
  }

  /**
   * Sets the search node for optimized lookups
   * @param node - The new search node
   */
  setSearch(node: AdvancingFrontNode): void {
    this.search_node_ = node;
  }

  /**
   * Finds and returns the current search node
   * @returns The search node
   */
  findSearchNode(): AdvancingFrontNode {
    return this.search_node_;
  }

  /**
   * Locates a node by x-coordinate value using bidirectional search
   * @param x - The x-coordinate to search for
   * @returns The node at or before the given x-coordinate, or null if not found
   */
  locateNode(x: number): AdvancingFrontNode | null {
    let node = this.search_node_;

    if (x < node.value) {
      // Search backwards
      while (node = node.prev!) {
        if (x >= node.value) {
          this.search_node_ = node;
          return node;
        }
      }
    } else {
      // Search forwards
      while (node = node.next!) {
        if (x < node.value) {
          this.search_node_ = node.prev!;
          return node.prev;
        }
      }
    }

    return null;
  }

  /**
   * Locates the node containing the specified point
   * @param point - The point to search for
   * @returns The node containing the point, or null if not found
   * @throws Error if the point lookup is invalid
   */
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
            throw new Error("poly2tri Invalid AdvancingFront.locatePoint() call");
          }
          node = node.next!;
        }
      }
    } else if (x < nodeX) {
      // Search backwards
      while ((node = node.prev!) && point !== node.point);
    } else {
      // Search forwards
      while ((node = node.next!) && point !== node.point);
    }

    if (node) {
      this.search_node_ = node;
    }

    return node;
  }
}

/**
 * Represents a 2D point
 */
interface Point {
  /** X-coordinate */
  x: number;
  /** Y-coordinate */
  y: number;
}

/**
 * Represents a triangle in the triangulation
 */
interface Triangle {
  // Triangle properties would be defined based on the actual implementation
}