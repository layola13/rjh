import type { SpotLight_IO, SpotLight } from './SpotLight';
import type { LightTypeEnum } from './LightTypeEnum';
import type { Euler } from './Euler';
import type { Entity } from './Entity';

/**
 * IES光源配置信息
 */
interface IESLightConfig {
  /** 光源名称 */
  name: string;
  /** 目标方向向量 */
  targetDir: [number, number, number];
  /** 光源位置（可选） */
  position?: {
    x: number;
    y: number;
    z: number;
  };
}

/**
 * 内容元数据中的光源信息
 */
interface ContentMetadataLight {
  /** 目标方向 */
  targetDir?: [number, number, number];
  /** 光源名称 */
  name: string;
  /** 位置信息 */
  position?: {
    x: number;
    y: number;
    z: number;
  };
}

/**
 * 创建物理聚光灯的参数
 */
interface CreateSpotPhysicalLightParams {
  /** X轴方向分量 */
  dirX: number;
  /** Y轴方向分量 */
  dirY: number;
  /** Z轴方向分量 */
  dirZ: number;
}

/**
 * 二维坐标点
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 物理聚光灯序列化数据
 */
interface SpotPhysicalLightData {
  /** 光源名称数组 */
  name: string[];
  /** 内容ID */
  contentID?: string;
  /** 顶视图 */
  topView: string;
}

/**
 * 渲染参数
 */
interface RenderParameters {
  /** 色温 */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 实体ID */
  entityId?: string;
  /** IES配置文件 */
  IES?: string;
  /** IES文件URL */
  iesUrl?: string;
  /** 是否为公共IES */
  isPublicIES: boolean;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** 是否关闭 */
  close: boolean;
  /** RGB颜色值 */
  rgb: [number, number, number];
  /** 是否影响镜面反射 */
  affectSpecular: boolean;
  /** 强度缩放比例 */
  intensityScale: number;
  /** IES旋转配置 */
  iesRotations?: Array<{
    name: string;
    targetDir: [number, number, number];
  }>;
}

/**
 * 物理聚光灯IO类 - 负责序列化和反序列化
 */
export declare class SpotPhysicalLight_IO extends SpotLight_IO {
  /**
   * 获取单例实例
   */
  static instance(): SpotPhysicalLight_IO;

  /**
   * 导出光源数据
   * @param entity - 要导出的实体
   * @param callback - 导出后的回调函数
   * @param includeMetadata - 是否包含元数据
   * @param options - 导出选项
   * @returns 导出的数据数组
   */
  dump(
    entity: SpotPhysicalLight,
    callback?: (data: unknown[], entity: SpotPhysicalLight) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 加载光源数据
   * @param entity - 目标实体
   * @param data - 要加载的数据
   * @param options - 加载选项
   */
  load(
    entity: SpotPhysicalLight,
    data: SpotPhysicalLightData,
    options?: Record<string, unknown>
  ): void;
}

/**
 * 物理聚光灯类 - 支持IES配置文件的物理渲染光源
 */
export declare class SpotPhysicalLight extends SpotLight {
  /** 光源类型 */
  readonly type: LightTypeEnum.SpotPhysicalLight;

  /** X轴旋转角度（度） */
  XRotation: number;

  /** Y轴旋转角度（度） */
  YRotation: number;

  /** Z轴旋转角度（度） */
  ZRotation: number;

  /** 顶视图 */
  topView: string;

  /** 光源名称数组 */
  name: string[];

  /** 内容ID */
  readonly contentID?: string;

  /** IES配置文件路径 */
  readonly IES?: string;

  /** IES文件URL */
  readonly iesUrl?: string;

  /** 是否为公共IES文件 */
  readonly isPublicIES: boolean;

  /** IES配置信息数组 */
  readonly iesConfig?: IESLightConfig[];

  /** IES矩阵缓存（内部使用） */
  private _iesMatrixCache: THREE.Matrix4;

  /** IES配置缓存（内部使用） */
  private _iesConfig?: IESLightConfig[];

  /**
   * 构造函数
   * @param name - 光源名称
   * @param parent - 父实体
   */
  constructor(name?: string, parent?: Entity);

  /**
   * 创建物理聚光灯实例
   * @param params - 创建参数
   * @returns 新建的物理聚光灯实例
   */
  static create(params?: CreateSpotPhysicalLightParams): SpotPhysicalLight;

  /**
   * 是否为虚拟光源
   * @returns 始终返回false
   */
  isVirtual(): boolean;

  /**
   * 是否具有区域大小
   * @returns 始终返回true
   */
  hasAreaSize(): boolean;

  /**
   * 重置光源到默认状态
   */
  reset(): void;

  /**
   * 获取IO处理器实例
   * @returns IO处理器
   */
  getIO(): SpotPhysicalLight_IO;

  /**
   * 获取IES光源的世界空间位置
   * @param config - IES配置
   * @returns 位置数组 [x, y, z]
   */
  getIesPosition(config: IESLightConfig): [number, number, number];

  /**
   * 获取IES光源的方向向量
   * @param config - IES配置
   * @param normalize - 是否归一化向量
   * @returns 方向向量
   */
  getIesDir(config: IESLightConfig, normalize?: boolean): THREE.Vector3;

  /**
   * 获取渲染参数
   * @returns 渲染所需的所有参数
   */
  getRenderParameters(): RenderParameters;

  /**
   * 刷新内部边界框（内部方法）
   */
  protected refreshBoundInternal(): void;

  /**
   * 更新旋转以对准目标
   * @returns 始终返回false（物理光源不支持自动对准）
   */
  updateRotationToTarget(): boolean;

  /**
   * 获取边界数据
   * @returns 边界数据
   */
  getBoundingData(): unknown;

  /**
   * 获取初始光照强度
   * @returns 初始强度值
   */
  protected getInitialIntensity(): number;

  /**
   * 获取色温
   * @returns 色温值（开尔文）
   */
  protected getTemperature(): number;

  /**
   * 附加真实光源内容
   */
  protected attachRealLight(): void;
}

/**
 * X轴旋转（度）- 装饰器或类型别名
 */
export type XRotation = number;

/**
 * Y轴旋转（度）- 装饰器或类型别名
 */
export type YRotation = number;

/**
 * Z轴旋转（度）- 装饰器或类型别名
 */
export type ZRotation = number;