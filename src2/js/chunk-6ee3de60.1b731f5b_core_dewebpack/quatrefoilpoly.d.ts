import { Vector2D, Matrix, Utils } from './core';
import { WinPolygon, PolygonCreator, PolyType, Edge, DimInfo } from './polygon';

/**
 * Quatrefoil polygon shape - a decorative four-lobed symmetric shape
 * commonly used in Gothic architecture and ornamental design.
 */
export class QuatrefoilPoly extends WinPolygon {
  /**
   * Center point of the quatrefoil
   */
  public cpt: Vector2D;

  /**
   * Width of the bounding rectangle
   */
  public rectWidth: number;

  /**
   * Flag indicating whether control dimensions are enabled
   */
  public get controlDimFlag(): boolean {
    return true;
  }

  /**
   * Creates a new quatrefoil polygon instance
   * @param centerPoint - Center point of the quatrefoil
   * @param width - Width of the bounding rectangle
   * @param edges - Optional array of edges (will be generated if empty)
   */
  constructor(centerPoint: Vector2D, width: number, edges?: Edge[]) {
    super(edges ?? QuatrefoilPoly.create(centerPoint, width));
    this.cpt = centerPoint;
    this.rectWidth = width;
  }

  /**
   * Creates the edge geometry for a quatrefoil shape
   * @param center - Center point of the quatrefoil
   * @param width - Width of the bounding rectangle
   * @returns Array of edges defining the quatrefoil shape
   */
  public static create(center: Vector2D, width: number): Edge[] {
    // Calculate arc radius and straight segment length
    const arcRadius = (width / 5) * 3 / 2;
    const straightSegment = (width - 2 * arcRadius) / 2;
    const halfWidth = width / 2;

    return PolygonCreator.Ins.joinAbsolute(center, [
      // Top-left corner
      Vector2D.vector(-halfWidth, -halfWidth),
      Vector2D.vector(-halfWidth, -halfWidth + straightSegment),
      Vector2D.arc(
        center.translate(Vector2D.vector(-halfWidth, 0)),
        arcRadius,
        1.5 * Math.PI,
        Math.PI / 2,
        false
      ),
      Vector2D.vector(-halfWidth, halfWidth - straightSegment),
      Vector2D.vector(-halfWidth, halfWidth),

      // Top-right corner
      Vector2D.vector(-halfWidth + straightSegment, halfWidth),
      Vector2D.arc(
        center.translate(Vector2D.vector(0, halfWidth)),
        arcRadius,
        Math.PI,
        0,
        false
      ),
      Vector2D.vector(halfWidth - straightSegment, halfWidth),
      Vector2D.vector(halfWidth, halfWidth),

      // Bottom-right corner
      Vector2D.vector(halfWidth, halfWidth - straightSegment),
      Vector2D.arc(
        center.translate(Vector2D.vector(halfWidth, 0)),
        arcRadius,
        Math.PI / 2,
        1.5 * Math.PI,
        false
      ),
      Vector2D.vector(halfWidth, -halfWidth + straightSegment),
      Vector2D.vector(halfWidth, -halfWidth),

      // Bottom-left corner
      Vector2D.vector(halfWidth - straightSegment, -halfWidth),
      Vector2D.arc(
        center.translate(Vector2D.vector(0, -halfWidth)),
        arcRadius,
        0,
        Math.PI,
        false
      )
    ]).edges;
  }

  /**
   * Creates a deep clone of this quatrefoil
   * @returns A new QuatrefoilPoly instance with cloned properties
   */
  protected _clone(): QuatrefoilPoly {
    return new QuatrefoilPoly(this.cpt.clone(), this.rectWidth, []);
  }

  /**
   * Scales the quatrefoil by a given factor
   * @param scaleFactor - Scale factor to apply
   * @returns This instance for chaining
   */
  public scale(scaleFactor: number): this {
    this.rectWidth *= scaleFactor;
    return super.scale(scaleFactor);
  }

  /**
   * Serializes the quatrefoil to JSON format
   * @returns JSON representation of the quatrefoil
   */
  public toJSON(): QuatrefoilPolyJSON {
    const json = super.toJSON();
    return {
      ...json,
      type: PolyType.quatrefoil,
      cpt: this.cpt.toJSON(),
      rectWidth: this.rectWidth
    };
  }

  /**
   * Translates the quatrefoil by a given offset vector
   * @param offset - Translation offset vector
   * @returns This instance for chaining
   */
  public translate(offset: Vector2D): this {
    super.translate(offset);
    this.cpt = this.cpt.translate(offset);
    return this;
  }

  /**
   * Rotates the quatrefoil around a pivot point
   * @param angle - Rotation angle in radians
   * @param pivot - Pivot point for rotation
   * @returns This instance for chaining
   */
  public rotate(angle: number, pivot: Vector2D): this {
    super.rotate(angle, pivot);
    this.cpt = this.cpt.rotate(angle, pivot);
    return this;
  }

  /**
   * Handles edge dragging operation to resize the quatrefoil
   * @param edgeIndex - Index of the edge being dragged
   * @param offset - Offset vector for the drag operation
   * @returns New QuatrefoilPoly with updated dimensions
   */
  public dragEdge(edgeIndex: number, offset: Vector2D): QuatrefoilPoly {
    const newEdgePosition = this.edges[edgeIndex].translate(offset);
    const originalDistance = this.cpt.distanceTo(this.edges[edgeIndex])[0];
    const newDistance = this.cpt.distanceTo(newEdgePosition)[0];

    // Prevent degenerate cases
    if (Utils.EQ_0(originalDistance)) {
      return new QuatrefoilPoly(this.cpt, this.rectWidth);
    }

    const scaleRatio = newDistance / originalDistance;
    return new QuatrefoilPoly(this.cpt, this.rectWidth * scaleRatio);
  }

  /**
   * Handles vertex dragging operation
   * @param vertexIndex - Index of the vertex being dragged
   * @param offset - Offset vector for the drag operation
   * @param param - Additional parameter (unused)
   * @returns New QuatrefoilPoly with updated dimensions
   */
  public dragVertex(vertexIndex: number, offset: Vector2D, param?: unknown): QuatrefoilPoly {
    return this.dragEdge(vertexIndex, offset);
  }

  /**
   * Handles arc dragging operation
   * @param arcIndex - Index of the arc being dragged
   * @param offset - Offset vector for the drag operation
   * @returns New QuatrefoilPoly with updated dimensions
   */
  public dragArc(arcIndex: number, offset: Vector2D): QuatrefoilPoly {
    return this.dragEdge(arcIndex, offset);
  }

  /**
   * Edits dimensions by applying a transformation matrix
   * @param dimIndex - Index of the dimension being edited
   * @param scale - Scale factor to apply
   * @param param - Additional parameter (unused)
   * @returns Transformed quatrefoil
   */
  public editDim(dimIndex: number, scale: number, param?: unknown): QuatrefoilPoly {
    return this.transform(Matrix.matrix(scale, 0, 0, scale, 0, 0));
  }

  /**
   * Initializes dimension information for display
   * @returns Array of dimension info objects for each edge
   */
  public initDimInfo(): DimInfo[] {
    return this.edges.map((edge: Edge, index: number) => ({
      idx: index,
      dimShow: [8, 10].some((showIndex: number) => showIndex === index)
    }));
  }
}

/**
 * JSON representation of a QuatrefoilPoly
 */
export interface QuatrefoilPolyJSON {
  type: PolyType.quatrefoil;
  cpt: unknown; // Vector2D JSON representation
  rectWidth: number;
  [key: string]: unknown;
}