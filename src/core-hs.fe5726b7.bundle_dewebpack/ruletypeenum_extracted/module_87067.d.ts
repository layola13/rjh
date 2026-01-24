import { default as BaseClass } from './module_42288';

/**
 * Light position configuration
 */
interface LightPosition {
  x: number;
  y: number;
}

/**
 * Light configuration object
 */
interface LightConfig {
  /** Light type enumeration */
  type: HSCore.Model.LightTypeEnum;
  /** Color temperature in Kelvin */
  temperature: number;
  /** Light intensity */
  intensity: number;
  /** 2D position of the light */
  position: LightPosition;
  /** Height of the light from the ground */
  height: number;
  /** IES light profile data */
  ies?: unknown;
}

/**
 * 3D vector with x, y, z coordinates
 */
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D vector with x, y coordinates
 */
interface Vector2D {
  x: number;
  y: number;
}

/**
 * Entity with position, direction and size information
 */
interface Entity {
  /** Get the 3D position of the entity */
  getPosition(): Vector3D;
  /** Forward direction vector */
  frontForwardVec: THREE.Vector2;
  /** Get the size dimensions of the entity */
  getSize(): Vector3D;
}

/**
 * Target object with ceiling visibility information
 */
interface Target {
  /** Check if ceiling face is hidden */
  isCeilingFaceHidden(): boolean;
}

/**
 * Render options configuration
 */
interface RenderOptions {
  /** Rendering template key identifier */
  templateKey?: string;
}

/**
 * Default light properties
 */
interface DefaultLight {
  /** Light intensity value */
  intensity: number;
  /** Color temperature in Kelvin */
  temperature: number;
  /** IES profile data (optional) */
  ies?: unknown;
}

/**
 * Ceiling light computer class
 * Computes spot light positions for ceiling-mounted fixtures
 */
export default class CeilingLightComputer extends BaseClass {
  /**
   * Compute light configurations for the given entity
   * @param entity - The entity to compute lights for
   * @param target - The target object containing scene information
   * @param options - Rendering options and template settings
   * @param _unused - Unused parameter (reserved for future use)
   * @returns Array of light configurations
   */
  _compute(
    entity: Entity,
    target: Target,
    options: RenderOptions,
    _unused: unknown
  ): LightConfig[] {
    // Skip computation if ceiling is hidden
    if (target.isCeilingFaceHidden()) {
      return [];
    }

    const position = entity.getPosition();
    const forwardVector = entity.frontForwardVec;
    const size = entity.getSize();
    const maxDimension = Math.max(size.x, size.y);
    const lightHeight = this.getDefaultHeight(target);
    const { intensity, temperature, ies } = super.getDefaultLight(entity, target, options);

    // Calculate base light position
    const baseLightPosition = new THREE.Vector2(position.x, position.y);
    const FORWARD_OFFSET = 0.16;
    baseLightPosition.add(
      forwardVector.clone().multiplyScalar(size.y / 2 + FORWARD_OFFSET)
    );

    const lights: LightConfig[] = [];

    const SMALL_FIXTURE_THRESHOLD = 2;
    
    if (maxDimension < SMALL_FIXTURE_THRESHOLD) {
      // Single light for small fixtures
      const lightConfig: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: baseLightPosition,
        height: lightHeight,
        ies
      };
      lights.push(lightConfig);
    } else {
      // Dual lights for larger fixtures
      const perpendicular = forwardVector
        .clone()
        .rotateAround({ x: 0, y: 0 }, THREE.Math.degToRad(90));
      
      const LIGHT_SPACING = 1;
      let leftPosition = baseLightPosition.clone().add(
        perpendicular.clone().multiplyScalar(LIGHT_SPACING)
      );
      let rightPosition = baseLightPosition.clone().sub(
        perpendicular.clone().multiplyScalar(LIGHT_SPACING)
      );

      // Adjust positions with default offset
      const DEFAULT_ADJUSTMENT = -0.5;
      leftPosition = this._adjustPosition(leftPosition, target, DEFAULT_ADJUSTMENT) ?? leftPosition;
      rightPosition = this._adjustPosition(rightPosition, target, DEFAULT_ADJUSTMENT) ?? rightPosition;

      // Additional adjustment for realistic/general templates
      const isRealisticOrGeneral =
        options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
        options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL;
      
      if (isRealisticOrGeneral) {
        const ENHANCED_ADJUSTMENT = -0.65;
        leftPosition = this._adjustPosition(leftPosition, target, ENHANCED_ADJUSTMENT) ?? leftPosition;
        rightPosition = this._adjustPosition(rightPosition, target, ENHANCED_ADJUSTMENT) ?? rightPosition;
      }

      const leftLightConfig: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: leftPosition,
        height: lightHeight,
        ies
      };

      const rightLightConfig: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: rightPosition,
        height: lightHeight,
        ies
      };

      lights.push(leftLightConfig);
      lights.push(rightLightConfig);
    }

    return lights;
  }

  /**
   * Adjust light position based on target constraints
   * @param position - Position to adjust
   * @param target - Target object with scene information
   * @param offset - Adjustment offset value
   * @returns Adjusted position or null if adjustment fails
   */
  protected _adjustPosition(
    position: Vector2D,
    target: Target,
    offset: number
  ): Vector2D | null {
    // Implementation would be inherited or defined elsewhere
    return null;
  }
}