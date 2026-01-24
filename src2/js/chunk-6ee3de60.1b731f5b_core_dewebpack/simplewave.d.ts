import { Arc, Segment, Point } from './geometry';
import { SimpleLine, SimpleWaveCut, CutLineType } from './cutlines';
import { ShapeElement, ArcUtils } from './shapes';
import { Utils } from './utils';

/**
 * SimpleWave class represents a wave-shaped cutting line composed of multiple arc segments.
 * Extends SimpleLine to provide wave pattern functionality for cutting operations.
 */
export declare class SimpleWave extends SimpleLine {
  /**
   * Array of segments (Arc or Segment) that compose the wave pattern
   */
  segs: Array<Arc | Segment>;

  /**
   * Index of the inner edge segment in the wave pattern
   */
  innerEdgeIdx?: number;

  /**
   * Creates a new SimpleWave instance
   * @param segments - Array of arc or line segments forming the wave
   * @param type - Type of cut line, defaults to CutLineType.simpleWave
   */
  constructor(segments: Array<Arc | Segment>, type?: CutLineType);

  /**
   * Splits the wave pattern at specified points
   * @param splitPoint - Point at which to split the wave
   * @param targetPoint - Target point for the split operation
   * @returns A new SimpleWaveCut instance representing the split result
   */
  split(splitPoint: Point, targetPoint: Point): SimpleWaveCut;

  /**
   * Internal clone method for creating a new instance with given segments
   * @param segments - Segments to use in the cloned instance
   * @returns A new SimpleWave instance
   * @internal
   */
  protected _clone(segments: Array<Arc | Segment>): SimpleWave;

  /**
   * Creates a deep clone of this SimpleWave instance
   * @returns A new SimpleWave with cloned segments and properties
   */
  clone(): SimpleWave;

  /**
   * Serializes the SimpleWave to a JSON-compatible object
   * @returns JSON representation of the wave, or undefined if no segments exist
   */
  toJSON(): {
    name: CutLineType;
    segs: Array<object>;
    innerEdgeIdx?: number;
  } | undefined;

  /**
   * Deserializes a JSON object into a SimpleWave instance
   * @param json - Serialized wave data containing segments and properties
   * @returns A new SimpleWave instance reconstructed from JSON
   */
  static deserialize(json: {
    segs: Array<{ name: string; [key: string]: unknown }>;
    innerEdgeIdx?: number;
  }): SimpleWave;

  /**
   * Computes intersection points between this wave and a geometric shape
   * @param shape - Shape to intersect with (must implement contains() and intersect() methods)
   * @returns Array containing start and end intersection points, or empty array if no intersection
   */
  intersect(shape: {
    contains(point: Point): boolean;
    intersect(segment: Arc | Segment): Point[];
  }): Point[];

  /**
   * Creates a shape element from arc parameters
   * @param arc - Source arc segment
   * @param startPoint - Start point for the new arc
   * @param endPoint - End point for the new arc
   * @returns A ShapeElement containing the created arc
   */
  createShape(arc: Arc, startPoint: Point, endPoint: Point): ShapeElement;

  /**
   * Creates a linked sequence of shape elements between two points
   * @param startPoint - Starting point for the link
   * @param endPoint - Ending point for the link
   * @param forward - Direction flag: true for forward traversal, false for reverse
   * @returns Array of ShapeElements forming the link
   */
  createLink(startPoint: Point, endPoint: Point, forward: boolean): ShapeElement[];

  /**
   * Determines if the wave control starts at the first segment
   * Based on segment connectivity and inner edge index
   */
  get constrolStart(): boolean;

  /**
   * Determines if the wave control ends at the last segment
   * Based on segment connectivity and inner edge index
   */
  get constrolEnd(): boolean;
}