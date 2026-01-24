import BaseLight from './BaseLight';

/**
 * 灯光配置接口
 */
interface LightConfig {
  /** 灯光类型 */
  type: HSCore.Model.LightTypeEnum.SpotLight;
  /** 色温 */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 灯光位置 */
  position: THREE.Vector3 | { x: number; y: number; z?: number };
  /** 灯光高度 */
  height: number;
  /** IES光域文件 */
  ies?: string;
}

/**
 * 实体对象接口
 */
interface Entity {
  /** 获取实体位置 */
  getPosition(): THREE.Vector3;
  /** 获取实体尺寸 */
  getSize(): THREE.Vector2;
  /** 获取实体旋转角度 */
  getRotation(): number;
}

/**
 * 场景接口
 */
interface Scene {
  /** 检查天花板是否隐藏 */
  isCeilingFaceHidden(): boolean;
}

/**
 * 默认灯光属性接口
 */
interface DefaultLightProperties {
  /** 光照强度 */
  intensity: number;
  /** 色温 */
  temperature: number;
  /** IES光域文件 */
  ies?: string;
}

/**
 * 吸顶灯计算类
 * 用于计算吸顶灯的灯光布局和位置
 * 根据实体尺寸自动分配多个聚光灯以获得均匀照明效果
 */
export default class CeilingLightComputer extends BaseLight {
  /**
   * 计算吸顶灯的灯光配置
   * 
   * @param entity - 灯具实体对象
   * @param scene - 场景对象
   * @param param2 - 额外参数（未使用）
   * @param param3 - 额外参数（未使用）
   * @returns 灯光配置数组
   */
  protected _compute(
    entity: Entity,
    scene: Scene,
    param2: unknown,
    param3: unknown
  ): LightConfig[] {
    // 如果天花板被隐藏，不生成灯光
    if (scene.isCeilingFaceHidden()) {
      return [];
    }

    const position = entity.getPosition();
    const height = this.getDefaultHeight(scene);
    const size = entity.getSize();
    const maxDimension = Math.max(size.x, size.y);
    const rotation = entity.getRotation();

    const { intensity, temperature, ies } = super.getDefaultLight(entity, scene, param2);

    // 中心主灯光配置
    const lights: LightConfig[] = [
      {
        type: HSCore.Model.LightTypeEnum.SpotLight,
        temperature,
        intensity,
        position,
        height,
        ies,
      },
    ];

    // 小型灯具（2m ≤ 尺寸 < 3.8m）：添加2个辅助灯光
    if (maxDimension >= 2) {
      this._addSecondaryLights(
        lights,
        position,
        size,
        rotation,
        maxDimension,
        scene,
        height,
        temperature,
        intensity,
        ies,
        false
      );
    }

    // 大型灯具（尺寸 > 3.8m）：添加额外2个辅助灯光
    if (maxDimension > 3.8) {
      this._addSecondaryLights(
        lights,
        position,
        size,
        rotation,
        maxDimension,
        scene,
        height,
        temperature,
        intensity,
        ies,
        true
      );
    }

    return lights;
  }

  /**
   * 添加辅助灯光
   * 
   * @param lights - 灯光配置数组
   * @param centerPosition - 中心位置
   * @param size - 实体尺寸
   * @param rotation - 旋转角度
   * @param maxDimension - 最大尺寸
   * @param scene - 场景对象
   * @param height - 灯光高度
   * @param temperature - 色温
   * @param intensity - 光照强度
   * @param ies - IES光域文件
   * @param isLargeFixture - 是否为大型灯具
   */
  private _addSecondaryLights(
    lights: LightConfig[],
    centerPosition: THREE.Vector3,
    size: THREE.Vector2,
    rotation: number,
    maxDimension: number,
    scene: Scene,
    height: number,
    temperature: number,
    intensity: number,
    ies: string | undefined,
    isLargeFixture: boolean
  ): void {
    // 计算灯光偏移距离
    const SMALL_FIXTURE_THRESHOLD = 3.8;
    const SMALL_FIXTURE_OFFSET = 0.35;
    const LARGE_FIXTURE_DIVISOR = 4;
    const LARGE_FIXTURE_MARGIN = 0.7;
    
    let offset: number;
    if (isLargeFixture) {
      // 大型灯具：边缘间距分布
      offset = (maxDimension - LARGE_FIXTURE_MARGIN) / 2;
    } else {
      // 小型灯具：根据尺寸动态计算
      offset = maxDimension <= SMALL_FIXTURE_THRESHOLD 
        ? maxDimension / 2 - SMALL_FIXTURE_OFFSET 
        : (maxDimension - LARGE_FIXTURE_MARGIN) / LARGE_FIXTURE_DIVISOR;
    }

    // 确定方向向量（根据长边方向）
    let direction: THREE.Vector2;
    direction = size.x > size.y 
      ? new THREE.Vector2(1, 0) 
      : new THREE.Vector2(0, 1);

    // 应用旋转变换
    const ROTATION_THRESHOLD = 5;
    const rotationModulo = rotation % 180;
    if (Math.abs(rotationModulo) > ROTATION_THRESHOLD) {
      const rotationRadians = (Math.PI * rotationModulo) / 180;
      direction.rotateAround(new THREE.Vector2(0, 0), rotationRadians);
    }

    // 计算两侧灯光位置
    const centerPosition2D = new THREE.Vector2(centerPosition.x, centerPosition.y);

    // 第一个辅助灯光（正向偏移）
    const position1_2D = centerPosition2D.clone().add(direction.clone().multiplyScalar(offset));
    const adjustedPosition1 = this._adjustPosition(position1_2D, scene, -0.75) ?? position1_2D;
    const position1 = { ...centerPosition, ...adjustedPosition1 };

    // 第二个辅助灯光（反向偏移）
    const position2_2D = centerPosition2D.clone().sub(direction.clone().multiplyScalar(offset));
    const adjustedPosition2 = this._adjustPosition(position2_2D, scene, -0.75) ?? position2_2D;
    const position2 = { ...centerPosition, ...adjustedPosition2 };

    // 添加灯光配置
    const light1: LightConfig = {
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      intensity,
      position: position1,
      height,
      ies,
    };

    const light2: LightConfig = {
      type: HSCore.Model.LightTypeEnum.SpotLight,
      temperature,
      intensity,
      position: position2,
      height,
      ies,
    };

    lights.push(light1, light2);
  }

  /**
   * 调整灯光位置（避免遮挡等）
   * 
   * @param position - 待调整位置
   * @param scene - 场景对象
   * @param offset - 偏移量
   * @returns 调整后的位置，如无需调整则返回null
   */
  private _adjustPosition(
    position: THREE.Vector2,
    scene: Scene,
    offset: number
  ): { x: number; y: number } | null {
    // 位置调整逻辑（具体实现依赖BaseLight基类）
    // 此处保留原始调用签名
    return null;
  }
}