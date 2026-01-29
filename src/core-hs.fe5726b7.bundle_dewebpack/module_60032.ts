import BaseClass from './module_42288';

interface LightConfiguration {
  type: HSCore.Model.LightTypeEnum.SpotLight;
  temperature: number;
  intensity: number;
  position: Vector3;
  height: number;
  ies: string | null;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

type Vector3 = Position;

interface Entity {
  getPosition(): Vector3;
}

interface TargetObject {
  isCeilingFaceHidden(): boolean;
}

interface LightProperties {
  intensity: number;
  temperature: number;
  ies: string | null;
}

class LightComputer extends BaseClass {
  protected _compute(
    entity: Entity,
    target: TargetObject,
    context: unknown,
    additionalParam: unknown
  ): LightConfiguration[] {
    if (target.isCeilingFaceHidden()) {
      return [];
    }

    const position = entity.getPosition();
    const height = this.getDefaultHeight(target);
    const { intensity, temperature, ies } = super.getDefaultLight(
      entity,
      target,
      context
    ) as LightProperties;

    const adjustedPosition = this._adjustPosition(position, target, -0.75) || position;

    return [
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: adjustedPosition,
        height,
        ies
      }
    ];
  }
}

export default LightComputer;