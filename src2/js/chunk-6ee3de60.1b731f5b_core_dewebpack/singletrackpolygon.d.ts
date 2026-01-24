import { Point, Vector, Segment } from './geometry';
import { Direction } from './direction';
import { DrawParams } from './draw-params';
import { Frametify, SingleTrackFrametify } from './frametify';
import { EventType, SingleTrackFrameSettings } from './events';
import { WinPolygon, PolyType, PolygonCreator } from './polygon';

/**
 * Control point configuration for polygon edges
 */
interface ControlPointConfig {
  /** Whether this control point represents an arc */
  arc: boolean;
  /** Whether this control point is an endpoint */
  endpoint: boolean;
}

/**
 * Dimension information for polygon edges
 */
interface DimensionInfo {
  /** Edge index */
  idx: number;
  /** Whether dimension should be displayed */
  dimShow: boolean;
}

/**
 * Bounding box representation
 */
interface Box {
  /** Minimum X coordinate */
  xmin: number;
  /** Maximum X coordinate */
  xmax: number;
  /** Minimum Y coordinate */
  ymin: number;
  /** Maximum Y coordinate */
  ymax: number;
  /** Center point of the box */
  center: Point;
}

/**
 * JSON serialization format for SingleTrackPolygon
 */
interface SingleTrackPolygonJSON {
  /** Polygon type identifier */
  type: PolyType;
  /** Center position */
  cpt: unknown;
  /** Hidden edge directions */
  ep: Direction[];
  /** Pulling height values */
  ph: number[];
}

/**
 * SingleTrackPolygon represents a specialized window polygon for single-track systems.
 * Extends WinPolygon to provide track-specific functionality including edge hiding,
 * pulling height management, and custom dimension behavior.
 */
export class SingleTrackPolygon extends WinPolygon {
  /** Center position of the polygon */
  private readonly position: Point;
  
  /** Directions of hidden edges */
  private readonly hidden: Direction[];
  
  /** Default size of the polygon in millimeters */
  private readonly size: number = 2100;
  
  /** Map of pulling heights indexed by direction */
  private pullingHeight: Map<Direction, number>;
  
  /** Map of internal to external edge indices */
  private imIdx!: Map<number, number>;
  
  /** Map of control point configurations */
  private ctlRobs!: Map<number, ControlPointConfig>;

  /**
   * Creates a SingleTrackPolygon instance
   * @param position - Center position of the polygon
   * @param hidden - Array of directions indicating which edges should be hidden (defaults to [Direction.Right])
   * @param edges - Optional array of edges; if not provided, edges will be auto-generated
   */
  constructor(position: Point, hidden: Direction[] = [Direction.Right], edges?: Segment[]) {
    super(edges);
    this.position = position;
    this.hidden = hidden;
    this.pullingHeight = new Map<Direction, number>();
    
    if (!edges) {
      this.initLayout();
    }
  }

  /**
   * Factory method to create a SingleTrackPolygon from a bounding box
   * @param box - Bounding box defining the polygon extents
   * @param hidden - Array of directions for hidden edges
   * @returns New SingleTrackPolygon instance
   */
  static createFromBox(box: Box, hidden: Direction[]): SingleTrackPolygon {
    const bottomLeft = Point.create(box.xmin, box.ymin);
    const topLeft = Point.create(box.xmin, box.ymax);
    const topRight = Point.create(box.xmax, box.ymax);
    const bottomRight = Point.create(box.xmax, box.ymin);
    
    const edges = [
      Segment.create(bottomLeft, topLeft),
      Segment.create(topLeft, topRight),
      Segment.create(topRight, bottomRight),
      Segment.create(bottomRight, bottomLeft)
    ];
    
    return new SingleTrackPolygon(box.center, hidden, edges);
  }

