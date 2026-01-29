interface Polygon {
  clone(): Polygon;
  flip(): void;
  plane: Plane;
}

interface Plane {
  clone(): Plane;
  flip(): void;
  splitPolygon(
    polygon: Polygon,
    coplanarFront: Polygon[],
    coplanarBack: Polygon[],
    front: Polygon[],
    back: Polygon[]
  ): void;
}

/**
 * Binary Space Partitioning (BSP) Tree Node
 * Represents a node in a BSP tree used for polygon partitioning and CSG operations
 */
class BSPNode {
  plane: Plane | null = null;
  front: BSPNode | null = null;
  back: BSPNode | null = null;
  polygons: Polygon[] = [];

  constructor(polygons?: Polygon[]) {
    if (polygons) {
      this.build(polygons);
    }
  }

  /**
   * Creates a deep copy of this BSP node
   */
  clone(): BSPNode {
    const node = new BSPNode();
    node.plane = this.plane?.clone() ?? null;
    node.front = this.front?.clone() ?? null;
    node.back = this.back?.clone() ?? null;
    node.polygons = this.polygons.map(polygon => polygon.clone());
    return node;
  }

  /**
   * Inverts the node by flipping all polygons and swapping front/back subtrees
   */
  invert(): void {
    for (let i = 0; i < this.polygons.length; i++) {
      this.polygons[i].flip();
    }
    
    this.plane?.flip();
    this.front?.invert();
    this.back?.invert();

    const temp = this.front;
    this.front = this.back;
    this.back = temp;
  }

  /**
   * Clips a list of polygons against this BSP tree
   */
  clipPolygons(polygons: Polygon[]): Polygon[] {
    if (!this.plane) {
      return polygons.slice();
    }

    let frontPolygons: Polygon[] = [];
    let backPolygons: Polygon[] = [];

    for (let i = 0; i < polygons.length; i++) {
      this.plane.splitPolygon(
        polygons[i],
        frontPolygons,
        backPolygons,
        frontPolygons,
        backPolygons
      );
    }

    if (this.front) {
      frontPolygons = this.front.clipPolygons(frontPolygons);
    }

    backPolygons = this.back ? this.back.clipPolygons(backPolygons) : [];

    return frontPolygons.concat(backPolygons);
  }

  /**
   * Clips this node's polygons against another BSP tree
   */
  clipTo(bsp: BSPNode): void {
    this.polygons = bsp.clipPolygons(this.polygons);
    this.front?.clipTo(bsp);
    this.back?.clipTo(bsp);
  }

  /**
   * Returns all polygons in this tree
   */
  allPolygons(): Polygon[] {
    let result = this.polygons.slice();
    
    if (this.front) {
      result = result.concat(this.front.allPolygons());
    }
    
    if (this.back) {
      result = result.concat(this.back.allPolygons());
    }
    
    return result;
  }

  /**
   * Builds a BSP tree from a list of polygons
   */
  build(polygons: Polygon[]): void {
    if (polygons.length === 0) {
      return;
    }

    if (!this.plane) {
      this.plane = polygons[0].plane.clone();
    }

    const frontPolygons: Polygon[] = [];
    const backPolygons: Polygon[] = [];

    for (let i = 0; i < polygons.length; i++) {
      this.plane.splitPolygon(
        polygons[i],
        this.polygons,
        this.polygons,
        frontPolygons,
        backPolygons
      );
    }

    if (frontPolygons.length > 0) {
      if (!this.front) {
        this.front = new BSPNode();
      }
      this.front.build(frontPolygons);
    }

    if (backPolygons.length > 0) {
      if (!this.back) {
        this.back = new BSPNode();
      }
      this.back.build(backPolygons);
    }
  }
}

export default BSPNode;