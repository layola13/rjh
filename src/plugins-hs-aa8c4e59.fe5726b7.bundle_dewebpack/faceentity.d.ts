/**
 * Face entity class for handling wall/ceiling face data in 3D room modeling.
 * Extends AcceptEntity to provide face-specific data processing and serialization.
 */

import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { HSCore } from './HSCore';
import { Utils } from './Utils';

/**
 * Area information for a face entity
 */
interface AreaInfo {
  /** Total area including holes */
  fullArea: number | string;
  /** Array of hole areas */
  holeArea: number[] | string[];
  /** Array of obstacle areas */
  obstacleArea: number[] | string[];
  /** Valid paintable area (full area minus obstacles) */
  validArea: number | string;
}

/**
 * Opening/hole information
 */
interface OpenHoleInfo {
  /** Opening identifier */
  id: string;
  /** Opening type (window, door, etc.) */
  type: string;
  /** Area occupied by this opening */
  area: number;
}

/**
 * 2D rendering parameters
 */
interface TwoDimensionParams {
  /** Paint/texture identifier */
  paveId?: string;
  /** Material category data */
  material?: any;
}

/**
 * Room information structure
 */
interface RoomInfo {
  /** Associated floor identifiers */
  floors?: Array<{ id: string }>;
}

/**
 * Face entity representing walls, ceilings, or floors in a 3D space.
 * Handles geometry data, area calculations, openings, and material assignments.
 */
export declare class FaceEntity extends AcceptEntity {
  /** Associated room identifier */
  roomId: string;

  /**
   * Creates a new FaceEntity instance
   * @param roomId - Optional room identifier this face belongs to
   */
  constructor(roomId?: string);

  /**
   * Builds child entities (no-op for FaceEntity)
   */
  buildChildren(): void;

  /**
   * Constructs entity data from a face model object
   * @param faceModel - The HSCore face model containing geometry and metadata
   */
  buildEntityData(faceModel: HSCore.Model.Face | HSCore.Model.Ceiling): void;

  /**
   * Extracts and formats instance data from a face model
   * @param faceModel - The face model to process
   * @returns Formatted instance data with parameters
   */
  getInstanceData(faceModel: HSCore.Model.Face | HSCore.Model.Ceiling): InstanceData;

  /**
   * Calculates openings (windows, doors) present on a wall face
   * @param faceModel - The face model to analyze
   * @returns Array of opening identifiers
   */
  calcWallFaceOpens(faceModel: HSCore.Model.Face): string[];
}