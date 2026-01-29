/**
 * Module: ContentBase
 * 
 * 提供内容对象的基础类和序列化/反序列化功能。
 * 支持3D空间中的位置、旋转、缩放和动画属性。
 */

import { Entity, Entity_IO } from './Entity';
import { EntityField } from './decorators';

/**
 * 3D向量类型，表示位置、锚点或轴向
 */
export type Vector3 = [number, number, number];

/**
 * 旋转动画配置接口
 */
export interface RotationAnimation {
  /** 动画类型 */
  type: 'rotation';
  /** 旋转角度（度数或弧度） */
  angle: number;
  /** 旋转锚点坐标 */
  anchor: Vector3;
  /** 旋转轴向量 */
  axis: Vector3;
}

/**
 * 序列化数据接口
 */
export interface SerializedContentBase {
  /** X轴位置 */
  x: number;
  /** Y轴位置 */
  y: number;
  /** Z轴位置 */
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
  /** 是否可缩放 */
  isScalable: boolean;
  /** 翻转状态 */
  flip: number;
  /** X轴长度 */
  XLength: number;
  /** Y轴长度 */
  YLength: number;
  /** Z轴长度 */
  ZLength: number;
  /** 动画列表（可选） */
  animations?: RotationAnimation[];
}

/**
 * ContentBase的IO处理器类
 * 
 * 负责ContentBase实例的序列化（dump）和反序列化（load）操作
 */
export declare class ContentBase_IO extends Entity_IO {
  /**
   * 将ContentBase实例序列化为数据对象
   * 
   * @param entity - 要序列化的ContentBase实例
   * @param callback - 序列化后的回调函数
   * @param includeDefaults - 是否包含默认值
   * @param options - 额外的序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: ContentBase,
    callback?: (result: any[], entity: ContentBase) => void,
    includeDefaults?: boolean,
    options?: Record<string, any>
  ): any[];

  /**
   * 从数据对象加载并恢复ContentBase实例
   * 
   * @param entity - 要加载数据的ContentBase实例
   * @param data - 序列化的数据对象
   * @param options - 加载选项
   */
  load(
    entity: ContentBase,
    data: SerializedContentBase,
    options?: any
  ): void;
}

/**
 * 内容对象基类
 * 
 * 提供3D空间中对象的基础属性和行为，包括：
 * - 位置坐标（x, y, z）
 * - 旋转角度（XRotation, YRotation, ZRotation）
 * - 缩放比例（XScale, YScale, ZScale）
 * - 尺寸大小（XLength, YLength, ZLength）
 * - 动画状态（isOpened, angle, anchor, anchorAxis）
 */
export declare class ContentBase extends Entity {
  /** X轴位置坐标 */
  @EntityField()
  x: number;

  /** Y轴位置坐标 */
  @EntityField()
  y: number;

  /** Z轴位置坐标 */
  @EntityField()
  z: number;

  /** X轴基础长度 */
  @EntityField()
  XLength: number;

  /** Y轴基础长度 */
  @EntityField()
  YLength: number;

  /** Z轴基础长度 */
  @EntityField()
  ZLength: number;

  /** 是否允许缩放 */
  @EntityField()
  isScalable: boolean;

  /** X轴缩放比例 */
  @EntityField()
  XScale: number;

  /** Y轴缩放比例 */
  @EntityField()
  YScale: number;

  /** Z轴缩放比例 */
  @EntityField()
  ZScale: number;

  /** X轴旋转角度 */
  @EntityField()
  XRotation: number;

  /** Y轴旋转角度 */
  @EntityField()
  YRotation: number;

  /** Z轴旋转角度 */
  @EntityField()
  ZRotation: number;

  /** 翻转状态标志 */
  @EntityField()
  flip: number;

  /** 是否处于打开状态（用于动画） */
  @EntityField()
  isOpened: boolean;

  /** 当前旋转动画角度 */
  @EntityField()
  angle: number;

  /** 旋转锚点坐标 */
  @EntityField()
  anchor: Vector3;

  /** 旋转轴向量 */
  @EntityField()
  anchorAxis: Vector3;

  /** 平移向量 */
  @EntityField()
  translation: Vector3;

  /**
   * 构造函数
   * 
   * @param id - 实体唯一标识符，默认为空字符串
   * @param parent - 父实体引用，默认为undefined
   */
  constructor(id?: string, parent?: any);

  /**
   * 获取宿主对象
   * 
   * @returns 宿主对象引用
   */
  getHost(): any;

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

  /**
   * 获取IO处理器实例
   * 
   * @returns ContentBase_IO单例
   */
  getIO(): ContentBase_IO;
}