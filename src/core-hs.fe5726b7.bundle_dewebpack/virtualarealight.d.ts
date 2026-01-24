/**
 * 虚拟区域光源模块
 * 提供虚拟区域光源实体的序列化和运行时实现
 */

import { DirectionLight, DirectionLight_IO } from './DirectionLight';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { BrepBound } from './BrepBound';

/**
 * 虚拟区域光源的序列化/反序列化接口
 * 负责虚拟区域光源实体的持久化和加载
 */
export class VirtualAreaLight_IO extends DirectionLight_IO {
  /**
   * 序列化虚拟区域光源实体
   * @param entity - 要序列化的虚拟区域光源实体
   * @param callback - 序列化完成后的回调函数
   * @param includeDefaults - 是否包含默认值
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: VirtualAreaLight,
    callback?: (data: unknown[], entity: VirtualAreaLight) => void,
    includeDefaults?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 反序列化虚拟区域光源实体
   * @param entity - 要填充数据的虚拟区域光源实体
   * @param data - 序列化的数据对象
   * @param options - 反序列化选项
   */
  load(
    entity: VirtualAreaLight,
    data: VirtualAreaLightData,
    options?: Record<string, unknown>
  ): void;

  /**
   * 获取单例实例
   */
  static instance(): VirtualAreaLight_IO;
}

/**
 * 序列化数据结构
 */
interface VirtualAreaLightData {
  /** 光源宽度 */
  width: number;
  /** 光源高度 */
  height: number;
  /** 是否双面平面 */
  double_flat: boolean;
  /** 渲染时是否可见 */
  renderVisible: boolean;
}

/**
 * 边界数据结构
 */
interface BoundingData {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** 尺寸 */
  size: {
    width: number;
    height: number;
  };
  /** 旋转角度 */
  rotation: {
    XRotation: number;
    YRotation: number;
    ZRotation: number;
  };
}

/**
 * 渲染参数结构
 */
interface RenderParameters {
  /** 色温 */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** 是否双面平面 */
  double_flat: boolean;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 是否为天光入口 */
  skylightPortal: boolean;
  /** RGB颜色值 */
  rgb: number[];
  /** 是否影响高光 */
  affectSpecular: boolean;
  /** 是否关闭 */
  close: boolean;
  /** 光源内容类型 */
  sourceContentType: string;
  /** 渲染时是否可见 */
  renderVisible: boolean;
}

/**
 * 虚拟区域光源实体
 * 表示场景中的虚拟平面光源，具有指定的宽度和高度
 */
export class VirtualAreaLight extends DirectionLight {
  /**
   * 光源宽度（米）
   * @decorator EntityField
   */
  width: number;

  /**
   * 光源高度（米）
   * @decorator EntityField
   */
  height: number;

  /**
   * 是否为双面平面光源
   * @decorator EntityField
   */
  double_flat: boolean;

  /**
   * 渲染时是否可见
   * @decorator EntityField
   */
  renderVisible: boolean;

  /**
   * 构造函数
   * @param name - 实体名称
   * @param id - 实体ID
   */
  constructor(name?: string, id?: string);

  /**
   * 创建虚拟区域光源实例
   * @returns 已初始化的虚拟区域光源实例
   */
  static create(): VirtualAreaLight;

  /**
   * 重置光源属性到默认值
   */
  reset(): void;

  /**
   * 获取序列化IO对象
   * @returns 序列化IO实例
   */
  getIO(): VirtualAreaLight_IO;

  /**
   * 构造路径（虚拟区域光源返回空数组）
   * @param context - 路径构造上下文
   * @returns 空路径数组
   */
  constructPath(context: unknown): unknown[];

  /**
   * 刷新内部边界框
   * 根据光源的位置、尺寸和旋转计算包围盒
   */
  refreshBoundInternal(): void;

  /**
   * 获取光源面积
   * @returns 光源面积（平方米）
   */
  getArea(): number;

  /**
   * 检查是否具有面积尺寸
   * @returns 始终返回true
   */
  hasAreaSize(): boolean;

  /**
   * 获取渲染参数
   * @returns 渲染所需的参数对象
   */
  getRenderParameters(): RenderParameters;

  /**
   * 字段变更事件处理
   * @param fieldName - 变更的字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  onFieldChanged(
    fieldName: string,
    oldValue: unknown,
    newValue: unknown
  ): void;

  /**
   * 获取边界数据
   * @returns 包含位置、尺寸和旋转的边界数据
   */
  getBoundingData(): BoundingData;

  /**
   * 标记实体为脏状态（需要更新）
   */
  dirty(): void;

  /**
   * 标记位置为脏状态
   */
  dirtyPosition(): void;

  /**
   * 获取色温
   * @returns 色温值
   */
  getTemperature(): number;

  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
  /** Z方向尺寸 */
  ZSize: number;
  /** 所属组 */
  group?: { dirtyPosition(): void };
  /** 内部边界对象 */
  boundInternal: BrepBound;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** 光照强度 */
  intensity: number;
  /** 是否为天光入口 */
  skylightPortal: boolean;
  /** RGB颜色值 */
  rgb: number[];
  /** 是否影响高光 */
  affectSpecular: boolean;
  /** 是否关闭 */
  close: boolean;
  /** 光源内容类型 */
  sourceContentType: string;
}

/**
 * 注册虚拟区域光源类到实体系统
 * 模型类型: HSConstants.ModelClass.NgFlatLight
 */