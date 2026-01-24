/**
 * Fold shape module - handles folding door/window configurations
 */

import { Vector } from './vector';
import { DrawParams } from './draw-params';
import { Direction, EdgeFinder } from './edge-finder';
import { EventType, SashSettings } from './events';
import { OpenToward, OpenDirection } from './open-config';
import { PolyId, HitResult } from './primitives';
import { Shape, ShapeType, FoldSash, WinPolygon, SashUtil, HardwareShape } from './shapes';

/**
 * Serialized fold configuration data
 */
export interface FoldJSON {
  /** Type of the fold shape */
  type: ShapeType;
  /** Polygon identifier */
  polyId: any;
  /** Whether the fold is enabled */
  enabled: boolean;
  /** Offset vector for positioning */
  offvec: { x: number; y: number };
  /** Whether expansion is horizontal */
  horizontally: boolean;
  /** Opening direction (inward/outward) */
  openToward: OpenToward;
  /** Number of panels on the left side */
  leftCount: number;
  /** Number of panels on the right side */
  rightCount: number;
  /** Whether this is configured as a door */
  isDoor: boolean;
  /** Array of sash configurations */
  sashes: any[];
}

/**
 * Event bus interface for emitting shape events
 */
export interface EventBus {
  emit(event: { type: EventType; payload: any }): void;
}

/**
 * Fold class - represents a multi-panel folding door or window system
 * Manages multiple sash panels that can fold horizontally or vertically
 */
export declare class Fold extends Shape {
  /** Unique identifier for the polygon */
  polyId: PolyId;
  
  /** Whether this fold is enabled/visible */
  enabled: boolean;
  
  /** Offset vector for positioning the fold */
  offvec: Vector;
  
  /** Whether offset vector is enabled */
  offvecEnabled: boolean;
  
  /** Opening direction (inward or outward) */
  openToward: OpenToward;
  
  /** Whether panels expand horizontally (true) or vertically (false) */
  expandHorizontally: boolean;
  
  /** Flag indicating fold configuration has changed */
  foldWayChanged: boolean;
  
  /** Whether this fold is configured as a door */
  isDoor: boolean;
  
  /** Internal array of all sash panels */
  private _sashes: FoldSash[];
  
  /** Number of panels on the left/top side */
  private _leftCount: number;
  
  /** Number of panels on the right/bottom side */
  private _rightCount: number;

  /**
   * Creates a new Fold instance
   * @param parent - Parent shape container
   * @param polygon - Window polygon geometry
   * @param polyId - Polygon identifier
   * @param type - Shape type (defaults to FoldSash)
   */
  constructor(
    parent: Shape,
    polygon: WinPolygon,
    polyId: PolyId,
    type?: ShapeType
  );

  /**
   * Gets the serial number from the first sash
   * @returns Serial number or empty string if no sashes
   */
  get serial(): string;

  /**
   * Calculates the number of connection gaps between panels
   * Gaps exist between consecutive panels on each side
   * @returns Total connection gaps count
   */
  get connectGapsCount(): number;

  /**
   * Gets the number of touch gaps where left and right sides meet
   * @returns 1 if both sides have panels, 0 otherwise
   */
  get touchGapsCount(): number;

  /**
   * Gets the number of side touch gaps (when only one side has panels)
   * @returns 1 if only one side has panels, 0 otherwise
   */
  get sideTouchGapsCount(): number;

  /**
   * Determines the sash type based on the fold type
   * @returns Corresponding sash type
   */
  get sashType(): ShapeType;

  /**
   * Gets compatible coexisting shape types
   * @returns Empty array (folds don't coexist with other types)
   */
  get coexistType(): ShapeType[];

  /**
   * Gets all enabled sash panels
   * @returns Array of enabled sashes
   */
  get sashes(): FoldSash[];

  /**
   * Gets the count of sash panels (excluding non-sash types)
   * @returns Number of sash panels
   */
  get sashCount(): number;

