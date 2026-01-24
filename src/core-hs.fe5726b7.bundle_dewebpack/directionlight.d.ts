/**
 * 方向光模块
 * 提供方向光的序列化/反序列化及3D场景交互功能
 */

import type { Light, Light_IO } from './Light';
import type { Entity } from './Entity';

/**
 * 方向光序列化数据接口
 */
export interface DirectionLightSerializedData {
  /** X轴旋转角度（度） */
  XRotation?: number;
  /** Y轴旋转角度（度） */
  YRotation?: number;
  /** Z轴旋转角度（度） */
  ZRotation?: number;
  /** 是否启用目标点模式 */
  targetEnabled?: boolean;
  /** 目标点X坐标 */
  XTarget?: number;
  /** 目标点Y坐标 */
  YTarget?: number;
  /** 目标点Z坐标 */
  ZTarget?: number;
}

/**
 * 方向光渲染参数接口
 */
export interface DirectionLightRenderParameters {
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
}

/**
 * 方向光IO处理器
 * 负责方向光实体的序列化和反序列化
 */
export declare class DirectionLight_IO extends Light_IO {
  /**
   * 序列化方向光实体
   * @param entity - 要序列化的方向光实体
   * @param callback - 自定义序列化回调
   * @param includeDefaults - 是否包含默认值
   * @param context - 序列化上下文
   * @returns 序列化后的数据数组
   */
  dump(
    entity: DirectionLight,
    callback?: (data: unknown[], entity: DirectionLight) => void,
    includeDefaults?: boolean,
    context?: Record<string, unknown>
  ): unknown[];

  /**
   * 反序列化方向光实体
   * @param entity - 目标实体实例
   * @param data - 序列化数据
   * @param context - 反序列化上下文
   */
  load(
    entity: DirectionLight,
    data: DirectionLightSerializedData,
    context?: Record<string, unknown>
  ): void;

  /**
   * 获取单例实例
   */
  static instance(): DirectionLight_IO;
}

/**
 * 方向光实体类
 * 表示场景中的方向光源，支持旋转和目标点定向
 */
export declare class DirectionLight extends Light {
  /**
   * 构造方向光实例
   * @param id - 实体唯一标识符
   * @param parent - 父实体
   */
  constructor(id?: string, parent?: Entity | undefined);

  /** X轴旋转角度（度） */
  XRotation: number;

  /** Y轴旋转角度（度） */
  YRotation: number;

  /** Z轴旋转角度（度） */
  ZRotation: number;

  /** 内部旋转缓存 */
  private __rotation: number;

  /** 是否启用目标点模式 */
  targetEnabled: boolean;

  /** 目标点X坐标（NaN表示未设置） */
  XTarget: number;

  /** 目标点Y坐标（NaN表示未设置） */
  YTarget: number;

  /** 目标点Z坐标（NaN表示未设置） */
  ZTarget: number;

  /**
   * 重置方向光到初始状态
   */
  reset(): void;

  /**
   * 检查目标点坐标是否有效
   * @returns 三个坐标均为有效数字时返回true
   */
  isTargetValid(): boolean;

  /**
   * 判断是否为虚拟光源
   * @returns 始终返回true
   */
  isVirtual(): boolean;

  /**
   * 重置目标点设置
   */
  resetTarget(): void;

  /**
   * 镜像变换
   * @param axis - 镜像轴
   * @param flipZ - 是否翻转Z轴
   */
  mirror(axis: unknown, flipZ: boolean): void;

  /**
   * 获取渲染参数
   * @returns 包含旋转信息的渲染参数对象
   */
  getRenderParameters(): DirectionLightRenderParameters & Record<string, unknown>;

  /**
   * 获取IO处理器实例
   * @returns 方向光IO处理器
   */
  getIO(): DirectionLight_IO;

  /**
   * 根据目标点更新旋转角度
   * 将光源方向对准目标点
   */
  updateRotationToTarget(): void;

  /**
   * 字段变更回调
   * @param fieldName - 变更的字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  protected onFieldChanged(
    fieldName: string,
    oldValue: unknown,
    newValue: unknown
  ): void;
}