/**
 * Underlay module - manages background images/CAD drawings in floor plans
 * Provides positioning, scaling, and snap point management for underlay images
 */

/**
 * Point data structure for CAD coordinates
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Parallel line definition for CAD alignment
 */
export interface ParallelLine {
  start: Point;
  end: Point;
  // Additional properties may exist based on HSCore implementation
}

/**
 * Serialized underlay data structure
 */
export interface UnderlayData {
  /** X coordinate of underlay position */
  x: number;
  /** Y coordinate of underlay position */
  y: number;
  /** Width of the underlay image */
  width: number;
  /** Height of the underlay image */
  height: number;
  /** URL or path to the underlay image resource */
  url: string;
  /** Whether the underlay is visible */
  show: boolean;
  /** Whether snap points should be displayed */
  showSnapPoint: boolean;
  /** CAD reference points for alignment and snapping */
  cadPoints: Point[];
  /** Parallel lines for CAD alignment assistance */
  parallelLines: ParallelLine[];
}

/**
 * Options for dump/serialization operations
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * Callback function invoked during dump operation
 */
export type DumpCallback = (serialized: unknown[], entity: Underlay) => void;

/**
 * IO handler for Underlay entity serialization and deserialization
 * Extends Entity_IO to provide custom save/load logic for underlay properties
 */
export declare class Underlay_IO extends Entity_IO {
  /**
   * Get singleton instance of Underlay_IO
   */
  static instance(): Underlay_IO;

  /**
   * Serialize an Underlay entity to a storable format
   * @param entity - The Underlay entity to serialize
   * @param callback - Optional callback invoked after serialization
   * @param includeMetadata - Whether to include metadata in output
   * @param options - Additional serialization options
   * @returns Serialized entity data array
   */
  dump(
    entity: Underlay,
    callback?: DumpCallback,
    includeMetadata?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * Deserialize data into an Underlay entity
   * @param entity - Target entity to populate
   * @param data - Serialized data to load
   * @param context - Deserialization context
   */
  load(entity: Underlay, data: UnderlayData, context?: unknown): void;
}

/**
 * Underlay entity representing a background image or CAD drawing
 * Manages positioning, visibility, and alignment features for floor plan underlays
 */
export declare class Underlay extends Entity {
  /**
   * X coordinate of the underlay's position
   */
  x: number;

  /**
   * Y coordinate of the underlay's position
   */
  y: number;

  /**
   * Width of the underlay image in floor plan units
   */
  width: number;

  /**
   * Height of the underlay image in floor plan units
   */
  height: number;

  /**
   * URL or file path to the underlay image resource
   */
  url: string;

  /**
   * Visibility state of the underlay
   */
  show: boolean;

  /**
   * Whether to display snap points for alignment
   */
  showSnapPoint: boolean;

  /**
   * CAD reference points for precise alignment and snapping
   */
  cadPoints: Point[];

  /**
   * Parallel lines used for CAD alignment assistance
   */
  parallelLines: ParallelLine[];

  /**
   * Create a new Underlay instance
   * @param id - Unique identifier for the entity
   * @param floorplan - Parent floorplan reference
   */
  constructor(id?: string, floorplan?: unknown);

  /**
   * Factory method to create a new Underlay with generated ID
   * @param data - Optional initial data to populate the underlay
   * @returns Newly created Underlay instance
   */
  static create(data?: Partial<UnderlayData>): Underlay;

  /**
   * Check if this entity is a root-level entity
   * @returns Always true for Underlay entities
   */
  isRoot(): boolean;

  /**
   * Reset all underlay properties to default values
   * Dispatches underlayChanged signal to notify observers
   */
  reset(): void;

  /**
   * Update underlay properties from data object
   * Only updates if values have changed; dispatches change signal
   * @param data - New underlay data to apply, or undefined to reset
   */
  set(data: Partial<UnderlayData> | undefined): void;

  /**
   * Get current underlay data as a plain object
   * @returns Current state of all underlay properties
   */
  getData(): UnderlayData;

  /**
   * Get the IO handler for this entity type
   * @returns Underlay_IO instance for serialization
   */
  getIO(): Underlay_IO;

  /**
   * Verify the integrity of the underlay entity
   * @returns Always true for basic validation
   */
  verify(): boolean;

  /**
   * Toggle visibility of the background underlay
   * Dispatches underlayChanged signal if state changes
   * @param visible - Whether the underlay should be visible
   */
  showBackground(visible: boolean): void;
}