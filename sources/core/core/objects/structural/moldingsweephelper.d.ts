import type { Loop, Vector2, Vector3, Matrix3 } from './math';
import type { Logger } from './logger';

/**
 * Profile configuration for molding sweep operations
 */
export interface IMoldingProfileConfig {
  /** SVG path string representing the profile shape */
  profile: string;
  /** Width of the profile in units */
  profileWidth: number;
  /** Height of the profile in units */
  profileHeight: number;
  /** Horizontal offset for profile positioning */
  offsetX: number;
  /** Vertical offset for profile positioning */
  offsetY: number;
  /** Whether to flip the profile orientation */
  flip: boolean;
  /** Whether to flip along X axis */
  flipX: boolean;
  /** Whether to flip along Y axis */
  flipY: boolean;
  /** Content type identifier (e.g., "cornice", "pocket") */
  contentType: string;
  /** Profile version number (optional, defaults to 1000) */
  pVersion?: number;
  /** Whether to flip profile along X axis before other transformations (optional) */
  profileFlipX?: boolean;
}

/**
 * Parent interface for sweep operations
 * Re-exported from SweepHelper module
 */
export interface ISweeperParent {
  // Methods and properties to be defined based on actual implementation
  // This interface is imported from module 38096
}

/**
 * Base class for sweep helper operations
 * Imported from module 38096
 */
export declare class SweepHelper {
  // Base implementation from parent module
}

/**
 * Entity or node with transformation matrix support
 */
export interface ITransformableEntity {
  /** Get the local-to-world transformation matrix */
  getLocalToWorldMatrix(): Matrix3;
}

/**
 * Helper class for molding sweep operations
 * Handles profile parsing, transformation, and 3D shape generation
 * 
 * @remarks
 * This is a singleton class. Use `MoldingSweepHelper.getInstance()` to obtain the instance.
 * 
 * @example
 *