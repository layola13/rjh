/**
 * PMolding 模块类型定义
 * 用于描述建筑装饰线条（Molding）的3D模型对象
 */

import { PModel, PModel_IO } from './PModel';
import { Entity } from './Entity';
import { Material } from './Material';
import { FieldValueType } from './FieldValueType';
import { Logger } from './Logger';

/**
 * 线条路径点坐标
 */
interface PathPoint {
  x: number;
  y: number;
}

/**
 * 线条路径数组（二维点集合）
 */
type MoldingPath = PathPoint[][];

/**
 * 产品元数据接口
 */
interface ProductMetadata {
  /** 产品唯一标识 */
  id: string;
  /** 内容类型 */
  contentType: HSCatalog.ContentType;
  /** 法线纹理 */
  normalTexture?: string;
  /** 剖面配置 */
  profile?: unknown;
  /** X方向尺寸 */
  profileSizeX: number;
  /** Y方向尺寸 */
  profileSizeY: number;
}

/**
 * 序列化数据结构
 */
interface PMoldingSerializedData {
  seekId: string;
  name: string;
  XSize: string;
  YSize: string;
  paths: string;
}

/**
 * 加载选项
 */
interface LoadOptions {
  /** 状态映射表 */
  states: Record<string, unknown>;
  /** 产品映射表 */
  productsMap?: Map<string, ProductMetadata>;
}

/**
 * 创建参数
 */
interface CreateParameters {
  x?: number | null;
  y?: number | null;
  z?: number | null;
  paths?: MoldingPath;
}

/**
 * 创建配置
 */
interface CreateConfig {
  /** 本地ID */
  localId: string;
  /** 材质配置 */
  material: unknown;
  /** 资源元数据 */
  resource?: ProductMetadata;
  /** 创建参数 */
  parameters?: CreateParameters;
}

/**
 * 更新配置
 */
interface UpdateConfig {
  /** 路径数据 */
  paths?: MoldingPath;
  /** 剖面元数据 */
  profileMeta?: ProductMetadata;
  /** 材质 */
  material?: Material;
}

/**
 * 灯带数据
 */
interface LightBandData {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** 旋转角度（弧度） */
  rotation: number;
  /** X轴缩放 */
  XScale: number;
  /** Y轴缩放 */
  YScale: number;
  /** Z轴缩放 */
  ZScale: number;
  /** 对象字符串 */
  obj: string;
}

/**
 * PMolding 序列化/反序列化处理器
 * 负责线条模型的持久化和加载
 */
export declare class PMolding_IO extends PModel_IO {
  /**
   * 将模型对象序列化为JSON格式
   * @param model - 待序列化的线条模型
   * @param callback - 序列化后的回调函数
   * @param includeState - 是否包含状态数据，默认为true
   * @param options - 额外序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    model: PMolding,
    callback?: (result: [PMoldingSerializedData, ...unknown[]], model: PMolding) => void,
    includeState?: boolean,
    options?: Record<string, unknown>
  ): [PMoldingSerializedData, ...unknown[]];

  /**
   * 从序列化数据加载模型
   * @param target - 目标模型对象
   * @param data - 序列化的数据
   * @param options - 加载选项
   */
  load(target: PMolding, data: PMoldingSerializedData, options: LoadOptions): void;
}

/**
 * 线条装饰模型类
 * 用于表示建筑中的装饰线条（如踢脚线、顶角线等）
 */
export declare class PMolding extends PModel {
  /**
   * 构造函数
   * @param id - 模型唯一标识，默认为空字符串
   * @param parent - 父级对象，默认为undefined
   */
  constructor(id?: string, parent?: unknown);

  /** X方向尺寸（状态字段） */
  XSize: number;
  
  /** Y方向尺寸（状态字段） */
  YSize: number;
  
  /** 路径数据（状态字段） */
  paths: MoldingPath;
  
  /** 产品元数据 */
  metadata: ProductMetadata | undefined;

  /** 内部存储的seekId */
  private _seekId: string;

  /**
   * 静态工厂方法：创建线条模型实例
   * @param config - 创建配置
   * @returns 新创建的线条模型实例
   */
  static create(config: CreateConfig): PMolding;

  /**
   * 获取产品查找ID
   * 优先返回内部_seekId，否则返回metadata中的id
   */
  get seekId(): string;

  /**
   * 设置产品查找ID
   * 断言seekId需与metadata.id保持一致
   */
  set seekId(value: string);

  /**
   * 获取内容类型
   * 从元数据中提取内容类型信息
   */
  get contentType(): HSCatalog.ContentType;

  /**
   * 获取法线纹理
   * 从元数据中提取法线纹理路径
   */
  get normalTexture(): string | undefined;

  /**
   * 获取剖面配置
   * 从元数据中提取剖面相关配置
   */
  get profile(): unknown | undefined;

  /**
   * 获取路径数据的深拷贝并反转顺序
   * @returns 反转后的路径数组
   */
  getPaths(): MoldingPath;

  /**
   * 验证模型数据完整性
   * 检查XSize、YSize和paths的有效性
   * @returns 验证是否通过
   */
  verify(): boolean;

  /**
   * 获取对应的IO处理器实例
   * @returns PMolding_IO单例
   */
  getIO(): PMolding_IO;

  /**
   * 更新模型属性
   * @param config - 更新配置
   */
  update(config: UpdateConfig): void;

  /**
   * 刷新内部边界盒
   * 根据路径数据重新计算轮廓和边界
   */
  refreshBoundInternal(): void;

  /**
   * 判断内容是否在房间内
   * @param room - 房间对象
   * @param strict - 是否严格模式，默认为false
   * @returns 是否在房间内
   */
  isContentInRoom(room: unknown, strict?: boolean): boolean;

  /**
   * 判断内容是否在循环路径内
   * @param loop - 循环路径对象
   * @param strict - 是否严格模式，默认为false
   * @returns 是否在循环内
   */
  isContentInLoop(loop: unknown, strict?: boolean): boolean;

  /**
   * 判断是否为相同的线条
   * 比较seekId、材质seekId及尺寸是否一致
   * @param other - 待比较的线条对象
   * @returns 是否相同
   */
  isSameMolding(other: PMolding): boolean;

  /**
   * 字段变更事件处理
   * @param fieldName - 字段名称
   * @param newValue - 新值
   * @param oldValue - 旧值
   */
  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void;

  /**
   * 获取灯带数据
   * 用于灯带效果的渲染配置
   * @returns 灯带数据数组，无数据时返回null
   */
  getLightBandData(): LightBandData[] | null;

  /**
   * 生成灯带对象字符串（内部方法）
   * @returns OBJ格式字符串数组
   */
  private _generateLightBandObjStr(): string[] | undefined;
}

/**
 * 模块导出
 */
declare module 'module_62592' {
  export { PMolding, PMolding_IO };
}