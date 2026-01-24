/**
 * 墙板 Gizmo 模块
 * 提供墙板编辑时的可视化控制器,包括子 Gizmo 和缩放手柄
 * @module WallBoardGizmo
 */

import type { ScaleContext, ScaleDirectionType, WallBoardScale } from './ScaleContext';

/**
 * Gizmo 基类上下文接口
 */
interface IGizmoContext {
  /** 上下文对象 */
  readonly context: unknown;
}

/**
 * Gizmo 基类接口
 */
interface IGizmo extends IGizmoContext {
  /**
   * 添加子 Gizmo
   * @param gizmo - 子 Gizmo 实例
   */
  addChildGizmo(gizmo: IGizmo): void;
}

/**
 * 墙板 Gizmo 构造函数参数
 */
type WallBoardGizmoConstructorParams = [
  /** 第一个参数,可能是场景或画布对象 */
  sceneOrCanvas: unknown,
  /** 第二个参数,可能是配置或选项 */
  optionsOrConfig: unknown,
  /** 第三个参数,可能是额外的初始化参数 */
  additionalParam: unknown
];

/**
 * 缩放方向类型枚举
 */
declare enum ScaleDirectionType {
  /** 左侧缩放 */
  left = 'left',
  /** 右侧缩放 */
  right = 'right',
  /** 顶部缩放 */
  top = 'top',
  /** 底部缩放(未在此模块使用) */
  bottom = 'bottom'
}

/**
 * 缩放上下文类
 * 用于管理多个缩放手柄的共享状态
 */
declare class ScaleContext {
  constructor();
}

/**
 * 墙板缩放控制器
 * 提供特定方向的缩放手柄功能
 */
declare class WallBoardScale implements IGizmo {
  /**
   * @param context - Gizmo 上下文对象
   * @param optionsOrConfig - 配置选项
   * @param additionalParam - 额外参数
   * @param direction - 缩放方向
   * @param scaleContext - 共享的缩放上下文
   */
  constructor(
    context: unknown,
    optionsOrConfig: unknown,
    additionalParam: unknown,
    direction: ScaleDirectionType,
    scaleContext: ScaleContext
  );

  readonly context: unknown;
  addChildGizmo(gizmo: IGizmo): void;
}

/**
 * 墙板 Gizmo 类
 * 继承自 HSApp.View.Base.Gizmo,提供墙板编辑时的可视化控制
 * 
 * @remarks
 * 该类会自动创建:
 * - 一个默认子 Gizmo (通过模块 921071)
 * - 三个方向的缩放手柄 (左、右、上)
 * 
 * @example
 *