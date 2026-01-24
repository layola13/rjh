import Flatten from 'flatten-js';
import { Frametify } from './frametify';
import { WinPolygon, PolygonCreator, PolyType } from './polygon';
import { EventType, AngledFrameSettings } from './events';

/**
 * Configuration for edge control behavior
 */
interface EdgeControlConfig {
  /** Whether the edge is an arc */
  arc: boolean;
  /** Whether the edge is an endpoint */
  endpoint: boolean;
}

/**
 * Represents an angled hexagonal polygon with customizable dimensions.
 * This polygon has six sides with two angled cuts at specific corners.
 */
export class AngledHexagonPoly extends WinPolygon {
  /** Center point of the polygon */
  public cpt: Flatten.Point;
  
  /** Total width of the hexagon */
  public width: number;
  
  /** Total height of the hexagon */
  public height: number;
  
  /** Width of the angled cut sections */
  public remainingWidth: number;
  
  /** Height of the angled cut sections */
  public remainingHeight: number;

  /**
   * Creates a new AngledHexagonPoly instance
   * @param center - Center point of the polygon
   * @param width - Total width (default: 2400)
   * @param height - Total height (default: 1920)
   * @param remainingWidth - Width of angled sections (default: 600)
   * @param remainingHeight - Height of angled sections (default: 520)
   * @param edges - Optional pre-computed edges
   */
  constructor(
    center: Flatten.Point,
    width: number,
    height: number,
    remainingWidth: number,
    remainingHeight: number,
    edges?: Flatten.Segment[]
  ) {
    const computedEdges = edges || AngledHexagonPoly.create(center, width, height, remainingWidth, remainingHeight).edges;
    super(computedEdges);
    
    this.cpt = center;
    this.width = width;
    this.height = height;
    this.remainingWidth = remainingWidth;
    this.remainingHeight = remainingHeight;
  }

  /**
   * Factory method to create an angled hexagon polygon
   * @param center - Center point (default: origin)
   * @param width - Total width (default: 2400)
   * @param height - Total height (default: 1920)
   * @param remainingWidth - Width of angled sections (default: 600)
   * @param remainingHeight - Height of angled sections (default: 520)
   * @returns A new WinPolygon with translated edges
   */
  static create(
    center: Flatten.Point = Flatten.point(),
    width: number = 2400,
    height: number = 1920,
    remainingWidth: number = 600,
    remainingHeight: number = 520
  ): WinPolygon {
    const vertices = [
      Flatten.point(0, 0),
      Flatten.point(width, 0),
      Flatten.point(width, remainingHeight - height),
      Flatten.point(width - remainingWidth, -height),
      Flatten.point(remainingWidth, -height),
      Flatten.point(0, remainingHeight - height)
    ];

    let polygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment(vertices)
    );

    const translationVector = Flatten.vector(polygon.box.center, center);
    polygon = polygon.translate(translationVector);

