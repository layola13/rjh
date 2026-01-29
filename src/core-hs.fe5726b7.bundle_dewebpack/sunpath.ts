/**
 * 太阳路径模块
 * 用于管理3D场景中太阳的位置和轨迹
 */

/**
 * 场景信息接口
 */
interface SceneInfo {
  scene: {
    /** 场景边界信息 */
    bound: {
      /** 左边界 */
      left: number;
      /** 上边界 */
      top: number;
      /** 宽度 */
      width: number;
      /** 高度 */
      height: number;
    };
  };
}

/**
 * 实体基类（从外部模块导入）
 */
declare class Entity {
  constructor(id?: string, options?: unknown);
}

/**
 * 实体字段装饰器
 * 用于标记需要序列化的类属性
 */
declare function EntityField(): PropertyDecorator;

/**
 * 太阳路径类
 * 管理太阳在场景中的轨道、位置和目标偏移
 */
export declare class SunPath extends Entity {
  /** 垂直角度（度） */
  verticalAngle: number;

  /** 水平角度（度） */
  horizontalAngle: number;

  /** 目标X轴偏移 */
  targetOffsetX: number;

  /** 目标Y轴偏移 */
  targetOffsetY: number;

  /** 太阳X坐标 */
  sunPosX: number;

  /** 太阳Y坐标 */
  sunPosY: number;

  /** 房间中心点坐标 [x, y] */
  private _roomCenter: [number, number];

  /** 太阳轨道半径 */
  private _radius: number;

  /** 目标最大半径 */
  private _targetMaxRadius: number;

  /**
   * 构造函数
   * @param id - 实体ID，默认为空字符串
   * @param options - 可选配置参数
   */
  constructor(id?: string, options?: unknown);

  /**
   * 静态工厂方法
   * @param id - 实体ID，默认为空字符串
   * @param options - 可选配置参数
   * @returns SunPath实例
   */
  static create(id?: string, options?: unknown): SunPath;

  /**
   * 获取目标半径
   * @returns 目标最大半径值
   */
  getTargetRadius(): number;

  /**
   * 获取太阳轨道半径
   * @returns 轨道半径值
   */
  getSunOrbitRadius(): number;

  /**
   * 根据当前角度重新计算太阳位置
   * 基于水平角度和轨道半径更新sunPosX和sunPosY
   */
  relocateSunPos(): void;

  /**
   * 清除目标偏移量
   * 将targetOffsetX和targetOffsetY重置为0
   */
  clearOffset(): void;

  /**
   * 获取房间中心点坐标
   * @returns 中心点坐标 [x, y]
   */
  getCenter(): [number, number];

  /**
   * 更新房间信息
   * 根据场景边界重新计算中心点、半径等参数
   * @param sceneInfo - 包含场景边界信息的对象
   */
  updateRoomInfo(sceneInfo: SceneInfo): void;
}