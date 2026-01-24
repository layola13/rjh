/**
 * Parametric opening (door/window) creation transaction command
 * Handles creation, undo, and redo operations for parametric openings in the floor plan
 */

import type { HSCore } from './core-types';

/**
 * Metadata information for dependent materials
 */
interface MetaInfo {
  /** Dependent materials for the opening */
  depMates: unknown;
}

/**
 * Position coordinates in 2D space
 */
interface Position {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Specification for adding a parametric opening
 */
interface ParametricOpeningSpec {
  /** The parametric opening instance */
  parametricOpening: HSCore.Model.ParametricDoor | HSCore.Model.ParametricOpening;
  /** Host wall or structure */
  host: unknown;
  /** Parent layer */
  parent: HSCore.Scene.Layer;
}

/**
 * Transaction request for creating parametric openings (doors/windows)
 * Extends the base StateRequest transaction class
 */
declare class ParametricOpeningCreationRequest extends HSCore.Transaction.Common.StateRequest {
  /** Original metadata for the opening */
  private _meta: HSCore.Meta;
  
  /** Additional metadata information including dependent materials */
  private _metaInfo: MetaInfo;
  
  /** Host wall or structure where the opening will be placed */
  private _host: unknown;
  
  /** 2D position coordinates for the opening */
  private _position: Position | undefined;
  
  /** Rotation angle in radians or degrees */
  private _rotation: number | undefined;
  
  /** Scale factor for the opening */
  private _scale: number | undefined;
  
  /** Specification object used for add/remove operations */
  private _spec: ParametricOpeningSpec | undefined;
  
  /** The created parametric opening result */
  result: HSCore.Model.ParametricDoor | HSCore.Model.ParametricOpening | undefined;

  /**
   * Creates a new parametric opening creation transaction
   * @param meta - Opening metadata
   * @param position - Position coordinates (x, y)
   * @param rotation - Rotation angle
   * @param scale - Scale factor
   * @param host - Host wall or structure
   * @param unknown5 - Reserved parameter
   * @param unknown6 - Reserved parameter
   * @param metaInfoContainer - Container with depMates metadata
   */
  constructor(
    meta: HSCore.Meta,
    position: Position | undefined,
    rotation: number | undefined,
    scale: number | undefined,
    host: unknown,
    unknown5: unknown,
    unknown6: unknown,
    metaInfoContainer: MetaInfo
  );

  /**
   * Executes the transaction to create and add the parametric opening
   * Clones metadata, creates the appropriate opening type (door/opening),
   * sets position/rotation, and adds to the active layer
   * @returns The created parametric opening instance
   */
  onCommit(): HSCore.Model.ParametricDoor | HSCore.Model.ParametricOpening;

  /**
   * Reverts the transaction by removing the parametric opening
   */
  onUndo(): void;

  /**
   * Re-applies the transaction by re-adding the parametric opening
   */
  onRedo(): void;

  /**
   * Indicates whether this transaction can be included in field transactions
   * @returns Always returns true
   */
  canTransactField(): boolean;
}

/**
 * Factory function that creates the ParametricOpeningCreationRequest class
 * @param baseClass - The base StateRequest class to extend from
 * @returns The ParametricOpeningCreationRequest class constructor
 */
export default function createParametricOpeningRequest(
  baseClass: typeof HSCore.Transaction.Common.StateRequest
): typeof ParametricOpeningCreationRequest;