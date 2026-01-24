import { Point, Vector, Segment, Line } from './geometry';
import { WinPolygon, PolygonCreator, PolyType } from './polygon';
import { DockType } from './dock';
import { KfcFrametify } from './frametify';

/**
 * Control point configuration for polygon vertices
 */
interface ControlPointConfig {
  /** Whether the point can form an arc */
  arc: boolean;
  /** Whether the point is an endpoint */
  endpoint: boolean;
}

/**
 * JSON serialization format for KfcPolygon
 */
interface KfcPolygonJSON {
  /** Polygon type identifier */
  type: PolyType;
  /** Center position point */
  cpt: { x: number; y: number };
  /** Bottom inner dimension flag */
  bid: boolean;
  [key: string]: unknown;
}

/**
 * KFC-style polygon shape with specific edge configuration
 * 
 * This polygon represents a specialized shape with 8 edges arranged in a
 * specific pattern commonly used in KFC store layouts. It features:
 * - Fixed size of 2100 units
 * - 8 control points with varying constraints
 * - Special handling for inner dimensions and pulling height
 * - Custom edge dragging behavior for maintaining shape constraints
 */
export class KfcPolygon extends WinPolygon {
  /** Center position of the polygon */
  private position: Point;
  
  /** Fixed size dimension of the polygon */
  private readonly size: number = 2100;
  
  /** Vertical pulling/extrusion height */
  public pullingHeight: number = 0;
  
  /** Flag indicating whether bottom inner dimensions should be used */
  public bottomInnerDim: boolean = false;
  
  /** Map of control point configurations indexed by vertex number */
  private ctlRobs: Map<number, ControlPointConfig>;
  
  /** Map of inner index to outer index mappings */
  private imIdx: Map<number, number>;

  /**
   * Creates a new KfcPolygon instance
   * @param position - Center position of the polygon
   * @param edges - Optional array of segments defining the polygon edges
   */
  constructor(position: Point, edges?: Segment[]) {
    super(edges ?? []);
    this.position = position;
    this.ctlRobs = new Map();
    this.imIdx = new Map();
    
    if (!edges) {
      this.initLayout();
    }
  }

  /**
   * Indicates this polygon has dimensional control flags
   */
  get controlDimFlag(): boolean {
    return true;
  }

