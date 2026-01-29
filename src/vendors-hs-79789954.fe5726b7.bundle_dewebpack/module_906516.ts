interface Point {
  x: number;
  y: number;
}

interface Line {
  start: Point;
  end: Point;
}

interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface RTreeNode extends BoundingBox {
  obj: Line;
}

interface RTreeOptions {
  splitCount?: number;
}

interface RTree {
  load(items: RTreeNode[]): void;
  search(bbox: BoundingBox): RTreeNode[];
}

class LineRTreeIndex {
  private rtree?: RTree;
  private option?: RTreeOptions;

  /**
   * Build the R-tree index from an array of lines
   * @param lines - Array of lines to index
   * @param options - Configuration options
   */
  build(lines: Line[], options?: RTreeOptions): void {
    if (!lines || lines.length <= 0) {
      return;
    }

    const nodes: RTreeNode[] = [];
    this.option = options || {};
    this.option.splitCount = this.option.splitCount || 4;

    const splitCount = this.option.splitCount;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const rects = this._breakLineToRects(line, splitCount);
      for (let j = 0; j < splitCount; j++) {
        nodes.push(rects[j]);
      }
    }

    const createRTree = require(478543);
    const tree = createRTree();
    tree.load(nodes);
    this.rtree = tree;
  }

  /**
   * Insert additional lines into the existing R-tree
   * @param lines - Array of lines to insert
   * @returns Success status
   */
  insert(lines: Line[]): boolean {
    if (!this.rtree) {
      return false;
    }

    const nodes: RTreeNode[] = [];
    const splitCount = this.option?.splitCount ?? 4;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const rects = this._breakLineToRects(line, splitCount);
      for (let j = 0; j < splitCount; j++) {
        nodes.push(rects[j]);
      }
    }

    this.rtree.load(nodes);
    return true;
  }

  /**
   * Search for lines within a distance threshold of a point
   * @param point - Search center point
   * @param threshold - Distance threshold
   * @returns Array of lines within threshold
   */
  searchAtPoint(point: Point, threshold: number): Line[] {
    const bbox: BoundingBox = {
      minX: point.x - threshold,
      minY: point.y - threshold,
      maxX: point.x + threshold,
      maxY: point.y + threshold
    };
    return this.searchInRange(bbox);
  }

  /**
   * Search for lines within a bounding box
   * @param bbox - Bounding box to search
   * @returns Array of lines intersecting the bounding box
   */
  searchInRange(bbox: BoundingBox): Line[] {
    if (!this.rtree) {
      return [];
    }

    const results = this.rtree.search(bbox);
    const uniqueLines: Line[] = [];

    for (let i = 0; i < results.length; i++) {
      const line = results[i].obj;
      if (!uniqueLines.includes(line)) {
        uniqueLines.push(line);
      }
    }

    return uniqueLines;
  }

  /**
   * Calculate Euclidean distance between two points
   */
  private _calcLength(point1: Point, point2: Point): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Break a line into multiple bounding box segments
   * @param line - Line to break into segments
   * @param splitCount - Number of segments to create
   * @returns Array of bounding boxes representing line segments
   */
  private _breakLineToRects(line: Line, splitCount: number): RTreeNode[] {
    const startX = line.start.x;
    const startY = line.start.y;
    const stepX = (line.end.x - startX) / splitCount;
    const stepY = (line.end.y - startY) / splitCount;

    const rects: RTreeNode[] = [];
    let currentX = startX;
    let currentY = startY;

    for (let i = 0; i < splitCount; i++) {
      const nextX = currentX + stepX;
      const nextY = currentY + stepY;

      const rect: RTreeNode = {
        minX: Math.min(currentX, nextX),
        minY: Math.min(currentY, nextY),
        maxX: Math.max(currentX, nextX),
        maxY: Math.max(currentY, nextY),
        obj: line
      };

      rects.push(rect);
      currentX = nextX;
      currentY = nextY;
    }

    return rects;
  }
}

export default LineRTreeIndex;