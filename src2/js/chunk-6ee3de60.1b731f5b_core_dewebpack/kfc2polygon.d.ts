import Flatten from 'flatten-js';
import { Kfc2Frametify } from './Kfc2Frametify';
import { Direction } from './Direction';
import { PolygonCreator } from './PolygonCreator';
import { DoubleEarsPolygon, WinPolygon, PolyType } from './PolygonTypes';

/**
 * Represents edge dimension information for display purposes
 */
interface EdgeDimInfo {
  /** Index of the edge */
  idx: number;
  /** Whether to show dimension annotation */
  dimShow: boolean;
}

/**
 * KFC Type-2 Polygon
 * A specialized double-eared polygon with vertical edges and custom layout
 */
export class Kfc2Polygon extends DoubleEarsPolygon {
  /** Position of the polygon */
  position: Flatten.Point;
  
  /** Whether the polygon has a base */
  hasBase: boolean = false;
  
  /** Array storing pulling height for each edge */
  pullingHeight: number[] = [];

  /**
   * Creates a new KFC Type-2 polygon
   * @param position - The position point of the polygon
   * @param edges - Optional array of edges; if not provided, layout will be initialized
   */
  constructor(position: Flatten.Point, edges?: Flatten.Segment[]) {
    super(position, Direction.Up, edges);
    this.position = position;
    
    if (!edges) {
      this.initLayout();
    }
  }

  /**
   * Gets the boundary polygon of the KFC2 shape
   * @returns A WinPolygon representing the outer boundary
   */
  get boundary(): WinPolygon {
    const edges = this.edges;
    return new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[0].end,
        edges[1].end,
        edges[2].end,
        edges[3].end,
        edges[4].end,
        edges[6].start,
        edges[6].end,
        edges[7].end
      ])
    );
  }

  /**
   * Indicates whether the polygon is a simple closed shape
   * @returns Always false for KFC2 polygons
   */
  get isSimpleClosed(): boolean {
    return false;
  }

  /**
   * Serializes the polygon to JSON format
   * @returns JSON representation with type set to PolyType.kfc2
   */
  toJSON(): object {
    const json = super.toJSON();
    return {
      ...json,
      type: PolyType.kfc2
    };
  }

  /**
   * Creates a deep clone of the polygon
   * @returns A new Kfc2Polygon instance with cloned edges
   */
  protected _clone(): Kfc2Polygon {
    const clonedEdges: Flatten.Segment[] = [];
    this.edges.forEach((edge) => {
      clonedEdges.push(edge.clone());
    });
    return new Kfc2Polygon(this.position, clonedEdges);
  }

  /**
   * Initializes the polygon layout with default geometry
   */
  initLayout(): void {
    this.clear();
    const verticalEdges = this.initVerticalEdges(false);
    verticalEdges.forEach((edge) => {
      this.add(edge);
    });
    this.done();
    this.translate(Flatten.vector(this.position.x, this.position.y));
  }

  /**
   * Initializes vertical edges for the polygon
   * @param useCalculation - Whether to use size calculation (default: true)
   * @returns Array of segments forming the vertical edges
   */
  initVerticalEdges(useCalculation: boolean = true): Flatten.Segment[] {
    const BOX_RATIO = 20 / 7;
    const adjustedSize = this.size - BOX_RATIO * this.smBoxSize;
    
    const edges = PolygonCreator.Ins.joinRelativePro(
      [
        Flatten.vector(-3 * this.smBoxSize, 0),
        Flatten.vector(0, BOX_RATIO * this.smBoxSize),
        Flatten.vector(this.smBoxSize, 0),
        Flatten.vector(0, adjustedSize),
        Flatten.vector(this.smBoxSize, 0),
        Flatten.vector(0, -adjustedSize),
        Flatten.vector(this.smBoxSize, 0),
        Flatten.vector(0, -BOX_RATIO * this.smBoxSize)
      ],
      Flatten.point(2 * this.smBoxSize, 0),
      false
    ).edges;

    // Override specific edges with absolute positioning
    edges[3] = Flatten.segment(
      Flatten.point(),
      Flatten.point(0, this.size)
    );
    edges[5] = Flatten.segment(
      Flatten.point(this.smBoxSize, this.size),
      Flatten.point(this.smBoxSize, 0)
    );

    // Translate all edges to center the polygon
    const offsetVector = Flatten.vector(-this.size / 6, -this.size / 3);
    edges.forEach((edge, index) => {
      edges[index] = edge.translate(offsetVector);
    });

    this.pullingHeight = Array(edges.length).fill(0);
    return edges;
  }

  /**
   * Converts the polygon to a frametify representation
   * @param param1 - First parameter for frametify operation
   * @param param2 - Second parameter for frametify operation
   * @returns Frametify result
   */
  frametify(param1: unknown, param2: unknown): unknown {
    return new Kfc2Frametify(this).run(param1, param2);
  }

  /**
   * Handles edge dragging interaction
   * @param edgeIndex - Index of the edge being dragged
   * @param delta - Delta vector for the drag operation
   * @param point - Optional point parameter (default: origin point)
   * @returns New Kfc2Polygon with updated edges
   */
  dragEdge(
    edgeIndex: number,
    delta: Flatten.Vector,
    point: Flatten.Point = Flatten.point()
  ): Kfc2Polygon {
    const result = super.dragEdge(edgeIndex, delta, point);
    const newPolygon = new Kfc2Polygon(this.position, result.edges);
    newPolygon.pullingHeight = this.pullingHeight;
    return newPolygon;
  }

  /**
   * Initializes dimension information for each edge
   * @returns Record mapping edge indices to dimension info
   */
  initDimInfo(): Record<number, EdgeDimInfo> {
    const dimInfo = super.initDimInfo();
    
    dimInfo[2] = { idx: 2, dimShow: true };
    dimInfo[3] = { idx: 3, dimShow: true };
    dimInfo[4] = { idx: 4, dimShow: true };
    dimInfo[5] = { idx: 5, dimShow: false };
    dimInfo[6] = { idx: 6, dimShow: true };
    dimInfo[7] = { idx: 7, dimShow: true };
    
    return dimInfo;
  }
}