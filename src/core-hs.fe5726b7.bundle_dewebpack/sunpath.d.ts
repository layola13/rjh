/**
 * SunPath module - Manages sun position and orbit in a 3D scene
 * @module SunPath
 */

import type { Entity } from './Entity';
import type { EntityField } from './decorators';

/**
 * Scene boundary information
 */
interface SceneBound {
  /** Left position of the scene */
  left: number;
  /** Top position of the scene */
  top: number;
  /** Width of the scene */
  width: number;
  /** Height of the scene */
  height: number;
}

/**
 * Scene configuration
 */
interface Scene {
  /** Boundary information of the scene */
  bound: SceneBound;
}

/**
 * Room information containing scene details
 */
interface RoomInfo {
  /** Scene configuration */
  scene: Scene;
}

/**
 * SunPath class - Manages sun position, orbit, and target offset in a scene
 * Extends Entity to provide sun path calculation and positioning functionality
 */
export declare class SunPath extends Entity {
  /**
   * Vertical angle of the sun (in degrees)
   * Decorated with EntityField for serialization
   */
  verticalAngle: number;

  /**
   * Horizontal angle of the sun (in degrees)
   * Decorated with EntityField for serialization
   */
  horizontalAngle: number;

  /**
   * X-axis offset for the target position
   * Decorated with EntityField for serialization
   */
  targetOffsetX: number;

  /**
   * Y-axis offset for the target position
   * Decorated with EntityField for serialization
   */
  targetOffsetY: number;

  /**
   * Current X position of the sun
   * Decorated with EntityField for serialization
   */
  sunPosX: number;

  /**
   * Current Y position of the sun
   * Decorated with EntityField for serialization
   */
  sunPosY: number;

  /**
   * Center coordinates of the room [x, y]
   * @private
   */
  private _roomCenter: [number, number];

  /**
   * Radius of the sun's orbit
   * @private
   */
  private _radius: number;

  /**
   * Maximum radius for the target position
   * @private
   */
  private _targetMaxRadius: number;

  /**
   * Creates a new SunPath instance
   * @param id - Optional entity identifier
   * @param options - Optional configuration options
   */
  constructor(id?: string, options?: unknown);

  /**
   * Factory method to create a new SunPath instance
   * @param id - Optional entity identifier
   * @param options - Optional configuration options
   * @returns A new SunPath instance
   */
  static create(id?: string, options?: unknown): SunPath;

  /**
   * Gets the maximum radius for the target position
   * @returns The target maximum radius
   */
  getTargetRadius(): number;

  /**
   * Gets the radius of the sun's orbit
   * @returns The orbit radius
   */
  getSunOrbitRadius(): number;

  /**
   * Recalculates and updates the sun's position based on current angles
   * Clears any existing offsets and computes new position using trigonometry
   */
  relocateSunPos(): void;

  /**
   * Resets target offset to zero
   */
  clearOffset(): void;

  /**
   * Gets the center coordinates of the room
   * @returns Tuple containing [x, y] coordinates
   */
  getCenter(): [number, number];

  /**
   * Updates room information and recalculates sun orbit parameters
   * @param roomInfo - Room information containing scene bounds
   */
  updateRoomInfo(roomInfo: RoomInfo): void;
}