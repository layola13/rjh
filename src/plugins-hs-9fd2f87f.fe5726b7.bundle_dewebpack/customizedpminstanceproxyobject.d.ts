/**
 * CustomizedPMInstanceProxyObject Module
 * Provides proxy object functionality for customized Product Model instances in DIY 2.0
 * @module CustomizedPMInstanceProxyObject
 */

import { HSCore, HSCatalog } from 'HSCore';
import { DIYUtils } from 'DIYUtils';

/**
 * Position data with optional x, y, z coordinates
 */
interface Position {
  x?: number;
  y?: number;
  z?: number;
}

/**
 * Rotation data with optional x, y, z angles
 */
interface Rotation {
  x?: number;
  y?: number;
  z?: number;
}

/**
 * Model information structure containing geometry and transformation data
 */
interface ModelInfo {
  /** Content type identifier for the model */
  contentType: string;
  /** Position in 3D space */
  pos: Position;
  /** Length along X axis */
  XLength: number;
  /** Length along Y axis */
  YLength: number;
  /** Length along Z axis */
  ZLength: number;
  /** Scale factor */
  scale: number;
  /** Rotation angles */
  rotation: Rotation;
}

/**
 * Pave reference data entry [seekId, data]
 */
type PaveRefData = [string, string];

/**
 * Parsed 3D model structure
 */
interface Model3DData {
  /** Optional array of pave reference data tuples */
  paveRefDatas?: PaveRefData[];
}

/**
 * Duplicate data structure containing model and metadata
 */
interface DuplicateData {
  /** Serialized 3D model data */
  model3d: string;
  /** Model metadata and transformation information */
  modelInfo: ModelInfo;
}

/**
 * Load resource parameter with optional data payload
 */
interface LoadResourceParams {
  /** Optional duplicate data for loading */
  data?: DuplicateData;
}

/**
 * Target transformation data for entity positioning
 */
interface TargetTransform {
  /** Target position coordinates */
  targetPosition?: Position;
  /** Target rotation angles */
  rotation?: Rotation;
}

/**
 * Undo/Redo operation handlers
 */
interface UndoData {
  /** Prepare redo operation */
  prepareRedo: () => void;
  /** Execute undo operation */
  undo: () => void;
  /** Execute redo operation */
  redo: () => void;
}

/**
 * Animation configuration (structure to be defined based on requirements)
 */
type AnimateConfig = unknown[];

/**
 * Customized Product Model instance entity
 */
interface CustomizedPMInstance extends HSCore.Model.Entity {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Z coordinate */
  z: number;
  /** Rotation around X axis */
  XRotation: number;
  /** Rotation around Y axis */
  YRotation: number;
  /** Rotation around Z axis */
  ZRotation: number;
  /** Get the unique parent container */
  getUniqueParent(): CustomizedPMModel;
}

/**
 * Customized Product Model container
 */
interface CustomizedPMModel extends HSCore.Model.Entity {
  /** WebCAD document reference */
  webCADDocument: unknown;
  /** Set entity flag on */
  setFlagOn(flag: HSCore.Model.EntityFlagEnum): void;
}

/**
 * Proxy object for Customized Product Model instances in DIY 2.0
 * Handles lifecycle operations including creation, duplication, resource loading, and removal
 * @extends HSCore.Model.EntityProxyObject
 */
export declare class CustomizedPMInstanceProxyObject extends HSCore.Model.EntityProxyObject {
  /**
   * Get the display name for this proxy object type
   * @returns Localized string for "catalog_customized_model"
   */
  getName(): string;

  /**
   * Remove a customized PM instance from the floorplan
   * @param entity - The entity instance to remove
   */
  removeFromFloorplan(entity: CustomizedPMInstance): void;

  /**
   * Dump entity data for duplication purposes
   * @param entity - The entity to dump data from
   * @returns Duplicate data structure containing model and metadata
   */
  dumpForDuplicate(entity: CustomizedPMInstance): DuplicateData;

  /**
   * Prepare and load required resources for the entity
   * Loads product catalog items and DIY model resources asynchronously
   * @param params - Load resource parameters containing model data
   * @returns Promise that resolves when all resources are loaded
   */
  prepareLoadResource(params: LoadResourceParams): Promise<void>;

  /**
   * Load and create an entity from duplicate data
   * Creates or reuses a CustomizedPMModel container and imports the instance
   * @param data - Duplicate data containing model and transformation info
   * @returns The created customized PM instance, or undefined if data is missing
   */
  loadFromDuplicateData(data: LoadResourceParams): CustomizedPMInstance | undefined;

  /**
   * Apply target transformation to an entity
   * Updates position and rotation if provided values are valid
   * @param entity - The entity to transform
   * @param target - Target transformation data
   */
  trySetEntityToTarget(entity: CustomizedPMInstance, target: TargetTransform): void;

  /**
   * Duplicate an entity to a target transformation
   * @param entity - The source entity to duplicate
   * @param target - Target transformation data
   */
  duplicateToTarget(entity: CustomizedPMInstance, target: TargetTransform): void;

  /**
   * Prepare undo/redo data for an entity operation
   * @param entity - The entity to prepare undo data for
   * @returns Undo data structure with undo/redo handlers
   */
  prepareUndoData(entity: CustomizedPMInstance): UndoData;

  /**
   * Get animation configuration for an entity
   * @param entity - The entity to get animation config for
   * @returns Array of animation configuration objects
   */
  getAnimateConfig(entity: CustomizedPMInstance): AnimateConfig;
}