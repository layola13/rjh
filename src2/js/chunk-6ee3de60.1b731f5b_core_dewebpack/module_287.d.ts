/**
 * Represents a polyline entity in DXF format.
 * A polyline is a connected sequence of line segments or arcs.
 */
export declare class Polyline {
  /**
   * Array of points defining the polyline.
   * Each point is represented as [x, y] or [x, y, bulge].
   * The bulge value (optional third element) defines arc segments.
   */
  readonly points: Array<[number, number] | [number, number, number]>;

  /**
   * Indicates whether the polyline forms a closed shape.
   * When true, the last point connects back to the first point.
   */
  readonly closed: boolean;

  /**
   * Starting width of the polyline segments.
   * A value of 0 indicates no specific starting width.
   */
  readonly startWidth: number;

  /**
   * Ending width of the polyline segments.
   * A value of 0 indicates no specific ending width.
   */
  readonly endWidth: number;

  /**
   * The layer this polyline belongs to.
   * Contains layer-specific properties like name.
   */
  layer: {
    name: string;
  };

  /**
   * Creates a new Polyline instance.
   * 
   * @param points - Array of coordinate points, each as [x, y] or [x, y, bulge]
   * @param closed - Whether the polyline should be closed (default: false)
   * @param startWidth - Starting width of polyline segments (default: 0)
   * @param endWidth - Ending width of polyline segments (default: 0)
   */
  constructor(
    points: Array<[number, number] | [number, number, number]>,
    closed?: boolean,
    startWidth?: number,
    endWidth?: number
  );

  /**
   * Converts the polyline to DXF format string representation.
   * 
   * Generates DXF entity codes including:
   * - POLYLINE header with layer and closure information
   * - Width specifications (if non-zero)
   * - VERTEX entries for each point with optional bulge values
   * - SEQEND terminator
   * 
   * @returns DXF-formatted string representation of the polyline
   */
  toDxfString(): string;
}