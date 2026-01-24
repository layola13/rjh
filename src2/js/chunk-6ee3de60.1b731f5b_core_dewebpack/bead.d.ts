/**
 * Bead shape module - represents a bead component in the design system
 */

import { Vector } from './vector';
import { FrameManager } from './frame-manager';
import { HitResult } from './hit-result';
import { EventType, BeadSettings } from './events';
import { Shape, ShapeType, Border, Polygon, PolyId } from './shape';

/**
 * Configuration options for creating a Bead instance
 */
export interface BeadOptions {
  /** The polygon defining the bead's outer boundary */
  polygon: Polygon;
  /** Parent container to add the bead to */
  add: (shape: Shape) => void;
}

/**
 * Serialized representation of a Bead for persistence
 */
export interface BeadJSON {
  /** Shape type identifier */
  type: ShapeType;
  /** Serialized frame manager data */
  fm: unknown;
}

/**
 * Context object containing event bus for user interactions
 */
export interface InteractionContext {
  /** Event bus for emitting and handling events */
  eventBus: {
    emit(event: { type: EventType; payload: unknown }): void;
  };
}

/**
 * Bar component representing a segment of the bead's frame
 */
export interface Bar {
  /** Unique identifier for the polygon this bar belongs to */
  polyId: PolyId;
  /** Whether the bar is currently highlighted */
  highlighted: boolean;
  
  /**
   * Sets the highlight state of the bar
   * @param enabled - Whether to enable or disable highlighting
   */
  highlight(enabled: boolean): void;
  
  /**
   * Tests if a point intersects with this bar
   * @param point - The point to test
   * @returns true if the point hits the bar
   */
  hitTest(point: Vector): boolean;
}

/**
 * Bead class - represents a bead shape with frame management and interaction capabilities
 * Extends the base Shape class with bead-specific functionality
 */
export declare class Bead extends Shape {
  /** Manager for the bead's frame structure and bars */
  readonly frameManager: FrameManager;
  
  /** Border component for the bead's outline */
  readonly borders: Border;
  
  /** Internal polygons for complex bead structures */
  innerPoly: Polygon[];
  
  /** Offset vector for positioning adjustments */
  offvec: Vector;

  /**
   * Creates a new Bead instance
   * @param options - Configuration options including polygon and parent container
   */
  constructor(options: BeadOptions);

  /**
   * Whether the bead supports drag modification
   * @readonly
   * @returns Always false for beads
   */
  get dragModify(): boolean;

  /**
   * Gets the list of polygons currently used by the bead
   * @readonly
   * @returns Empty array (bead-specific implementation)
   */
  get usedPoly(): Polygon[];

  /**
   * Gets the list of available polygons that can be used
   * @readonly
   * @returns Empty array (bead-specific implementation)
   */
  get avaiablePoly(): Polygon[];

  /**
   * Determines if the bead is in an inactive state
   * @readonly
   * @returns true if all bars are not highlighted
   */
  get inactive(): boolean;

  /**
   * Translates the bead by a given offset vector
   * @param offset - The vector by which to translate
   */
  translate(offset: Vector): void;

  /**
   * Sets the highlight state for all bars in the frame
   * @param enabled - Whether to enable or disable highlighting
   */
  highlight(enabled: boolean): void;

  /**
   * Tests if a point intersects with any bar in the bead
   * @param point - The point to test
   * @returns true if the point hits any bar
   */
  hitTest(point: Vector): boolean;

  /**
   * Handles hit testing on a specific bar and emits settings event if fully hit
   * @param point - The point to test
   * @param context - Interaction context with event bus
   * @returns Hit result indicating what was hit (Bead or partial)
   */
  hitBar(point: Vector, context: InteractionContext): HitResult;

  /**
   * Updates the frame structure, optionally recreating all bars
   * @param recreate - Whether to recreate all bars (default: false)
   */
  updateFrame(recreate?: boolean): void;

  /**
   * Hides any assistance visuals on the frame
   */
  hideAssist(): void;

  /**
   * Finds a bar by its associated polygon ID
   * @param polyId - The polygon ID to search for
   * @returns The matching bar, or undefined if not found
   */
  findBarByPolyId(polyId: PolyId): Bar | undefined;

  /**
   * Serializes the bead to a JSON-compatible object
   * @returns Serialized bead data
   */
  toJSON(): BeadJSON;

  /**
   * Deserializes and restores the bead from saved data
   * @param data - Previously serialized bead data
   */
  deserialize(data: BeadJSON | null): void;
}