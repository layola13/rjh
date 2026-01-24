/**
 * Sash module - Core window/door sash component with frame, mullion, and hardware management
 */

import Flatten from 'flatten-js';
import { DrawParams } from './draw-params';
import { EventType, SashBarSettings } from './events';
import { PolyId, Utils as PolyUtils, HitResult, EqualSplitType, EdgeJointWay } from './polygon-utils';
import { FrameManager, MullionManager } from './managers';
import { Shape, ShapeType, Frame, Dim, Border } from './shape-types';

/**
 * Represents the JSON serialization format of a Sash
 */
export interface SashJSON {
  /** Type of the sash (Sash, Screen, ShadePushSash, etc.) */
  type: ShapeType;
  /** Unique polygon identifier */
  polyId: Record<string, unknown>;
  /** Whether the sash is enabled */
  enabled: boolean;
  /** Offset vector for positioning */
  offvec: { x: number; y: number };
  /** Serialized frame manager data */
  fm: Record<string, unknown>;
  /** Serialized mullion manager data */
  mm: Record<string, unknown>;
  /** Serialized hardware manager data (optional) */
  hm: Record<string, unknown> | null;
  /** Serialized dimension data */
  dm: Record<string, unknown>;
}

/**
 * Main Sash class - Represents a window or door sash with frames, mullions, and hardware
 * Extends the base Shape class to provide sash-specific functionality
 */
export declare class Sash extends Shape {
  /** Unique identifier for the polygon */
  polyId: PolyId;
  
  /** Inner polygons for complex shapes */
  innerPoly: Flatten.Polygon[];
  
  /** Whether the sash is enabled/active */
  enabled: boolean;
  
  /** Offset vector for positioning */
  offvec: Flatten.Vector;
  
  /** Whether offset vector is enabled */
  offvecEnabled: boolean;
  
  /** Sequential number of this sash */
  sashNumber: number;
  
  /** Manages frame bars and profiles */
  frameManager: FrameManager;
  
  /** Manages mullions and glass divisions */
  mulManager: MullionManager;
  
  /** Manages hardware components (optional) */
  hardwareManager?: HardwareManager;
  
  /** Dimension annotations */
  dim: Dim;
  
  /** Visual borders */
  borders: Border;

  /**
   * Creates a new Sash instance
   * @param parent - Parent shape container
   * @param polygon - Polygon defining the sash geometry
   * @param polyId - Unique polygon identifier
   * @param type - Type of sash (defaults to ShapeType.Sash)
   */
  constructor(
    parent: Shape,
    polygon: Flatten.Polygon,
    polyId: PolyId,
    type?: ShapeType
  );

  /**
   * Gets the mullion height for horizontal splits
   * Calculated from the first horizontal mullion line
   */
  readonly mulHeight: number;

  /**
   * Checks if this sash is part of an in-screen sash group
   * Returns true if paired with exactly one sash and one screen of same polyId
   */
  readonly inScreenSashGroup: boolean;

  /**
   * Gets the serial number text from the first glass with a serial
   */
  readonly serial: string;

  /**
   * Gets the bounding box of the sash polygon
   */
  box(): Flatten.Box;

  /**
   * Checks if the sash polygon is circular
   */
  readonly isCircle: boolean;

  /**
   * Checks if this sash is a standalone component (parent is Frame)
   */
  readonly isStandalone: boolean;

  /**
   * Gets or sets the joint way for all edges
   * Defines how frame edges are joined (vertical, horizontal, etc.)
   */
  jointWay: EdgeJointWay;

  /**
   * Gets the profile size configuration for this sash type
   */
  readonly profileSize: ProfileSize;

  /**
   * Whether this sash supports drag modification
   */
  readonly dragModify: boolean;

  /**
   * Gets array of used polygons (for collision detection)
   */
  readonly usedPoly: Flatten.Polygon[];

  /**
   * Gets available polygons for mullion placement
   */
  readonly avaiablePoly: Flatten.Polygon[];

  /**
   * Gets types that can coexist with this sash
   * Returns Screen/Sash counterpart and AntiTheft
   */
  readonly coexistType: ShapeType[];

