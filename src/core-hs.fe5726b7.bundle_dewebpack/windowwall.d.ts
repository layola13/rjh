/**
 * WindowWall module - Defines parametric window wall entities and their I/O handling
 */

import { ExtrudedBody, ExtrudedBody_IO } from './ExtrudedBody';
import { Entity } from './Entity';
import { MaterialData } from './MaterialData';
import { EntityField } from './decorators';
import * as THREE from 'three';

/**
 * Parameters interface for WindowWall geometry definition
 */
export interface WindowWallParameters {
  /** Inner starting point of the wall */
  innerFrom: THREE.Vector3;
  /** Inner ending point of the wall */
  innerTo: THREE.Vector3;
  /** Outer starting point of the wall */
  outerFrom: THREE.Vector3;
  /** Outer ending point of the wall */
  outerTo: THREE.Vector3;
  /** Vertical elevation from base level */
  elevation: number;
  /** Total height of the wall */
  height: number;
  /** Material data for inner face rendering */
  innerMaterialData?: MaterialData;
  /** Material data for wall surfaces */
  materialData?: MaterialData;
  /** Extrusion direction vector */
  direction?: THREE.Vector3;
  /** Array of points defining wall profile */
  points?: THREE.Vector3[];
}

/**
 * I/O handler for WindowWall entity serialization and deserialization
 */
export declare class WindowWall_IO extends ExtrudedBody_IO {
  /**
   * Loads WindowWall entity data from serialized format
   * @param entity - The entity instance to populate
   * @param data - Serialized entity data
   * @param context - Loading context information
   */
  load(entity: WindowWall, data: unknown, context: unknown): void;
}

/**
 * Parametric window wall entity with configurable geometry and materials
 * Extends ExtrudedBody to provide specialized window wall functionality
 */
export declare class WindowWall extends ExtrudedBody {
  /** Configuration parameters for the window wall geometry and appearance */
  @EntityField()
  parameters: WindowWallParameters;

  /**
   * Creates a new WindowWall instance
   * @param id - Unique identifier for the entity
   * @param parent - Optional parent entity reference
   */
  constructor(id?: string, parent?: Entity);

  /**
   * Initializes the window wall with provided parameters
   * Sets default direction, materials, and snapping faces
   * @param parameters - Initial configuration parameters
   */
  initByParameters(parameters: WindowWallParameters): void;

  /**
   * Callback invoked when parameters are modified
   * Updates materials and regenerates geometry based on current parameters
   */
  onParametersChanged(): void;

  /**
   * Retrieves the I/O handler instance for this entity type
   * @returns Singleton instance of WindowWall_IO
   */
  getIO(): WindowWall_IO;
}

/**
 * Global registration
 * Registers WindowWall class with HSConstants.ModelClass.NgParametricWall identifier
 */
declare module './Entity' {
  interface EntityClassRegistry {
    [HSConstants.ModelClass.NgParametricWall]: typeof WindowWall;
  }
}