    return new AngledHexagonPoly(center, width, height, remainingWidth, remainingHeight, polygon.edges);
  }

  /**
   * Number of cut angles in this polygon
   */
  get cutAnglesCount(): number {
    return 2;
  }

  /**
   * Whether dimension control is enabled for this polygon
   */
  get controlDimFlag(): boolean {
    return true;
  }

  /**
   * Serializes the polygon to JSON format
   * @returns JSON representation of the polygon
   */
  toJSON(): Record<string, unknown> {
    const baseJSON = super.toJSON();
    
    return {
      ...baseJSON,
      type: PolyType.angledHexagon,
      cpt: this.cpt.toJSON(),
      width: this.width,
      height: this.height,
      rw: this.remainingWidth,
      rh: this.remainingHeight
    };
  }

  /**
   * Translates the polygon by a given vector
   * @param vector - Translation vector
   * @returns This polygon instance for chaining
   */
  translate(vector: Flatten.Vector): this {
    super.translate(vector);
    return this;
  }

  /**
   * Drags an edge of the polygon by a given vector
   * @param edgeIndex - Index of the edge to drag (0-5)
   * @param dragVector - Vector by which to drag the edge
   * @returns New polygon instance with updated dimensions
   */
  dragEdge(edgeIndex: number, dragVector: Flatten.Vector): AngledHexagonPoly {
    const edges = this.edges;
    const edgeLine = Flatten.line(edges[edgeIndex].start, edges[edgeIndex].end);
    const translatedLine = Flatten.line(
      edgeLine.pt.translate(dragVector),
      edgeLine.norm
    );
    
    const projectedVector = dragVector.projectionOn(edgeLine.norm);

    if (edgeIndex === 3) {
      // Drag bottom edge
      edges[3] = edges[3].translate(projectedVector);
      edges[2] = Flatten.segment(edges[1].end, edges[3].start);
      edges[4] = Flatten.segment(edges[3].end, edges[4].end);

      const rightEdge = edges[2];
      if (Flatten.Utils.EQ_0(rightEdge.slope - Math.PI)) {
        return this;
      }

      const previousRemainingHeight = this.remainingHeight;
      this.remainingHeight = rightEdge.length * Math.abs(Math.sin(rightEdge.slope));
      this.remainingWidth = rightEdge.length * Math.abs(Math.cos(rightEdge.slope));
      this.height = this.height - previousRemainingHeight + this.remainingHeight;
      this.cpt = Flatten.segment(edges[3].middle(), edges[0].middle()).middle();
    } else if (edgeIndex !== 2 && edgeIndex !== 4) {
      if (edgeIndex === 5) {
        // Drag left angled edge
        edges[5] = edges[5].translate(projectedVector);
        const intersection = translatedLine.intersect(
          Flatten.line(edges[4].start, edges[4].end)
        )[0];
        edges[4] = Flatten.segment(edges[4].start, intersection);
        
        const leftEdge = edges[4];
        this.remainingWidth = leftEdge.length * Math.abs(Math.cos(leftEdge.slope));
        this.width = edges[3].length + 2 * this.remainingWidth;
        this.remainingHeight = leftEdge.length * Math.abs(Math.sin(leftEdge.slope));
        this.cpt = Flatten.segment(edges[3].middle(), edges[0].middle()).middle();
      } else if (edgeIndex === 1) {
        // Drag right angled edge
        const intersection = translatedLine.intersect(
          Flatten.line(edges[2].start, edges[2].end)
        )[0];
        edges[2] = Flatten.segment(intersection, edges[2].end);
        
        const rightEdge = edges[2];
        this.remainingWidth = rightEdge.length * Math.abs(Math.cos(rightEdge.slope));
        this.width = edges[3].length + 2 * this.remainingWidth;
        this.remainingHeight = rightEdge.length * Math.abs(Math.sin(rightEdge.slope));
        this.cpt = Flatten.segment(edges[3].middle(), edges[0].middle()).middle();
      } else if (edgeIndex === 0) {
        // Drag top edge
        edges[0] = edges[0].translate(projectedVector);
        Frametify.edgeIntersection(edges, 0);
        Frametify.edgeIntersection(edges, (0 + edges.length - 1) % edges.length);
        this.height = edges[1].length + this.remainingHeight;
        this.cpt = Flatten.segment(edges[3].middle(), edges[0].middle()).middle();
      }
    }

    return new AngledHexagonPoly(
      this.cpt,
      this.width,
      this.height,
      this.remainingWidth,
      this.remainingHeight
    );
  }

  /**
   * Edits polygon dimensions by dragging a specific dimension control point
   * @param dimIndex - Index of the dimension control (0-5)
   * @param point - Control point (unused in current implementation)
   * @param adjustVector - Vector adjustment for the dimension
   * @returns New polygon instance with updated dimensions
   */
  editDim(
    dimIndex: number,
    point: Flatten.Point,
    adjustVector: Flatten.Vector
  ): AngledHexagonPoly {
    const edges = this.edges;

    // Edit top edge height
    if (dimIndex === 2 || dimIndex === 0) {
      edges[0] = edges[0].translate(adjustVector.invert());
      Frametify.edgeIntersection(edges, 0);
      Frametify.edgeIntersection(edges, (0 + edges.length - 1) % edges.length);
      
      this.height = edges[1].length + this.remainingHeight;
      this.cpt = Flatten.segment(edges[3].middle(), edges[0].middle()).middle();
      
      return new AngledHexagonPoly(
        this.cpt,
        this.width,
        this.height,
        this.remainingWidth,
        this.remainingHeight
      );
    }

    // Edit right angled section
    if (dimIndex === 1) {
      const halfAdjustment = adjustVector.multiply(0.5);
      return this.dragEdge(dimIndex, halfAdjustment);
    }

    // Edit left angled section horizontal
    if (dimIndex === 4) {
      const edgeLine = Flatten.line(edges[4].start, edges[4].end);
      const translatedLine = Flatten.line(
        edgeLine.pt.translate(adjustVector.multiply(0.5)),
        edgeLine.norm
      );
      
      const projectedVector = adjustVector.projectionOn(edgeLine.norm);
      const intersection = translatedLine.intersect(
        Flatten.line(edges[3].start, edges[3].end)
      )[0];
      
      const newSegment = Flatten.segment(intersection, edges[4].end);
      if (newSegment instanceof Flatten.Segment) {
        this.remainingWidth = newSegment.length * Math.abs(Math.cos(newSegment.slope));
      }
      
      return new AngledHexagonPoly(
        this.cpt,
        this.width,
        this.height,
        this.remainingWidth,
        this.remainingHeight
      );
    }

    // Edit bottom angled cut width
    if (dimIndex === 3) {
      const newSegment = Flatten.segment(
        edges[2].start.translate(adjustVector.invert()),
        edges[2].end
      );
      
      this.remainingWidth = Math.sqrt(
        Math.pow(newSegment.length, 2) - Math.pow(this.remainingHeight, 2)
      );
      this.width = edges[3].length + 2 * this.remainingWidth;
      this.cpt = Flatten.segment(edges[3].middle(), edges[0].middle()).middle();
      
      return new AngledHexagonPoly(
        this.cpt,
        this.width,
        this.height,
        this.remainingWidth,
        this.remainingHeight
      );
    }

    // Edit left angled cut width
    if (dimIndex === 5) {
      const newSegment = Flatten.segment(
        edges[4].start,
        edges[4].end.translate(adjustVector)
      );
      
      this.remainingWidth = Math.sqrt(
        Math.pow(newSegment.length, 2) - Math.pow(this.remainingHeight, 2)
      );
      this.width = edges[3].length + 2 * this.remainingWidth;
      this.cpt = Flatten.segment(edges[3].middle(), edges[0].middle()).middle();
      
      return new AngledHexagonPoly(
        this.cpt,
        this.width,
        this.height,
        this.remainingWidth,
        this.remainingHeight
      );
    }

    return this;
  }

  /**
   * Handles vertex dragging (not implemented for this polygon type)
   * @returns This polygon instance unchanged
   */
  dragVertex(): this {
    return this;
  }

  /**
   * Creates a clone of this polygon
   * @returns New polygon instance with same properties
   */
  protected _clone(): AngledHexagonPoly {
    return new AngledHexagonPoly(
      this.cpt,
      this.width,
      this.height,
      this.remainingWidth,
      this.remainingHeight,
      this.edges
    );
  }

  /**
   * Initializes control points for all six edges
   */
  protected initPoly(): void {
    for (let edgeIndex = 0; edgeIndex < 6; edgeIndex++) {
      this.ctlRobs.set(edgeIndex, {
        arc: false,
        endpoint: true
      });
    }
  }

  /**
   * Raises a frame event for angled frame settings
   * @param event - Event object containing view information
   */
  raiseFrameEvent(event: { view: { eventBus: { emit: (event: unknown) => void } } }): void {
    event.view.eventBus.emit({
      type: EventType.angled_frame_settings,
      payload: new AngledFrameSettings(event, event.view)
    });
  }
}