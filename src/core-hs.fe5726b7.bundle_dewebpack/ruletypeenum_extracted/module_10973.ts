import DefaultLightCalculator from './module_42288';

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

interface LightConfig {
  position: Vector3D;
  intensity: number;
  temperature: number;
  ies: string | null;
}

interface RoomElement {
  getSize(): Vector3D;
  getPosition(): Vector3D;
  frontForwardVec: THREE.Vector2;
  backForwardVec: THREE.Vector2;
  leftForwardVec: THREE.Vector2;
  rightForwardVec: THREE.Vector2;
}

interface RoomConfig {
  isCeilingFaceHidden(): boolean;
  getCeilingHeight(): number;
}

interface RenderOptions {
  templateKey: string;
}

interface DirectionInfo {
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

class LShapedArmLightCalculator extends DefaultLightCalculator {
  private static readonly POSITION_OFFSET = 0.2;
  private static readonly L_SHAPE_NAME = 'armoire - L shaped';
  private static readonly L_WIDTH = 0.8;

  _compute(
    element: RoomElement,
    config: RoomConfig,
    options: RenderOptions,
    _param: unknown
  ): LightConfig[] {
    if (config.isCeilingFaceHidden()) {
      return [];
    }

    const { x: width, y: depth } = element.getSize();
    const { intensity, temperature, ies } = super.getDefaultLight(element, config, options);

    if (
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC ||
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.GENERAL
    ) {
      return [];
    }

    const size = element.getSize();
    const isSpecialTemplate =
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.CHILLY_3 ||
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NATURE_3 ||
      options.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT;

    if (isSpecialTemplate && size.z > config.getCeilingHeight() * HSConstants.RenderLight.SAFE_HEIGHT_SCALE) {
      return [];
    }

    if (width > 1 && width <= 1.2 && depth > 1 && depth <= 1.2) {
      return this._oneLight4SmallL(element, config, options, intensity, temperature, ies);
    }

    if (depth > 1) {
      if (depth <= 1.5) {
        return this._oneLight4L(element, config, options, intensity, temperature, ies);
      }
      return this._manyLights4L(element, config, options, intensity, temperature, ies);
    }

    if (width < 2) {
      return this._oneLightCase(element, config, options, intensity, temperature, ies);
    }

    if (width >= 2 && width <= 2.5) {
      return this._twoLights2to2Point5(element, config, options, intensity, temperature, ies);
    }

    if (width > 2.5 && width < 3) {
      return this._twoLights2Point5to3(element, config, options, intensity, temperature, ies);
    }

    return this._manyLightsLargerThan3(element, config, options, intensity, temperature, ies);
  }

  private _oneLightCase(
    element: RoomElement,
    config: RoomConfig,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const position = element.getPosition();
    const yOffset = element.getSize().y / 2 + LShapedArmLightCalculator.POSITION_OFFSET;
    const basePos = new THREE.Vector2(position.x, position.y);
    const lightPos = new THREE.Vector2();
    lightPos.addVectors(basePos, element.frontForwardVec.clone().multiplyScalar(yOffset));

    const light = super.getDefaultLight(element, config, options);
    light.position = { x: lightPos.x, y: lightPos.y, z: position.z };
    light.intensity = intensity;
    light.temperature = temperature;
    light.ies = ies;

    return [light];
  }

  private _twoLights2to2Point5(
    element: RoomElement,
    config: RoomConfig,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const xOffset = element.getSize().x / 2 - 0.5;
    const yOffset = element.getSize().y / 2 + LShapedArmLightCalculator.POSITION_OFFSET;
    return this._twoSymmetricLights(element, config, options, xOffset, yOffset, intensity, temperature, ies);
  }

  private _twoLights2Point5to3(
    element: RoomElement,
    config: RoomConfig,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const yOffset = element.getSize().y / 2 + LShapedArmLightCalculator.POSITION_OFFSET;
    return this._twoSymmetricLights(element, config, options, 0.75, yOffset, intensity, temperature, ies);
  }

  private _manyLightsLargerThan3(
    element: RoomElement,
    config: RoomConfig,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const baseLights = this._twoLights2to2Point5(element, config, options, intensity, temperature, ies);
    const xOffset = element.getSize().x / 2 - 0.5;
    const yOffset = element.getSize().y / 2 + LShapedArmLightCalculator.POSITION_OFFSET;
    const position = element.getPosition();
    const basePos = new THREE.Vector2(position.x, position.y);

    new THREE.Vector2().addVectors(basePos, element.frontForwardVec.clone().multiplyScalar(yOffset));

    const lightCount = parseInt(String(xOffset), 10);
    const leftPos = new THREE.Vector2(baseLights[0].position.x, baseLights[0].position.y);
    const rightPos = new THREE.Vector2(baseLights[1].position.x, baseLights[1].position.y);

    const additionalLights = this._manySymmetricLights(
      element,
      config,
      options,
      { pos: leftPos, direction: 'rightForwardVec' },
      { pos: rightPos, direction: 'leftForwardVec' },
      lightCount,
      intensity,
      temperature,
      ies
    );

    return additionalLights.concat(baseLights);
  }

