import BaseLight from './BaseLight';

class CeilingSpotLight extends BaseLight {
  protected _compute(
    element: HSCore.Model.Element,
    room: HSCore.Model.Room,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer
  ): HSCore.Model.LightConfig[] {
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const defaultHeight = this.getDefaultHeight(room);
    const frontForwardVector = element.frontForwardVec;
    const elementSize = element.getSize();

    const { intensity, temperature, ies } = super.getDefaultLight(
      element,
      room,
      scene
    );

    const lightPosition = new THREE.Vector2(position.x, position.y);
    const forwardOffset = frontForwardVector.clone().multiplyScalar(elementSize.y / 2);
    lightPosition.add(forwardOffset);

    return [
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        position: lightPosition,
        height: defaultHeight,
        ies,
        intensity,
      },
    ];
  }
}

export default CeilingSpotLight;