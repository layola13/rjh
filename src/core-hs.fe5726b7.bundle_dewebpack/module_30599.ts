import BaseLight from './BaseLight';

class CeilingLightComputer extends BaseLight {
  private static readonly offset = 0.16;

  protected _compute(
    element: any,
    ceiling: any,
    scene: any,
    context: any
  ): Array<LightConfig> {
    if (ceiling.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const offsetDistance = element.getSize().y / 2 + CeilingLightComputer.offset;
    const { intensity, temperature, ies } = super.getDefaultLight(element, ceiling, scene);

    const basePosition = new THREE.Vector2(position.x, position.y);
    const adjustedPosition = new THREE.Vector2();
    adjustedPosition.addVectors(
      basePosition,
      element.frontForwardVec.multiplyScalar(offsetDistance)
    );

    return [
      {
        ...super.getDefaultLight(element, ceiling, scene),
        position: {
          x: adjustedPosition.x,
          y: adjustedPosition.y,
          z: position.z
        },
        ies,
        intensity,
        temperature
      }
    ];
  }
}

interface LightConfig {
  position: { x: number; y: number; z: number };
  ies: any;
  intensity: number;
  temperature: number;
}

export default CeilingLightComputer;