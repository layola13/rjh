/**
 * Window frame parametric model module
 * Provides IO serialization and entity class for window frame components
 */

import { ParametricModel_IO, ParametricModel } from './parametric-model';
import { Entity } from './entity';
import { EntityField } from './decorators';
import * as THREE from 'three';

/**
 * Window frame parameters interface
 */
interface WindowFrameParameters {
  /** Starting point of the window frame */
  from: THREE.Vector3;
  /** Ending point of the window frame */
  to: THREE.Vector3;
  /** Elevation height from ground level */
  elevation: number;
  /** Total height of the window frame */
  height: number;
  /** Optional window configuration */
  window?: {
    /** Material data for the window */
    materialData?: {
      /** Width of seams in the window frame (defaults to 0) */
      seamWidth: number;
    };
  };
}

/**
 * IO serialization handler for WindowFrame entities
 * Handles serialization and deserialization of window frame data
 */
export declare class WindowFrame_IO extends ParametricModel_IO {
  /**
   * Gets the singleton instance of WindowFrame_IO
   */
  static instance(): WindowFrame_IO;
}

/**
 * Parametric window frame model
 * Represents a configurable window frame component with position, elevation, and height properties
 */
export declare class WindowFrame extends ParametricModel {
  /**
   * Window frame configuration parameters
   */
  @EntityField()
  parameters: WindowFrameParameters;

  /**
   * Creates a new WindowFrame instance
   * @param id - Unique identifier for the window frame (defaults to empty string)
   * @param options - Additional initialization options
   */
  constructor(id?: string, options?: unknown);

  /**
   * Initializes the window frame using provided parameters
   * Automatically sets seamWidth to 0 if window material data is present
   * @param parameters - Configuration parameters for the window frame
   */
  initByParameters(parameters: Partial<WindowFrameParameters>): void;

  /**
   * Gets the IO handler for this entity type
   * @returns WindowFrame_IO singleton instance
   */
  getIO(): WindowFrame_IO;
}

/**
 * Global constants interface
 */
declare const HSConstants: {
  ModelClass: {
    NgParametricWindow: string;
  };
};