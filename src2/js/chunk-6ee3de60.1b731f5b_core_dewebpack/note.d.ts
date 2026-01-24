/**
 * Note module - Provides annotation functionality for drawings
 */

import { Point, Box, Segment } from './geometry';
import { Shape, ShapeType, Text } from './shape';
import { WinPolygon } from './polygon';
import { ToolType } from './tool';
import { ShapeColor } from './color';

/**
 * Serialized note data structure for persistence
 */
export interface NoteJSON {
  /** Start point of the note's pointer line */
  from: { x: number; y: number };
  /** End point where the note text is anchored */
  to: { x: number; y: number };
  /** Note text content */
  text: string;
  /** Font size in pixels */
  fontSize: number;
  /** Color value */
  cr: string;
}

/**
 * Note class - Represents an annotation with text and optional pointer line
 * Extends Shape to provide interactive annotation capabilities on the canvas
 */
export declare class Note extends Shape {
  /** Note text content */
  text: string;
  
  /** Start point of the pointer line */
  from: Point;
  
  /** End point where the text is positioned */
  to: Point;
  
  /** Whether the note is currently selected */
  selected: boolean;
  
  /** Whether the note is hidden */
  hidden: boolean;
  
  /** Note display color */
  color: string;
  
  /** Visual shape representations on the canvas */
  vshapes: any[];
  
  /** Geometric shape components (text, line, anchor) */
  shapes: (Text | WinPolygon)[];
  
  /** Size of the anchor point circle in pixels */
  anchorSize: number;
  
  /** Private font size property */
  private _fontSize: number;

  /**
   * Creates a new Note instance
   * @param text - The text content to display (default: "Note")
   * @param from - Starting point of the pointer line (default: origin)
   * @param to - End point where text is anchored (default: origin)
   */
  constructor(text?: string, from?: Point, to?: Point);

  /**
   * Computed bounding box containing all note shapes
   */
  get box(): Box;

  /**
   * Gets the current font size
   */
  get fontSize(): number;

  /**
   * Sets the font size for the note text
   * @param value - Font size in pixels
   */
  set fontSize(value: number);

  /**
   * Hit test to check if a point intersects the note
   * @param point - The point to test
   * @param context - Drawing context for rendering updates
   * @returns True if the note was hit and selected
   */
  hitNote(point: Point, context: any): boolean;

  /**
   * Handles note text editing
   * @param text - New text content
   * @param context - Drawing context for rendering updates
   */
  onEdit(text: string, context: any): void;

  /**
   * Regenerates the geometric shapes based on current properties
   * @returns This note instance for chaining
   */
  updatePoly(): this;

  /**
   * Cleans up and recycles resources
   * @param force - Whether to force recycling (default: false)
   */
  recycle(force?: boolean): void;

  /**
   * Translates the note by a vector offset
   * @param offset - Translation vector
   */
  translate(offset: Point): void;

  /**
   * Serializes the note to JSON format
   * @returns Plain object representation of the note
   */
  toJSON(): NoteJSON;

  /**
   * Deserializes note data from JSON
   * @param data - Serialized note data
   * @param context - Optional drawing context for immediate rendering
   */
  deserialize(data: NoteJSON, context?: any): void;

  /**
   * Renders the note to the canvas
   * @param context - Drawing context
   */
  draw(context: any): void;

  /**
   * Deletes the note if selected
   * @param context - Drawing context
   * @returns True if the note was deleted
   */
  delete(context: any): boolean;

  /**
   * Creates the geometric shapes (text, line, anchor) for the note
   * @private
   */
  private createShapes(): void;
}