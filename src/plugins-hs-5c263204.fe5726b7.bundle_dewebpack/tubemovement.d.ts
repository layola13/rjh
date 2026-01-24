/**
 * Module: TubeMovement
 * Provides movement controllers for tube-based 3D content manipulation
 */

import { ContentMovement, ContentMovementController } from './ContentMovement';
import * as THREE from 'three';

/**
 * Represents a 3D offset position
 */
interface TubePickOffset {
  /** X-axis offset */
  x: number;
  /** Y-axis offset */
  y: number;
  /** Z-axis offset */
  z: number;
}

/**
 * Entity interface with center position calculation
 */
interface ITubeEntity {
  /**
   * Gets the center position of the entity
   * @returns The center position as a 3D vector
   */
  getCenter(): THREE.Vector3;
}

/**
 * TubeMovement class
 * Extends ContentMovement to handle tube-specific movement behavior
 */
export declare class TubeMovement extends ContentMovement {
  /** Current position of the tube in 3D space */
  protected tubePosition: THREE.Vector3;
  
  /** Reference to the associated controller */
  protected controller: TubeMovementController;

  /**
   * Gets the current content position
   * @returns A copy of the tube position as Vector3
   */
  get contentPosition(): THREE.Vector3;

  /**
   * Updates the gizmo visibility based on tube position
   * @internal
   */
  protected _updateGizmoShow(): void;
}

/**
 * TubeMovementController class
 * Manages tube movement operations with pick offset handling
 */
export declare class TubeMovementController extends ContentMovementController {
  /** Offset applied when picking/moving the tube */
  protected tubePickOffset?: TubePickOffset;
  
  /** The entity being controlled */
  protected entity: ITubeEntity;

  /**
   * Creates a new TubeMovementController instance
   * @param entity - The tube entity to control
   * @param param2 - Second controller parameter
   * @param param3 - Third controller parameter
   * @param param4 - Fourth controller parameter
   * @param param5 - Fifth controller parameter
   * @param pickPosition - Initial pick position for calculating offset
   */
  constructor(
    entity: ITubeEntity,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    param5: unknown,
    pickPosition: THREE.Vector3
  );

  /**
   * Gets the current content position with pick offset applied
   * @returns The adjusted position as Vector3
   */
  get contentPosition(): THREE.Vector3;
}