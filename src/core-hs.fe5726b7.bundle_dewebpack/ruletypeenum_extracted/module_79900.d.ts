/**
 * Module: module_79900
 * Original ID: 79900
 * 
 * Ceiling light computation module that extends the default light calculator.
 * Computes spot light configuration for ceiling-mounted fixtures.
 */

import BaseLight from './BaseLight';

/**
 * Position information for a light fixture
 */
interface LightPosition {
  x: number;
  y: number;
}

/**
 * Size dimensions of a light fixture
 */
interface LightSize {
  x: number;
  y: number;
  z: number;
}

/**
 * Light fixture entity with spatial properties
 */
interface LightEntity {
  /**
   * Get the current position of the light fixture
   */
  getPosition(): LightPosition;
  
  /**
   * Forward-facing vector of the fixture's front
   */
  frontForwardVec: THREE.Vector2;
  
  /**
   * Get the dimensions of the light fixture
   */
  getSize(): LightSize;
}

/**
 * Configuration settings for a light fixture
 */
interface LightConfig {
  /**
   * Check if the ceiling face should be hidden
   */
  isCeilingFaceHidden(): boolean;
}

/**
 * Computed light configuration result
 */
interface ComputedLight {
  /** Type of light source */
  type: HSCore.Model.LightTypeEnum.SpotLight;
  /** Color temperature in Kelvin */
  temperature: number;
  /** 2D position on the ceiling plane */
  position: THREE.Vector2;
  /** Height from the floor */
  height: number;
  /** IES light profile data */
  ies: string | null;
  /** Light intensity in lumens or candelas */
  intensity: number;
}

/**
 * Default light properties returned by the base calculator
 */
interface DefaultLightProperties {
  /** Light intensity value */
  intensity: number;
  /** Color temperature in Kelvin */
  temperature: number;
  /** IES photometric data */
  ies: string | null;
}

/**
 * Ceiling light calculator that computes spot light configurations
 * for ceiling-mounted fixtures.
 */
export default class CeilingLightCalculator extends BaseLight {
  /**
   * Computes the light configuration for a ceiling-mounted fixture.
   * 
   * @param entity - The light fixture entity with spatial properties
   * @param config - Configuration settings for the fixture
   * @param sceneContext - Additional scene context for computation
   * @param renderOptions - Rendering options affecting light calculation
   * @returns Array of computed light configurations (empty if ceiling is hidden)
   */
  _compute(
    entity: LightEntity,
    config: LightConfig,
    sceneContext: unknown,
    renderOptions: unknown
  ): ComputedLight[] {
    // Skip computation if ceiling face is hidden
    if (config.isCeilingFaceHidden()) {
      return [];
    }

    const position = entity.getPosition();
    const defaultHeight = this.getDefaultHeight(config);
    const forwardVector = entity.frontForwardVec;
    const size = entity.getSize();

    // Get default light properties from base class
    const {
      intensity,
      temperature,
      ies
    }: DefaultLightProperties = super.getDefaultLight(
      entity,
      config,
      sceneContext
    );

    // Calculate light position offset by half the fixture depth
    const lightPosition = new THREE.Vector2(position.x, position.y);
    lightPosition.add(forwardVector.clone().multiplyScalar(size.y / 2));

    return [{
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      position: lightPosition,
      height: defaultHeight,
      ies,
      intensity
    }];
  }

  /**
   * Get the default mounting height for the light fixture
   * @param config - Light configuration
   * @returns Height value in scene units
   */
  protected getDefaultHeight(config: LightConfig): number {
    // Implementation in base class
    throw new Error('Method must be implemented by base class');
  }

  /**
   * Get default light properties from configuration
   * @param entity - Light fixture entity
   * @param config - Light configuration
   * @param sceneContext - Scene context
   * @returns Default light properties
   */
  protected getDefaultLight(
    entity: LightEntity,
    config: LightConfig,
    sceneContext: unknown
  ): DefaultLightProperties {
    // Implementation in base class
    throw new Error('Method must be implemented by base class');
  }
}