/**
 * SplitEdgeDimension - 分割边缘尺寸标注组件
 * 用于显示和编辑墙体分割边缘的左右两侧尺寸
 */

import type { Context } from './Context';
import type { Entity } from './Entity';
import type { CoEdge, Edge } from './Edge';
import type { Vec2 } from './Vec2';
import type { Gizmo, LinearDimension } from './Gizmo';
import type { DisplayController } from './DisplayController';
import type { Command, CommandManager } from './CommandManager';

/**
 * 线性尺寸标注状态枚举
 */
declare enum LinearDimensionStateEnum {
  /** 可编辑状态 */
  editable = 'editable',
  /** 聚焦状态 */
  focus = 'focus',
}

/**
 * 尺寸值变更事件数据
 */
interface DimensionValueChangeEvent {
  data: {
    /** 新值 */
    value: number;
    /** 旧值 */
    oldValue: number;
    /** 触发变更的Gizmo对象 */
    gizmo: LinearDimension;
  };
}

/**
 * 分割边缘实体
 */
interface SplitEdgeEntity extends Entity {
  /** 关联的共边 */
  coedge: CoEdge;
  /** 边缘中点坐标 */
  middle: Vec2;
}

/**
 * 线性尺寸标注配置选项
 */
interface LinearDimensionOptions {
  /** 字体大小 */
  fontSize: number;
  /** 箭头大小 */
  arrowSize: number;
}

/**
 * 分割边缘尺寸标注Gizmo
 * 继承自SVG Gizmo基类，用于显示墙体分割边缘左右两侧的可编辑尺寸标注
 */
export declare class SplitEdgeDimension extends Gizmo {
  /** 左侧尺寸标注 */
  lengthDimensionLeft: LinearDimension;
  
  /** 右侧尺寸标注 */
  lengthDimensionRight: LinearDimension;
  
  /** 控制器实例 */
  controller: SplitEdgeDimensionController;
  
  /** 关联的实体对象 */
  entity: SplitEdgeEntity;

  /**
   * 构造函数
   * @param context - 画布上下文
   * @param parent - 父级Gizmo
   * @param entity - 分割边缘实体
   */
  constructor(context: Context, parent: Gizmo, entity: SplitEdgeEntity);

  /**
   * 创建线性尺寸标注
   * @param context - 画布上下文
   * @param parent - 父级Gizmo
   * @returns 线性尺寸标注实例
   */
  private _createLinearDimension(context: Context, parent: Gizmo): LinearDimension;

  /**
   * 判断是否可以绘制
   * @returns 始终返回true
   */
  canDraw(): boolean;

  /**
   * 激活时触发
   * 激活左右两侧尺寸标注并更新显示
   */
  onActivate(): void;

  /**
   * 停用时触发
   * 停用左右两侧尺寸标注并取消所有事件监听
   */
  onDeactivate(): void;

  /**
   * 清理资源
   * 释放左右两侧尺寸标注的引用
   */
  onCleanup(): void;

  /**
   * 左侧尺寸值变更提交事件处理
   * @param event - 值变更事件
   */
  private _onLengthLeftValueChangeCommit(event: DimensionValueChangeEvent): void;

  /**
   * 右侧尺寸值变更提交事件处理
   * @param event - 值变更事件
   */
  private _onLengthRightValueChangeCommit(event: DimensionValueChangeEvent): void;

  /**
   * 绘制方法
   * 更新尺寸标注并绘制到画布
   */
  draw(): void;

  /**
   * 更新尺寸标注
   */
  update(): void;

  /**
   * 内部更新尺寸标注逻辑
   * 计算并更新左右两侧尺寸标注的位置、旋转角度等属性
   */
  private _updateDimension(): void;

  /**
   * 重置尺寸标注状态
   * 隐藏左右两侧尺寸标注
   */
  reset(): void;
}

/**
 * 分割边缘尺寸标注控制器
 * 负责处理尺寸值变更事件并执行移动边缘命令
 */
declare class SplitEdgeDimensionController extends DisplayController {
  /** 命令管理器 */
  private _cmdMgr: CommandManager;

  /**
   * 构造函数
   * @param entity - 分割边缘实体
   * @param context - 画布上下文
   */
  constructor(entity: SplitEdgeEntity, context: Context);

  /**
   * 分发事件
   * @param eventType - 事件类型（'valueLeftChanged' | 'valueRightChanged'）
   * @param entity - 目标实体
   * @param event - 值变更事件
   */
  dispatch(eventType: string, entity: SplitEdgeEntity, event: DimensionValueChangeEvent): void;

  /**
   * 判断当前是否可以编辑
   * @returns 当前无正在执行的移动边缘命令时返回true
   */
  canEdit(): boolean;

  /**
   * 移动共边处理器
   * 创建并执行移动分割边缘命令
   * @param coedge - 目标共边
   * @param event - 值变更事件
   */
  private _moveCoEdgeHandler(coedge: CoEdge, event: DimensionValueChangeEvent): void;
}

/**
 * 计算共边的法向量
 * @param coedge - 共边对象
 * @returns 归一化的法向量，如果coedge为空则返回undefined
 */
declare function computeNormalVector(coedge: CoEdge | undefined): Vec2 | undefined;

/**
 * 获取显示点坐标
 * 计算射线与面边界的交点
 * @param face - 面对象
 * @param origin - 起点坐标
 * @param direction - 方向向量
 * @returns 交点坐标，无交点时返回undefined
 */
declare function getDisplayPoint(
  face: Face | undefined,
  origin: Vec2,
  direction: Vec2
): Vec2 | undefined;

/**
 * 常量定义
 */
declare const MIN_WALL_LENGTH: number;
declare const MAX_WALL_LENGTH: number;