  /**
   * Computes the boundary polygon from specific edge endpoints
   * Returns a simplified 6-vertex polygon from the 8-edge structure
   */
  get boundary(): WinPolygon {
    const edges = this.edges;
    return new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[0].end,
        edges[1].end,
        edges[2].end,
        edges[4].end,
        edges[6].end,
        edges[7].end
      ])
    );
  }

  /**
   * Indicates this polygon is not a simple closed shape
   */
  get isSimpleClosed(): boolean {
    return false;
  }

  /**
   * Returns indices that can have multiple edges
   */
  get asMulEdgeIndexes(): number[] {
    return [3, 5];
  }

  /**
   * Serializes the polygon to JSON format
   */
  toJSON(): KfcPolygonJSON {
    const json = super.toJSON() as KfcPolygonJSON;
    json.type = PolyType.kfc;
    json.cpt = this.position.toJSON();
    json.bid = this.bottomInnerDim;
    return json;
  }

  /**
   * Creates a deep clone of this polygon
   */
  protected _clone(): KfcPolygon {
    const clonedEdges: Segment[] = [];
    this.edges.forEach((edge) => {
      clonedEdges.push(edge.clone());
    });
    return new KfcPolygon(this.position, clonedEdges);
  }

  /**
   * Initializes control point configurations and index mappings
   */
  private initPoly(): void {
    // Set standard control points (0-3, 6-7) as arc-disabled endpoints
    for (let i = 0; i < 8; i++) {
      this.ctlRobs.set(i, { arc: false, endpoint: true });
    }
    
    // Points 4 and 5 are interior points, not endpoints
    this.ctlRobs.set(4, { arc: false, endpoint: false });
    this.ctlRobs.set(5, { arc: false, endpoint: false });
    
    // Map inner indices to outer frame indices
    this.imIdx = new Map([
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 3], [5, 4], [6, 5], [7, 0],
      [8, 5], [9, 6], [10, 7], [11, 0]
    ]);
  }

  /**
   * Initializes the polygon layout with default edges positioned at center
   */
  private initLayout(): void {
    this.clear();
    const edges = this.initEdges();
    edges.forEach((edge) => this.add(edge));
    this.done();
    this.translate(Vector.create(this.position.x, this.position.y));
  }

  /**
   * Creates the initial set of 8 edges forming the KFC polygon shape
   * 
   * The shape is divided into thirds horizontally, creating a specific
   * pattern with interior vertices at 1/3 and 2/3 positions
   */
  private initEdges(): Segment[] {
    const third = this.size / 3;
    
    // Define key points (origin at top-left)
    const p0 = Point.create(0, 0);
    const p1 = Point.create(third, 0);
    const p2 = Point.create(2 * third, 0);
    const p3 = Point.create(3 * third, 0);
    
    const p4 = Point.create(0, this.size);
    const p5 = Point.create(third, this.size);
    const p6 = Point.create(2 * third, this.size);
    const p7 = Point.create(3 * third, this.size);
    
    // Create 8 segments forming the polygon
    const segments = [
      Segment.create(p3, p0),  // 0: top-right to top-left
      Segment.create(p0, p4),  // 1: top-left to bottom-left
      Segment.create(p4, p5),  // 2: bottom-left to bottom-third
      Segment.create(p5, p1),  // 3: bottom-third to top-third (vertical)
      Segment.create(p5, p6),  // 4: bottom-third to bottom-two-thirds
      Segment.create(p2, p6),  // 5: top-two-thirds to bottom-two-thirds (vertical)
      Segment.create(p6, p7),  // 6: bottom-two-thirds to bottom-right
      Segment.create(p7, p3)   // 7: bottom-right to top-right
    ];
    
    // Translate to center the polygon
    const offset = Vector.create(-this.size / 2, -this.size / 2);
    return segments.map((segment) => segment.translate(offset));
  }

  /**
   * Converts the polygon to frame representation with frametify algorithm
   * @param param1 - First frametify parameter
   * @param param2 - Second frametify parameter
   */
  frametify(param1: unknown, param2: unknown): unknown {
    return new KfcFrametify(this).run(param1, param2);
  }

  /**
   * Maps an inner index to its corresponding outer index
   * @param innerIndex - The inner index to look up
   */
  idxFromInner(innerIndex: number): number | undefined {
    return this.imIdx.get(innerIndex);
  }

  /**
   * Handles dragging of polygon edges while maintaining shape constraints
   * 
   * @param edgeIndex - Index of the edge being dragged (0-7)
   * @param dragVector - Translation vector for the drag operation
   * @param referencePoint - Optional reference point for the drag
   * @returns New KfcPolygon instance with updated edge positions
   */
  dragEdge(
    edgeIndex: number,
    dragVector: Vector,
    referencePoint: Point = Point.create()
  ): KfcPolygon {
    let edges = this.edges;
    
    // Create line through dragged edge translated by drag vector
    const draggedEdge = edges[edgeIndex];
    let dragLine = Line.create(draggedEdge.start, draggedEdge.end);
    dragLine = Line.create(dragLine.pt.translate(dragVector), dragLine.norm);
    
    // Handle different edge indices with specific constraint logic
    if (edgeIndex === 1 || edgeIndex === 7) {
      // Vertical outer edges - use parent class logic
      edges = super.dragEdge(edgeIndex, dragVector, referencePoint).edges;
      
    } else if (edgeIndex === 2 || edgeIndex === 4 || edgeIndex === 6) {
      // Horizontal bottom edges - maintain vertical alignment
      const intersect1 = dragLine.intersect(Line.create(edges[1].start, edges[1].end))[0];
      const intersect3 = dragLine.intersect(Line.create(edges[3].start, edges[3].end))[0];
      const intersect5 = dragLine.intersect(Line.create(edges[5].start, edges[5].end))[0];
      const intersect7 = dragLine.intersect(Line.create(edges[7].start, edges[7].end))[0];
      
      edges[1] = Segment.create(edges[1].start, intersect1);
      edges[2] = Segment.create(intersect1, intersect3);
      edges[3] = Segment.create(intersect3, edges[3].end);
      edges[4] = Segment.create(intersect3, intersect5);
      edges[5] = Segment.create(edges[5].start, intersect5);
      edges[6] = Segment.create(intersect5, intersect7);
      edges[7] = Segment.create(intersect7, edges[7].end);
      
    } else if (edgeIndex === 0) {
      // Top horizontal edge
      const intersect1 = dragLine.intersect(Line.create(edges[1].start, edges[1].end))[0];
      const intersect3 = dragLine.intersect(Line.create(edges[3].start, edges[3].end))[0];
      const intersect5 = dragLine.intersect(Line.create(edges[5].start, edges[5].end))[0];
      const intersect7 = dragLine.intersect(Line.create(edges[7].start, edges[7].end))[0];
      
      edges[0] = Segment.create(intersect7, intersect1);
      edges[1] = Segment.create(intersect1, edges[1].end);
      edges[3] = Segment.create(edges[3].start, intersect3);
      edges[5] = Segment.create(intersect5, edges[5].end);
      edges[7] = Segment.create(edges[7].start, intersect7);
      
    } else if (edgeIndex === 3) {
      // Left interior vertical edge
      const intersect0 = dragLine.intersect(Line.create(edges[0].start, edges[0].end))[0];
      const intersect2 = dragLine.intersect(Line.create(edges[2].start, edges[2].end))[0];
      
      edges[3] = Segment.create(intersect2, intersect0);
      edges[2] = Segment.create(edges[2].start, intersect2);
      edges[4] = Segment.create(intersect2, edges[4].end);
      
    } else if (edgeIndex === 5) {
      // Right interior vertical edge
      const intersect0 = dragLine.intersect(Line.create(edges[0].start, edges[0].end))[0];
      const intersect6 = dragLine.intersect(Line.create(edges[6].start, edges[6].end))[0];
      
      edges[5] = Segment.create(intersect0, intersect6);
      edges[4] = Segment.create(edges[4].start, intersect6);
      edges[6] = Segment.create(intersect6, edges[6].end);
    }
    
    // Create new polygon with updated edges
    const result = new KfcPolygon(this.position, edges);
    result.pullingHeight = this.pullingHeight;
    result.bottomInnerDim = this.bottomInnerDim;
    return result;
  }

  /**
   * Handles dragging of polygon vertices (currently no-op)
   * 
   * @param vertexIndex - Index of the vertex being dragged
   * @param dragVector - Translation vector for the drag
   * @param param3 - Additional parameter
   * @param referencePoint - Optional reference point
   * @returns The unchanged polygon instance
   */
  dragVertex(
    vertexIndex: number,
    dragVector: Vector,
    param3: unknown,
    referencePoint: Point = Point.create()
  ): KfcPolygon {
    return this;
  }

  /**
   * Fixes frame corner-connected bars for special edges 3 and 5
   * 
   * @param frameBars - Array of frame bar elements
   */
  fixFrameCCBars(frameBars: any[]): void {
    // Handle edge 3 (left interior vertical)
    let bar = frameBars[3];
    this.toMulCCBar(bar);
    bar.connectCount = 
      frameBars[2].epDock.etDock.type === DockType.None && 
      bar.epDock.stDock.type === DockType.None 
        ? 1 
        : 2;
    bar.dockCount = bar.epDock.stDock.type === DockType.Frame ? 2 : 1;
    
    // Handle edge 5 (right interior vertical)
    bar = frameBars[5];
    this.toMulCCBar(bar);
    bar.connectCount = 
      bar.epDock.etDock.type === DockType.None && 
      frameBars[6].epDock.stDock.type === DockType.None 
        ? 1 
        : 2;
    bar.dockCount = bar.epDock.stDock.type === DockType.Frame ? 2 : 1;
  }
}