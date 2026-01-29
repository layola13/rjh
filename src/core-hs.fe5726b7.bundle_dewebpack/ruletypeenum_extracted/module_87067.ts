import BaseLight from './BaseLight';

interface Vector2D {
  x: number;
  y: number;
}

interface Vector3D extends Vector2D {
  z: number;
}

interface Size {
  x: number;
  y: number;
  z: number;
}

interface LightConfig {
  type: HSCore.Model.LightTypeEnum;
  temperature: number;
  intensity: number;
  position: Vector2D;
  height: number;
  ies: string | undefined;
}

interface RenderTemplate {
  templateKey: string;
}

interface ModelElement {
  getPosition(): Vector3D;
  frontForwardVec: Vector2D;
  getSize(): Size;
}

interface CeilingContext {
  isCeilingFaceHidden(): boolean;
}

class CeilingLightComputer extends BaseLight {
  _compute(
    element: ModelElement,
    context: CeilingContext,
    template: RenderTemplate,
    options: unknown
  ): LightConfig[] {
    if (context.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const forwardVector = element.frontForwardVec;
    const size = element.getSize();
    const maxHorizontalSize = Math.max(size.x, size.y);
    const lightHeight = this.getDefaultHeight(context);

    const { intensity, temperature, ies } = super.getDefaultLight(
      element,
      context,
      template
    );

    const basePosition = new THREE.Vector2(position.x, position.y);
    const forwardOffset = 0.16;
    basePosition.add(
      forwardVector.clone().multiplyScalar(size.y / 2 + forwardOffset)
    );

    const lights: LightConfig[] = [];
    const sizeThreshold = 2;

    if (maxHorizontalSize < sizeThreshold) {
      const singleLight: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: basePosition,
        height: lightHeight,
        ies,
      };
      lights.push(singleLight);
    } else {
      const perpendicularVector = forwardVector
        .clone()
        .rotateAround({ x: 0, y: 0 }, THREE.Math.degToRad(90));

      const lateralOffset = 1;
      let leftPosition = basePosition
        .clone()
        .add(perpendicularVector.clone().multiplyScalar(lateralOffset));
      let rightPosition = basePosition
        .clone()
        .sub(perpendicularVector.clone().multiplyScalar(lateralOffset));

      const defaultAdjustment = -0.5;
      leftPosition = this._adjustPosition(leftPosition, context, defaultAdjustment) || leftPosition;
      rightPosition = this._adjustPosition(rightPosition, context, defaultAdjustment) || rightPosition;

      if (
        template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
        template.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
      ) {
        const enhancedAdjustment = -0.65;
        leftPosition = this._adjustPosition(leftPosition, context, enhancedAdjustment) || leftPosition;
        rightPosition = this._adjustPosition(rightPosition, context, enhancedAdjustment) || rightPosition;
      }

      const leftLightPosition: Vector2D = { ...basePosition, ...leftPosition };
      const rightLightPosition: Vector2D = { ...basePosition, ...rightPosition };

      const leftLight: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: leftLightPosition,
        height: lightHeight,
        ies,
      };

      const rightLight: LightConfig = {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position: rightLightPosition,
        height: lightHeight,
        ies,
      };

      lights.push(leftLight);
      lights.push(rightLight);
    }

    return lights;
  }

  private _adjustPosition(
    position: Vector2D,
    context: CeilingContext,
    adjustment: number
  ): Vector2D | null {
    return null;
  }
}

export default CeilingLightComputer;