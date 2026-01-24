/**
 * TurningFrame extension module for generating 3D turning frames in the scene
 * @module TurningFrameExtension
 */

import { TransformNode } from '@babylonjs/core';
import { GenResult } from './GenResult';

/**
 * Types of turning frames
 */
export enum TurningFrameType {
  /** Sash turning frame type */
  sashTurningFrame = 'sashTurningFrame',
  /** Fixed turning frame type */
  fixedTurningFrame = 'fixedTurningFrame'
}

/**
 * Profile data structure
 */
export interface Profile {
  /** Type of the profile */
  profileType: string;
  // Add other profile properties as needed
}

/**
 * Profiles collection
 */
export interface Profiles {
  /** Array of profile data */
  data: Profile[];
}

/**
 * Bar structure in close object
 */
export interface Bar {
  /** Arc height of the bar */
  arcHeight: number;
  // Add other bar properties as needed
}

/**
 * Close object containing bars
 */
export interface CloseObject {
  /** Array of bars in the close object */
  bars: Bar[];
}

/**
 * Close object wrapper
 */
export interface CloseObjectWrapper {
  /** The close object instance */
  closeObject?: CloseObject;
}

/**
 * Generation configuration interface
 */
export interface GenerationConfig {
  /** Profile configurations */
  profiles: Profiles;
  /** Profile cross sections */
  profileCrosss: unknown;
  /** Whether this is 3D frame info mode */
  frame_3D_info?: boolean;
  /** Fixed group array for meshes */
  fixedGroup: unknown[];
  // Add other config properties as needed
}

/**
 * Extension class for generating turning frames in 3D scene
 */
export declare class TurningFrameExtension {
  /** The Babylon.js scene instance */
  private static scene: unknown;

  /**
   * Initialize the extension with a scene
   * @param scene - The Babylon.js scene
   */
  static Init(scene: unknown): void;

  /**
   * Asynchronously generate multiple turning frames
   * @param closeObjects - Array of close object wrappers
   * @param parent - Parent transform node
   * @param config - Generation configuration
   * @param profileTypeName - Name of the profile type (default: "sashTurningFrames")
   * @returns Promise resolving to generation result
   */
  static AsyncGenTurningFrames(
    closeObjects: CloseObjectWrapper[],
    parent: TransformNode,
    config: GenerationConfig,
    profileTypeName?: string
  ): Promise<GenResult>;

  /**
   * Asynchronously generate a single turning frame
   * @param closeObject - The close object containing bar data
   * @param parent - Parent transform node
   * @param config - Generation configuration
   * @param profileTypeName - Name of the profile type
   * @returns Promise resolving to generation result
   */
  static AsyncGenTurningFrame(
    closeObject: CloseObject | null | undefined,
    parent: TransformNode,
    config: GenerationConfig,
    profileTypeName: string
  ): Promise<GenResult>;
}

export { TurningFrameExtension, TurningFrameType };