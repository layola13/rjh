import BaseLight from './BaseLight';

class CeilingLight extends BaseLight {
  private static readonly OFFSET = 0.16;

  protected _compute(
    entity: unknown,
    face: { isCeilingFaceHidden: () => boolean },
    context: unknown,
    options: unknown
  ): Array<{
    position: { x: number; y: number; z: number };
    ies: unknown;
    intensity: number;
    temperature: number;
  }> {
    if (face.isCeilingFaceHidden()) {
      return [];
    }

    const position = (entity as any).getPosition();
    const offset = (entity as any).getSize().y / 2 + CeilingLight.OFFSET;
    const { intensity, temperature, ies } = super.getDefaultLight(entity, face, context);

    const basePosition = new THREE.Vector2(position.x, position.y);
    const calculatedPosition = new THREE.Vector2();
    calculatedPosition.addVectors(
      basePosition,
      (entity as any).frontForwardVec.multiplyScalar(offset)
    );

    return [
      {
        ...super.getDefaultLight(entity, face, context),
        position: {
          x: calculatedPosition.x,
          y: calculatedPosition.y,
          z: position.z
        },
        ies,
        intensity,
        temperature
      }
    ];
  }
}

export default CeilingLight;