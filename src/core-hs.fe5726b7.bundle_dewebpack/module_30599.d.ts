/**
 * Module: module_30599
 * Original ID: 30599
 * 
 * Ceiling light computation module for 3D scene rendering.
 * Calculates light position and properties based on object geometry and face visibility.
 */

import BaseLight from './module_42288';

/**
 * Light configuration interface representing the computed light properties
 */
interface LightConfig {
  /** 3D position of the light source */
  position: {
    x: number;
    y: number;
    z: number;
  };
  /** IES light profile data */
  ies: unknown;
  /** Light intensity value */
  intensity: number;
  /** Color temperature in Kelvin */
  temperature: number;
}

/**
 * Object interface representing a 3D entity with position and size
 */
interface SceneObject {
  /** Get the 3D position of the object */
  getPosition(): THREE.Vector3;
  /** Get the size/dimensions of the object */
  getSize(): THREE.Vector3;
  /** Forward direction vector for front-facing orientation */
  frontForwardVec: THREE.Vector2;
}

/**
 * Face visibility controller interface
 */
interface FaceController {
  /** Check if the ceiling face should be hidden */
  isCeilingFaceHidden(): boolean;
}

/**
 * Default light properties returned by base class
 */
interface DefaultLightProperties {
  /** Light intensity */
  intensity: number;
  /** Color temperature */
  temperature: number;
  /** IES profile data */
  ies: unknown;
}

/**
 * Ceiling light calculator that extends the base light computation.
 * Computes ceiling-mounted light positions with offset adjustments.
 */
class CeilingLightComputer extends BaseLight {
  /** Offset distance from object surface to light position (in units) */
  private static readonly offset: number = 0.16;

  /**
   * Compute ceiling light configurations for a scene object.
   * 
   * @param sceneObject - The 3D object to compute lights for
   * @param faceController - Controller for face visibility
   * @param param2 - Additional computation parameter (type unknown)
   * @param param3 - Additional computation parameter (type unknown)
   * @returns Array of light configurations, empty if ceiling face is hidden
   */
  protected _compute(
    sceneObject: SceneObject,
    faceController: FaceController,
    param2: unknown,
    param3: unknown
  ): LightConfig[] {
    // Skip computation if ceiling face is hidden
    if (faceController.isCeilingFaceHidden()) {
      return [];
    }

    const objectPosition = sceneObject.getPosition();
    const halfHeight = sceneObject.getSize().y / 2;
    const lightOffset = halfHeight + CeilingLightComputer.offset;

    // Get default light properties from base class
    const { intensity, temperature, ies } = super.getDefaultLight(
      sceneObject,
      faceController,
      param2
    ) as DefaultLightProperties;

    // Calculate 2D base position
    const basePosition2D = new THREE.Vector2(objectPosition.x, objectPosition.y);
    const finalPosition2D = new THREE.Vector2();

    // Apply forward offset to position
    finalPosition2D.addVectors(
      basePosition2D,
      sceneObject.frontForwardVec.clone().multiplyScalar(lightOffset)
    );

    // Return computed light configuration
    return [
      {
        ...super.getDefaultLight(sceneObject, faceController, param2),
        position: {
          x: finalPosition2D.x,
          y: finalPosition2D.y,
          z: objectPosition.z
        },
        ies,
        intensity,
        temperature
      }
    ];
  }
}

export default CeilingLightComputer;