  /**
   * Gets the valid edge-joint-window IDs based on hidden edges
   * @returns Array of valid edge indices (0-3)
   */
  get validEjwIds(): number[] {
    const invalidIds: number[] = [];
    
    if (this.hidden.some(dir => dir === Direction.Left)) {
      invalidIds.push(0, 1);
    }
    if (this.hidden.some(dir => dir === Direction.Right)) {
      invalidIds.push(2, 3);
    }
    if (this.hidden.some(dir => dir === Direction.Down)) {
      invalidIds.push(1, 2);
    }
    if (this.hidden.some(dir => dir === Direction.Up)) {
      invalidIds.push(3, 0);
    }
    
    return [0, 1, 2, 3].filter(id => !invalidIds.includes(id));
  }

  /**
   * Gets the boundary polygon
   * @returns New WinPolygon representing the boundary
   */
  get boundary(): WinPolygon {
    return new WinPolygon(this.edges);
  }

  /**
   * Indicates whether this polygon is a simple closed shape
   * @returns Always false for single-track polygons
   */
  get isSimpleClosed(): boolean {
    return false;
  }

  /**
   * Serializes the polygon to JSON format
   * @returns JSON representation of the polygon
   */
  toJSON(): SingleTrackPolygonJSON {
    const json = super.toJSON() as SingleTrackPolygonJSON;
    json.type = PolyType.singleTrack;
    json.cpt = this.position.toJSON();
    json.ep = this.hidden;
    json.ph = Array.from(this.pullingHeight.values());
    return json;
  }

  /**
   * Creates a deep clone of this polygon
   * @returns Cloned SingleTrackPolygon instance
   */
  protected _clone(): SingleTrackPolygon {
    const cloned = new SingleTrackPolygon(this.position, this.hidden);
    cloned.pullingHeight = this.pullingHeight;
    return cloned;
  }

  /**
   * Initializes polygon control points and internal index mapping based on hidden edges
   */
  private initPoly(): void {
    // Initialize all control points as endpoints
    for (let i = 0; i < 4; i++) {
      this.ctlRobs.set(i, { arc: false, endpoint: true });
    }
    
    // Set up 1:1 index mapping
    this.imIdx = new Map([
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3]
    ]);
    
    if (!this.hidden) return;
    
