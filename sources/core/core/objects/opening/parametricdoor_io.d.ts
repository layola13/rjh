/**
 * Parametric door model and I/O handler
 * Handles door entities with opening mechanics, materials, and floor connections
 */

import type { Entity } from './Entity';
import type { ParametricOpening, ParametricOpening_IO } from './ParametricOpening';
import type { Material } from './Material';
import type { Floor } from './Floor';
import type { Face } from './Face';
import type { Line3d, CurvePath } from './MathAlg';
import type { RoomInfo } from '../geometry/RoomInfo';
import type { Wall } from './Wall';

/**
 * Door swing direction enumeration
 * 0: Default (left inward)
 * 1: Left outward
 * 2: Right inward
 * 3: Right outward
 */
export type DoorSwing = 0 | 1 | 2 | 3;

/**
 * Dump/serialization options for entity persistence
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * Load/deserialization options for entity restoration
 */
export interface LoadOptions {
  [key: string]: unknown;
}

/**
 * Serialized door data structure
 */
export interface ParametricDoorDump {
  /** Whether door stone material is enabled */
  doorStoneMaterialEnabled: boolean;
  /** Door swing direction */
  swing: DoorSwing;
  /** Whether using default alignment */
  isDefaultAlign: boolean;
  /** ID of bottom face material (if any) */
  bottomFaceMaterialId?: string;
  [key: string]: unknown;
}

/**
 * Baseboard cutter information for floor intersection
 */
export interface BaseboardCutterInfo {
  /** Cut path segments */
  cutPath: Line3d[];
  /** Patch lines for edge cases */
  patchLines: Line3d[];
  [key: string]: unknown;
}

/**
 * Offset cut information for door opening
 */
export interface OffsetCutInfo {
  /** Cut path segments */
  cutPath: Line3d[];
  /** Patch lines for geometry completion */
  patchLines: Line3d[];
  [key: string]: unknown;
}

/**
 * I/O handler for ParametricDoor serialization and deserialization
 */
export declare class ParametricDoor_IO extends ParametricOpening_IO {
  /**
   * Serialize door entity to plain object
   * @param entity - Door entity to serialize
   * @param context - Serialization context
   * @param deep - Whether to perform deep serialization
   * @param options - Additional dump options
   * @returns Array of serialized objects (entity + dependencies)
   */
  dump(
    entity: ParametricDoor,
    context: unknown,
    deep?: boolean,
    options?: DumpOptions
  ): ParametricDoorDump[];

  /**
   * Deserialize door entity from plain object
   * @param entity - Target door entity to populate
   * @param data - Serialized door data
   * @param options - Additional load options
   */
  load(
    entity: ParametricDoor,
    data: ParametricDoorDump,
    options?: LoadOptions
  ): void;

  /**
   * Get singleton instance of ParametricDoor_IO
   */
  static instance(): ParametricDoor_IO;
}

/**
 * Parametric door entity with opening mechanics and material support
 */
export declare class ParametricDoor extends ParametricOpening {
  /**
   * Create door instance from metadata
   * @param metadata - Door creation metadata
   * @returns New door instance or null if invalid
   */
  static create(metadata: Record<string, unknown>): ParametricDoor | null;

  /**
   * @param tag - Optional entity tag/identifier
   * @param parent - Optional parent entity
   */
  constructor(tag?: string, parent?: Entity);

  // ========== Properties ==========

  /** Whether door stone material is enabled for bottom face */
  doorStoneMaterialEnabled: boolean;

  /** Whether using default alignment for door stone */
  isDefaultAlign: boolean;

  /** Door swing direction (0-3) */
  swing: DoorSwing;

  /** Material applied to bottom face */
  bottomFaceMaterial: Material | undefined;

  // ========== Material Management ==========

  /**
   * Set material for bottom face
   * @param material - Material to apply
   */
  setBottomFaceMaterial(material: Material | undefined): void;

  /**
   * Get current bottom face material
   * @returns Bottom face material or undefined
   */
  getBottomFaceMaterial(): Material | undefined;

  /**
   * Internal setter for bottom face material (handles geometry update)
   * @param material - Material to apply
   * @internal
   */
  protected _setBottomFaceMaterial(material: Material | undefined): void;

  // ========== Geometry & Faces ==========

  /**
   * Get bottom face of door opening
   * @returns Bottom face entity
   */
  getBottomFace(): Face;

