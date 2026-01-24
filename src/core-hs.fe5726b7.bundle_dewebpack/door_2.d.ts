import type { Opening_IO, Opening } from './Opening';
import type { Entity } from './Entity';
import type { Material } from './Material';
import type { Manager } from './Manager';
import type { Wall } from './Wall';

/**
 * Door metadata axis point information
 */
interface AxisPoint {
  x: number;
  y: number;
  z: number;
}

/**
 * Door metadata axis directory information
 */
interface AxisDirectory {
  x: number;
  y: number;
  z: number;
}

/**
 * Door metadata axis configuration
 */
interface AxisInfo {
  /** Axis rotation point */
  point: AxisPoint;
  /** Axis direction vector */
  directory: AxisDirectory;
}

/**
 * Door metadata structure
 */
interface DoorMetadata {
  /** Whether door has pocket configuration */
  hasPocket?: boolean;
  /** Door extension information */
  extension?: {
    objInfo?: {
      /** Axis configuration array */
      axis?: AxisInfo[];
    };
  };
}

/**
 * Surface object for baseboard cutting
 */
interface SurfaceObject {
  surface: {
    containsPoint(point: unknown): boolean;
  };
}

/**
 * Path segment for baseboard cutting
 */
interface PathSegment {
  getStartPt(): unknown;
  getEndPt(): unknown;
}

/**
 * Baseboard cutter information
 */
interface BaseboardCutterInfo {
  /** Cut path segments */
  cutPath: PathSegment[];
  /** Patch lines for surface boundaries */
  patchLines: PathSegment[];
}

/**
 * Baseboard cutter parameters
 */
interface BaseboardCutterParams {
  surfaceObj: SurfaceObject;
}

/**
 * Door swing direction enumeration
 * 0: Right swing outward
 * 1: Right swing inward
 * 2: Left swing inward
 * 3: Left swing outward
 */
type DoorSwing = 0 | 1 | 2 | 3;

/**
 * Door I/O handler for serialization and deserialization
 */
export declare class Door_IO extends Opening_IO {
  /**
   * Load door data from serialized format
   * @param entity - The door entity being loaded
   * @param data - Serialized data
   * @param context - Loading context
   */
  load(entity: Door | null, data: unknown, context: unknown): void;

  /**
   * Get singleton instance of Door_IO
   */
  static instance(): Door_IO;
}

/**
 * Door entity representing architectural doors
 * Extends Opening to provide door-specific functionality including
 * swing direction, opening/closing behavior, and pocket door support
 */
export declare class Door extends Opening {
  /** Top view symbol resource path */
  topView: string;

  /** Current rotation angle when opened (0-90 degrees) */
  private __angle: number;

  /** Anchor point for rotation in local coordinates [x, y, z] */
  private __anchor: [number, number, number];

  /** Rotation axis vector [x, y, z] */
  private __anchorAxis: [number, number, number];

  /** Internal opened state flag */
  private __isOpened: boolean;

  /** Cached default material for bottom face */
  private _bottomFaceDefaultMaterial?: Material;

  /** Door swing direction */
  swing: DoorSwing;

  /** Door metadata including axis and pocket configuration */
  metadata?: DoorMetadata;

  /** Current opened/closed state */
  isOpened: boolean;

  /**
   * Create a new Door instance
   * @param id - Unique identifier for the door
   * @param params - Additional construction parameters
   */
  constructor(id?: string, params?: unknown);

  /**
   * Get the I/O handler for this door
   * @returns Door_IO singleton instance
   */
  getIO(): Door_IO;

  /**
   * Open the door to specified angle
   * @param angle - Opening angle in degrees (default: 90)
   */
  open(angle?: number): void;

  /**
   * Close the door
   */
  close(): void;

  /**
   * Handle field change events
   * @param fieldName - Name of changed field
   * @param newValue - New value
   * @param oldValue - Previous value
   */
  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void;

  /**
   * Handle host object change event
   * Called when the door's parent wall or host changes
   */
  onHostChanged(): void;

  /**
   * Handle swing direction change event
   */
  onSwingChanged(): void;

  /**
   * Calculate door offset from wall centerline based on swing direction
   * @returns Offset distance in model units
   */
  getDoorOffset(): number;

  /**
   * Check if door can be opened
   * @returns True if door has valid axis configuration
   */
  canOpen(): boolean;

  /**
   * Get axis configuration from metadata
   * @returns Axis information array or undefined
   */
  private _getAxisInfo(): AxisInfo[] | undefined;

  /**
   * Update door's open/closed status and position
   * @param angle - Optional override angle in degrees
   */
  updateOpenStatus(angle?: number): void;

  /**
   * Get default material for bottom face rendering
   * @returns Default floor material
   */
  private _getBottomFaceDefaultMaterial(): Material;

  /**
   * Get host object (typically a Wall)
   * @returns Host entity
   */
  getHost(): Wall | Entity;

  /**
   * Get pocket door configuration
   * @returns Pocket configuration or undefined
   */
  getPocket(): unknown;

  /**
   * Calculate baseboard cutter information for trim generation
   * @param params - Surface and cutting parameters
   * @returns Array of cutter information for each affected surface
   */
  getBaseboardCutterInfo(params: BaseboardCutterParams): BaseboardCutterInfo[];

  /**
   * Mark position as dirty for re-rendering
   */
  dirtyPosition(): void;
}

/**
 * Global HSConstants namespace
 */
declare global {
  const HSConstants: {
    /** Model class identifiers */
    ModelClass: {
      NgDoor: string;
    };
    /** Application constants */
    Constants: {
      /** Default door body thickness in model units */
      DEFAULT_DOOR_BODY_THICKNESS: number;
      /** Offset shift for door positioning */
      DOOR_SHIFT_OFFSET: number;
    };
    /** Resource paths */
    Resources?: {
      svgs: {
        /** Default door symbol SVG path */
        default_door_symbol: string;
      };
    };
  };

  /** HSCore utility namespace */
  const HSCore: {
    Util: {
      Object: {
        /**
         * Check if value is a valid number
         * @param value - Value to check
         * @returns True if valid number
         */
        isValidNumber(value: unknown): value is number;
      };
    };
  };
}