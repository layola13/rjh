/**
 * SpotLight module - 聚光灯实体类型定义
 * 提供聚光灯的序列化/反序列化和渲染参数管理
 */

import type { DirectionLight_IO, DirectionLight } from './DirectionLight';
import type { LightTypeEnum } from './LightTypeEnum';
import type { BrepBound } from './BrepBound';
import type { Entity } from './Entity';

/**
 * 聚光灯尺寸最小值常量
 */
declare const DEFAULT_SIZE: 0.3;

/**
 * 聚光灯近平面Z坐标
 */
declare const NEAR_Z: -0.15;

/**
 * 聚光灯远平面Z坐标
 */
declare const FAR_Z: -0.5;

/**
 * 聚光灯序列化数据接口
 */
export interface SpotLightData {
  /** IES光域网编号 */
  IES?: string;
  /** IES文件URL */
  iesUrl?: string;
  /** 是否为公共IES文件 */
  isPublicIES?: boolean;
  /** 提取来源ID */
  extractSourceId?: string;
  /** X轴尺寸 */
  XSize?: number;
  /** Y轴尺寸 */
  YSize?: number;
}

/**
 * 聚光灯渲染参数接口
 */
export interface SpotLightRenderParameters {
  /** 色温 */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标（含基准高度） */
  z: number;
  /** IES光域网编号 */
  IES: string;
  /** IES文件URL */
  iesUrl: string;
  /** 是否为公共IES */
  isPublicIES: boolean;
  /** RGB颜色值 */
  rgb: number;
  /** 是否影响高光 */
  affectSpecular: boolean;
  /** 是否关闭 */
  close: boolean;
  /** 光源内容类型 */
  sourceContentType: string;
}

/**
 * 聚光灯序列化/反序列化处理器
 * 负责SpotLight实体的持久化操作
 */
export declare class SpotLight_IO extends DirectionLight_IO {
  /**
   * 序列化聚光灯实体
   * @param entity - 要序列化的聚光灯实体
   * @param callback - 序列化完成后的回调函数
   * @param includeDefaults - 是否包含默认值
   * @param context - 序列化上下文
   * @returns 序列化后的数据数组
   */
  dump(
    entity: SpotLight,
    callback?: (data: unknown[], entity: SpotLight) => void,
    includeDefaults?: boolean,
    context?: Record<string, unknown>
  ): unknown[];

  /**
   * 反序列化聚光灯实体
   * @param entity - 目标实体对象
   * @param data - 序列化的数据
   * @param context - 反序列化上下文
   */
  load(
    entity: SpotLight,
    data: SpotLightData,
    context?: Record<string, unknown>
  ): void;

  /**
   * 获取单例实例
   */
  static instance(): SpotLight_IO;
}

/**
 * 聚光灯实体类
 * 继承自DirectionLight，提供聚光灯特有的IES配置和渲染能力
 */
export declare class SpotLight extends DirectionLight {
  /**
   * 内置IES光域网文件列表
   * 包含预设的聚光灯和补光灯配置
   */
  static readonly INNER_IES: readonly string[];

  /** 光源类型标识 */
  readonly type: typeof LightTypeEnum.SpotLight;

  /** IES光域网编号 */
  IES: string;

  /** IES文件URL */
  iesUrl: string;

  /** 是否为公共IES文件 */
  isPublicIES: boolean;

  /** 提取来源ID（装饰器字段） */
  extractSourceId?: string;

  /** X轴尺寸 */
  XSize: number;

  /** Y轴尺寸 */
  YSize: number;

  /**
   * 构造函数
   * @param id - 实体ID
   * @param owner - 所属容器
   */
  constructor(id?: string, owner?: unknown);

  /**
   * 工厂方法：创建并初始化聚光灯实例
   * @returns 新创建的聚光灯实例
   */
  static create(): SpotLight;

  /**
   * 重置为默认状态
   * 设置默认IES、尺寸等属性
   */
  reset(): void;

  /**
   * 获取对应的IO处理器
   * @returns SpotLight_IO单例
   */
  getIO(): SpotLight_IO;

  /**
   * 刷新内部边界
   * 基于旋转角度和尺寸计算聚光灯的包围盒
   */
  refreshBoundInternal(): void;

  /**
   * 获取渲染参数
   * @returns 包含位置、颜色、强度、IES等完整渲染参数
   */
  getRenderParameters(): SpotLightRenderParameters;

  /**
   * 获取友好索引分组
   * 用于根据IES配置对灯光进行分类
   * @returns IES文件名或默认分组标识
   */
  getFriendlyIndexGroup(): string;

  /**
   * 字段变更事件处理
   * 当IES相关字段变更时触发友好索引更新
   * @param fieldName - 变更的字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  onFieldChanged(
    fieldName: string,
    oldValue: unknown,
    newValue: unknown
  ): void;
}

/**
 * 模块导出
 */
export { SpotLight_IO, SpotLight };