  /**
   * Get all bottom faces of door opening
   * @returns Array of bottom faces
   */
  getBottomFaces(): Face[];

  /**
   * Get door stone face if enabled and at ground level
   * @returns Door stone face or undefined
   */
  getDoorStoneFace(): Face | undefined;

  /**
   * Get zero-height bottom face (when door stone disabled)
   * @returns Bottom face or undefined
   */
  getZeroHeightBottomFace(): Face | undefined;

  /**
   * Get bottom profile paths for face holes
   * @returns Array of curve paths (empty if door not at ground level)
   */
  getFaceHoleBottomProfile(): CurvePath[];

  // ========== Floor & Room Connections ==========

  /**
   * Get floors connected to this door opening
   * @param excludeFloors - Floors to exclude from search
   * @returns Array of connected floor entities
   */
  getConnectFloors(excludeFloors?: Floor[]): Floor[];

  /**
   * Get floors that need refresh due to door changes
   * @param floors - Initial floor array to append to
   * @returns Updated floor array
   */
  getRefreshFloors(floors?: Floor[]): Floor[];

  /**
   * Get wall inner face associated with door
   * @returns Wall face or null
   */
  getWallInnerFace(): Face | null;

  // ========== Door Stone Settings ==========

  /**
   * Check if door stone material is enabled
   * @returns True if enabled
   */
  isDoorStoneMaterialEnabled(): boolean;

  /**
   * Set door stone material enabled status
   * @param enabled - Whether to enable door stone
   */
  setDoorStoneMaterialStatus(enabled: boolean): void;

  /**
   * Toggle door stone alignment side
   */
  toggleDoorStoneAlignSide(): void;

  /**
   * Get current door stone alignment status
   * @returns Current alignment status
   */
  getDoorStoneAlignSideStatus(): boolean;

  /**
   * Callback when door stone material status changes
   * @internal
   */
  protected _onDoorStoneMaterialStatusChanged(): void;

  /**
   * Callback when default alignment changes
   * @param oldValue - Previous alignment value
   * @param newValue - New alignment value
   * @internal
   */
  protected _onDefaultAlignChanged(oldValue: boolean, newValue: boolean): void;

  // ========== Rotation & Transform ==========

  /**
   * Get final Z-axis rotation considering door swing
   * @returns Rotation in radians
   */
  getFinalZRotation(): number;

  /**
   * Callback when swing direction changes
   */
  onSwingChanged(): void;

  // ========== Pocket Door Support ==========

  /**
   * Get pocket door geometry (if applicable)
   * @returns Pocket geometry or undefined
   */
  getPocket(): unknown;

  /**
   * Check if door has pocket in given face
   * @param face - Face to check
   * @returns True if pocket exists
   */
  hasPocketInFace(face: Face): boolean;

  /**
   * Get pocket width for specified side
   * @param isLeftSide - Whether calculating for left side
   * @returns Pocket width in meters
   */
  getPocketWidth(isLeftSide: boolean): number;

  // ========== Cutting & Path Operations ==========

  /**
   * Offset opening cut path for geometry operations
   * @param segments - Path segments to offset
   * @param offsetDistance - Offset distance
   * @param faceInfo - Face information context
   * @returns Offset path segments
   */
  offsetOpeningCutPath(
    segments: Line3d[],
    offsetDistance: number,
    faceInfo: { surfaceObj: { surface: unknown } }
  ): Line3d[];

  /**
   * Get offset cut information for door opening
   * @param face - Target face
   * @param offset - Offset distance
   * @returns Array of offset cut information
   */
  getOffsetCutInfo(face: Face, offset: number): OffsetCutInfo[];

  /**
   * Get baseboard cutter information for floor intersection
   * @param face - Wall face to cut
   * @returns Array of baseboard cutter information
   */
  getBaseboardCutterInfo(face: Face): BaseboardCutterInfo[];

  // ========== Material & Paint Updates ==========

  /**
   * Update face mix paint materials
   * @param updateDoorStone - Whether to update door stone face
   */
  updateFaceMixPaint(updateDoorStone?: boolean): void;

  /**
   * Internal method to update single face mixpaint
   * @param face - Face to update
   * @internal
   */
  protected _updateFaceMixpaint(face: Face): void;

  // ========== I/O ==========

  /**
   * Get I/O handler for this door type
   * @returns ParametricDoor_IO instance
   */
  getIO(): ParametricDoor_IO;
}