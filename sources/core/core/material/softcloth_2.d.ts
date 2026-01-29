import { Content, Content_IO } from './Content';
import { Entity } from './Entity';
import { Signal } from './Signal';
import { nearlyEquals } from './MathUtils';
import { isValidNumber, EntityField } from './EntityUtils';

/**
 * 模拟内容的数据结构
 * 包含布料模拟后的位置、旋转、缩放和长度信息
 */
export interface SimulatedContent {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
  /** Z轴坐标 */
  z: number;
  /** X轴长度 */
  XLength: number;
  /** Y轴长度 */
  YLength: number;
  /** Z轴长度 */
  ZLength: number;
  /** X轴缩放比例 */
  XScale: number;
  /** Y轴缩放比例 */
  YScale: number;
  /** Z轴缩放比例 */
  ZScale: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** 关联的作业ID */
  jid: string;
  /** 3D模型标识 */
  model3d: string;
  /** 模型位置URL */
  modelPosUrl: string;
}

/**
 * 模拟元数据结构
 */
export interface SimulatedMeta {
  /** 3D模型标识 */
  model3d?: string;
  [key: string]: unknown;
}

/**
 * 相关元数据结构
 */
export interface RelatedMetaData {
  /** 元数据ID */
  id: string;
  /** 查找ID */
  seekId: string;
  /** X轴长度 */
  XLength: number;
  /** Y轴长度 */
  YLength: number;
  /** Z轴长度 */
  ZLength: number;
  /** 3D模型标识 */
  model3d: string;
}

/**
 * 软布料对象的IO处理器
 * 负责软布料对象的序列化和反序列化
 */
export declare class SoftCloth_IO extends Content_IO {
  /**
   * 序列化软布料对象
   * @param entity - 要序列化的软布料实体
   * @param callback - 序列化完成后的回调函数
   * @param includeChildren - 是否包含子对象
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: SoftCloth,
    callback?: (result: unknown[], entity: SoftCloth) => void,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 反序列化软布料对象
   * @param entity - 目标实体对象
   * @param data - 序列化的数据
   * @param context - 反序列化上下文
   */
  load(entity: SoftCloth, data: unknown, context: unknown): void;

  /**
   * 获取单例实例
   */
  static instance(): SoftCloth_IO;
}

/**
 * 软布料实体类
 * 表示可以进行物理模拟的布料对象，支持位置、旋转、缩放等属性
 */
export declare class SoftCloth extends Content {
  /**
   * 构造函数
   * @param id - 实体ID
   * @param parent - 父级实体
   */
  constructor(id?: string, parent?: Entity);

  /**
   * 硬度属性，默认为1
   */
  hard: number;

  /**
   * 模拟内容变化信号
   * 当模拟内容发生变化时触发
   */
  signalSimulatedContentChanged: Signal<SoftCloth>;

  /**
   * 模拟后的内容数据
   */
  simulatedContent: SimulatedContent;

  /**
   * 模拟元数据
   */
  simulatedMeta?: SimulatedMeta;

  /**
   * 创建软布料实例的工厂方法
   * @param metadata - 元数据对象
   * @returns 创建的软布料实例，失败返回null
   */
  static create(metadata: unknown): SoftCloth | null;

  /**
   * 判断当前对象是否处于模拟状态
   */
  get isSimulated(): boolean;

  /**
   * 获取X轴实际尺寸（长度 × 缩放）
   */
  get XSize(): number;

  /**
   * 获取Y轴实际尺寸（长度 × 缩放）
   */
  get YSize(): number;

  /**
   * 获取Z轴实际尺寸（长度 × 缩放）
   */
  get ZSize(): number;

  /** X轴坐标 */
  x: number;

  /** Y轴坐标 */
  y: number;

  /** Z轴坐标 */
  z: number;

  /** X轴旋转角度 */
  XRotation: number;

  /** Y轴旋转角度 */
  YRotation: number;

  /** Z轴旋转角度 */
  ZRotation: number;

  /** X轴缩放比例 */
  XScale: number;

  /** Y轴缩放比例 */
  YScale: number;

  /** Z轴缩放比例 */
  ZScale: number;

  /** X轴长度 */
  XLength: number;

  /** Y轴长度 */
  YLength: number;

  /** Z轴长度 */
  ZLength: number;

  /**
   * 设置字段值（内部方法）
   * @param fieldName - 字段名称
   * @param value - 新值
   */
  private _setFieldValue(fieldName: string, value: number): void;

  /**
   * 比较字段值是否相等（内部方法）
   * @param fieldName - 字段名称
   * @param value - 比较值
   * @returns 是否近似相等
   */
  private _fieldValueEquals(fieldName: string, value: number): boolean;

  /**
   * 恢复软布料到初始状态
   * 清除模拟数据并移除所有子内容
   */
  restoreSoftCloth(): void;

  /**
   * 调整尺寸并恢复模拟的软布料
   * 保留缩放信息，清除模拟数据并移除子内容
   */
  resizeRestoreSimulatedSoftCloth(): void;

  /**
   * 设置模拟内容
   * @param content - 新的模拟内容数据
   */
  setSimulationContent(content: Partial<SimulatedContent>): void;

  /**
   * 更新模拟元数据
   * 从simulatedMeta同步model3d信息到simulatedContent
   */
  updateSimulationMeta(): void;

  /**
   * 获取相关的元数据列表
   * @returns 相关元数据数组
   */
  getRelatedMetaDatas(): RelatedMetaData[];

  /**
   * 沿指定轴移动对象
   * @param axis - 移动轴向
   * @param distance - 移动距离
   */
  moveAlongAxis(axis: unknown, distance: number): void;

  /**
   * 围绕指定点旋转
   * @param point - 旋转中心点
   * @param angle - 旋转角度
   */
  rotateAround(point: unknown, angle: number): void;

  /**
   * 获取IO处理器实例
   * @returns IO处理器
   */
  getIO(): SoftCloth_IO;

  /**
   * 销毁对象，释放资源
   */
  destroy(): void;
}

// 导出类型别名以匹配原模块导出
export { SoftCloth_IO, SoftCloth };
export type { 
  SimulatedContent,
  SimulatedMeta,
  RelatedMetaData
};

// 以下导出用于兼容原始模块的属性导出
export declare const XScale: typeof SoftCloth.prototype.XScale;
export declare const YScale: typeof SoftCloth.prototype.YScale;
export declare const ZScale: typeof SoftCloth.prototype.ZScale;
export declare const XRotation: typeof SoftCloth.prototype.XRotation;
export declare const YRotation: typeof SoftCloth.prototype.YRotation;
export declare const ZRotation: typeof SoftCloth.prototype.ZRotation;
export declare const XLength: typeof SoftCloth.prototype.XLength;
export declare const YLength: typeof SoftCloth.prototype.YLength;
export declare const ZLength: typeof SoftCloth.prototype.ZLength;