  private _oneLight4L(
    element: RoomElement,
    config: RoomConfig,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const position = element.getPosition();
    const basePos = new THREE.Vector2(position.x, position.y);
    const lightPos = new THREE.Vector2();
    lightPos.addVectors(basePos, element.frontForwardVec.clone().multiplyScalar(LShapedArmLightCalculator.POSITION_OFFSET));

    const light = super.getDefaultLight(element, config, options);
    light.position = { x: lightPos.x, y: lightPos.y, z: position.z };
    light.intensity = intensity;
    light.temperature = temperature;
    light.ies = ies;

    return [light];
  }

  private _oneLight4SmallL(
    element: RoomElement,
    config: RoomConfig,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const position = element.getPosition();
    const basePos = new THREE.Vector2(position.x, position.y);
    const lightPos = new THREE.Vector2();
    lightPos.addVectors(basePos, element.frontForwardVec.clone().multiplyScalar(0.32));
    lightPos.addVectors(lightPos, element.rightForwardVec.clone().multiplyScalar(0.32));

    const light = super.getDefaultLight(element, config, options);
    light.position = { x: lightPos.x, y: lightPos.y, z: position.z };
    light.intensity = intensity;
    light.temperature = temperature;
    light.ies = ies;

    return [light];
  }

  private _manyLights4L(
    element: RoomElement,
    config: RoomConfig,
    options: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const position = element.getPosition();
    const { x: width } = element.getSize();
    const yOffset = element.getSize().y / 2 - LShapedArmLightCalculator.L_WIDTH;
    const basePos = new THREE.Vector2(position.x, position.y);
    const backLightPos = new THREE.Vector2();
    backLightPos.addVectors(basePos, element.backForwardVec.clone().multiplyScalar(yOffset));

    const mainLight = {
      ...super.getDefaultLight(element, config, options),
      position: { x: backLightPos.x, y: backLightPos.y, z: position.z }
    };

    let additionalLights: LightConfig[] = [];

    if (width / 2 - 1 > LShapedArmLightCalculator.L_WIDTH) {
      const lightCount = parseInt(String(width / 2 - LShapedArmLightCalculator.L_WIDTH), 10);
      const leftStartPos = backLightPos.clone();
      const rightStartPos = backLightPos.clone();

      additionalLights = this._manySymmetricLights(
        element,
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

    return [mainLight].concat(additionalLights);
  }

  private _twoSymmetricLights(
    element: RoomElement,
    config: RoomConfig,
    options: RenderOptions,
    xOffset: number,
    yOffset: number,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const position = element.getPosition();
    const basePos = new THREE.Vector2(position.x, position.y);
    const centerPos = new THREE.Vector2();
    centerPos.addVectors(basePos, element.frontForwardVec.clone().multiplyScalar(yOffset));

    const leftLightPos = new THREE.Vector2();
    leftLightPos.addVectors(centerPos, element.leftForwardVec.clone().multiplyScalar(xOffset));

    const rightLightPos = new THREE.Vector2();
    rightLightPos.addVectors(centerPos, element.rightForwardVec.clone().multiplyScalar(xOffset));

    return [
      {
        ...super.getDefaultLight(element, config, options),
        position: { x: leftLightPos.x, y: leftLightPos.y, z: position.z },
        intensity,
        temperature,
        ies
      },
      {
        ...super.getDefaultLight(element, config, options),
        position: { x: rightLightPos.x, y: rightLightPos.y, z: position.z },
        intensity,
        temperature,
        ies
      }
    ];
  }

  private _manySymmetricLights(
    element: RoomElement,
    config: RoomConfig,
    options: RenderOptions,
    leftInfo: DirectionInfo,
    rightInfo: DirectionInfo,
    count: number,
    intensity: number,
    temperature: number,
    ies: string | null
  ): LightConfig[] {
    const lights: LightConfig[] = [];
    const position = element.getPosition();

    for (let i = 0; i < count; i++) {
      leftInfo.pos.addVectors(
        leftInfo.pos,
        element[leftInfo.direction].clone().multiplyScalar(1)
      );
      rightInfo.pos.addVectors(
        rightInfo.pos,
        element[rightInfo.direction].clone().multiplyScalar(1)
      );

      lights.push({
        ...super.getDefaultLight(element, config, options),
        position: { x: leftInfo.pos.x, y: leftInfo.pos.y, z: position.z },
        intensity,
        temperature,
        ies
      });

      lights.push({
        ...super.getDefaultLight(element, config, options),
        position: { x: rightInfo.pos.x, y: rightInfo.pos.y, z: position.z },
        intensity,
        temperature,
        ies
      });
    }

    return lights;
  }
}

export default LShapedArmLightCalculator;