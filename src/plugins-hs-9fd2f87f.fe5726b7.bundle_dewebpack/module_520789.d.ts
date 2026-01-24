/**
 * Lightboard snap handler for cabinet entities.
 * Manages snapping logic, edge detection, positioning and rotation of lightboard elements relative to cabinets.
 */

import type { Vector3, Line3 } from 'three';
import type { HSCore } from '@/types/hscore';

/**
 * Configuration for updating lightboard position after snapping
 */
export interface LightboardPositionUpdateConfig {
  /** The cabinet to snap to */
  cabinet: HSCore.Model.PAssembly;
  /** Target position for the lightboard */
  pos: Vector3;
  /** Rotation angle in degrees */
  rotation: number;
}

/**
 * Configuration for updating lightboard size after snapping
 */
export interface LightboardSizeUpdateConfig {
  /** The cabinet to snap to */
  cabinet: HSCore.Model.PAssembly;
  /** The edge line to align with */
  edge: Line3;
}

/**
 * Handles snapping behavior for lightboard entities on cabinets.
 * Calculates snap edges, rotation, and position based on cabinet geometry.
 */
export default class LightboardSnapHandler {
  /** The cabinet entity this handler operates on */
  readonly cabinet: HSCore.Model.PAssembly;
  
  /** The lightboard entity to be snapped */
  readonly entity: HSCore.Model.Entity;

  /**
   * Creates a new lightboard snap handler
   * @param cabinet - The cabinet to snap the lightboard to
   * @param entity - The lightboard entity to be snapped
   */
  constructor(cabinet: HSCore.Model.PAssembly, entity: HSCore.Model.Entity);

  /**
   * Gets all valid snap edges for the cabinet.
   * Handles special cases for five-edge cabinets, right-angle cabinets, and L-shaped cabinets.
   * @returns Array of Line3 objects representing valid snap edges
   */
  getSnapEgdes(): Line3[];

  /**
   * Determines which snap edge the entity should snap to based on its current position.
   * @returns The closest snap edge to the entity's current position
   */
  getSnapedEdge(): Line3;

  /**
   * Calculates the required rotation for the entity after snapping.
   * Takes into account cabinet type and geometry.
   * @returns Rotation angle in degrees
   */
  getRotation(): number;

  /**
   * Calculates the final position for the entity after snapping.
   * Positions the entity at the center of the snapped edge with appropriate offset.
   * @returns Vector3 representing the new position
   */
  getPosition(): Vector3;

  /**
   * Updates the lightboard position and rotation after snapping operation.
   * Handles special cases for straight corner and five-corner cabinets.
   * @param config - Configuration object containing cabinet, position, and rotation
   */
  updateLightboardPosAfterSnapped(config: LightboardPositionUpdateConfig): void;

  /**
   * Updates the lightboard dimensions to match the snapped edge.
   * Adjusts Z position, height, and length based on cabinet geometry and door gaps.
   * @param config - Configuration object containing cabinet and target edge
   */
  updateLightboardSizeAfterSnapped(config: LightboardSizeUpdateConfig): void;
}