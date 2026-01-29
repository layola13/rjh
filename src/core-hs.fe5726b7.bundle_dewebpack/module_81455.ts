import BaseLight from './BaseLight';

interface LightConfig {
  type: HSCore.Model.LightTypeEnum.SpotLight;
  temperature: number;
  intensity: number;
  position: THREE.Vector3 | { x: number; y: number; z: number };
  height: number;
  ies: string | undefined;
}

interface Size {
  x: number;
  y: number;
}

interface Element {
  getPosition(): THREE.Vector3;
  getSize(): Size;
  getRotation(): number;
}

interface Target {
  isCeilingFaceHidden(): boolean;
}

const MIN_SIZE_FOR_DOUBLE_LIGHTS = 2;
const MIN_SIZE_FOR_QUAD_LIGHTS = 3.8;
const EDGE_OFFSET_SMALL = 0.35;
const EDGE_OFFSET_LARGE = 0.7;
const POSITION_ADJUSTMENT_OFFSET = -0.75;
const ROTATION_THRESHOLD = 5;

export default class CeilingLightCalculator extends BaseLight {
  _compute(
    element: Element,
    target: Target,
    param3: unknown,
    param4: unknown
  ): LightConfig[] {
    if (target.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const height = this.getDefaultHeight(target);
    const size = element.getSize();
    const maxDimension = Math.max(size.x, size.y);
    const rotation = element.getRotation();

    const { intensity, temperature, ies } = super.getDefaultLight(
      element,
      target,
      param3
    );

    const lights: LightConfig[] = [
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position,
        height,
        ies,
      },
    ];

    if (maxDimension >= MIN_SIZE_FOR_DOUBLE_LIGHTS) {
      const offset =
        maxDimension <= MIN_SIZE_FOR_QUAD_LIGHTS
          ? maxDimension / 2 - EDGE_OFFSET_SMALL
          : (maxDimension - EDGE_OFFSET_LARGE) / 4;

      const direction =
        size.x > size.y
          ? new THREE.Vector2(1, 0)
          : new THREE.Vector2(0, 1);

      if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
        direction.rotateAround(
          new THREE.Vector2(0, 0),
          (Math.PI * (rotation % 180)) / 180
        );
      }

      const center = new THREE.Vector2(position.x, position.y);

      const firstOffset = center.clone().add(direction.clone().multiplyScalar(offset));
      const adjustedFirst = this._adjustPosition(firstOffset, target, POSITION_ADJUSTMENT_OFFSET) ?? firstOffset;
      const firstPosition = { ...position, ...adjustedFirst };

      const secondOffset = center.clone().sub(direction.clone().multiplyScalar(offset));
      const adjustedSecond = this._adjustPosition(secondOffset, target, POSITION_ADJUSTMENT_OFFSET) ?? secondOffset;
      const secondPosition = { ...position, ...adjustedSecond };

      lights.push(
        {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature,
          intensity,
          position: firstPosition,
          height,
          ies,
        },
        {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature,
          intensity,
          position: secondPosition,
          height,
          ies,
        }
      );
    }

    if (maxDimension > MIN_SIZE_FOR_QUAD_LIGHTS) {
      const offset = (maxDimension - EDGE_OFFSET_LARGE) / 2;

      const direction =
        size.x > size.y
          ? new THREE.Vector2(1, 0)
          : new THREE.Vector2(0, 1);

      if (Math.abs(rotation % 180) > ROTATION_THRESHOLD) {
        direction.rotateAround(
          new THREE.Vector2(0, 0),
          (Math.PI * (rotation % 180)) / 180
        );
      }

      const center = new THREE.Vector2(position.x, position.y);

      const firstOffset = center.clone().add(direction.clone().multiplyScalar(offset));
      const adjustedFirst = this._adjustPosition(firstOffset, target, POSITION_ADJUSTMENT_OFFSET) ?? firstOffset;
      const firstPosition = { ...position, ...adjustedFirst };

      const secondOffset = center.clone().sub(direction.clone().multiplyScalar(offset));
      const adjustedSecond = this._adjustPosition(secondOffset, target, POSITION_ADJUSTMENT_OFFSET) ?? secondOffset;
      const secondPosition = { ...position, ...adjustedSecond };

      lights.push(
        {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature,
          intensity,
          position: firstPosition,
          height,
          ies,
        },
        {
          type: HSCore.Model.LightTypeEnum.SpotLight,
          temperature,
          intensity,
          position: secondPosition,
          height,
          ies,
        }
      );
    }

    return lights;
  }

  private _adjustPosition(
    position: THREE.Vector2,
    target: Target,
    offset: number
  ): { x: number; y: number } | null {
    // Implementation details not provided in original code
    return null;
  }
}