  /**
   * Gets the total number of columns (left + right panels)
   * @returns Total column count
   */
  get columnCount(): number;

  /**
   * Gets the joint way configuration from the first sash
   * @returns Joint way setting
   */
  get jointWay(): any;

  /**
   * Sets the joint way for all sashes
   * @param value - Joint way configuration to apply
   */
  set jointWay(value: any);

  /**
   * Checks if any sash is currently selected
   * @returns True if any sash is selected
   */
  get selected(): boolean;

  /**
   * Gets the sash assignment configuration string
   * Format: "left+right|[V]I/O" where V=vertical, I=inward, O=outward
   * @returns Assignment way string
   */
  get sashAssignWay(): string;

  /**
   * Gets the number of bar overlaps
   * @returns Always 0 for folds
   */
  get barOverlapsCount(): number;

  /**
   * Gets the number of gaps between sashes
   * @returns Number of sashes minus 1
   */
  get sashGapsCount(): number;

  /**
   * Gets the number of panels on the right/bottom side
   */
  get rightCount(): number;

  /**
   * Sets the number of panels on the right/bottom side
   * Marks fold configuration as changed
   */
  set rightCount(value: number);

  /**
   * Gets the number of panels on the left/top side
   */
  get leftCount(): number;

  /**
   * Sets the number of panels on the left/top side
   * Marks fold configuration as changed
   */
  set leftCount(value: number);

  /**
   * Checks if all sashes are highlighted
   * @returns True if all sashes are highlighted
   */
  get highlighted(): boolean;

  /**
   * Checks if all sashes are inactive
   * @returns True if all sashes are inactive
   */
  get inactive(): boolean;

  /**
   * Deletes all sashes in this fold
   */
  delete(): void;

  /**
   * Serializes the fold to JSON format
   * @returns Serialized fold configuration
   */
  toJSON(): FoldJSON;

  /**
   * Deserializes fold data from JSON
   * @param data - Serialized fold data
   * @returns This fold instance
   */
  deserialize(data: FoldJSON): this;

  /**
   * Performs hit testing on bars/sashes
   * @param point - Point to test
   * @param eventBus - Event bus for emitting selection events
   * @returns Hit test result
   */
  hitBar(point: Vector, eventBus: EventBus): HitResult;

  /**
   * Creates and initializes all sash panels based on configuration
   * Partitions the polygon and assigns hardware to each panel
   */
  create(): void;

  /**
   * Sets the highlight state for all sashes
   * @param highlighted - Whether to highlight
   */
  highlight(highlighted: boolean): void;

  /**
   * Updates the polygon geometry and recreates sashes
   * @param polygon - New polygon geometry (optional)
   */
  updatePoly(polygon?: WinPolygon): void;

  /**
   * Translates the fold and all its sashes by a vector
   * @param vector - Translation vector
   */
  translate(vector: Vector): void;

  /**
   * Hides assist elements on all sashes
   */
  hideAssist(): void;

  /**
   * Calculates the opening direction for a panel at the given index
   * @param index - Panel index
   * @returns Opening direction (left/right/up/down)
   */
  calOpenDirection(index: number): OpenDirection;

  /**
   * Emits sash settings event for a specific sash
   * @param sash - The sash to emit settings for
   * @param eventBus - Event bus for emitting
   */
  emitSashSetting(sash: FoldSash, eventBus: EventBus): void;

  /**
   * Converts hit result to proper sash hit result
   * @param result - Original hit result
   * @returns Converted hit result (All becomes Sash)
   */
  properHitResult(result: HitResult): HitResult;

  /**
   * Synchronizes handle positions across all fold sashes
   * @param param1 - First synchronization parameter
   * @param param2 - Second synchronization parameter
   * @param param3 - Third synchronization parameter
   */
  syncHandlesForFold(param1: any, param2: any, param3: any): void;
}