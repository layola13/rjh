import BaseLight from './BaseLight';

class CeilingSpotLight extends BaseLight {
  _compute(
    element: HSCore.Model.Element,
    room: HSCore.Model.Room,
    context: HSCore.Context,
    options: HSCore.ComputeOptions
  ): HSCore.Model.Light[] {
    if (room.isCeilingFaceHidden()) {
      return [];
    }

    const position = element.getPosition();
    const defaultHeight = this.getDefaultHeight(room);
    const frontForwardVector = element.frontForwardVec;
    const size = element.getSize();
    
    const { intensity, temperature, ies } = super.getDefaultLight(
      element,
      room,
      context
    );

    const lightPosition = new THREE.Vector2(position.x, position.y);
    const offset = frontForwardVector.clone().multiplyScalar(size.y / 2);
    lightPosition.add(offset);

    return [
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        position: lightPosition,
        height: defaultHeight,
        ies,
        intensity
      }
    ];
  }
}

export default CeilingSpotLight;