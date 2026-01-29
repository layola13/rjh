import BaseLight from './base-light';

interface LightConfig {
  position: {
    x: number;
    y: number;
    z: number;
  };
  intensity: number;
  temperature: number;
  ies: string | null;
}

interface Room {
  getSize(): { x: number; y: number; z: number };
  getPosition(): { x: number; y: number; z: number };
  isCeilingFaceHidden(): boolean;
  getCeilingHeight(): number;
  frontForwardVec: THREE.Vector2;
  backForwardVec: THREE.Vector2;
  leftForwardVec: THREE.Vector2;
  rightForwardVec: THREE.Vector2;
}

interface RenderOptions {
  templateKey: string;
}

interface LightDirection {
  pos: THREE.Vector2;
  direction: 'leftForwardVec' | 'rightForwardVec';
}

declare const HSConstants: {
  Render: {
    TEMPLATE_NAME_V3: {
      REALISTIC: string;
      GENERAL: string;
      CHILLY_3: string;
      NATURE_3: string;
      NIGHT: string;
    };
  };
  RenderLight: {
    SAFE_HEIGHT_SCALE: number;
  };
};

class LShapedArmoireLight extends BaseLight {
  private static readonly OFFSET = 0.2;
  private static readonly L_SHAPE = 'armoire - L shaped';
  private static readonly L_WIDTH = 0.8;

  protected _compute(
    room: Room,
    config: unknown,
    options: RenderOptions,
    context: unknown
  ): LightConfig[] {
    if (config.isCeilingFaceHidden()) {
      return [];
    }

    const { x: roomWidth, y: roomDepth } = room.getSize();
    const { intensity, temperature, ies } = super.getDefaultLight(room, config, options);

    if (
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
    ) {
      return [];
    }

    const roomSize = room.getSize();
    const isSafeHeightTemplate =
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3 ||
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NATURE_3 ||
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT;

    if (
      isSafeHeightTemplate &&
      roomSize.z > config.getCeilingHeight() * HSConstants.RenderLight.SAFE_HEIGHT_SCALE
    ) {
      return [];
    }

    if (roomWidth > 1 && roomWidth <= 1.2 && roomDepth > 1 && roomDepth <= 1.2) {
      return this._oneLight4SmallL(room, config, options, intensity, temperature, ies);
    }

    if (roomDepth > 1) {
      if (roomDepth <= 1.5) {
        return this._oneLight4L(room, config, options, intensity, temperature, ies);
      }
      return this._manyLights4L(room, config, options, intensity, temperature, ies);
    }

    if (roomWidth < 2) {
      return this._oneLightCase(room, config, options, intensity, temperature, ies);
    }

    if (roomWidth >= 2 && roomWidth <= 2.5) {
      return this._twoLights2to2Point5(room, config, options, intensity, temperature, ies);
    }

    if (roomWidth > 2.5 && roomWidth < 3) {
      return this._twoLights2Point5to3(room, config, options, intensity, temperature, ies);
    }

    return this._manyLightsLargerThan3(room, config, options, intensity, temperature, ies);
  }

  private _oneLightCase(
    room: Room,
    config: unknown,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const position = room.getPosition();
    const forwardOffset = room.getSize().y / 2 + LShapedArmoireLight.OFFSET;
    const basePos = new THREE.Vector2(position.x, position.y);
    const lightPos = new THREE.Vector2();
    lightPos.addVectors(basePos, room.frontForwardVec.clone().multiplyScalar(forwardOffset));

    const light = super.getDefaultLight(room, config, options);
    light.position = { x: lightPos.x, y: lightPos.y, z: position.z };
    light.intensity = intensity;
    light.temperature = temperature;
    light.ies = ies;

    return [light];
  }

  private _twoLights2to2Point5(
    room: Room,
    config: unknown,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const sideOffset = room.getSize().x / 2 - 0.5;
    const forwardOffset = room.getSize().y / 2 + LShapedArmoireLight.OFFSET;
    return this._twoSymmetricLights(room, config, options, sideOffset, forwardOffset, intensity, temperature, ies);
  }

  private _twoLights2Point5to3(
    room: Room,
    config: unknown,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const forwardOffset = room.getSize().y / 2 + LShapedArmoireLight.OFFSET;
    return this._twoSymmetricLights(room, config, options, 0.75, forwardOffset, intensity, temperature, ies);
  }

  private _manyLightsLargerThan3(
    room: Room,
    config: unknown,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const baseLights = this._twoLights2to2Point5(room, config, options, intensity, temperature, ies);
    const sideOffset = room.getSize().x / 2 - 0.5;
    const forwardOffset = room.getSize().y / 2 + LShapedArmoireLight.OFFSET;
    const position = room.getPosition();
    const basePos = new THREE.Vector2(position.x, position.y);

    new THREE.Vector2().addVectors(basePos, room.frontForwardVec.clone().multiplyScalar(forwardOffset));

    const lightCount = parseInt(String(sideOffset), 10);
    const leftStartPos = new THREE.Vector2(baseLights[0].position.x, baseLights[0].position.y);
    const rightStartPos = new THREE.Vector2(baseLights[1].position.x, baseLights[1].position.y);

    const additionalLights = this._manySymmetricLights(
      room,
      config,
      options,
      { pos: leftStartPos, direction: 'rightForwardVec' },
      { pos: rightStartPos, direction: 'leftForwardVec' },
      lightCount,
      intensity,
      temperature,
      ies
    );

    return additionalLights.concat(baseLights);
  }

