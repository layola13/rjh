import BaseClass from './module_42288';

interface Position {
  x: number;
  y: number;
}

interface Position3D extends Position {
  z: number;
}

interface Size {
  x: number;
  y: number;
  z: number;
}

interface Element {
  getPosition(): Position3D;
  frontForwardVec: THREE.Vector2;
  getSize(): Size;
}

interface TargetObject {
  isCeilingFaceHidden(): boolean;
}

interface RenderOptions {
  templateKey: string;
}

interface DefaultLight {
  intensity: number;
  temperature: number;
  ies: unknown;
}

interface SpotLightConfig {
  type: HSCore.Model.LightTypeEnum.SpotLight;
  temperature: number;
  intensity: number;
  position: Position;
  height: number;
  ies: unknown;
}

class LightCalculator extends BaseClass {
  _compute(
    element: Element,
    targetObject: TargetObject,
    renderOptions: RenderOptions,
    _unused: unknown
  ): SpotLightConfig[] {
    if (targetObject.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const forwardVector = element.frontForwardVec;
    const size = element.getSize();
    const maxDimension = Math.max(size.x, size.y);
    const defaultHeight = this.getDefaultHeight(targetObject);
    const { intensity, temperature, ies } = super.getDefaultLight(element, targetObject, renderOptions);

    const centerPosition = new THREE.Vector2(position.x, position.y);
    centerPosition.add(forwardVector.clone().multiplyScalar(size.y / 2 + 0.16));

    const lightConfigs: SpotLightConfig[] = [];

    if (maxDimension < 2) {
      const singleLight: SpotLightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: centerPosition,
        height: defaultHeight,
        ies
      };
      lightConfigs.push(singleLight);
    } else {
      const perpendicular = forwardVector.clone().rotateAround({ x: 0, y: 0 }, THREE.Math.degToRad(90));
      const offset = 1;

      let leftPosition = centerPosition.clone().add(perpendicular.clone().multiplyScalar(offset));
      let rightPosition = centerPosition.clone().sub(perpendicular.clone().multiplyScalar(offset));

      leftPosition = this._adjustPosition(leftPosition, targetObject, -0.5) || leftPosition;
      rightPosition = this._adjustPosition(rightPosition, targetObject, -0.5) || rightPosition;

      if (
        renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
        renderOptions.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
      ) {
        leftPosition = this._adjustPosition(leftPosition, targetObject, -0.65) || leftPosition;
        rightPosition = this._adjustPosition(rightPosition, targetObject, -0.65) || rightPosition;
      }

      const leftLightPosition: Position = { ...centerPosition, ...leftPosition };
      const rightLightPosition: Position = { ...centerPosition, ...rightPosition };

      const leftLight: SpotLightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: leftLightPosition,
        height: defaultHeight,
        ies
      };

      const rightLight: SpotLightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: rightLightPosition,
        height: defaultHeight,
        ies
      };

      lightConfigs.push(leftLight);
      lightConfigs.push(rightLight);
    }

    return lightConfigs;
  }
}

export default LightCalculator;