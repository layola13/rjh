/**
 * TubeLift module provides classes for managing tube-based lift functionality in 3D space.
 * @module TubeLift
 * @originalId 265260
 */

import * as THREE from 'three';
import { ContentLift, ContentLiftController } from './ContentLift';

/**
 * Represents the 3D offset position for tube picking operations.
 */
interface TubePickOffset {
  /** X-axis offset from center */
  x: number;
  /** Y-axis offset from center */
  y: number;
  /** Z-axis offset from center */
  z: number;
}

/**
 * Represents an entity with spatial properties in 3D space.
 */
interface Entity {
  /**
   * Gets the center position of the entity.
   * @returns The center position as a THREE.Vector3
   */
  getCenter(): THREE.Vector3;
}

/**
 * TubeLift class extends ContentLift to provide tube-specific lifting functionality.
 * Manages the positioning and display of tube lift content in 3D space.
 */
export declare class TubeLift extends ContentLift {
  /** The controller managing this tube lift instance */
  controller: TubeLiftController;
  
  /** The current position of the tube in 3D space */
  tubePosition: THREE.Vector3;

  /**
   * Gets the current content position based on the tube position.
   * @returns A THREE.Vector3 representing the content position
   */
  get contentPosition(): THREE.Vector3;

  /**
   * Updates the gizmo visibility and position based on the controller's content position.
   * @internal
   */
  protected _updateGizmoShow(): void;
}

/**
 * TubeLiftController manages the control logic for TubeLift instances.
 * Handles position calculations with pick offset adjustments.
 */
export declare class TubeLiftController extends ContentLiftController {
  /** The offset applied when picking/interacting with the tube */
  tubePickOffset?: TubePickOffset;

  /**
   * Creates a new TubeLiftController instance.
   * @param entity - The entity being controlled
   * @param param1 - Second controller parameter
   * @param param2 - Third controller parameter
   * @param param3 - Fourth controller parameter
   * @param param4 - Fifth controller parameter
   * @param pickPosition - The initial pick position used to calculate offset from entity center
   */
  constructor(
    entity: Entity,
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    pickPosition: THREE.Vector3
  );

  /**
   * Gets the calculated content position with pick offset applied.
   * If tubePickOffset exists, applies the offset to the entity's center position.
   * @returns A THREE.Vector3 representing the adjusted content position
   */
  get contentPosition(): THREE.Vector3;
}