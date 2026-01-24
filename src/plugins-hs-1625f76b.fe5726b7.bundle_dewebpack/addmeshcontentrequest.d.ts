/**
 * Module: AddMeshContentRequest
 * Handles the creation and positioning of mesh content in the scene
 */

import { HSCore } from './HSCore';

/**
 * 3D position coordinates
 */
export interface Position {
  /** X-axis coordinate */
  x?: number;
  /** Y-axis coordinate */
  y?: number;
  /** Z-axis coordinate */
  z?: number;
}

/**
 * 3D rotation angles in degrees or radians
 */
export interface Rotation {
  /** Rotation around X-axis (pitch) */
  x?: number;
  /** Rotation around Y-axis (yaw) */
  y?: number;
  /** Rotation around Z-axis (roll) */
  z?: number;
}

/**
 * 3D scale factors
 */
export interface Scale {
  /** Scale factor along X-axis */
  x?: number;
  /** Scale factor along Y-axis */
  y?: number;
  /** Scale factor along Z-axis */
  z?: number;
}

/**
 * Metadata for mesh content creation
 */
export type MeshContentMeta = unknown;

/**
 * Request class for adding mesh content to the active scene layer
 * Extends the core state request to support transactional operations
 */
export declare class AddMeshContentRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _position?: Position;
  private readonly _rotation?: Rotation | number;
  private readonly _scale?: Scale;
  private readonly _meta: MeshContentMeta;

  /**
   * Creates a new mesh content request
   * 
   * @param meta - Metadata required for mesh creation
   * @param position - Optional 3D position for the mesh
   * @param rotation - Optional rotation (single Z-axis value or full 3D rotation object)
   * @param scale - Optional scale factors
   */
  constructor(
    meta: MeshContentMeta,
    position?: Position,
    rotation?: Rotation | number,
    scale?: Scale
  );

  /**
   * Commits the request and creates the mesh content
   * Called by the transaction system
   * 
   * @returns The created mesh content instance or undefined if creation failed
   */
  onCommit(): HSCore.Model.MeshContent | undefined;

  /**
   * Internal method that handles the actual mesh creation and setup
   * 
   * @returns The created and configured mesh content instance
   * @private
   */
  private _createContent(): HSCore.Model.MeshContent | undefined;
}

/**
 * Alias for Z-axis rotation property
 */
export type ZRotation = number;

/**
 * Alias for X-axis rotation property
 */
export type XRotation = number;

/**
 * Alias for Y-axis rotation property
 */
export type YRotation = number;