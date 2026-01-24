/**
 * Customized background wall feature model and I/O handler
 * @module CustomizedBackgroundWall
 */

import { CustomizedFeatureModel, CustomizedFeatureModel_IO } from './CustomizedFeatureModel';
import { Entity } from './Entity';
import { Sketch } from './Sketch';
import { LoadOptions } from './types';

/**
 * I/O handler for loading and saving customized background wall data
 * Handles version compatibility and coordinate transformations
 */
export declare class CustomizedBackgroundWall_IO extends CustomizedFeatureModel_IO {
  /**
   * Load background wall data from serialized format
   * @param data - Serialized wall data
   * @param target - Target CustomizedBackgroundWall instance to load into
   * @param options - Load options including version information
   * @remarks
   * For versions earlier than 0.28, applies backward compatibility transformations:
   * - Translates sketch vertically by its height
   * - Adjusts 3D conversion matrix to maintain coordinate consistency
   */
  load(data: unknown, target: CustomizedBackgroundWall, options?: LoadOptions): void;

  /**
   * Get singleton instance of the I/O handler
   */
  static instance(): CustomizedBackgroundWall_IO;
}

/**
 * Represents a customizable background wall feature in the scene
 * Extends base feature model with wall-specific behavior
 */
export declare class CustomizedBackgroundWall extends CustomizedFeatureModel {
  /**
   * Create a new customized background wall
   * @param id - Unique identifier for the wall, defaults to empty string
   * @param sketch - Optional sketch geometry defining the wall shape
   */
  constructor(id?: string, sketch?: Sketch | undefined);

  /**
   * Get the I/O handler for this model type
   * @returns Singleton instance of CustomizedBackgroundWall_IO
   */
  getIO(): CustomizedBackgroundWall_IO;

  /**
   * Get the Z-axis offset scaling factor for depth positioning
   * @returns Scale factor (0.5 for background walls)
   * @internal
   */
  protected _getZOffsetScale(): number;
}

/**
 * Register the CustomizedBackgroundWall class with the entity system
 * @internal
 */
declare module './Entity' {
  namespace Entity {
    function registerClass(
      modelClass: typeof HSConstants.ModelClass.CustomizedBackgroundWall,
      constructor: typeof CustomizedBackgroundWall
    ): void;
  }
}

/**
 * Load options for backward compatibility handling
 */
export interface LoadOptions {
  /** Semantic version string of the data format */
  version?: string;
  [key: string]: unknown;
}

/**
 * Global constants for model class identification
 */
declare namespace HSConstants {
  enum ModelClass {
    CustomizedBackgroundWall = 'CustomizedBackgroundWall'
  }
}

/**
 * Core utility functions
 */
declare namespace HSCore.Util.Version {
  /**
   * Check if a version is earlier than a reference version
   * @param version - Version to check
   * @param referenceVersion - Reference version string
   * @returns True if version is earlier than referenceVersion
   */
  function isEarlierThan(version: string, referenceVersion: string): boolean;
}