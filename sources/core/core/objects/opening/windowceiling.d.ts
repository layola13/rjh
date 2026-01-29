/**
 * WindowCeiling module
 * Provides ceiling component for window elements with extrusion capabilities
 */

import { ExtrudedBody_IO, ExtrudedBody } from './ExtrudedBody';
import { Entity } from './Entity';
import { MaterialData } from '../rendering/MaterialData';

/**
 * I/O handler for WindowCeiling entity serialization/deserialization
 */
export declare class WindowCeiling_IO extends ExtrudedBody_IO {
  /**
   * Loads WindowCeiling data from serialized format
   * @param entity - The WindowCeiling entity to load data into
   * @param data - Serialized entity data
   * @param context - Loading context
   */
  load(entity: WindowCeiling, data: unknown, context: unknown): void;
}

/**
 * Parameters for WindowCeiling initialization
 */
export interface WindowCeilingParameters {
  /** Extrusion direction vector */
  direction?: THREE.Vector3;
  /** Material data for the ceiling surface */
  materialData?: MaterialData;
  /** Material data for inner surfaces */
  innerMaterialData?: MaterialData;
  /** Additional parameters inherited from ExtrudedBody */
  [key: string]: unknown;
}

/**
 * WindowCeiling entity representing the ceiling component of a window element
 * Extends ExtrudedBody to provide 3D extrusion capabilities
 */
export declare class WindowCeiling extends ExtrudedBody {
  /** Entity parameters including materials and geometry */
  parameters: WindowCeilingParameters;

  /**
   * Creates a new WindowCeiling instance
   * @param id - Unique identifier for the entity (default: empty string)
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: unknown);

  /**
   * Initializes the window ceiling with given parameters
   * Sets default extrusion direction to (0, 0, -1) and default wall inner material
   * @param parameters - Configuration parameters for the ceiling
   */
  initByParameters(parameters: WindowCeilingParameters): void;

  /**
   * Gets the I/O handler instance for serialization
   * @returns Singleton instance of WindowCeiling_IO
   */
  getIO(): WindowCeiling_IO;

  /**
   * Callback invoked when entity parameters change
   * Updates material assignments based on current parameter values
   */
  onParametersChanged(): void;

  /**
   * Sets material for a specific face key
   * @param faceKey - Identifier for the face to apply material to
   * @param materialData - Material data to apply
   */
  setMaterial(faceKey: string, materialData: MaterialData): void;

  /**
   * Adds a face key to the snapping system
   * @param faceKey - Face identifier for snapping operations
   */
  addSnappingFaceKey(faceKey: string): void;
}

/**
 * Global registration for WindowCeiling entity class
 * Registers with HSConstants.ModelClass.NgParametricWindowCeiling
 */
declare module './Entity' {
  namespace Entity {
    function registerClass(
      modelClass: typeof HSConstants.ModelClass.NgParametricWindowCeiling,
      entityClass: typeof WindowCeiling
    ): void;
  }
}