  /**
   * Whether the sash is currently highlighted
   */
  readonly highlighted: boolean;

  /**
   * Whether the sash is currently inactive
   */
  readonly inactive: boolean;

  /**
   * Whether the sash or its components are selected
   */
  readonly selected: boolean;

  /**
   * Applies appropriate filler type based on sash type
   * Creates glass, screen, or shade fillers
   */
  applyFiller(): void;

  /**
   * Deletes the sash from the view
   */
  delete(): void;

  /**
   * Serializes the sash to JSON format
   */
  toJSON(): SashJSON;

  /**
   * Deserializes and updates sash from JSON data
   * @param json - Serialized sash data
   * @returns This sash instance for chaining
   */
  deserialize(json: SashJSON): this;

  /**
   * Adds a mullion to the sash
   * @param mullion - Mullion configuration or instance
   * @returns The created mullion
   */
  addMullion(mullion: unknown): unknown;

  /**
   * Adds a decoration bar to the sash
   * @param bar - Decoration bar configuration
   * @param options - Additional options
   * @returns The created decoration bar
   */
  addDecorationBar(bar: unknown, options: unknown): unknown;

  /**
   * Handles dragging a mullion to a new position
   * @param mullion - The mullion being dragged
   * @param position - New position vector
   * @returns Updated position or result
   */
  dragMullion(mullion: { parentId: string }, position: Flatten.Vector): unknown;

  /**
   * Handles dragging an inner mullion
   * @param mullion - The inner mullion being dragged
   * @param position - New position vector
   * @param offset - Offset value
   * @returns Updated offset or result
   */
  dragInnerMullion(
    mullion: { parentId: string },
    position: Flatten.Vector,
    offset: number
  ): unknown;

  /**
   * Updates the sash polygon geometry
   * @param newPolygon - New polygon to apply (optional)
   */
  updatePoly(newPolygon?: Flatten.Polygon): void;

  /**
   * Translates the sash by a vector
   * @param vector - Translation vector
   */
  translate(vector: Flatten.Vector): void;

  /**
   * Sets highlight state for the sash
   * @param highlighted - Whether to highlight
   */
  highlight(highlighted: boolean): void;

  /**
   * Tests if a point hits the sash geometry
   * @param point - Point to test
   * @returns True if point is inside sash
   */
  hitTest(point: Flatten.Point): boolean;

  /**
   * Tests if a point hits any bar component
   * @param point - Point to test
   * @param context - View/interaction context
   * @returns Hit result type
   */
  hitBar(point: Flatten.Point, context: ViewContext): HitResult;

  /**
   * Updates frame and related components
   * @param full - Whether to perform full update
   */
  updateFrame(full?: boolean): void;

  /**
   * Hides all assist/guide elements
   */
  hideAssist(): void;

  /**
   * Snaps a point to nearest edge
   * @param point - Point to snap
   * @param tolerance - Snap tolerance
   * @param options - Additional snap options
   * @returns Snapped point or result
   */
  snapEdge(
    point: Flatten.Point,
    tolerance: number,
    options: unknown
  ): unknown;

  /**
   * Finds a bar by its polygon ID
   * @param polyId - Polygon identifier to search
   * @returns Found bar or undefined
   */
  findBarByPolyId(polyId: PolyId): Bar | undefined;

  /**
   * Applies vertical offset to mullion positions
   * Used when sash height changes and mullions are fixed to bottom
   * @param offset - Vertical offset to apply
   */
  applyMullionPositions(offset: number): void;
}

/**
 * Profile size configuration interface
 */
interface ProfileSize {
  width: number;
  height: number;
}

/**
 * View context for hit testing and interactions
 */
interface ViewContext {
  eventBus: {
    emit(event: { type: EventType; payload: unknown }): void;
  };
}

/**
 * Bar component interface
 */
interface Bar {
  polyId: PolyId;
  highlighted: boolean;
}

/**
 * Hardware manager interface
 */
interface HardwareManager {
  toJSON(): Record<string, unknown>;
  deserialize(json: Record<string, unknown>): void;
  recreate(): void;
  translate(vector: Flatten.Vector): void;
}