    // Disable control points for hidden edges
    if (this.hidden.some(dir => dir === Direction.Right)) {
      this.ctlRobs.set(2, { arc: false, endpoint: false });
      this.ctlRobs.set(3, { arc: false, endpoint: false });
    }
    if (this.hidden.some(dir => dir === Direction.Left)) {
      this.ctlRobs.set(0, { arc: false, endpoint: false });
      this.ctlRobs.set(1, { arc: false, endpoint: false });
    }
    if (this.hidden.some(dir => dir === Direction.Down)) {
      this.ctlRobs.set(1, { arc: false, endpoint: false });
      this.ctlRobs.set(2, { arc: false, endpoint: false });
    }
    if (this.hidden.some(dir => dir === Direction.Up)) {
      this.ctlRobs.set(3, { arc: false, endpoint: false });
      this.ctlRobs.set(0, { arc: false, endpoint: false });
    }
  }

  /**
   * Initializes the polygon layout with default dimensions
   */
  private initLayout(): void {
    this.initPoly();
    this.clear();
    
    const halfSize = this.size / 2;
    const startPoint = Point.create(-halfSize, -halfSize);
    
    const relativeVectors = [
      Vector.create(0, this.size),
      Vector.create(this.size, 0),
      Vector.create(0, -this.size)
    ];
    
    const polygonEdges = PolygonCreator.Ins.joinRelativePro(relativeVectors, startPoint).edges;
    polygonEdges.forEach(edge => this.add(edge));
    
    this.done();
    this.translate(Vector.create(this.position.x, this.position.y));
  }

  /**
   * Converts the polygon into a frame structure
   * @param param1 - First frametify parameter
   * @param param2 - Second frametify parameter
   * @returns SingleTrackFrametify instance
   */
  frametify(param1: unknown, param2: unknown): SingleTrackFrametify {
    return new SingleTrackFrametify(this).run(param1, param2);
  }

  /**
   * Maps internal edge index to external index
   * @param innerIdx - Internal edge index
   * @returns External edge index or undefined if not mapped
   */
  idxFromInner(innerIdx: number): number | undefined {
    return this.imIdx.get(innerIdx);
  }

  /**
   * Drags an edge by the specified vector
   * @param edgeIdx - Index of the edge to drag
   * @param dragVector - Translation vector
   * @param origin - Optional origin point (defaults to origin)
   * @returns New SingleTrackPolygon with updated edge
   */
  dragEdge(edgeIdx: number, dragVector: Vector, origin: Point = Point.create()): SingleTrackPolygon {
    const newEdges = this.edges;
    newEdges[edgeIdx] = newEdges[edgeIdx].translate(dragVector);
    
    const edgeCount = newEdges.length;
    Frametify.edgeIntersection(newEdges, (edgeIdx + edgeCount - 1) % edgeCount);
    Frametify.edgeIntersection(newEdges, edgeIdx);
    
    const newPolygon = new SingleTrackPolygon(this.position, this.hidden, newEdges);
    newPolygon.pullingHeight = this.pullingHeight;
    return newPolygon;
  }

  /**
   * Drags an arc edge (delegates to dragEdge for single-track polygons)
   * @param edgeIdx - Index of the arc edge
   * @param dragVector - Translation vector
   * @returns New SingleTrackPolygon with updated arc
   */
  dragArc(edgeIdx: number, dragVector: Vector): SingleTrackPolygon {
    return this.dragEdge(edgeIdx, dragVector);
  }

  /**
   * Drags a vertex (delegates to dragEdge for single-track polygons)
   * @param edgeIdx - Index of the edge connected to the vertex
   * @param dragVector - Translation vector
   * @param param3 - Additional parameter (unused)
   * @param origin - Optional origin point (defaults to origin)
   * @returns New SingleTrackPolygon with updated vertex
   */
  dragVertex(
    edgeIdx: number,
    dragVector: Vector,
    param3: unknown,
    origin: Point = Point.create()
  ): SingleTrackPolygon {
    return this.dragEdge(edgeIdx, dragVector);
  }

  /**
   * Updates the pulling height label display
   * @param label - Label object to update
   */
  updatePullingHeightLabel(label: { text: string; position: Point; fontSize: number; hidden: boolean; updatePoly(): void }): void {
    const pullingHeight = this.pullingHeight.get(Direction.Down);
    
    if (pullingHeight) {
      label.text = DrawParams.Ins.lang('pulling_height') + pullingHeight.toString();
      label.position = this.edge(1).middle();
      label.position = label.position.translate(
        Vector.create(0, 0.75 * label.fontSize / 2 - pullingHeight)
      );
    }
    
    label.hidden = !pullingHeight;
    label.updatePoly();
  }

  /**
   * Migrates pulling height to a split sub-polygon
   * @param splitResult - Result object containing splitter information
   */
  pullingHeightMigration(splitResult: { splitter: { subs: Array<{ IsMullion: boolean; polyId: number; polygon: { box: Box } }>; setPullingHeight(polyId: number, height: number): void } }): void {
    const pullingHeight = this.pullingHeight.get(Direction.Down);
    if (!pullingHeight) return;
    
    const nonMullionSubs = splitResult.splitter.subs.filter(sub => !sub.IsMullion);
    const topMostSub = nonMullionSubs.sort((a, b) => 
      a.polygon.box.ymax - b.polygon.box.ymax
    ).pop();
    
    if (topMostSub) {
      splitResult.splitter.setPullingHeight(topMostSub.polyId, pullingHeight);
      this.pullingHeight.clear();
    }
  }

  /**
   * Initializes dimension information for all edges
   * @returns Array of dimension info objects
   */
  initDimInfo(): DimensionInfo[] {
    const dimInfo = super.initDimInfo() as DimensionInfo[];
    
    dimInfo[0].dimShow = false;
    dimInfo[1] = { idx: 1, dimShow: true };
    dimInfo[2] = { idx: 2, dimShow: true };
    dimInfo[3].dimShow = false;
    
    return dimInfo;
  }

  /**
   * Raises a frame settings event
   * @param context - Event context containing view information
   */
  raiseFrameEvent(context: { view: { eventBus: { emit(event: unknown): void } } }): void {
    context.view.eventBus.emit({
      type: EventType.single_track_frame_settings,
      payload: new SingleTrackFrameSettings(context, context.view)
    });
  }
}