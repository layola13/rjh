import { Point, Vector, Arc } from 'paperjs-or-similar-library';
import { ExtraDim, ExtraDimTypeEnum, Text, TextAlign, WinPolygon, FrameRelationData, FrameRelationEnum, PolygonCreator } from './base-types';
import { ToolType } from './tool-types';
import { ShapeColor } from './shape-color';
import { Artisan, DrawParams } from './artisan';

/**
 * Represents a radius dimension annotation for arc segments.
 * Extends the base ExtraDim class to provide radius-specific dimension display.
 */
export declare class ExtraDimRadius extends ExtraDim {
  /**
   * The text content of the radius dimension (e.g., "r=5.0")
   */
  text: string;

  /**
   * The start point where the dimension is positioned
   */
  sPt: Point;

  /**
   * Reference to the host shape/polygon that owns this dimension
   */
  host: any;

  /**
   * Offset vector for positioning the dimension text relative to the start point
   */
  offVec: Vector;

  /**
   * Array of shape objects representing the visual elements of this dimension
   */
  shapes: any[];

  /**
   * The calculated radius value extracted from the arc
   */
  value?: number;

  /**
   * Array of relationships between this dimension and frame/vertex indices
   */
  frameRelation: FrameRelationData[];

  /**
   * Array of visual shape representations managed by the drawing system
   */
  vshapes: any[];

  /**
   * Creates a new radius dimension annotation.
   * 
   * @param text - Display text for the dimension (e.g., "r=10")
   * @param startPoint - Position point for the dimension
   * @param host - The host polygon/shape containing the arc
   * @param offsetVector - Offset vector for text positioning
   */
  constructor(text: string, startPoint: Point, host: any, offsetVector: Vector);

  /**
   * Gets the type of this extra dimension.
   * @returns Always returns ExtraDimTypeEnum.Radius
   */
  get extraDimType(): ExtraDimTypeEnum;

  /**
   * Renders the dimension shapes to the canvas.
   * Manages recycling and updating of visual shape objects.
   * 
   * @param context - The drawing context or layer to render into
   */
  draw(context: any): void;

  /**
   * Creates the internal shape representations for this dimension.
   * Searches the host polygon's edges for an arc containing the start point
   * and extracts its radius value.
   */
  create(): void;

  /**
   * Updates the dimension's position and text based on frame relationships.
   * Recalculates the start point from the referenced arc edge.
   */
  updatePtFromRelation(): void;

  /**
   * Establishes or updates the relationship between this dimension and frame vertices.
   * 
   * @param relationData - Optional array of frame relation data; if not provided,
   *                       automatically detects relations based on start point
   */
  createFrameRelation(relationData?: FrameRelationData[]): void;

  /**
   * Serializes this dimension to a JSON-compatible object.
   * 
   * @returns Object containing serialized dimension data including text
   */
  toJSON(): Record<string, any>;

  /**
   * Builds a formatted radius string from a numeric radius value.
   * Rounds to one decimal place.
   * 
   * @param radiusValue - The numeric radius value
   * @returns Formatted string in the form "r=X.X"
   */
  static buildRadiusString(radiusValue: number): string;

  /**
   * Creates a hit test polygon for interaction detection.
   * Returns a rectangular polygon area around the dimension text.
   * 
   * @returns A WinPolygon representing the interactive hit area
   */
  hitPolygon(): WinPolygon;

  /**
   * Adds shapes to the dimension's display group.
   * 
   * @param shapes - Array of shape objects to add
   */
  addToGroup(shapes: any[]): void;
}