import BaseClass from './path/to/base-class';

interface LightConfig {
  intensity: number;
  temperature: number;
  ies: unknown;
}

interface LightResult {
  type: HSCore.Model.LightTypeEnum;
  temperature: number;
  intensity: number;
  position: unknown;
  height: number;
  ies: unknown;
}

class LightComputer extends BaseClass {
  _compute(
    element: unknown,
    target: unknown,
    options: unknown,
    additionalParam: unknown
  ): LightResult[] {
    if (target.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const defaultHeight = this.getDefaultHeight(target);
    const { intensity, temperature, ies }: LightConfig = super.getDefaultLight(
      element,
      target,
      options
    );
    const adjustedPosition = this._adjustPosition(position, target, -0.75) ?? position;

    return [
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: adjustedPosition,
        height: defaultHeight,
        ies,
      },
    ];
  }
}

export default LightComputer;