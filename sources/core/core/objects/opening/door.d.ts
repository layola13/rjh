/**
 * Door module - Handles door entities with opening/closing mechanics
 * @module Door
 */

import { Opening, Opening_IO } from './Opening';
import { Entity } from './Entity';
import { Wall } from './Wall';

/**
 * Type guard to check if a value is a plain object
 * @param value - Value to check
 * @returns True if value is an object
 */
declare function isPlainObject(value: unknown): value is Record<string, unknown>;

/**
 * Represents the 3D point coordinates in centimeters
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Axis information for door rotation
 */
interface AxisInfo {
  /** Rotation axis direction vector */
  directory: Point3D;
  /** Anchor point for rotation */
  point: Point3D;
}

/**
 * Door metadata extension containing axis information
 */
interface DoorMetadataExtension {
  objInfo: {
    axis: AxisInfo[];
  };
}

/**
 * Door metadata structure
 */
interface DoorMetadata {
  /** Whether the door has a pocket for sliding */
  hasPocket?: boolean;
  /** Extended door-specific metadata */
  extension?: DoorMetadataExtension;
}

/**
 * Door swing direction enumeration
 * 0: Right outward, 1: Right inward, 2: Left inward, 3: Left outward
 */
type DoorSwing = 0 | 1 | 2 | 3;

/**
 * Input/Output handler for Door persistence
 * Manages serialization and deserialization of door state
 */
export declare class Door_IO extends Opening_IO {
  /**
   * Load door data from serialized format
   * @param entity - Door entity to populate
   * @param data - Serialized door data
   * @param context - Loading context
   */
  load(entity: Door | null, data: unknown, context: unknown): void;
  
  /**
   * Get singleton instance of Door_IO
   */
  static instance(): Door_IO;
}

/**
 * Door entity class
 * Represents a door with opening/closing animations and collision detection
 */
export declare class Door extends Opening {
  /** Top-down view SVG representation */
  topView: string;
  
  /** Current open state */
  private __isOpened: boolean;
  
  /** Current opening angle in degrees (0-90) */
  private __angle: number;
  
  /** 3D anchor point for rotation [x, y, z] */
  private __anchor: [number, number, number];
  
  /** Rotation axis vector [x, y, z] */
  private __anchorAxis: [number, number, number];
  
  /** Door swing direction */
  swing: DoorSwing;
  
  /** Door-specific metadata */
  metadata?: DoorMetadata;
  
  /**
   * Create a new door instance
   * @param id - Unique identifier for the door
   */
  constructor(id?: string);
  
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
   * Close the door (set to closed state)
   */
  close(): void;
  
  /**
   * Calculate door body offset from wall center based on swing direction
   * Accounts for wall thickness and door body thickness
   * @returns Offset distance in scene units
   */
  getDoorOffset(): number;
  
  /**
   * Check if door can be opened (has valid axis information)
   * @returns True if door has rotation axis data
   */
  canOpen(): boolean;
  
  /**
   * Get rotation axis information from metadata
   * @returns Array of axis info or undefined if not available
   * @private
   */
  private _getAxisInfo(): AxisInfo[] | undefined;
  
  /**
   * Update door's 3D transform based on open state and angle
   * Calculates anchor point and rotation axis from metadata
   * @param angle - Optional override angle in degrees
   */
  updateOpenStatus(angle?: number): void;
  
  /**
   * Get the wall or opening host that contains this door
   * @returns Parent wall entity
   */
  getHost(): Wall | unknown;
  
  /**
   * Mark door position as dirty for re-rendering
   * @private
   */
  private dirtyPosition(): void;
  
  /**
   * Current opened state
   */
  isOpened: boolean;
}

/**
 * Global HSConstants namespace
 */
declare namespace HSConstants {
  namespace Resources {
    namespace svgs {
      const default_door_symbol: string;
    }
  }
  
  namespace Constants {
    /** Default door panel thickness in scene units */
    const DEFAULT_DOOR_BODY_THICKNESS: number;
    /** Offset adjustment for door positioning */
    const DOOR_SHIFT_OFFSET: number;
  }
  
  namespace ModelClass {
    /** Class identifier for door entities */
    const NgDoor: string;
  }
}

/**
 * Global HSCore utility namespace
 */
declare namespace HSCore {
  namespace Util {
    namespace Object {
      /**
       * Check if value is a valid finite number
       * @param value - Value to check
       */
      function isValidNumber(value: unknown): value is number;
    }
  }
}

// Register Door class with entity system
Entity.registerClass(HSConstants.ModelClass.NgDoor, Door);