import type { CoordinateAxis } from './CoordinateAxis';
import type * as THREE from 'three';

/**
 * Offset coordinates for tube picking interactions
 */
interface TubePickOffset {
  /** X-axis offset from entity center */
  x: number;
  /** Y-axis offset from entity center */
  y: number;
  /** Z-axis offset from entity center */
  z: number;
}

/**
 * Extended CoordinateAxis class with tube picking offset support
 * 
 * @remarks
 * This class extends CoordinateAxis to add tube picking functionality,
 * allowing accurate positioning based on pick offset from the entity center.
 * 
 * @typeParam E - Entity type parameter (inherited from CoordinateAxis)
 * @typeParam N - Node type parameter (inherited from CoordinateAxis)
 * @typeParam I - Interaction type parameter (inherited from CoordinateAxis)
 * @typeParam A - Additional parameters type (inherited from CoordinateAxis)
 */
export default class TubePickCoordinateAxis extends CoordinateAxis {
  /**
   * Offset from entity center where the tube was picked
   * Used to calculate accurate content position
   */
  private tubePickOffset?: TubePickOffset;

  /**
   * Creates a new TubePickCoordinateAxis instance
   * 
   * @param entity - The entity associated with this axis
   * @param node - The scene graph node
   * @param interaction - The interaction component
   * @param additionalParams - Additional parameters for the axis
   * @param pickPosition - The 3D position where the tube was picked
   */
  constructor(
    entity: unknown,
    node: unknown,
    interaction: { getCenter(): THREE.Vector3 },
    additionalParams: unknown,
    pickPosition: THREE.Vector3
  );

  /**
   * Gets the content position adjusted by the tube pick offset
   * 
   * @returns The calculated position as a THREE.Vector3, accounting for
   * the offset from where the tube was originally picked
   */
  get contentPosition(): THREE.Vector3;
}