  private _oneLight4L(
    room: Room,
    config: unknown,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const position = room.getPosition();
    const basePos = new THREE.Vector2(position.x, position.y);
    const lightPos = new THREE.Vector2();
    lightPos.addVectors(basePos, room.frontForwardVec.clone().multiplyScalar(LShapedArmoireLight.OFFSET));

    const light = super.getDefaultLight(room, config, options);
    light.position = { x: lightPos.x, y: lightPos.y, z: position.z };
    light.intensity = intensity;
    light.temperature = temperature;
    light.ies = ies;

    return [light];
  }

  private _oneLight4SmallL(
    room: Room,
    config: unknown,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const position = room.getPosition();
    const basePos = new THREE.Vector2(position.x, position.y);
    const lightPos = new THREE.Vector2();
    lightPos.addVectors(basePos, room.frontForwardVec.clone().multiplyScalar(0.32));
    lightPos.addVectors(lightPos, room.rightForwardVec.clone().multiplyScalar(0.32));

    const light = super.getDefaultLight(room, config, options);
    light.position = { x: lightPos.x, y: lightPos.y, z: position.z };
    light.intensity = intensity;
    light.temperature = temperature;
    light.ies = ies;

    return [light];
  }

  private _manyLights4L(
    room: Room,
    config: unknown,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const position = room.getPosition();
    const { x: roomWidth } = room.getSize();
    const backOffset = room.getSize().y / 2 - LShapedArmoireLight.L_WIDTH;
    const basePos = new THREE.Vector2(position.x, position.y);
    const centerLightPos = new THREE.Vector2();
    centerLightPos.addVectors(basePos, room.backForwardVec.clone().multiplyScalar(backOffset));

    const centerLight = {
      ...super.getDefaultLight(room, config, options),
      position: { x: centerLightPos.x, y: centerLightPos.y, z: position.z }
    };

    const lights: LightConfig[] = [centerLight];
    let sideLights: LightConfig[] = [];

    if (roomWidth / 2 - 1 > LShapedArmoireLight.L_WIDTH) {
      const lightCount = parseInt(String(roomWidth / 2 - LShapedArmoireLight.L_WIDTH), 10);
      const leftStartPos = centerLightPos.clone();
      const rightStartPos = centerLightPos.clone();

      sideLights = this._manySymmetricLights(
        room,
        config,
        options,
        { pos: leftStartPos, direction: 'leftForwardVec' },
        { pos: rightStartPos, direction: 'rightForwardVec' },
        lightCount,
        intensity,
        temperature,
        ies
      );
    }

    return lights.concat(sideLights);
  }

  private _twoSymmetricLights(
    room: Room,
    config: unknown,
    options: RenderOptions,
    sideOffset: number,
    forwardOffset: number,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const position = room.getPosition();
    const basePos = new THREE.Vector2(position.x, position.y);
    const centerPos = new THREE.Vector2();
    centerPos.addVectors(basePos, room.frontForwardVec.clone().multiplyScalar(forwardOffset));

    const leftLightPos = new THREE.Vector2();
    leftLightPos.addVectors(centerPos, room.leftForwardVec.clone().multiplyScalar(sideOffset));

    const rightLightPos = new THREE.Vector2();
    rightLightPos.addVectors(centerPos, room.rightForwardVec.clone().multiplyScalar(sideOffset));

    return [
      {
        ...super.getDefaultLight(room, config, options),
        position: { x: leftLightPos.x, y: leftLightPos.y, z: position.z },
        intensity,
        temperature,
        ies
      },
      {
        ...super.getDefaultLight(room, config, options),
        position: { x: rightLightPos.x, y: rightLightPos.y, z: position.z },
        intensity,
        temperature,
        ies
      }
    ];
  }

  private _manySymmetricLights(
    room: Room,
    config: unknown,
    options: RenderOptions,
    leftDirection: LightDirection,
    rightDirection: LightDirection,
    count: number,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const lights: LightConfig[] = [];
    const position = room.getPosition();

    for (let i = 0; i < count; i++) {
      leftDirection.pos.addVectors(
        leftDirection.pos,
        room[leftDirection.direction].clone().multiplyScalar(1)
      );
      rightDirection.pos.addVectors(
        rightDirection.pos,
        room[rightDirection.direction].clone().multiplyScalar(1)
      );

      lights.push({
        ...super.getDefaultLight(room, config, options),
        position: { x: leftDirection.pos.x, y: leftDirection.pos.y, z: position.z },
        intensity,
        temperature,
        ies
      });

      lights.push({
        ...super.getDefaultLight(room, config, options),
        position: { x: rightDirection.pos.x, y: rightDirection.pos.y, z: position.z },
        intensity,
        temperature,
        ies
      });
    }

    return lights;
  }
}

export default LShapedArmoireLight;