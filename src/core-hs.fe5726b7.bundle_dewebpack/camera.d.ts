/**
 * Camera module - 相机模型定义
 * 提供第一人称、轨道视图、正交视图等相机类型的核心实现
 */

import type { Entity, Entity_IO } from './Entity';

/**
 * 相机类型枚举
 * 定义相机的基本视角模式
 */
export enum CameraTypeEnum {
  /** 第一人称视角 */
  FirstPerson = 'firstperson',
  /** 轨道视图（环绕视角） */
  OrbitView = 'orbitview',
  /** 正交视图 */
  OrthView = 'orthview'
}

/**
 * 相机视图类型枚举
 * 定义投影方式
 */
export enum CameraViewTypeEnum {
  /** 透视投影 */
  Perspective = 'perspective',
  /** 正交投影 */
  Orthographic = 'orthographic'
}

/**
 * 相机标志位枚举
 * 用于控制相机特定行为开关
 */
export enum CameraFlagEnum {
  /** 关闭切换功能 */
  toggleOff = 256
}

/**
 * 相机数据序列化对象
 */
export interface CameraData {
  /** 相机类型 */
  type: CameraTypeEnum;
  /** 视图类型 */
  view_type: CameraViewTypeEnum;
  /** 相机位置 X 坐标 */
  x: number;
  /** 相机位置 Y 坐标 */
  y: number;
  /** 相机位置 Z 坐标（高度） */
  z: number;
  /** 目标点 X 坐标 */
  target_x: number;
  /** 目标点 Y 坐标 */
  target_y: number;
  /** 目标点 Z 坐标 */
  target_z: number;
  /** 水平视场角（度） */
  horizontal_fov: number;
  /** 俯仰角（度） */
  pitch: number;
  /** 近裁剪面距离 */
  near: number;
  /** 远裁剪面距离 */
  clip: number;
  /** 缩放系数 */
  zoom: number;
}

/**
 * 相机输入输出处理器
 * 负责相机数据的序列化和反序列化
 */
export declare class Camera_IO extends Entity_IO {
  /**
   * 导出相机数据
   * @param camera 相机实例
   * @param callback 自定义处理回调
   * @param includeDefaults 是否包含默认值
   * @param options 额外选项
   * @returns 序列化后的数据数组
   */
  dump(
    camera: Camera,
    callback?: (data: unknown[], camera: Camera) => void,
    includeDefaults?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 加载相机数据
   * @param camera 目标相机实例
   * @param data 序列化数据
   * @param context 加载上下文
   */
  load(camera: Camera, data: Partial<CameraData>, context?: unknown): void;

  /**
   * 获取单例实例
   */
  static instance(): Camera_IO;
}

/**
 * 2D 点坐标接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 相机类
 * 核心相机模型，支持多种视角模式和投影方式
 */
export declare class Camera extends Entity {
  /**
   * 构造函数
   * @param id 相机唯一标识
   * @param parent 父级实体
   */
  constructor(id?: string, parent?: unknown);

  /** 相机类型 */
  type: CameraTypeEnum;

  /** 视图类型（透视/正交） */
  view_type: CameraViewTypeEnum;

  /** 相机位置 X 坐标 */
  x: number;

  /** 相机位置 Y 坐标 */
  y: number;

  /** 相机位置 Z 坐标（高度） */
  z: number;

  /** 目标点 X 坐标 */
  target_x: number;

  /** 目标点 Y 坐标 */
  target_y: number;

  /** 目标点 Z 坐标 */
  target_z: number;

  /** 水平视场角（度） */
  horizontal_fov: number;

  /** 渲染视场角（可选，用于特殊渲染需求） */
  render_fov?: number;

  /** 俯仰角（度） */
  pitch: number;

  /** 近裁剪面距离 */
  near: number;

  /** 远裁剪面距离 */
  clip: number;

  /** 缩放系数 */
  zoom: number;

  /** 相机轮廓点集合 */
  outline?: Point2D[];

  /**
   * 验证相机数据有效性
   * @returns 是否有效
   */
  verify(): boolean;

  /**
   * 字段变更回调
   * @param fieldName 字段名
   * @param newValue 新值
   * @param silent 是否静默更新
   */
  onFieldChanged(fieldName: string, newValue: unknown, silent?: boolean): void;

  /**
   * 创建指定类型的相机
   * @param type 相机类型
   * @returns 新相机实例
   */
  static create(type: CameraTypeEnum): Camera;

  /**
   * 重置相机到默认状态
   * @param silent 是否静默重置（不触发事件）
   */
  reset(silent?: boolean): void;

  /**
   * 获取输入输出处理器
   * @returns IO 处理器实例
   */
  getIO(): Camera_IO;

  /**
   * 刷新内部边界
   * @internal
   */
  refreshBoundInternal(): void;

  /**
   * 检查相机配置是否有效
   * @returns 是否有效
   */
  isValid(): boolean;

  /**
   * 平移相机和目标点
   * @param deltaX X 轴偏移量
   * @param deltaY Y 轴偏移量
   */
  move(deltaX: number, deltaY: number): void;

  /**
   * 移动相机到指定位置（保持相对目标点距离）
   * @param x 目标 X 坐标
   * @param y 目标 Y 坐标
   */
  moveTo(x: number, y: number): void;

  /**
   * 克隆相机实例
   * @returns 新的相机副本
   */
  clone(): Camera;
}